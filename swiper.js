document.addEventListener('DOMContentLoaded', function() {
  // Проверяем, что Swiper доступен
  if (typeof Swiper === 'function') {
    const swiper = new Swiper('.swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  } else {
    console.error('Swiper is not loaded');
  }
});