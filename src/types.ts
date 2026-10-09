
export type PaymentStatus =
  | "paid"
  | "pending"
  | "paid"
  | "failed";

export interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  customerEmail?: string;
  createdAt: string;
  provider?: string;
  providerTransactionId?: string;
}

export interface Receipt {
  receiptNumber: string;
  payment: PaymentRecord;
  businessName: string;
  demoOnly: boolean;
}

export interface EmailResult {
  success: boolean;
  message: string;
}
