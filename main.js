document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtn = document.getElementById('passengerDropdownBtn');
    const dropdown = document.getElementById('passengerDropdown');
    
    // Обработчик для кнопки вызова dropdown
    dropdownBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Обработчики для кнопок +/-
    document.querySelectorAll('.plus-btn, .minus-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const type = this.dataset.type;
        const counter = document.getElementById(`${type}-count`);
        let value = parseInt(counter.textContent);
        
        if (this.classList.contains('plus-btn')) {
          value++;
        } else {
          value = Math.max(0, value - 1);
        }
        
        counter.textContent = value;
        updateMainButton();
      });
    });
    
    // Закрытие dropdown при клике вне его
    document.addEventListener('click', function() {
      dropdown.style.display = 'none';
    });
    
    function updateMainButton() {
      const adults = document.getElementById('adults-count').textContent;
      dropdownBtn.textContent = `${adults} Adult${adults !== '1' ? 's' : ''}`;
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    burgerBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Блокировка прокрутки страницы
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});