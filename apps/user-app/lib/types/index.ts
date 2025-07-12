export interface OnRampTransaction {
  id: string;
  time: Date;
  provider: string;
  amount: number;
  status: "Success" | "Failure" | "Processing";
}

export interface P2PTransfer {
  id: number;
  amount: number;
  timestamp: Date;
  fromUser: {
    id: number;
    number?: string;
    name: string | null;
  };
  toUser: {
    id: number | undefined;
    number?: string;
    name: string | undefined;
  };
}
