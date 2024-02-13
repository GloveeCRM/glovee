'use client'
import { fetchApplicationById } from '@/lib/data/application'
import { useSearchParams } from 'next/navigation'

export default function ClientApplicationPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()

  return <div>{searchParams.get('section')}</div>
}
