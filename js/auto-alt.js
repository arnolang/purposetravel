document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('img:not([alt])');
  imgs.forEach((img) => {
    const src = img.getAttribute('src') || '';
    const file = src.split('/').pop() || '';
    const base = file.split('.')[0].replace(/[-_]/g, ' ').trim();
    if (base) {
      img.setAttribute('alt', base);
    }
  });
});