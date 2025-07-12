"use client";

import { ThemeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      const signInResponse = await signIn("google", {
        callbackUrl: "/dashboard?signinSuccess=1",
      });

      if (signInResponse?.error) {
        toast({
          variant: "destructive",
          description:
            signInResponse.error === "CredentialsSignin"
              ? "Invalid credentials"
              : signInResponse.error,
        });
        return;
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Signin failed, please try again.",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PayWallet</span>
            </div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Access your account with google
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid  gap-4">
              <Button
                onClick={handleGoogleSignIn}
                variant="default"
                className="w-full text-md"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 50 50"
                    className="text-white dark:text-black"
                  >
                    <path
                      fill="currentColor"
                      d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"
                    ></path>
                  </svg>
                </div>
                Google
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
