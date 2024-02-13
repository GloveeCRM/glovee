export default function HomePage({ params }: { params: { domain: string } }) {
  return (
    <div>
      <h1>Welcome to {params.domain}</h1>
    </div>
  )
}
