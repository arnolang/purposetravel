# Purpose Travel Website

A static website for Purpose Travel, featuring information about programs and outcomes.

## Project Structure

```
.
├── index.html                    # Home page
├── programs_outcomes_page.html   # Programs and Outcomes page
├── css/
│   └── style.css                # Main stylesheet
└── README.md                     # This file
```

## Getting Started

1. Clone this repository
2. Open `index.html` in your web browser to view the website
3. Edit the HTML files to add your content
4. Modify `css/style.css` to customize the styling

## Features

- Responsive design
- Clean and modern layout
- Easy to customize
- Mobile-friendly navigation

## Browser Support

The website is compatible with modern browsers including:
- Chrome
- Firefox
- Safari
- Edge 

## Perf & A11y Changelog (feat/perf-a11y)

| Change | Reason | Rollback |
|--------|--------|----------|
| Convert hero image to 199 kB .webp + `<picture>` markup | Reduce LCP < 2.5 s, CLS 0 | Revert `images/hero-sport-study.webp`, undo `<picture>` edits in `index.html` + `program-models.html`, restore CSS background |
| Preload hero image + Google Fonts | Prioritise critical resources | Remove `<link rel="preload">` lines in page `<head>` |
| PostCSS purge + cssnano → `css/style.min.css` | Shrink CSS payload, eliminate unused rules | Use original `css/style.css` reference, skip `build:css` |
| Zod schema validation + aria-live errors | Inline validation, accessibility | Delete `js/form-validation.js`, restore removed inline scripts |
| Vitest unit tests | CI confidence | Remove `tests/form-validation.test.js`, optionally disable `npm test` |
| Contrast fixes (#999/#aaa → #666) | WCAG-AA 4.5:1 text contrast | Revert color changes in `css/style.css` |
| autoAlt utility | Provide descriptive alt text, SEO | Remove `js/auto-alt.js` and script tags |

### How to rollback everything
1. Checkout previous production commit (e.g. `git checkout main && git revert -m 1 <merge-commit>`).  
2. Deploy preview → validate.  
3. Delete branch `feat/perf-a11y` if not needed. 