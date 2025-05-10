import Link from "next/link"
import { FileQuestion, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground">
          We couldn&apos;t find the page you&apos;re looking for. The page might have been moved or deleted.
        </p>
        <Link href="/">
          <Button>
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
