export type FileType = {
  id: number
  name: string
  mimeType: FileMimeTypes
  path: string
  size: number
  bucket: string
  objectKey: string
  metadata: FileMetadata[]
}

export enum FileMimeTypes {
  APPLICATION_PDF = 'application/pdf',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_PNG = 'image/png',
  APPLICATION_MSWORD = 'application/msword',
  APPLICATION_VND_MS_EXCEL = 'application/vnd.ms-excel',
  TEXT_PLAIN = 'text/plain',
  APPLICATION_JSON = 'application/json',
}

export type FileMetadata = {
  id: number
  fileID: number
  key: FileMetadataKey
  value: FileMetadataValue
}

export enum FileMetadataKey {
  TAGS = 'tags',
}

export enum FileMetadataValue {
  TAG_DOCUMENT = 'document',
  TAG_IMAGE = 'image',
}
