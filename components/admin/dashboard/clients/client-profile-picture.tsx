'use client'

import Image from 'next/image'
import { HiOutlinePencilSquare } from 'react-icons/hi2'

import { UserType } from '@/lib/types/user'
import { uploadFileToS3 } from '@/lib/utils/s3'
import { fetchProfilePictureUploadURL } from '@/lib/data/user'
import { useOrgContext } from '@/contexts/org-context'
import { updateClientProfilePicture } from '@/lib/actions/user'
import { BiTrash } from 'react-icons/bi'
import { useRef } from 'react'

interface ClientProfilePictureProps {
  url: string
  client: UserType
  editable: boolean
}

export default function ClientProfilePicture({ url, client, editable }: ClientProfilePictureProps) {
  const { orgName } = useOrgContext()

  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    const uploadURL = await fetchProfilePictureUploadURL(orgName, client.id, file.type)
    if (!uploadURL) {
      console.error('Failed to fetch upload URL')
      return
    }

    const uploadRes = await uploadFileToS3(uploadURL, file)
    if (!uploadRes.success) {
      console.error('Failed to upload file to S3')
      return
    }

    const updateRes = await updateClientProfilePicture(orgName, client.id, uploadRes.url!)
    if (updateRes.error) {
      console.error('Failed to update profile picture')
      return
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  function handleDelete() {
    updateClientProfilePicture(orgName, client.id, '')
  }

  return (
    <div>
      {editable ? (
        <div className="flex flex-col gap-[4px]">
          <Image
            src={url}
            alt="CLient Logo"
            width={75}
            height={75}
            className="block h-[100px] w-[100px] rounded-full object-cover"
          />
          <div className="flex justify-around">
            <div onClick={handleDelete}>
              <BiTrash className="h-[24px] w-[24px] cursor-pointer text-red-500" />
            </div>
            <div>
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="">
                  <HiOutlinePencilSquare className="h-[24px] w-[24px] text-n-100" />
                </div>
              </label>
              <input
                id="file-upload"
                className="hidden"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                ref={inputRef}
              />
            </div>
          </div>
        </div>
      ) : (
        <Image
          src={url}
          alt="CLient Logo"
          width={75}
          height={75}
          className="block h-[100px] w-[100px] rounded-full object-cover"
        />
      )}
    </div>
  )
}
