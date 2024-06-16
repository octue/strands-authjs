# Next-AllAuth

This is an example project showing how to use allauth in headless mode with next.js.

**WARNING** This is a work in progress and remains totally unoptimised for SSR.

## Getting Started

First, checkout and run the backend so you have a server at http://localhost:8000.

Next, add the following line to your `.env.local` file:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
