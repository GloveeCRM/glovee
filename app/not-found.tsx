import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-svh w-full flex-col items-center justify-center bg-sand-400 px-4 text-zinc-900">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-medium">Page Not Found</h2>
        <p className="max-w-md text-zinc-600">
          We couldn&apos;t find the page you&apos;re looking for. Please check the URL or return to
          the homepage.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-md bg-zinc-900 px-6 py-2.5 text-white transition-colors hover:bg-zinc-800"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
