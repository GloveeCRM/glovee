'use client'

import { settings } from '@/lib/actions/auth'
import { UserRole } from '@prisma/client'
import { useFormState } from 'react-dom'

export default function SettingsPage() {
  const [formState, dispatch] = useFormState(settings, {})
  return (
    <form action={dispatch} className="space-y-6">
      {formState?.errors}
      {formState?.error}
      {formState?.success}
      <div className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="example@gmail.com" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input type="password" id="newPassword" name="newPassword" />
        </div>
        <div>
          <select name="role" id="role">
            Role
            <option value={UserRole.ADMIN}>Admin</option>
            <option value={UserRole.USER}>User</option>
          </select>
        </div>
      </div>

      <button type="submit">Save</button>
    </form>
  )
}
