const imagemin = require('imagemin').default;
const imageminWebp = require('imagemin-webp').default;

(async () => {
  try {
    const files = await imagemin(['images/hero-sport-study.jpg'], {
      destination: 'images',
      plugins: [imageminWebp({ quality: 30 })],
    });
    const outputFile = files[0];
    console.log(`Optimized image saved: ${outputFile.destinationPath}`);
  } catch (err) {
    console.error('Image optimization failed:', err);
    process.exit(1);
  }
})();