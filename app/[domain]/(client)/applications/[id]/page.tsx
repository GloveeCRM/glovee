export default function ClientApplicationPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const sectionId = searchParams.section

  return <div>{sectionId}</div>
}
