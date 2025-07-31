#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Base URL for the site
const BASE_URL = 'https://www.sportstudyabroad.com';

// Pages to include in sitemap with their priorities
const PAGES = [
  { file: 'index.html', priority: '1.0', changefreq: 'weekly' },
  { file: 'program-models.html', priority: '0.9', changefreq: 'monthly' },
  { file: 'about.html', priority: '0.8', changefreq: 'monthly' },
  { file: 'faq.html', priority: '0.7', changefreq: 'monthly' },
  { file: 'contact.html', priority: '0.8', changefreq: 'monthly' },
  { file: 'privacy.html', priority: '0.3', changefreq: 'yearly' },
  { file: 'terms.html', priority: '0.3', changefreq: 'yearly' }
];

// Get current date in ISO format
const getCurrentDate = () => {
  return new Date().toISOString();
};

// Generate sitemap XML
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  PAGES.forEach(page => {
    const filePath = path.join(__dirname, page.file);
    
    // Check if file exists
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const lastmod = stats.mtime.toISOString();
      
      sitemap += `  <url>
    <loc>${BASE_URL}/${page.file}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    }
  });

  sitemap += '</urlset>';

  return sitemap;
};

// Write sitemap to file
const writeSitemap = () => {
  try {
    const sitemap = generateSitemap();
    const outputPath = path.join(__dirname, 'sitemap.xml');
    
    fs.writeFileSync(outputPath, sitemap, 'utf8');
    console.log('✅ Sitemap generated successfully at:', outputPath);
    console.log('📊 Sitemap contains', PAGES.length, 'pages');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

// Run the script
writeSitemap(); 