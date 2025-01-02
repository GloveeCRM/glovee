'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

import { uploadFileToS3 } from '@/lib/utils/s3'
import { fetchProfilePictureUploadURL } from '@/lib/data/user'
import { updateUserProfilePicture } from '@/lib/actions/user'
import { BsFillCameraFill } from 'react-icons/bs'
import { ImSpinner2 } from 'react-icons/im'

interface ClientProfilePictureProps {
  url: string
  clientID: number
  editable: boolean
}

export default function ClientProfilePicture({
  url,
  clientID,
  editable,
}: ClientProfilePictureProps) {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    setIsUploading(true)

    const {
      url,
      objectKey,
      error: uploadURLDataError,
    } = await fetchProfilePictureUploadURL({
      userID: clientID,
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
      userID: clientID,
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

    setIsUploading(false)
  }

  // TODO: Implement delete functionality
  // function handleDelete() {
  //   updateUserProfile({ userID: clientID, profilePictureFileID: 0 })
  // }

  return (
    <div className="flex-shrink-0">
      {editable ? (
        <div className="group/client-profile-picture relative flex w-fit flex-col gap-[4px] overflow-hidden rounded-full border border-zinc-200 shadow-sm">
          <Image
            src={url}
            alt="CLient Logo"
            width={75}
            height={75}
            className="block h-[100px] w-[100px] rounded-full object-cover"
            draggable={false}
          />
          <label
            htmlFor="file-upload"
            className={`duration-125 absolute bottom-0 left-1/2 flex h-[30px] w-full -translate-x-1/2 cursor-pointer items-center justify-center bg-zinc-800 transition-all group-hover/client-profile-picture:opacity-100 ${
              isUploading ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isUploading ? (
              <ImSpinner2 className="h-[20px] w-[20px] animate-spin text-zinc-200" />
            ) : (
              <BsFillCameraFill className="h-[20px] w-[20px] text-zinc-200" />
            )}
          </label>
          <input
            id="file-upload"
            className="hidden"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
            ref={inputRef}
            disabled={isUploading}
          />
        </div>
      ) : (
        <Image
          src={url}
          alt="CLient Logo"
          width={75}
          height={75}
          className="block h-[100px] w-[100px] rounded-full border border-zinc-200 object-cover shadow-sm"
          draggable={false}
        />
      )}
    </div>
  )
}
