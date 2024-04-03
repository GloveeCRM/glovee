import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested client.</p>
      <Link href="/admin/clients">Back to clients</Link>
    </div>
  )
}
