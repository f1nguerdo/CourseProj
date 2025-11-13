// Глобальная функция для обновления кнопки пассажиров
function updateMainButton() {
  const dropdownBtn = document.getElementById('passengerDropdownBtn');
  if (!dropdownBtn) return;
  
  const adults = document.getElementById('adults-count')?.textContent || '1';
  const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
  const label = window.getTranslation ? window.getTranslation('adults', lang) : 'Adults';
  dropdownBtn.textContent = `${adults} ${label}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtn = document.getElementById('passengerDropdownBtn');
    const dropdown = document.getElementById('passengerDropdown');
    
    if (!dropdownBtn || !dropdown) return;
    
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
    
    // Обновляем кнопку при загрузке
    updateMainButton();
    
    // Обновляем кнопку при смене языка
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
      languageSelector.addEventListener('change', function() {
        // Небольшая задержка, чтобы setLanguage успел выполниться
        setTimeout(updateMainButton, 10);
      });
    }
  });


 document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопку Sign up
    const signUpBtn = document.getElementById('signUpBtn');
    
    // Добавляем обработчик клика
    signUpBtn.addEventListener('click', function() {
      // Переходим на страницу регистрации
      window.location.href = 'registar.html'; // или 'registration.html' - в зависимости от имени вашего файла
    });
  });