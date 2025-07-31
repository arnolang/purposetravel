// SEO Schema Generator for SportStudyAbroad.com
// Generates JSON-LD structured data for Organization and BreadcrumbList

// Organization Schema
const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sport Study Abroad",
    "url": "https://www.sportstudyabroad.com",
    "logo": "https://www.sportstudyabroad.com/images/logo.svg",
    "description": "Custom faculty-led study abroad programs for sport management and related academic courses.",
    "sameAs": [
      "https://www.linkedin.com/company/sport-study-abroad",
      "https://www.instagram.com/sportstudyabroad",
      "https://www.facebook.com/sportstudyabroad"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://www.sportstudyabroad.com/contact.html"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };
};

// BreadcrumbList Schema Generator
const generateBreadcrumbSchema = (breadcrumbs) => {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": []
  };

  breadcrumbs.forEach((crumb, index) => {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    });
  });

  return breadcrumbList;
};

// Generate breadcrumbs based on current page
const getBreadcrumbsForPage = (currentPage) => {
  const baseUrl = "https://www.sportstudyabroad.com";
  
  const breadcrumbMap = {
    'index.html': [
      { name: "Home", url: baseUrl + "/index.html" }
    ],
    'program-models.html': [
      { name: "Home", url: baseUrl + "/index.html" },
      { name: "Program Models", url: baseUrl + "/program-models.html" }
    ],
    'about.html': [
      { name: "Home", url: baseUrl + "/index.html" },
      { name: "About", url: baseUrl + "/about.html" }
    ],
    'faq.html': [
      { name: "Home", url: baseUrl + "/index.html" },
      { name: "FAQ", url: baseUrl + "/faq.html" }
    ],
    'contact.html': [
      { name: "Home", url: baseUrl + "/index.html" },
      { name: "Contact", url: baseUrl + "/contact.html" }
    ],
    'belmont-2026-offer.html': [
      { name: "Home", url: baseUrl + "/index.html" },
      { name: "Belmont 2026 Offer", url: baseUrl + "/belmont-2026-offer.html" }
    ],
    'guilford-may-2026-offer.html': [
      { name: "Home", url: baseUrl + "/index.html" },
      { name: "Guilford May 2026 Offer", url: baseUrl + "/guilford-may-2026-offer.html" }
    ],
    'privacy.html': [
      { name: "Home", url: baseUrl + "/index.html" },
      { name: "Privacy Policy", url: baseUrl + "/privacy.html" }
    ],
    'terms.html': [
      { name: "Home", url: baseUrl + "/index.html" },
      { name: "Terms of Use", url: baseUrl + "/terms.html" }
    ]
  };

  return breadcrumbMap[currentPage] || breadcrumbMap['index.html'];
};

// Generate HTML script tags for structured data
const generateStructuredDataHTML = (currentPage) => {
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbs = getBreadcrumbsForPage(currentPage);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return `
<script type="application/ld+json">
${JSON.stringify(organizationSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script>`;
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateOrganizationSchema,
    generateBreadcrumbSchema,
    getBreadcrumbsForPage,
    generateStructuredDataHTML
  };
} 