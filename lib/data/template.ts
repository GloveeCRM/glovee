'use server'

import { FormTemplateType } from '@/lib/types/template'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { getCurrentOrgName } from '../utils/server'
import { keysSnakeCaseToCamelCase } from '../utils/json'
import { FormType } from '../types/form'

interface SearchTemplatesFiltersDTO {
  formTemplateID?: number
  includeCategories?: boolean
  includeSections?: boolean
}

interface SearchTemplatesInputDTO {
  filters?: SearchTemplatesFiltersDTO
  searchQuery?: string
  limit?: number
  offset?: number
}

interface SearchTemplatesOutputDTO {
  formTemplates: FormType[] | null
  totalCount: number
}

export async function searchTemplates({
  filters = {
    formTemplateID: 0,
    includeCategories: false,
    includeSections: false,
  },
  searchQuery = '',
  limit = 0,
  offset = 0,
}: SearchTemplatesInputDTO): Promise<SearchTemplatesOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { formTemplates: null, totalCount: 0 }
  }

  const orgName = getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('form_template_id', filters.formTemplateID?.toString() || '')
  queryParams.append('include_categories', filters.includeCategories?.toString() || '')
  queryParams.append('include_sections', filters.includeSections?.toString() || '')
  queryParams.append('search_query', searchQuery)
  queryParams.append('limit', limit.toString())
  queryParams.append('offset', offset.toString())

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/search?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    const camelCaseData = keysSnakeCaseToCamelCase(data)
    return {
      formTemplates: camelCaseData.data.formTemplates,
      totalCount: camelCaseData.data.totalCount,
    }
  } catch (error) {
    return { formTemplates: null, totalCount: 0 }
  }
}

/**
 * Fetch template info by id
 */
export async function fetchTemplateById(
  orgName: string,
  id: number
): Promise<FormTemplateType | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/admin/information/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()

    if (data.error) {
      return null
    } else {
      return data.data.template
    }
  } catch {
    return null
  }
}

export async function fetchFullTemplateById(
  orgName: string,
  id: number
): Promise<FormTemplateType | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/admin/full-template/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return null
    } else {
      return data.data.template
    }
  } catch (error) {
    return null
  }
}
