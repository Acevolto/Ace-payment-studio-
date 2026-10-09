
export interface StripeWebhookEnv {
  STRIPE_WEBHOOK_SECRET?: string;
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let difference = 0;

  for (let i = 0; i < a.length; i++) {
    difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return difference === 0;
}

async function createSignature(
  secret: string,
  message: string,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string,
): Promise<boolean> {
  const parts = signatureHeader.split(",");
  const timestampPart = parts.find((part) =>
    part.startsWith("t="),
  );
  const signatures = parts
    .filter((part) => part.startsWith("v1="))
    .map((part) => part.slice(3));

  if (!timestampPart || signatures.length === 0) {
    return false;
  }

  const timestamp = Number(timestampPart.slice(2));

  if (!Number.isFinite(timestamp)) return false;

  // Reject signatures older than five minutes.
  if (Math.abs(Date.now() / 1000 - timestamp) > 300) {
    return false;
  }

  const expected = await createSignature(
    secret,
    `${timestamp}.${rawBody}`,
  );

  return signatures.some((signature) =>
    constantTimeEqual(signature, expected),
  );
}

export async function verifyStripeRequest(
  request: Request,
  env: StripeWebhookEnv,
): Promise<boolean> {
  const secret = env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secret || !signature) return false;

  // Read the original request body exactly once.
  const rawBody = await request.text();

  return verifyStripeSignature(rawBody, signature, secret);
}
