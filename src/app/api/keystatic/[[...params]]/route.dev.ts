// Keystatic's local-mode editor talks to this route to read and write files on
// disk. It exists in `next dev` only: `.dev.ts` is added to pageExtensions in
// development, so a production build never sees this file. That matters because
// the real deploy is a static export, which cannot serve a dynamic route.
//
// Without this, opening any entry in the local editor hangs on a spinner while
// Keystatic fetches JSON and receives a 404 HTML page instead.
import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

export const { POST, GET } = makeRouteHandler({ config });
