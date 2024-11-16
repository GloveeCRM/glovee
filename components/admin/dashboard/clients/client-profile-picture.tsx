'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { BiTrash } from 'react-icons/bi'

import { UserType } from '@/lib/types/user'
import { uploadFileToS3 } from '@/lib/utils/s3'
import { fetchProfilePictureUploadURL } from '@/lib/data/user'
import { updateUserProfile, updateUserProfilePicture } from '@/lib/actions/user'

interface ClientProfilePictureProps {
  url: string
  client: UserType
  editable: boolean
}

export default function ClientProfilePicture({ url, client, editable }: ClientProfilePictureProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    const {
      url,
      objectKey,
      error: uploadURLDataError,
    } = await fetchProfilePictureUploadURL({
      userID: client.userID,
      fileName: file.name,
      mimeType: file.type,
    })

    if (uploadURLDataError) {
      console.error(uploadURLDataError)
      return
    }

    if (!url) {
      console.error('No upload URL received')
      return
    }

    const uploadRes = await uploadFileToS3(url, file)
    if (!uploadRes.success) {
      console.error('Failed to upload file to S3')
      return
    }

    const { error: updateProfilePictureError } = await updateUserProfilePicture({
      userID: client.userID,
      objectKey: objectKey || '',
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
    })
    if (updateProfilePictureError) {
      console.error('Failed to update profile picture')
      return
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  function handleDelete() {
    updateUserProfile({ userID: client.userID, profilePictureFileID: 0 })
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
