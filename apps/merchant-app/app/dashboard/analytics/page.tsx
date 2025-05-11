import { BarChart, Calendar, Download, LineChart, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your business performance and customer insights.</p>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Tabs defaultValue="daily" className="w-full">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Date Range</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Daily revenue for the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] w-full rounded-lg border-2 border-dashed p-6">
              <div className="flex h-full w-full items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transaction Breakdown</CardTitle>
            <CardDescription>By payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] w-full rounded-lg border-2 border-dashed p-6">
              <div className="flex h-full w-full items-center justify-center">
                <PieChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours</CardTitle>
            <CardDescription>Transactions by time of day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] w-full rounded-lg border-2 border-dashed p-6">
              <div className="flex h-full w-full items-center justify-center">
                <BarChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>Most sold items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] w-full rounded-lg border-2 border-dashed p-6">
              <div className="flex h-full w-full items-center justify-center">
                <BarChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
            <CardDescription>New vs. returning customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] w-full rounded-lg border-2 border-dashed p-6">
              <div className="flex h-full w-full items-center justify-center">
                <PieChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>Compare your performance across different periods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Select defaultValue="thisMonth">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="thisQuarter">This Quarter</SelectItem>
                    <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                    <SelectItem value="lastYear">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <span>vs</span>
                <Select defaultValue="lastMonth">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="thisQuarter">This Quarter</SelectItem>
                    <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                    <SelectItem value="lastYear">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="aspect-[21/9] w-full rounded-lg border-2 border-dashed p-6">
              <div className="flex h-full w-full items-center justify-center">
                <BarChart className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
