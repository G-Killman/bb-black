var params = new URLSearchParams(window.location.search);
var folder = params.get('folder');

if (!folder) {
  window.location.href = 'gallery.html';
}

var category = galleryCategories.find(function (c) { return c.folder === folder; });
var displayName = category ? category.name : folder;
var pageUrl = window.location.origin + window.location.pathname + '?folder=' + encodeURIComponent(folder);
var pageTitle = 'Bayou Bytes Gulf Coast — ' + displayName + ' Gallery';
var pageDescription = 'Browse ' + displayName.toLowerCase() + ' images from Bayou Bytes Gulf Coast, a subscription website design service in Biloxi, Mississippi.';

function setMeta(selector, attribute, value) {
  var element = document.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

setMeta('link[rel="canonical"]', 'href', pageUrl);
setMeta('meta[property="og:title"]', 'content', pageTitle);
setMeta('meta[property="og:description"]', 'content', pageDescription);
setMeta('meta[property="og:url"]', 'content', pageUrl);
setMeta('meta[name="twitter:title"]', 'content', pageTitle);
setMeta('meta[name="twitter:description"]', 'content', pageDescription);
setMeta('meta[name="description"]', 'content', pageDescription);
setMeta('meta[property="og:image:alt"]', 'content', displayName + ' gallery');

if (folder === 'pedicure-lookbook-demo-web-design') {
  displayName = 'Pedicure Lookbook';
  document.body.classList.add('pedicure-lookbook-page');
}

if (folder === 'manicure-lookbook-web-design') {
  displayName = 'Manicure Lookbook';
  document.body.classList.add('manicure-lookbook-page');
}

if (folder === 'black-gray tat') {
  displayName = 'Black and Gray Lookbook';
  document.body.classList.add('black-gray-tat-page');
}

if (folder === 'americanoriginal') {
  displayName = 'American Original Lookbook';
  document.body.classList.add('americanoriginal-page');
}

if (folder === 'dogpaintings') {
  displayName = 'Dog Paintings Lookbook';
  document.body.classList.add('dogpaintings-page');
}

document.getElementById('category-title').textContent = displayName;
document.title = pageTitle;

pageTitle = 'Bayou Bytes Gulf Coast — ' + displayName + ' Gallery';
pageDescription = 'Browse ' + displayName.toLowerCase() + ' images from Bayou Bytes Gulf Coast, a subscription website design service in Biloxi, Mississippi.';

setMeta('link[rel="canonical"]', 'href', pageUrl);
setMeta('meta[property="og:title"]', 'content', pageTitle);
setMeta('meta[property="og:description"]', 'content', pageDescription);
setMeta('meta[property="og:url"]', 'content', pageUrl);
setMeta('meta[name="twitter:title"]', 'content', pageTitle);
setMeta('meta[name="twitter:description"]', 'content', pageDescription);
setMeta('meta[name="description"]', 'content', pageDescription);
setMeta('meta[property="og:image:alt"]', 'content', displayName + ' gallery');

var jsonLd = document.querySelector('script[type="application/ld+json"]');
if (jsonLd) {
  jsonLd.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': pageTitle,
    'description': pageDescription,
    'url': pageUrl,
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'Bayou Bytes Gulf Coast',
      'url': 'https://bayoubytes-gc.com/'
    }
  }, null, 2);
}

if (folder === 'pedicure-lookbook-demo-web-design') {
  var heroBrand = document.querySelector('.gallery-hero-brand');
  if (heroBrand) {
    heroBrand.style.display = 'none';
  }
}

if (folder === 'manicure-lookbook-web-design') {
  var manicureHeroBrand = document.querySelector('.gallery-hero-brand');
  if (manicureHeroBrand) {
    manicureHeroBrand.style.display = 'none';
  }
}

if (folder === 'black-gray tat') {
  var blackGrayHeroBrand = document.querySelector('.gallery-hero-brand');
  if (blackGrayHeroBrand) {
    blackGrayHeroBrand.style.display = 'none';
  }
}

if (folder === 'americanoriginal') {
  var americanOriginalHeroBrand = document.querySelector('.gallery-hero-brand');
  if (americanOriginalHeroBrand) {
    americanOriginalHeroBrand.style.display = 'none';
  }
}

if (folder === 'dogpaintings') {
  var dogPaintingsHeroBrand = document.querySelector('.gallery-hero-brand');
  if (dogPaintingsHeroBrand) {
    dogPaintingsHeroBrand.style.display = 'none';
  }
}

var grid = document.getElementById('category-grid');
var items = [];
var currentIndex = 0;

