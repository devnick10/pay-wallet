"use client"

import { useState } from "react"
import { Save, Store, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function StoreSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Store settings saved successfully!")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
        <p className="text-muted-foreground">Manage your store profile and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>Update your store details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="Cafe Sunshine" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeDescription">Store Description</Label>
              <Textarea
                id="storeDescription"
                defaultValue="A cozy cafe serving freshly brewed coffee and homemade pastries."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeCategory">Store Category</Label>
              <Select defaultValue="food">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food & Beverages</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="grocery">Grocery</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeWebsite">Website (Optional)</Label>
              <Input id="storeWebsite" placeholder="https://www.example.com" />
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
            <CardTitle>Store Branding</CardTitle>
            <CardDescription>Customize your store appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Store Logo</Label>
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed">
                  <Store className="h-16 w-16 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input id="primaryColor" defaultValue="#0070f3" />
                <div
                  className="h-10 w-10 rounded-md border"
                  style={{ backgroundColor: "#0070f3" }}
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accentColor">Accent Color</Label>
              <div className="flex gap-2">
                <Input id="accentColor" defaultValue="#10b981" />
                <div
                  className="h-10 w-10 rounded-md border"
                  style={{ backgroundColor: "#10b981" }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Store Address</CardTitle>
            <CardDescription>Update your physical store location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Textarea id="address" defaultValue="123 Main Street, Shop #4" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="Mumbai" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" defaultValue="Maharashtra" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input id="pincode" defaultValue="400001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="india">
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
              {isLoading ? (
                <>
                  <Save className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
