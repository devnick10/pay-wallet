"use client"
import { verifyNumber } from '@/actions/otpVefications'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { ActionType } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from './ui/button'

interface OtpCardProps {
    phoneNumber: string
    setVerify: (value: boolean) => void
}

export function OtpCard({ phoneNumber, setVerify }: OtpCardProps) {
    const [otp, setOtp] = useState('')
    const [resendTimer, setResendTimer] = useState(30)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleVerify = useCallback(async () => {
        if (otp.length < 6) {
            toast.error('Please enter a complete 6-digit OTP')
            return
        }
        setIsLoading(true)
        try {
            const { success, message } = await verifyNumber({ phoneNumber, otp, action: ActionType.VERIFY })
            if (!success) {
                return toast.error(message);
            }
            toast.success(message)
            router.push("/dashboard")
        } finally {
            setIsLoading(false)
        }
    },[router])

    const handleResendOTP = useCallback(async () => {
        setResendTimer(30)

        const { success, message } = await verifyNumber({ phoneNumber, action: ActionType.SEND })
        if(!success){
            return toast.error(message);
        }
        toast.success('New OTP sent successfully')
    },[])

    useEffect(() => {
        const timer = resendTimer > 0 && setInterval(() => {
            setResendTimer(resendTimer - 1)
        }, 1000)
        return () => clearInterval(timer as NodeJS.Timeout)
    }, [resendTimer])

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Enter the OTP</CardTitle>
                <CardDescription>
                    We've sent a 6-digit code to {phoneNumber || 'your phone'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-center">
                    <InputOTP value={otp} onChange={(value) => setOtp(value)} maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className="text-center text-sm">
                    {resendTimer > 0 ? (
                        <span className="text-muted-foreground">
                            Resend code in {resendTimer}s
                        </span>
                    ) : (
                        <Button
                            variant="link"
                            className="p-0 text-sm"
                            onClick={handleResendOTP}
                        >
                            Resend OTP
                        </Button>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => setVerify(false)}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleVerify}
                    disabled={otp.length < 6 || isLoading}
                >
                    Verify
                </Button>
            </CardFooter>
        </Card>
    )
}