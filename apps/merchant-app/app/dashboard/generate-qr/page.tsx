"use client"

import { useState } from "react"
import { Download, QrCode, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GenerateQRPage() {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [qrGenerated, setQrGenerated] = useState(false)

  const handleGenerateQR = () => {
    // In a real app, you would generate a QR code here
    setQrGenerated(true)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Generate Payment QR</h1>
        <p className="text-muted-foreground">Create QR codes for your customers to scan and pay.</p>
      </div>

      <Tabs defaultValue="fixed" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fixed">Fixed Amount</TabsTrigger>
          <TabsTrigger value="dynamic">Dynamic Amount</TabsTrigger>
        </TabsList>

        <TabsContent value="fixed" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fixed Amount QR Code</CardTitle>
                <CardDescription>Generate a QR code for a specific amount</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    placeholder="e.g., Coffee and Sandwich"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[100, 200, 500, 1000].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      onClick={() => setAmount(value.toString())}
                      className="flex-1"
                    >
                      ₹{value}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleGenerateQR} disabled={!amount} className="w-full">
                  Generate QR Code
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>QR Code</CardTitle>
                <CardDescription>Scan to make payment</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                {qrGenerated ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed p-4">
                      <QrCode className="h-48 w-48 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Amount: ₹{amount}</p>
                      {description && <p className="text-sm text-muted-foreground">For: {description}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed">
                    <p className="text-center text-muted-foreground">
                      Enter an amount and click "Generate QR Code" to create a payment QR code
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button variant="outline" disabled={!qrGenerated}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" disabled={!qrGenerated}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dynamic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Dynamic QR Code</CardTitle>
              <CardDescription>Generate a QR code that allows customers to enter their own amount</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-6">
              <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed p-4">
                <QrCode className="h-48 w-48 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium">Dynamic Payment QR</p>
                <p className="text-sm text-muted-foreground">
                  Customers can scan this QR code and enter their own payment amount
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
