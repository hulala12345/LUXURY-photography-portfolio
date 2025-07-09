// Carousel
const slides = document.querySelectorAll('.carousel .slide');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
let current = 0;
let carouselInterval = setInterval(nextSlide, 4000);

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

function resetInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(nextSlide, 4000);
}

// Swipe support
let startX = 0;
document.querySelector('.carousel .slides').addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
document.querySelector('.carousel .slides').addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) { nextSlide(); resetInterval(); }
  else if (endX - startX > 50) { prevSlide(); resetInterval(); }
});

// Video modal
const videoThumb = document.querySelector('.video-thumb');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
videoThumb.addEventListener('click', () => {
  modalVideo.src = videoThumb.dataset.video;
  videoModal.classList.remove('hidden');
  modalVideo.play();
});
videoModal.querySelector('.close').addEventListener('click', () => {
  modalVideo.pause();
  modalVideo.src = '';
  videoModal.classList.add('hidden');
});

// Services toggle
const toggles = document.querySelectorAll('.services .toggle');
toggles.forEach(btn => {
  btn.addEventListener('click', () => {
    const detail = btn.parentElement.nextElementSibling;
    detail.style.display = detail.style.display === 'block' ? 'none' : 'block';
    btn.textContent = detail.style.display === 'block' ? '-' : '+';
  });
});

// Gallery lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
let galleryIndex = 0;

galleryItems.forEach((img, i) => {
  img.addEventListener('click', () => {
    galleryIndex = i;
    openLightbox();
  });
});

function openLightbox() {
  lightboxImg.src = galleryItems[galleryIndex].src;
  lightbox.classList.remove('hidden');
}

function closeLightbox() {
  lightbox.classList.add('hidden');
}

lightbox.querySelector('.close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
  galleryIndex = (galleryIndex + 1) % galleryItems.length;
  openLightbox();
});
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
  galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox();
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Contact form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for your inquiry!');
  contactForm.reset();
});
