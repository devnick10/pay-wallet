import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-background">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">pay-wallet</h1>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>

      <div className="w-full max-w-md px-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 animate-pulse bg-primary"></div>
        </div>
      </div>

      <div className="mt-8 hidden w-full max-w-md space-y-4 px-4 md:block">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-1/2" />
        </div>
      </div>
    </div>
  );
}