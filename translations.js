// translations.js
const translations = {
    en: {
        // Header
        "main": "Main",
        "about_us": "About us",
        "flights": "Flights",
        "cart": "Cart",
        "profile": "Profile",
        "logout": "Logout",
        "sign_in": "Sign in",
        "sign_up": "Sign up",
        
        // Preview section
        "from_where": "From where?",
        "where_to": "Where to?",
        "depart": "Depart",
        "return": "Return",
        "adults": "Adults",
        "minors": "Minors",
        "search": "Search",
        
        // Flight deals
        "find_adventure": "Find your next adventure with these",
        "flight_deals": "flight deals",
        "all": "all→",
        
        // Reviews
        "reviews_title": "What Tripma users are saying",
        "read_more": "read more...",
        
        // Footer
        "copyright": "© 2020 Tripma incorporated"
    },
    ru: {
        // Header
        "main": "Главная",
        "about_us": "О нас",
        "flights": "Авиабилеты",
        "cart": "Корзина",
        "profile": "Профиль",
        "logout": "Выйти",
        "sign_in": "Войти",
        "sign_up": "Впервые",
        
        // Preview section
        "from_where": "Откуда?",
        "where_to": "Куда?",
        "depart": "Туда",
        "return": "Обратно",
        "adults": "Взрослые",
        "minors": "Дети",
        "search": "Поиск",
        
        // Flight deals
        "find_adventure": "Найдите свое следующее приключение с этими",
        "flight_deals": "предложениями авиабилетов",
        "all": "все→",
        
        // Reviews
        "reviews_title": "Что говорят пользователи Tripma",
        "read_more": "читать далее...",
        
        // Footer
        "copyright": "© 2020 Tripma incorporated"
    }
};

// Функция для получения перевода
function getTranslation(key, language = 'en') {
    return translations[language][key] || key;
}

// Функция для установки языка на странице
function setLanguage(language) {
    document.documentElement.lang = language;
    
    // Находим все элементы с data-translate атрибутом
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getTranslation(key, language);
    });
    
    // Обновляем атрибуты placeholder
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = getTranslation(key, language);
    });
    
    // Сохраняем выбор языка в localStorage
    localStorage.setItem('preferredLanguage', language);
}

// Инициализация языка при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);
});

document.getElementById('languageSelector').addEventListener('change', function(e) {
    setLanguage(e.target.value);
});