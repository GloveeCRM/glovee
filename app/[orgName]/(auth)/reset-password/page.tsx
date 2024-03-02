import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export default async function ResetPasswordPage() {
  await new Promise((resolve) => setTimeout(resolve, 8000))
  return <ResetPasswordForm />
}