function getImageAltText(num) {
  if (folder === 'manicure-lookbook-web-design') {
    var manicureAltTexts = [
      'Manicure lookbook demo Bayou Bytes Gulf Coast web design Biloxi photo ' + num,
      'Manicure lookbook demo Bayou Bytes Gulf Coast web design Gulfport photo ' + num,
      'Manicure lookbook demo Bayou Bytes Gulf Coast web design Ocean Springs photo ' + num,
      'Manicure lookbook demo Bayou Bytes Gulf Coast web design Mississippi Gulf Coast photo ' + num,
      'Manicure lookbook demo Bayou Bytes Gulf Coast web design photo ' + num,
    ];

    return manicureAltTexts[(num - 1) % manicureAltTexts.length];
  }

  if (folder === 'pedicure-lookbook-demo-web-design') {
    var pedicureAltTexts = [
      'Pedicure lookbook demo Bayou Bytes Gulf Coast web design Biloxi photo ' + num,
      'Pedicure lookbook demo Bayou Bytes Gulf Coast web design Gulfport photo ' + num,
      'Pedicure lookbook demo Bayou Bytes Gulf Coast web design Ocean Springs photo ' + num,
      'Pedicure lookbook demo Bayou Bytes Gulf Coast web design Mississippi Gulf Coast photo ' + num,
      'Pedicure lookbook demo Bayou Bytes Gulf Coast web design photo ' + num,
    ];

    return pedicureAltTexts[(num - 1) % pedicureAltTexts.length];
  }

  if (folder === 'black-gray tat') {
    var tattooAltTexts = [
      'Black and gray tattoo Bayou Bytes Gulf Coast web design photo ' + num,
      'Black and gray tattoo gallery Bayou Bytes Gulf Coast photo ' + num,
      'Tattoo gallery Bayou Bytes Gulf Coast black and gray photo ' + num,
      'Black and gray tattoo Mississippi Gulf Coast photo ' + num,
      'Black and gray tattoo photo ' + num,
    ];

    return tattooAltTexts[(num - 1) % tattooAltTexts.length];
  }

  if (folder === 'americanoriginal') {
    var americanOriginalAltTexts = [
      'American Original tattoo Bayou Bytes Gulf Coast web design photo ' + num,
      'American Original tattoo gallery Bayou Bytes Gulf Coast photo ' + num,
      'Tattoo gallery Bayou Bytes Gulf Coast American Original photo ' + num,
      'American Original tattoo Mississippi Gulf Coast photo ' + num,
      'American Original tattoo photo ' + num,
    ];

    return americanOriginalAltTexts[(num - 1) % americanOriginalAltTexts.length];
  }

  if (folder === 'dogpaintings') {
    var dogPaintingsAltTexts = [
      'Dog paintings Bayou Bytes Gulf Coast web design photo ' + num,
      'Dog painting gallery Bayou Bytes Gulf Coast photo ' + num,
      'Dog portrait gallery Bayou Bytes Gulf Coast photo ' + num,
      'Dog paintings Mississippi Gulf Coast photo ' + num,
      'Dog paintings photo ' + num,
    ];

    return dogPaintingsAltTexts[(num - 1) % dogPaintingsAltTexts.length];
  }

  return displayName + ' photo ' + num;
}

for (var i = 1; i <= 50; i++) {
  (function (num) {
    var src = encodeURI('staging/' + folder + '_processed/' + folder + '-' + num + '.webp');
    var itemIndex = num - 1;

    var item = document.createElement('div');
    item.className = 'category-item';

    var img = document.createElement('img');
    img.src = src;
    img.alt = getImageAltText(num);
    img.className = 'category-thumb-img';

    img.addEventListener('error', function () {
      item.style.display = 'none';
      items[itemIndex].visible = false;
    });

    img.addEventListener('load', function () {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function () {
        openLightbox(itemIndex);
      });
    });

    item.appendChild(img);
    grid.appendChild(item);
    items.push({ src: src, el: item, visible: true });
  }(i));
}

var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');

function visibleItems() {
  return items.filter(function (item) { return item.visible; });
}

function openLightbox(itemIndex) {
  var visible = visibleItems();
  var pos = visible.indexOf(items[itemIndex]);
  currentIndex = pos >= 0 ? pos : 0;
  showImage();
  lightbox.classList.add('lightbox--open');
  document.body.style.overflow = 'hidden';
}

function showImage() {
  var visible = visibleItems();
  if (visible.length === 0) return;
  lightboxImg.src = visible[currentIndex].src;
  lightboxImg.alt = getImageAltText(currentIndex + 1);
}

function closeLightbox() {
  lightbox.classList.remove('lightbox--open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

function prevImage() {
  var visible = visibleItems();
  currentIndex = (currentIndex - 1 + visible.length) % visible.length;
  showImage();
}

function nextImage() {
  var visible = visibleItems();
  currentIndex = (currentIndex + 1) % visible.length;
  showImage();
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

document.getElementById('lightbox-prev').addEventListener('click', function (e) {
  e.stopPropagation();
  prevImage();
});

document.getElementById('lightbox-next').addEventListener('click', function (e) {
  e.stopPropagation();
  nextImage();
});

lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) closeLightbox();
});

var touchStartX = null;
var touchStartY = null;

lightbox.addEventListener('touchstart', function (e) {
  if (!lightbox.classList.contains('lightbox--open') || e.touches.length !== 1) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

lightbox.addEventListener('touchend', function (e) {
  if (!lightbox.classList.contains('lightbox--open')) return;
  if (touchStartX === null || touchStartY === null) return;

  var touch = e.changedTouches[0];
  var deltaX = touch.clientX - touchStartX;
  var deltaY = touch.clientY - touchStartY;
  var swipeThreshold = 50;

  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
    if (deltaX < 0) {
      nextImage();
    } else {
      prevImage();
    }
  }

  touchStartX = null;
  touchStartY = null;
}, { passive: true });

document.addEventListener('keydown', function (e) {
  if (!lightbox.classList.contains('lightbox--open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});
