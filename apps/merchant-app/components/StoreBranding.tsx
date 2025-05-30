'use client'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Store, Upload } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
export const StoreBranding = () => {

    const [isLoading, setIsLoading] = useState(false)

    const handleSave = () => {
        setIsLoading(true)
        //TEMP: Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            alert("Store settings saved successfully!")
        }, 1000)
    }


    return (
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
            </CardContent>
            <CardFooter>
                <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </CardFooter>
        </Card>
    )
}
