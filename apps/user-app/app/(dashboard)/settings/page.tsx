"use client"

import { updatePassword } from "@/actions/updatePassword"
import { updateUser } from "@/actions/updateUser"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"

export default function SettingsPage() {
  const session = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({ name:"", email: "" })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassowrd: ""
  })

  const handleUserUpdate = async () => {
    setIsLoading(true)
    try {
      const { message, success } = await updateUser(user)
      if (success) toast.success(message)
      setUser({ name: "", email: "" })
    } catch (error) {
      console.error(error)
      toast.error("User detailed failed to update.")
    } finally {
      setIsLoading(false)
    }
  }
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
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                value={user.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUser(prev => ({ ...prev, name: e.target.value }))}
                id="fullName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                value={user.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUser(prev => ({ ...prev, email: e.target.value }))}
                id="email"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={session.data?.user.email} disabled />
              <p className="text-xs text-muted-foreground">Phone number cannot be changed</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUserUpdate} disabled={isLoading} className="ml-auto">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
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
              {"Update Password"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
