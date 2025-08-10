const fs = require('fs');
const path = require('path');
let sharp;

(async () => {
  try {
    // Lazy-require sharp to provide a clearer error if it's missing
    try {
      sharp = require('sharp');
    } catch (e) {
      console.error('Sharp is not installed. Please run: npm i -D sharp');
      process.exit(1);
    }

    const candidatePaths = [
      path.resolve(__dirname, '..', 'images', 'icons', 'favicon.svg'),
      path.resolve(__dirname, '..', 'images', 'favicon.svg'),
    ];

    const sourceSvgPath = candidatePaths.find((p) => fs.existsSync(p));
    if (!sourceSvgPath) {
      console.error('Could not find source favicon SVG at images/icons/favicon.svg or images/favicon.svg');
      process.exit(1);
    }

    const outputPngPath = path.resolve(__dirname, '..', 'images', 'apple-touch-icon.png');

    await sharp(sourceSvgPath)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outputPngPath);

    console.log(`Apple touch icon generated: ${outputPngPath}`);
  } catch (err) {
    console.error('Failed to generate apple touch icon:', err);
    process.exit(1);
  }
})();