'use client'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="p-4 bg-red-50 text-red-900 rounded">
      <h2>Something went wrong!</h2>
      <button 
        onClick={() => reset()}
        className="mt-2 px-4 py-2 bg-red-100 rounded"
      >
        Try again
      </button>
    </div>
  )
}