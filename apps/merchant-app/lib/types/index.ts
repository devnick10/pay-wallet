

export interface P2PTransfer {
    id: number;
    amount: number;
    timestamp: Date;
    fromUser: {
        number?: string;
        name: string | null;
    };
}

type OnRampStatus = "Success" | "Failure" | "Processing"

export interface Payouts {
    id: number;
    status: OnRampStatus;
    token: string;
    provider: string;
    amount: number;
    startTime: Date;
    merchantId: number | null;
}

export interface UpdateMerchantData {
    name?: string;
    email?: string;
    number?: string;
}

export enum StoreCategory {
  FOOD = "Food",
  RETAIL = "Retail",
  SERVICES = "Services",
  GROCERY = "Grocery",
  ELECTRONICS = "Electronics",
  OTHER = "Other"
}

export interface StoreData {
  name: string;
  description: string;
  category: StoreCategory;
}


export interface RevenueData {
  data: { timestamp: string; amount: number }[]
  success: boolean
}