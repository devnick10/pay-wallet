"use client";

import { useEffect } from "react";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="mx-auto flex max-w-md flex-col items-center space-y-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold">Something went wrong!</h1>
            <p className="text-gray-600">
              We apologize for the inconvenience. A critical error occurred
              while loading the application.
            </p>
            {error.digest && (
              <p className="text-sm text-gray-500">
                Error digest:{" "}
                <code className="rounded bg-gray-100 px-1 py-0.5">
                  {error.digest}
                </code>
              </p>
            )}
            <div className="flex gap-4">
              <Button onClick={reset} variant="default">
                Try Again
              </Button>
              <Link href="/">
                <Button variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
