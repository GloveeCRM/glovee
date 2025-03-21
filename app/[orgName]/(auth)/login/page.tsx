import LoginCard from '@/components/auth/login-card'

interface LoginPageProps {
  params: {
    orgName: string
  }
}

export default function LoginPage({ params }: LoginPageProps) {
  return <LoginCard orgName={params.orgName} />
}
