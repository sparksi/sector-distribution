window.addEventListener('load', () => {
  document.querySelectorAll('.node[class*=teaser] a img').forEach(img => img.setAttribute('alt', ''));
});
