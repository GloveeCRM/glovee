'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { ImSpinner2 } from 'react-icons/im'

import { UserStatusTypes } from '@/lib/types/user'
import { updateUserStatus } from '@/lib/actions/user'

interface SetUserStatusButtonProps {
  userID: number
  newStatus: UserStatusTypes
}

export default function SetUserStatusButton({ userID, newStatus }: SetUserStatusButtonProps) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  function userStatusUpdateSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function userStatusUpdateErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleClickSetStatus() {
    setIsUpdating(true)
    const { status, error } = await updateUserStatus({ userID: userID, status: newStatus })
    if (status) {
      userStatusUpdateSuccessToast('User status set to ' + status)
    } else {
      userStatusUpdateErrorToast(error || 'Failed to update user status!')
    }
    setIsUpdating(false)
  }

  return (
    <button
      onClick={handleClickSetStatus}
      disabled={isUpdating}
      className={`flex h-[29px] w-[85px] items-center justify-center rounded-md text-[14px] focus-visible:outline-none ${newStatus === UserStatusTypes.ACTIVE ? 'bg-teal-100 text-teal-900 hover:bg-teal-200' : 'bg-coral-100 hover:bg-coral-200 text-coral-900'}`}
    >
      {isUpdating ? (
        <ImSpinner2
          className={`h-[16px] w-[16px] animate-spin ${newStatus === UserStatusTypes.ACTIVE ? 'text-teal-900' : 'text-coral-900'}`}
        />
      ) : newStatus === UserStatusTypes.ACTIVE ? (
        'Activate'
      ) : (
        'Deactivate'
      )}
    </button>
  )
}
