// Render Lucide icons
lucide.createIcons();

// Lightbox for gallery images
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');

  let currentGallery = [];
  let currentIndex = 0;

  function openLightbox(imgs, index) {
    currentGallery = imgs;
    currentIndex = index;
    showImage();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function showImage() {
    const img = currentGallery[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
    lightboxPrev.style.visibility = currentGallery.length > 1 ? 'visible' : 'hidden';
    lightboxNext.style.visibility = currentGallery.length > 1 ? 'visible' : 'hidden';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    showImage();
  }

  // Attach click handlers to each gallery grid
  document.querySelectorAll('.gallery-grid').forEach(function (grid) {
    const imgs = Array.from(grid.querySelectorAll('.gallery-img'));
    imgs.forEach(function (img, i) {
      img.addEventListener('click', function () {
        openLightbox(imgs, i);
      });
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', function () { navigate(-1); });
  lightboxNext.addEventListener('click', function () { navigate(1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
})();
