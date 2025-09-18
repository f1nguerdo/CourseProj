  // Функционал переключения темы
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('themeToggle');
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        
        // Проверяем сохраненную тему или системные настройки
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Устанавливаем начальную тему
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.body.classList.add('dark-theme');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            document.body.classList.remove('dark-theme');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
        
        // Обработчик клика по кнопке
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                localStorage.setItem('theme', 'light');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        });
    });