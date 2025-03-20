export default function OrgNotFoundPage() {
  return (
    <div className="flex h-svh w-full flex-col items-center justify-center bg-sand-400 px-4 text-zinc-900">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-medium">Organization Not Found</h2>
        <p className="text-zinc-600">
          The organization you are looking for does not exist. Please check the URL.
        </p>
      </div>
    </div>
  )
}
