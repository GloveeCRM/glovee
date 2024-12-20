'use client'

import { useEffect, useState, useTransition } from 'react'
import { ImSpinner2 } from 'react-icons/im'

import { TemplateType } from '@/lib/types/template'
import { updateFullTemplateByID } from '@/lib/actions/template'
import { useOrgContext } from '@/contexts/org-context'
import { useTemplateEditContext } from '@/contexts/template-edit-context'

export default function SaveTemplateButton() {
  const { templateID, template, isTemplateChanged, setSavedTemplate } = useTemplateEditContext()
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<string>('')

  const { orgName } = useOrgContext()

  function saveTemplateChanges(templateID: number, template: TemplateType) {
    setMessage('Saving changes...')
    startTransition(() => {
      updateFullTemplateByID(orgName, templateID, template)
        .then((data) => {
          if (data.success) {
            setSavedTemplate(template)
            setMessage('Changes saved!')
            setTimeout(() => {
              if (isTemplateChanged) {
                setMessage('Click to save changes')
              } else {
                setMessage('No changes to save')
              }
            }, 2000)
          } else {
            setMessage('Failed to save changes!')
            setTimeout(() => setMessage('Click to save changes'), 2000)
          }
        })
        .catch(() => {
          setMessage('Failed to save changes!')
          setTimeout(() => setMessage('Click to save changes'), 2000)
        })
    })
  }

  function handleClickSave() {
    if (!template) return null
    saveTemplateChanges(templateID, template)
  }

  useEffect(() => {
    if (isTemplateChanged) {
      setMessage('Click to save changes')
    } else if (message !== 'Changes saved!' && message !== 'Failed to save changes!') {
      setMessage('No changes to save')
    }
  }, [message, isTemplateChanged])

  return (
    <div className="flex items-center gap-[6px]">
      <button
        type="button"
        className={`flex w-[70px] items-center justify-center rounded bg-n-200 py-[3px] font-medium text-n-700 disabled:bg-opacity-50 ${isPending && 'bg-opacity-50'}`}
        disabled={!isTemplateChanged}
        onClick={handleClickSave}
      >
        {isPending ? (
          <span>
            <ImSpinner2 className="h-[24px] w-[24px] animate-spin text-n-700" />
          </span>
        ) : (
          <span>Save</span>
        )}
      </button>
      <p className="flex-1 text-[12px] text-n-300">{message}</p>
    </div>
  )
}
