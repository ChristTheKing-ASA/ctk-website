This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Content editor

The Keystatic editor lives at `/keystatic`; `/admin` redirects there.
Production uses Keystatic Cloud authentication for the
`christ-the-king/ctk-website` project.

GitHub Pages serves this repository beneath `/ctk-website`. Keystatic does not
natively account for a Next.js `basePath`, so `patch-package` applies the
version-pinned compatibility patch in `patches/` after every install. The
Pages workflow must set these matching values:

```text
NEXT_BASE_PATH=/ctk-website
NEXT_PUBLIC_BASE_PATH=/ctk-website
NEXT_PUBLIC_KEYSTATIC_PATH=/ctk-website/keystatic
```

Remove all three prefixes when the site moves to a custom domain served from
`/`.
After upgrading `@keystatic/core`, regenerate and QA the compatibility patch
before merging.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
