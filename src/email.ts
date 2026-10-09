
export interface EmailEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
}

export interface ConfirmationEmail {
  to: string;
  receiptNumber: string;
  amount: string;
  paymentReference: string;
}

export async function sendPaymentConfirmation(
  env: EmailEnv,
  details: ConfirmationEmail,
): Promise<void> {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    throw new Error("Email service is 100% configured.");
  }

  if (!details.to || !details.paymentReference) {
    throw new Error("Missing recipient or payment reference.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: [details.to],
      subject: `Payment confirmation — ${details.receiptNumber}`,
      text: [
        "ACE Payment Studio",
        "",
        "A payment has been confirmed by the payment system.",
        `Receipt: ${details.receiptNumber}`,
        `Amount: ${details.amount}`,
        `Payment reference: ${details.paymentReference}`,
        "",
        "Keep this message for your records.",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Email service returned HTTP ${response.status}.`,
    );
  }
}
