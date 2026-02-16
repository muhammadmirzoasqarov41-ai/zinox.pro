# Mahorat.uz — static site

This repository contains the static site for Mahorat.uz and a small serverless endpoint to forward messages to Telegram safely.

## Setup (local)

1. Create a `.env.local` file in the project root (this file is in `.gitignore`):

```
TG_BOT_TOKEN=8052322271:AAFRBZyNOBzOxplqHVlwQh-XBv96S3FI85o
TG_CHAT_ID=8232268725
ABLY_KEY=bK9tvw._i5fyQ:LiEqd8rDivgul9V4rWyoAsVTkrU2nLKwp0Nj5pG91D0
```

2. For local testing of the serverless function, you can use `vercel dev` or run a small dev server that proxies `/api/*` to Node.

## Deploy to Vercel (recommended)

1. Push this repository to GitHub.
2. In your Vercel project settings, add Environment Variables:
   - `TG_BOT_TOKEN` — your Telegram bot token
   - `TG_CHAT_ID` — the chat id to send messages to
   - `ABLY_KEY` — (optional) Ably key

3. Deploy. The client code will call `/api/send-tg` which will forward messages to Telegram.

## Security

- Do NOT commit any tokens to the repository. Use environment variables in Vercel.
- `.env.local` is ignored by `.gitignore`.
