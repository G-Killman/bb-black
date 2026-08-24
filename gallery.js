var grid = document.getElementById('gallery-grid');

galleryCategories.forEach(function (category) {
  var thumb = encodeURI('staging/' + category.folder + '_processed/' + category.folder + '-1.webp');
  var link = 'gallery-category.html?folder=' + encodeURIComponent(category.folder);

  var card = document.createElement('a');
  card.href = link;
  card.className = 'gallery-card';

  var img = document.createElement('img');
  img.src = thumb;
  img.alt = category.name + ' gallery thumbnail';

  // hide the card if the category has no processed images yet
  img.addEventListener('error', function () {
    card.style.display = 'none';
  });

  var thumbDiv = document.createElement('div');
  thumbDiv.className = 'gallery-thumb';
  thumbDiv.appendChild(img);

  var label = document.createElement('p');
  label.className = 'gallery-card-label';
  label.textContent = category.name;

  card.appendChild(thumbDiv);
  card.appendChild(label);
  grid.appendChild(card);
});
