# Ace-payment-studio-
ACE Payment Studio

ACE Payment Studio is a TypeScript and Cloudflare Workers starter for
payment workflow development.

Current features

* Dashboard with backend health check
* Sandbox configuration
* Clearly labeled demo receipt preview
* Print support for the demo receipt
* Cloudflare static asset hosting

Requirements

* Node.js and npm
* A Cloudflare account for deployment

Run locally

Install dependencies:

npm install

Check TypeScript:

npm run check

Start the local development server:

npm run dev

Deploy

Authenticate with Cloudflare:

npx wrangler login

Deploy the Worker:

npm run deploy

Use the URL printed by Wrangler to open the app.

API routes

* GET /api/health
* GET /api/demo-receipt

The demo receipt is not proof of payment. No funds move and no
transaction is verified by this starter.

Production work still required

Before handling actual payments, implement a supported payment
provider integration, server-side transaction creation, signed
webhook verification, authentication, database persistence,
authorization, rate limiting, and audit logging.

Never commit real API credentials. Store production secrets in
Cloudflare Worker secrets.

References

* Stripe API and test mode:
    https://docs.stripe.com/testing
* Stripe API documentation:
    https://docs.stripe.com/api
