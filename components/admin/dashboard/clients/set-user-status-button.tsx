'use client'

import { Button } from '@/components/ui/button'
import { useOrgContext } from '@/contexts/org-context'
import { updateClientStatus } from '@/lib/actions/user'
import { UserStatusTypes } from '@/lib/types/user'
import toast from 'react-hot-toast'

interface SetUserStatusButtonProps {
  userId: number
  newStatus: UserStatusTypes
}

export default function SetUserStatusButton({ userId, newStatus }: SetUserStatusButtonProps) {
  const { orgName } = useOrgContext()

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
    updateClientStatus(orgName, userId, newStatus).then((res) => {
      if (res.error) {
        userStatusUpdateErrorToast(res.error || 'Failed to update user status!')
      } else {
        userStatusUpdateSuccessToast(res.success || 'User status updated!')
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
