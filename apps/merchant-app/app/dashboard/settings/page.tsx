"use client"

import { useState } from "react"
import { Bell, CreditCard, Key, Lock, Save, Shield, User, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MerchantSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Settings saved successfully!")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your merchant account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Ananya Desai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="ananya@cafesunshine.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="9876543210" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update your business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="Cafe Sunshine" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input id="businessEmail" type="email" defaultValue="info@cafesunshine.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Business Phone</Label>
                  <Input id="businessPhone" defaultValue="022-12345678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gst">GST Number</Label>
                  <Input id="gst" defaultValue="27AADCB2230M1ZT" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password regularly for better security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Authentication</Label>
                    <p className="text-sm text-muted-foreground">Receive a code via SMS when signing in</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Authentication</Label>
                    <p className="text-sm text-muted-foreground">Receive a code via email when signing in</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Authenticator App</Label>
                    <p className="text-sm text-muted-foreground">Use an authenticator app to generate codes</p>
                  </div>
                  <Switch />
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Key className="mr-2 h-4 w-4" />
                    Setup Authenticator App
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Transaction PIN</Label>
                    <p className="text-sm text-muted-foreground">Require PIN for all transactions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Suspicious Activity Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about suspicious account activity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Transaction PIN
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">Transaction Notifications</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Payment Received</Label>
                      <p className="text-sm text-muted-foreground">When you receive a payment</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Switch id="payment-push" defaultChecked />
                        <Label htmlFor="payment-push" className="text-xs">
                          Push
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="payment-email" defaultChecked />
                        <Label htmlFor="payment-email" className="text-xs">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="payment-sms" defaultChecked />
                        <Label htmlFor="payment-sms" className="text-xs">
                          SMS
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Payout Processed</Label>
                      <p className="text-sm text-muted-foreground">When a payout is processed</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Switch id="payout-push" defaultChecked />
                        <Label htmlFor="payout-push" className="text-xs">
                          Push
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="payout-email" defaultChecked />
                        <Label htmlFor="payout-email" className="text-xs">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="payout-sms" defaultChecked />
                        <Label htmlFor="payout-sms" className="text-xs">
                          SMS
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Account Notifications</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">Suspicious activity and security updates</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Switch id="security-push" defaultChecked />
                        <Label htmlFor="security-push" className="text-xs">
                          Push
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="security-email" defaultChecked />
                        <Label htmlFor="security-email" className="text-xs">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="security-sms" defaultChecked />
                        <Label htmlFor="security-sms" className="text-xs">
                          SMS
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Features</Label>
                      <p className="text-sm text-muted-foreground">Updates about new features and offers</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Switch id="features-push" defaultChecked />
                        <Label htmlFor="features-push" className="text-xs">
                          Push
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="features-email" defaultChecked />
                        <Label htmlFor="features-email" className="text-xs">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="features-sms" />
                        <Label htmlFor="features-sms" className="text-xs">
                          SMS
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Bank Account</CardTitle>
                <CardDescription>Manage your payout bank account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">HDFC Bank</p>
                        <p className="text-sm text-muted-foreground">Account ending in 4321</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input id="accountName" defaultValue="Ananya Desai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" defaultValue="XXXX XXXX XXXX 4321" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input id="ifsc" defaultValue="HDFC0001234" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payout Schedule</CardTitle>
                <CardDescription>Manage when you receive your payouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Daily Payouts</Label>
                    <p className="text-sm text-muted-foreground">Receive payouts every day</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Payouts</Label>
                    <p className="text-sm text-muted-foreground">Receive payouts every week</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Monthly Payouts</Label>
                    <p className="text-sm text-muted-foreground">Receive payouts every month</p>
                  </div>
                  <Switch />
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Wallet className="mr-2 h-4 w-4" />
                    Request Instant Payout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Save className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
