'use client'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import Image from 'next/image'
import Link from 'next/link'
import ApplicationCategoriesProgress from './application-categories-progress'
import { ApplicationType } from '@/lib/types/application'
import { SubmitButton } from '../ui/buttons'
import { submitApplicationById } from '@/lib/actions/application'

interface ApplicationProgressCardProps {
  applications: ApplicationType[]
}

export default function ApplicationProgressCard({ applications }: ApplicationProgressCardProps) {
  return (
    <div className="items-center justify-between rounded-md border border-n-700 p-[10px]">
      {applications?.map((application) => (
        <div key={application.id}>
          <div className="flex justify-between">
            <div className="flex items-center gap-[6px]">
              <Image
                src={DEFAULT_MALE_CLIENT_LOGO_URL}
                alt="CLient Logo"
                width={45}
                height={45}
                className="rounded-full"
              />
              <div>
                <Link href={`applications/${application.id}`}>
                  <div className="text-[14px]">{`${application.applicantFirstName} ${application.applicantLastName}`}</div>
                </Link>
                <span className="text-[12px]">{application.role}</span>
              </div>
            </div>
            <div>
              <div className="rounded-full border px-[3px] py-[7px] text-[14px]">20%</div>
            </div>
          </div>
          {application.categories && (
            <ApplicationCategoriesProgress categories={application.categories} />
          )}
          <SubmitButton size="sm" onClick={() => submitApplicationById(application.id)}>
            Submit
          </SubmitButton>
        </div>
      ))}
    </div>
  )
}
