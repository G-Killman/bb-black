var params = new URLSearchParams(window.location.search);
var folder = params.get('folder');

if (!folder) {
  window.location.href = 'gallery.html';
}

var category = galleryCategories.find(function (c) { return c.folder === folder; });
var displayName = category ? category.name : folder;

if (folder === 'pedicure-lookbook-demo-web-design') {
  displayName = 'Pedicure Lookbook';
  document.body.classList.add('pedicure-lookbook-page');
}

if (folder === 'manicure-lookbook-web-design') {
  displayName = 'Manicure Lookbook';
  document.body.classList.add('manicure-lookbook-page');
}

document.getElementById('category-title').textContent = displayName;
document.title = document.title.replace('Gallery', displayName);

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

  return displayName + ' photo ' + num;
}

for (var i = 1; i <= 50; i++) {
  (function (num) {
    var src = 'staging/' + folder + '_processed/' + folder + '-' + num + '.webp';
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

document.addEventListener('keydown', function (e) {
  if (!lightbox.classList.contains('lightbox--open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});
