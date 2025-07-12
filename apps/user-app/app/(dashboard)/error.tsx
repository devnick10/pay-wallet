"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorType from "next/error";

export default function Error({
  err,
  reset,
}: {
  err: ErrorType;
  reset: () => void;
}) {
  return <ErrorBoundary reset={reset} err={err} />;
}
