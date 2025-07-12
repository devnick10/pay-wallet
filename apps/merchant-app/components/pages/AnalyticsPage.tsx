"use client";

import { getRevenueData } from "@/actions/getRevenueData";
import { RevenueChart } from "@/components/RevenueChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface RevenueItem {
  timestamp: string;
  amount: number;
}

export default function Analytics() {
  const [revenueData, setRevenueData] = useState<RevenueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, success } = await getRevenueData();
        if (success) {
          setRevenueData(data);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
        toast({
          description: "Something went wrong!",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track your business performance and customer insights.
        </p>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Daily revenue for the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex w-2xl h-80 justify-center items-center">
                <p>Loading...</p>
              </div>
            ) : (
              <RevenueChart data={revenueData} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
