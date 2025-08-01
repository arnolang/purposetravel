#!/usr/bin/env node

// seo-build.js
// This build script performs two SEO tasks:
// 1. Injects inline JSON-LD (Organization + BreadcrumbList) into every HTML file before </head>.
// 2. Generates sitemap.xml covering all HTML documents in the repository.

const fs = require("fs").promises;
const path = require("path");

const SITE_URL = "https://www.sportstudyabroad.com";

async function walk(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? walk(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

function toTitleCase(str) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function buildBreadcrumb(urlPath, loc) {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
  ];

  if (urlPath !== "/") {
    breadcrumbs.push({
      "@type": "ListItem",
      position: 2,
      name: toTitleCase(urlPath.replace(/^\//, "")),
      item: loc,
    });
  }
  return breadcrumbs;
}

async function processHtmlFiles(rootDir) {
  const files = (await walk(rootDir)).filter((f) => f.endsWith(".html"));
  const urlEntries = [];

  for (const filePath of files) {
    const relPath = path.relative(rootDir, filePath).replace(/\\/g, "/");

    // Derive URL path
    let urlPath;
    if (relPath === "index.html") {
      urlPath = "/";
    } else {
      urlPath = `/${relPath.replace(/index\.html$/, "").replace(/\.html$/, "")}`;
    }

    const loc = `${SITE_URL}${urlPath}`;

    // Collect data for sitemap
    const stats = await fs.stat(filePath);
    urlEntries.push({
      loc,
      lastmod: stats.mtime.toISOString(),
      priority: urlPath === "/" ? "1.0" : "0.8",
    });

    // Read HTML content
    let html = await fs.readFile(filePath, "utf8");

    // Skip if JSON-LD already injected
    if (html.includes("\"@type\":\"Organization\"") && html.includes("\"@type\":\"BreadcrumbList\"")) {
      continue;
    }

    // Build JSON-LD schema object
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Sport Study Abroad",
          url: SITE_URL,
          logo: `${SITE_URL}/images/icons/favicon.svg`,
          sameAs: [
            "https://www.linkedin.com/company/sportstudyabroad",
            "https://www.instagram.com/sportstudyabroad",
          ],
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: buildBreadcrumb(urlPath, loc),
        },
      ],
    };

    const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(
      schema
    )}</script>`;

    // Inject before closing </head>
    if (html.includes("</head>")) {
      html = html.replace("</head>", `  ${jsonLdTag}\n</head>`);
      await fs.writeFile(filePath, html, "utf8");
    } else {
      console.warn(`Skipping JSON-LD injection for ${filePath}: </head> tag not found.`);
    }
  }

  return urlEntries;
}

function generateSitemapXml(urlEntries) {
  const urlsXml = urlEntries
    .map(({ loc, lastmod, priority }) => {
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>\n`;
}

async function writeSitemap(rootDir, urlEntries) {
  const sitemapXml = generateSitemapXml(urlEntries);
  await fs.writeFile(path.join(rootDir, "sitemap.xml"), sitemapXml, "utf8");
}

(async function main() {
  try {
    const rootDir = process.cwd();
    const urlEntries = await processHtmlFiles(rootDir);
    await writeSitemap(rootDir, urlEntries);
    console.log(`✅ SEO build complete. Processed ${urlEntries.length} pages.`);
  } catch (err) {
    console.error("SEO build failed:", err);
    process.exit(1);
  }
})();