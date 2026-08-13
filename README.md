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

The Keystatic editor lives at `/keystatic`.

There is deliberately no `/admin` route. It used to exist and call `redirect()`,
which a static export cannot emit, so it built to an error shell that returned
the not-found page with a 200 status. Removed rather than reinstated: it was an
alias nothing linked to, and not advertising an editor path is one less thing to
probe.
Production uses Keystatic Cloud authentication for the
`christ-the-king/ctk-website` project.

Locally, `npm run dev` serves the editor against the filesystem. That needs a
live API route, which a static export cannot provide, so `next.config.ts` skips
`output: export` in development and adds `.dev.ts` to `pageExtensions`. The
handler at `src/app/api/keystatic/[[...params]]/route.dev.ts` is therefore
recognised only by `next dev` and never reaches a production build.

Verify the export path with `npm run build && npm run test:pages`, which is what
CI runs. Without the dev route, opening any entry in the local editor hangs on a
spinner while Keystatic fetches JSON and gets a 404 page back.

Note that saving an entry renames its image to match the field key, so
`heroImage` pointing at `greeters.jpg` becomes `heroImage.jpg` on first save.
Keystatic rewrites the file and the JSON together, so this stays consistent;
just don't reference those files from anywhere else by name.

## Restoring content

Everything the parish edits is in git, because Keystatic Cloud commits every
save. So a bad edit is recoverable the same way any commit is.

Known-good point: the `snapshot-2026-08-13` tag.

Put the content back without touching code:

    git checkout snapshot-2026-08-13 -- src/content public/images
    git commit -m "Restore content to the 13 August snapshot"

Undo one bad save instead of everything:

    git log --oneline -- src/content        # find it
    git revert <commit>

`npm run snapshot` copies `src/content` and `public/images` to a dated folder in
`~/Documents/PROJECTS/~backups/ctk-website/`, outside the repo. Git is the better
restore path and should be tried first; the copy is for the case where the repo
itself is lost or its history is no longer trustworthy.

## Where it deploys

Production is Cloudflare, serving `ctkasa.com` from the domain root with no
`basePath`.

GitHub Pages is the staging copy at
`https://christtheking-asa.github.io/ctk-website/`, built from the `staging`
branch by `.github/workflows/staging.yml`. Merge to `staging` to show the parish
something before it is real; merge to `main` to ship it. Staging builds with
`NEXT_PUBLIC_NOINDEX=1` so the duplicate copy stays out of search results.

GitHub Pages serves this repository beneath `/ctk-website`. Keystatic does not
natively account for a Next.js `basePath`, so `patch-package` applies the
version-pinned compatibility patch in `patches/` after every install. The
staging workflow must set these matching values:

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
