import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const basePath = "/ctk-website";
const outputDirectory = resolve("out");
const port = Number.parseInt(process.env.PORT || "4173", 10);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

function sendFile(response, filePath, statusCode = 200) {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type":
      contentTypes[extname(filePath)] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}

function sendNotFound(response) {
  sendFile(response, join(outputDirectory, "404.html"), 404);
}

createServer((request, response) => {
  const requestUrl = new URL(request.url || "/", `http://127.0.0.1:${port}`);
  if (
    requestUrl.pathname !== basePath &&
    !requestUrl.pathname.startsWith(`${basePath}/`)
  ) {
    sendNotFound(response);
    return;
  }

  const relativePath = decodeURIComponent(
    requestUrl.pathname.slice(basePath.length)
  ).replace(/^\/+/, "");
  let filePath = resolve(outputDirectory, relativePath);
  if (!filePath.startsWith(outputDirectory)) {
    sendNotFound(response);
    return;
  }

  try {
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      if (!requestUrl.pathname.endsWith("/")) {
        response.writeHead(301, {
          Location: `${requestUrl.pathname}/${requestUrl.search}`,
        });
        response.end();
        return;
      }
      filePath = join(filePath, "index.html");
    }
    if (statSync(filePath).isFile()) {
      sendFile(response, filePath);
      return;
    }
  } catch {
    // Fall through to the exported 404 page, matching GitHub Pages.
  }

  sendNotFound(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`GitHub Pages preview: http://127.0.0.1:${port}${basePath}/`);
});
