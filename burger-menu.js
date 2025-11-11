document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Функция открытия/закрытия меню
    function toggleMenu() {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            // Закрываем меню
            closeMenu();
        } else {
            // Открываем меню
            openMenu();
        }
    }
    
    function openMenu() {
        mobileMenu.classList.add('active');
        burgerBtn.classList.add('active');
        burgerBtn.setAttribute('aria-label', 'Close menu');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('active');
        burgerBtn.classList.remove('active');
        burgerBtn.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
    }
    
    // Обработчик клика по бургер-кнопке
    burgerBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleMenu();
    });
    
    // Закрытие меню при клике на ссылку
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Закрытие меню при клике на кнопку Sign up
    const signUpBtn = document.getElementById('signUpBtn');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', closeMenu);
    }
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !burgerBtn.contains(event.target)) {
            closeMenu();
        }
    });
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Закрытие меню при изменении размера окна (на десктоп)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});