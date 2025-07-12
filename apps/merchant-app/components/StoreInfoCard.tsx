"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { addStoreInfo } from "@/actions/addStoreInfo";
import { StoreCategory, StoreData } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { getStoreInfo } from "@/actions/getStoreInfo";

export const StoreInfoCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storeData, setStoreData] = useState<StoreData>({
    name: "",
    description: "",
    category: StoreCategory.RETAIL,
  });
  const [storeInfo, setStoreInfo] = useState<StoreData | null>(null);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { success } = await addStoreInfo(storeData);

      if (success) {
        toast({
          description: "Store information saved.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "Internal server error!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getStoreInfo()
      .then(({ success, data }) => {
        console.log(data);
        if (success && data) {
          setStoreInfo(data);
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          description: "Internal server error!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Information</CardTitle>
        <CardDescription>Update your store details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            id={"storeName"}
            placeholder={storeInfo?.name || ""}
            value={storeData.name}
            onChange={(e) =>
              setStoreData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="storeDescription">Store Description</Label>
          <Textarea
            id={"storeDescription"}
            value={storeData.description}
            onChange={(e) =>
              setStoreData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder={
              storeInfo?.description ||
              "A cozy cafe serving freshly brewed coffee and homemade pastries."
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Store Category</Label>
          <Select
            onValueChange={(value) => {
              setStoreData((prev) => ({
                ...prev,
                category: value as StoreCategory,
              }));
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={storeInfo?.category || "Select category"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={StoreCategory.FOOD}>
                Food & Beverages
              </SelectItem>
              <SelectItem value={StoreCategory.RETAIL}>Retail</SelectItem>
              <SelectItem value={StoreCategory.SERVICES}>Services</SelectItem>
              <SelectItem value={StoreCategory.GROCERY}>Grocery</SelectItem>
              <SelectItem value={StoreCategory.ELECTRONICS}>
                Electronics
              </SelectItem>
              <SelectItem value={StoreCategory.OTHER}>Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isLoading} className="ml-auto">
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
};
