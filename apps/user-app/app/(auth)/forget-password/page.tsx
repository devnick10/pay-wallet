"use client";
import { updatePassword } from "@/actions/updatePassword";
import { verifyNumber } from "@/actions/verifyNumber";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
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
        <div className="mx-auto w-full max-w-md border border-slate-200 px-8 rounded-xl shadow-md py-6 space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PayWallet</span>
            </div>
            <h1 className="text-2xl font-bold">Forget Password</h1>
          </div>
          {!verified && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground"></span>
                  </div>
                </div>
                <Button
                  onClick={async () => {
                    if (!phoneNumber.trim()) {
                      toast.error("Please provide all fields");
                      return;
                    }

                    const { success } = await verifyNumber(phoneNumber);

                    if (!success) {
                      toast.error("Invalid Number");
                      return;
                    }
                    toast.success("Number Verified");
                    setVerified(true);
                  }}
                  className="w-full"
                >
                  Submit
                </Button>
              </div>
            </>
          )}
          {verified && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground"></span>
                  </div>
                </div>
                <Button
                  onClick={async () => {
                    if (!newPassword.trim() || !password.trim()) {
                      toast.error("Please provide all fields");
                      return;
                    }

                    const { success, message } = await updatePassword({
                      number: phoneNumber,
                      newPassword,
                    });

                    if (!success) {
                      toast.error(message);
                      return;
                    }
                    toast.success(message);
                    router.push("/signin");
                  }}
                  className="w-full"
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
