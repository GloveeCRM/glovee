'use server'

import { FormQuestionSetType, FormType } from '@/lib/types/form'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession, getSessionPayload, getSessionUserID } from '@/lib/auth/session'
import { File } from '../types/file'
import { getCurrentOrgName } from '../utils/server'

export async function fetchClientForms(
  orgName: string,
  clientID: number
): Promise<FormType[] | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/forms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()

    if (data.status === 'error') {
      return null
    } else {
      return data.data.forms
    }
  } catch (error) {
    return null
  }
}

export async function searchForms(
  orgName: string,
  userID: number = 0,
  query: string = '',
  limit: number = 0,
  offset: number = 0
): Promise<{ forms: FormType[] | null; total: number }> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { forms: null, total: 0 }
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/admin/search?userID=${userID}&query=${query}&limit=${limit}&offset=${offset}`,
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
      return { forms: null, total: 0 }
    } else {
      return { forms: data.data.forms, total: data.data.total }
    }
  } catch (error) {
    return { forms: null, total: 0 }
  }
}

export async function fetchApplicantInformation(orgName: string, clientID: number, formID: number) {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/form/${formID}/applicant`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.applicant
  } catch (error) {
    return null
  }
}

export async function fetchFullForm(formID: number, orgName: string): Promise<FormType | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }
  const payload = await getSessionPayload()
  const clientID = payload?.user.id || 0

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/full-form/${formID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.form
  } catch (error) {
    return null
  }
}

export async function fetchClientFormIncludingCategoriesAndSections(
  orgName: string,
  formID: number
): Promise<FormType | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }
  const payload = await getSessionPayload()
  const clientID = payload?.user.id || 0

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/form/${formID}/including-categories-and-sections`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.form
  } catch (error) {
    return null
  }
}

export async function fetchSectionQuestionSets(
  orgName: string,
  clientID: number,
  sectionID: number
): Promise<FormQuestionSetType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/form/section/${sectionID}/question-sets`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.questionSets
  } catch (error) {
    return []
  }
}

export async function fetchFormAnswerFileUploadIntent(
  orgName: string,
  formID: number,
  questionID: number,
  file: File
): Promise<{
  uploadURL: string
  file: File
} | null> {
  try {
    const payload = await getSessionPayload()
    const userID = payload?.user.id || 0

    const accessToken = await getSession()
    if (!accessToken) {
      return null
    }

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${userID}/form/${formID}/question/${questionID}/create-form-answer-file-upload-intent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          file: file,
        }),
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return null
    } else {
      return data.data
    }
  } catch (error) {
    return null
  }
}

export async function fetchFormsByApplicationID(applicationID: number): Promise<FormType[] | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  const userID = await getSessionUserID()
  const orgName = await getCurrentOrgName()

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${userID}/application/${applicationID}/forms`,
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
      return data.data.forms
    }
  } catch (error) {
    return null
  }
}
