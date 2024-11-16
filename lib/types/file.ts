export type FileType = {
  fileID: number
  name: string
  mimeType: FileMimeType
  path: string
  size: number
  bucket: string
  objectKey: string
  metadata: FileMetadataType
  url: string
  createdAt: string
  updatedAt: string
  createdBy: string
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
