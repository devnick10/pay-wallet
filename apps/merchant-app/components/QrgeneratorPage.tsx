"use client"

import { useRef, useState } from "react"
import { Download, QrCode, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import QRCode from "react-qr-code"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

export default function GenerateQRPage() {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [qrValue, setQrValue] = useState("")
  const upiId = "paywallet.upi@id" //Temprory hardcode
  const qrComponent = useRef(null)

  const handleGenerateQR = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive"
      })
      return
    }

    // Generate UPI payment link
    const paymentUrl = generateUpiPaymentLink(upiId, amount, description)
    setQrValue(paymentUrl)
  }

  const generateUpiPaymentLink = (upiId: string, amount: string, note: string = "") => {
    // Format according to UPI standards
    const params = new URLSearchParams()
    params.set("pa", upiId)
    params.set("pn", "paywallet") // Payee name
    params.set("am", amount)
    params.set("cu", "INR")
    if (note) params.set("tn", note)

    return `upi://pay?${params.toString()}`
  }

  const handleDownloadQR = () => {
    if (!qrValue) return
    // @ts-expect-error temprory 
    const svg = qrComponent as SVGSVGElement
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `payment-qr-${amount}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
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
                {qrValue ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="rounded-lg border-2 p-4">
                      <QRCode
                        ref={qrComponent}
                        id="qr-code"
                        value={qrValue}
                        size={256}
                        level="H" // Error correction level
                        fgColor="#000000"
                        bgColor="#ffffff"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Amount: ₹{amount}</p>
                      {description && <p className="text-sm text-muted-foreground">For: {description}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed">
                    <p className="text-center text-muted-foreground">
                      Enter an amount to generate QR code
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleDownloadQR}
                  disabled={!qrValue}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  disabled={!qrValue}
                  onClick={() => navigator.share({
                    title: `Pay ₹${amount}`,
                    text: description || `Payment request for ₹${amount}`,
                    url: qrValue
                  }).catch(() => {
                    // Fallback if Web Share API not supported
                    navigator.clipboard.writeText(qrValue)
                    toast({ description: "Payment link copied to clipboard" })
                  })}
                >
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
