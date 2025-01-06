interface FileNameParts {
  name: string
  extension: string
}

export function extractFileNameParts(fileName: string): FileNameParts {
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex === -1) {
    return { name: fileName, extension: '' }
  }
  return {
    name: fileName.substring(0, lastDotIndex),
    extension: fileName.substring(lastDotIndex + 1),
  }
}
