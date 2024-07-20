/**
 * Upload file to S3
 */
export async function uploadFileToS3(
  uploadURL: string,
  file: File
): Promise<{
  success: boolean
  message: string
  url?: string
}> {
  try {
    const response = await fetch(uploadURL, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    if (response.ok) {
      return {
        success: true,
        message: 'File uploaded successfully',
        url: uploadURL.split('?')[0],
      }
    } else {
      throw new Error('Failed to upload file')
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to upload file',
    }
  }
}

/**
 * Extract the object key from the S3 URL
 */
export function extractS3ObjectKey(url: string): string {
  const pattern = /amazonaws\.com\/(.*)/
  const match = url.match(pattern)
  return match ? match[1] : ''
}
