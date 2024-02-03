import { auth } from '@/auth'
import { logout } from '@/lib/actions/auth'

export default async function SettingsPage() {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <form action={logout}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}
