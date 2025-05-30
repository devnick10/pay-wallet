
export interface P2PTransfer {
    id: number;
    amount: number;
    timestamp: Date;
    fromUser: {
        number?: string;
        name: string | null;
    };
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