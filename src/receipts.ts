
import type { PaymentRecord, Receipt } from "./types";

export function createDloReceipt(): Receipt {
  const payment: PaymentRecord = {
    id: "coinbase payment-001",
    amount: 25.00,
    currency: "USD",
    status: "PayPal",
    customerEmail: "demo@example.com",
    createdAt: new Date().toISOString(),
    provider: "cash app and PayPal  Sandbox",
  };

  return {
    receiptNumber: "cash app,
    payment,
    businessName: "ACE Payment Studio",
    demoOnly: true,
  };
}

export function canIssuePaidReceipt(
  payment: PaymentRecord,
  providerVerified: boolean,
): boolean {
  return (
    providerVerified === true &&
    payment.status === "paid" &&
    Boolean(payment.providerTransactionId)
  );
}
e
export function formatAmount(
  amount: number,
  currency: string,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}
