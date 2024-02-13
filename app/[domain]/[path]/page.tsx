export default function PathPage({
  params,
}: {
  params: {
    domain: string
    path: string
  }
}) {
  return (
    <div>
      Path Page: {params.domain}/{params.path}
    </div>
  )
}
