'use client'

import toast from 'react-hot-toast'

import { UserStatusTypes } from '@/lib/types/user'
import { updateUserStatus } from '@/lib/actions/user'
import { Button } from '@/components/ui/button'

interface SetUserStatusButtonProps {
  userID: number
  newStatus: UserStatusTypes
}

export default function SetUserStatusButton({ userID, newStatus }: SetUserStatusButtonProps) {
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
    updateUserStatus({ userID: userID, status: newStatus }).then((res) => {
      if (res.data?.status) {
        userStatusUpdateSuccessToast('User status set to ' + res.data?.status)
      } else {
        userStatusUpdateErrorToast(res.error || 'Failed to update user status!')
      }
    })
  }

  return (
    <Button
      onClick={handleClickSetStatus}
      size="md"
      className={
        newStatus === UserStatusTypes.ACTIVE ? 'bg-g-700 hover:bg-g-500' : 'bg-r-700 hover:bg-r-500'
      }
    >
      {newStatus === UserStatusTypes.ACTIVE ? 'Activate' : 'Deactivate'}
    </Button>
  )
}
