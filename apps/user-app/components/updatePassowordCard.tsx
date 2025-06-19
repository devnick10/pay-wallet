"use client"

import { updatePassword } from "@/actions/updatePassword"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"

export default function UpdatePasswordCard() {
  const [isLoading, setIsLoading] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassowrd: ""
  })

  const handlePasswordUpdate = async () => {
    setIsLoading(true)
    if (
      !passwordData || !passwordData.confirmPassowrd || !passwordData.newPassword ||
      passwordData.newPassword !== passwordData.confirmPassowrd
    ) {
      return toast.error("Please verify credentials")
    }
    try {
      const { message, success } = await updatePassword(passwordData)
      if (success) toast.success(message)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassowrd: ""
      })
    } catch (error) {
      console.error(error)
      toast.error("User detailed failed to update.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
        <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your password regularly for better security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
            value={passwordData.currentPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
            id="currentPassword"
            type="password" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
            value={passwordData.newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            id="newPassword"
            type="password" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
            value={passwordData.confirmPassowrd}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordData(prev => ({ ...prev, confirmPassowrd: e.target.value }))}
            id="confirmPassword"
            type="password" />
        </div>
        </CardContent>
        <CardFooter>
        <Button onClick={handlePasswordUpdate} className="ml-auto">
            {isLoading ? "Updating" :"Update Password"}
        </Button>
        </CardFooter>
    </Card>
  )
}
