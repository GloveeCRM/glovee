import ForgotPasswordCard from '@/components/auth/forgot-password-card'

interface ForgotPasswordPageProps {
  params: {
    orgName: string
  }
}

export default function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  return <ForgotPasswordCard orgName={params.orgName} />
}
