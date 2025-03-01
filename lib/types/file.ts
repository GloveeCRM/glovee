export type FileType = {
  fileID: number
  name: string
  objectKey: string
  bucket: string
  region: string
  mimeType: FileMimeType
  size: number
  isPublic: boolean
  metadata: FileMetadataType
  createdAt: string
  updatedAt: string
  createdBy: string
  url?: string
}

export type FileMetadataType = {
  id: number
  fileID: number
  key: FileMetadataKey
  value: FileMetadataValue
}

export enum FileMimeType {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Document = 'document',
}

export enum FileMetadataKey {
  Tags = 'tags',
}

export enum FileMetadataValue {
  Document = 'document',
  Image = 'image',
}
