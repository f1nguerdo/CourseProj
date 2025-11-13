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
        "admin_panel": "Admin Panel",
        
        // Preview section
        "from_where": "From where?",
        "where_to": "Where to?",
        "depart": "Depart",
        "return": "Return",
        "adults": "Adults",
        "minors": "Minors",
        "search": "Search",
        "preview_line1": "It's more than",
        "preview_line2": "just a trip",
        // Flight deals
        "find_adventure": "Find your next adventure with these",
        "flight_deals": "flight deals",
        "all": "all",
        
        // Reviews
        "reviews_title": "What Tripma users are saying",
        "read_more": "read more...",
        
        // Login/Register
        "login_title": "Log in",
        "nickname": "Nickname",
        "password": "Password",
        "login_button": "Log in",
        "register_title": "Registration",
        "phone": "Phone number (BY)",
        "email": "Email",
        "birthdate": "Birthdate",
        "firstname": "First name",
        "lastname": "Last name",
        "middlename": "Middle name",
        "agreement": "I agree to the terms and conditions",
        "register_button": "Register",
        "switch_to_register": "Sign up",
        "switch_to_login": "Sign in",
        
        // Profile
        "user_profile": "User Profile",
        "username": "Username",
        "full_name": "Full Name",
        "edit_profile": "Edit Profile",
        
        // Admin Panel
        "admin_panel_title": "Admin Panel - Trip Management",
        "add_new_trip": "Add New Trip",
        "refresh_list": "Refresh List",
        "edit_trip": "Edit Trip",
        "save_trip": "Save Trip",
        "cancel": "Cancel",
        "existing_trips": "Existing Trips",
        "place_en": "Place (English)",
        "place_ru": "Place (Russian)",
        "city_en": "City (English)",
        "city_ru": "City (Russian)",
        "description_en": "Description (English)",
        "description_ru": "Description (Russian)",
        "full_description_en": "Full Description (English)",
        "full_description_ru": "Full Description (Russian)",
        "price": "Price ($)",
        "duration_en": "Duration (English)",
        "duration_ru": "Duration (Russian)",
        "rating": "Rating",
        "image_url": "Image URL",
        "edit": "Edit",
        "delete": "Delete",
        
        // Cart
        "shopping_cart": "Shopping Cart",
        "cart_empty": "Your cart is empty",
        "clear_cart": "Clear Cart",
        "order_all": "Order All",
        "total": "Total",
        "remove_from_cart": "Remove from Cart",
        "order_success": "Order Successful!",
        "order_success_message": "Your order has been placed successfully! Thank you for your purchase.",
        "close": "Close",
        
        // About Us
        "about_title": "About Tripma",
        "about_subtitle": "Your trusted travel companion",
        "about_description": "We are passionate about making travel accessible, affordable, and unforgettable for everyone.",
        "our_mission": "Our Mission",
        "mission_text": "To connect people with amazing destinations around the world through innovative technology and exceptional service.",
        "our_values": "Our Values",
        "value_1_title": "Quality",
        "value_1_text": "We provide only the best travel experiences and accommodations.",
        "value_2_title": "Affordability",
        "value_2_text": "Making travel accessible to everyone with competitive prices.",
        "value_3_title": "Reliability",
        "value_3_text": "You can count on us for safe and secure travel arrangements.",
        "contact_us": "Contact Us",
        "email_contact": "Email: info@tripma.com",
        "phone_contact": "Phone: +1 (555) 123-4567",
        
        // Accessibility
        "accessibility_menu": "Accessibility Menu",
        "font_size": "Font Size",
        "small": "Small",
        "medium": "Medium",
        "large": "Large",
        "color_scheme": "Color Scheme",
        "default": "Default",
        "black_white": "Black & White",
        "black_green": "Black & Green",
        "white_black": "White & Black",
        "beige_brown": "Beige & Brown",
        "blue_navy": "Blue & Navy",
        "disable_images": "Disable Images",
        "reset_settings": "Reset Settings",
        
        // Footer
        "copyright": "© 2020 Tripma incorporated",
        
        // Home - Deals titles/descriptions
        "shanghai_title": "The Bund, Shanghai",
        "shanghai_desc": "China's most international city",
        "sydney_title": "Sydney Opera House, Sydney",
        "sydney_desc": "Take a stroll along the famous harbor",
        "kyoto_title": "Kōdajji Temple, Kyoto",
        "kyoto_desc": "Step back in time in the Gion district",
        "kenya_title": "Tsavo East National Park, Kenya",
        "kenya_desc": "Named after the Tsavo River, and opened in April 1984, Tsavo East National Park is one of the oldest parks in Kenya. It is located in the semi-arid Taru Desert.",

        // Home - Reviews section
        "reviews_title": "What Tripma users are saying",
        "review1_text": "What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me",
        "review2_text": "My family and I visit Hawaii every year, and we usually book our flights using other services. Tripma was recommened to us by a long time friend, and I'm so glad we tried it out! The process was easy and",
        "review3_text": "When I was looking to book my flight to Berlin from LAX, Tripma had the best browsing experiece so I figured I'd give it a try. It was my first time using Tripma, but I'd definitely recommend it to a friend and use it for",

        // Catalog/Filters
        "search_placeholder": "Search by place or city...",
        "all_prices": "All Prices",
        "price_range_0_500": "$0 - $500",
        "price_range_500_1000": "$500 - $1000",
        "price_range_1000_plus": "$1000+",
        "sort_by": "Sort By",
        "price_low_high": "Price: Low to High",
        "price_high_low": "Price: High to Low",
        "name_a_z": "Name: A to Z",

        // Booking
        "book_your_flight": "Book Your Flight",
        "trip_price": "Trip Price:",
        "taxes_fees": "Taxes & Fees:",
        
        "total": "Total:",
        "passenger_information": "Passenger Information",
        "first_name": "First Name",
        "last_name": "Last Name",
        "email_label": "Email",
        "phone_label": "Phone",
        "passport_number": "Passport Number",
        "nationality": "Nationality",
        "flight_preferences": "Flight Preferences",
        "departure_date": "Departure Date",
        "return_date": "Return Date",
        "departure_city": "Departure City",
        "select_departure_city": "Select departure city",
        "seat_class": "Seat Class",
        "select_seat_class": "Select seat class",
        "economy": "Economy",
        "business": "Business",
        "first_class": "First Class",
        "special_requests_label": "Special Requests",
        "special_requests_placeholder": "Any special dietary requirements, accessibility needs, or other requests...",
        "payment_information": "Payment Information",
        "card_number": "Card Number",
        "expiry_date": "Expiry Date",
        "cvv": "CVV",
        "cardholder_name": "Cardholder Name",
        "back": "← Back",
        "complete_booking": "Tickets",
        "booking_confirmed": "Booking Confirmed!",
        "booking_details": "Booking Details",
        "passenger": "Passenger:",
        "departure_label": "Departure:",
        "return_label": "Return:",
        "seat_class_label": "Seat Class:",
        "go_home": "Go to Home",
        "browse_more_trips": "Browse More Trips",
        "purchase_completed": "Purchase Completed",
        "booking_completed_message": "Your booking has been successfully completed. Thank you!",
        "ok": "OK",
        "error": "Error",
        "back_to_all_trips": "← Back to all trips",
        "trip_not_found": "Trip not found",
        "trip_id_not_specified": "Trip ID not specified",
        "return_after_departure_error": "Return date must be after departure date",
        "add_to_cart": "Add to Cart",
        "add_to_cart_success": "Added to cart"
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
        "admin_panel": "Админ",
        "preview_line1": "Это больше, чем",
    "preview_line2": "просто поездка",
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
        
        // Login/Register
        "login_title": "Вход",
        "nickname": "Никнейм",
        "password": "Пароль",
        "login_button": "Войти",
        "register_title": "Регистрация",
        "phone": "Номер телефона (РБ)",
        "email": "Email",
        "birthdate": "Дата рождения",
        "firstname": "Имя",
        "lastname": "Фамилия",
        "middlename": "Отчество",
        "agreement": "Я согласен с условиями использования",
        "register_button": "Зарегистрироваться",
        "switch_to_register": "Регистрация",
        "switch_to_login": "Вход",
        
        // Profile
        "user_profile": "Профиль пользователя",
        "username": "Имя пользователя",
        "full_name": "Полное имя",
        "edit_profile": "Редактировать профиль",
        
        // Admin Panel
        "admin_panel_title": "Панель администратора - Управление путевками",
        "add_new_trip": "Добавить новую путевку",
        "refresh_list": "Обновить список",
        "edit_trip": "Редактировать путевку",
        "save_trip": "Сохранить путевку",
        "cancel": "Отмена",
        "existing_trips": "Существующие путевки",
        "place_en": "Место (английский)",
        "place_ru": "Место (русский)",
        "city_en": "Город (английский)",
        "city_ru": "Город (русский)",
        "description_en": "Описание (английский)",
        "description_ru": "Описание (русский)",
        "full_description_en": "Полное описание (английский)",
        "full_description_ru": "Полное описание (русский)",
        "price": "Цена ($)",
        "duration_en": "Продолжительность (английский)",
        "duration_ru": "Продолжительность (русский)",
        "rating": "Рейтинг",
        "image_url": "URL изображения",
        "edit": "Редактировать",
        "delete": "Удалить",
        
        // Cart
        "shopping_cart": "Корзина покупок",
        "cart_empty": "Ваша корзина пуста",
        "clear_cart": "Очистить корзину",
        "order_all": "Заказать все",
        "total": "Итого",
        "remove_from_cart": "Удалить из корзины",
        "order_success": "Заказ успешно оформлен!",
        "order_success_message": "Ваш заказ был успешно размещен! Спасибо за покупку.",
        "close": "Закрыть",
        
        // About Us
        "about_title": "О Tripma",
        "about_subtitle": "Ваш надежный спутник в путешествиях",
        "about_description": "Мы увлечены тем, чтобы сделать путешествия доступными, доступными по цене и незабываемыми для всех.",
        "our_mission": "Наша миссия",
        "mission_text": "Соединять людей с удивительными местами по всему миру с помощью инновационных технологий и исключительного сервиса.",
        "our_values": "Наши ценности",
        "value_1_title": "Качество",
        "value_1_text": "Мы предоставляем только лучшие туристические впечатления и размещение.",
        "value_2_title": "Доступность",
        "value_2_text": "Делаем путешествия доступными для всех с конкурентоспособными ценами.",
        "value_3_title": "Надежность",
        "value_3_text": "Вы можете рассчитывать на нас в вопросах безопасных и надежных туристических услуг.",
        "contact_us": "Свяжитесь с нами",
        "email_contact": "Email: info@tripma.com",
        "phone_contact": "Телефон: +1 (555) 123-4567",
        
        // Accessibility
        "accessibility_menu": "Меню доступности",
        "font_size": "Размер шрифта",
        "small": "Маленький",
        "medium": "Средний",
        "large": "Большой",
        "color_scheme": "Цветовая схема",
        "default": "По умолчанию",
        "black_white": "Черный и белый",
        "black_green": "Черный и зеленый",
        "white_black": "Белый и черный",
        "beige_brown": "Бежевый и коричневый",
        "blue_navy": "Синий и темно-синий",
        "disable_images": "Отключить изображения",
        "reset_settings": "Сбросить настройки",
        
        // Footer
        "copyright": "© 2020 Tripma incorporated",

        // Home - Deals titles/descriptions
        "shanghai_title": "Набережная Вайтань, Шанхай",
        "shanghai_desc": "Самый международный город Китая",
        "sydney_title": "Сиднейский оперный театр, Сидней",
        "sydney_desc": "Прогуляйтесь по знаменитой гавани",
        "kyoto_title": "Храм Кодайдзи, Киото",
        "kyoto_desc": "Погрузитесь в атмосферу района Гион",
        "kenya_title": "Национальный парк Цаво-Ист, Кения",
        "kenya_desc": "Назван в честь реки Цаво и открыт в апреле 1984 года. Один из старейших парков Кении, расположен в полупустыне Тару.",

        // Home - Reviews section
        "reviews_title": "Что говорят пользователи Tripma",
        "review1_text": "Отличный опыт с Tripma! Я бронировал все перелеты для своего гэп-yeар через Tripma и никогда не сталкивался с проблемами. Когда пришлось отменить рейс из-за неотложной ситуации, поддержка Tripma помогла мне",
        "review2_text": "Мы с семьей каждый год ездим на Гавайи и обычно бронировали билеты через другие сервисы. Нам порекомендовали Tripma давние друзья, и я очень рад, что мы попробовали! Процесс был простым и",
        "review3_text": "Когда я искал перелет в Берлин из LAX, у Tripma был лучший интерфейс, поэтому я решил попробовать. Это был мой первый опыт с Tripma, но я определенно порекомендую сервис друзьям и буду пользоваться им",

        // Catalog/Filters
        "search_placeholder": "Поиск по месту или городу...",
        "all_prices": "Все цены",
        "price_range_0_500": "$0 - $500",
        "price_range_500_1000": "$500 - $1000",
        "price_range_1000_plus": "$1000+",
        "sort_by": "Сортировать по",
        "price_low_high": "Цена: по возрастанию",
        "price_high_low": "Цена: по убыванию",
        "name_a_z": "Название: A → Z",

        // Booking
        "book_your_flight": "Забронируйте перелет",
        "trip_price": "Стоимость путевки:",
        "taxes_fees": "Налоги и сборы:",
        "total": "Итого:",
        "passenger_information": "Данные пассажира",
        "first_name": "Имя",
        "last_name": "Фамилия",
        "email_label": "Email",
        "phone_label": "Телефон",
        "passport_number": "Номер паспорта",
        "nationality": "Гражданство",
        "flight_preferences": "Параметры перелета",
        "departure_date": "Дата вылета",
        "return_date": "Дата возвращения",
        "departure_city": "Город вылета",
        "select_departure_city": "Выберите город вылета",
        "seat_class": "Класс обслуживания",
        "select_seat_class": "Выберите класс",
        "economy": "Эконом",
        "business": "Бизнес",
        "first_class": "Первый класс",
        "special_requests_label": "Особые пожелания",
        "special_requests_placeholder": "Диета, доступность, или другие пожелания...",
        "payment_information": "Платёжные данные",
        "card_number": "Номер карты",
        "expiry_date": "Срок действия",
        "cvv": "CVV",
        "cardholder_name": "Имя владельца",
        "back": "← Назад",
        "complete_booking": "Билеты",
        "booking_confirmed": "Бронирование подтверждено!",
        "booking_details": "Детали бронирования",
        "passenger": "Пассажир:",
        "departure_label": "Вылет:",
        "return_label": "Возврат:",
        "seat_class_label": "Класс:",
        "go_home": "На главную",
        "browse_more_trips": "Смотреть ещё путёвки",
        "purchase_completed": "Покупка завершена",
        "booking_completed_message": "Ваше бронирование успешно завершено. Спасибо!",
        "ok": "ОК",
        "error": "Ошибка",
        "back_to_all_trips": "← Назад ко всем путёвкам",
        "trip_not_found": "Путёвка не найдена",
        "trip_id_not_specified": "ID путёвки не указан",
        "return_after_departure_error": "Дата возврата должна быть позже даты вылета",
        "add_to_cart": "В корзину",
        "add_to_cart_success": "Добавлено в корзину"
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
    
    // Обновляем кнопку пассажиров, если она есть на странице
    if (typeof updateMainButton === 'function') {
        updateMainButton();
    }
}

// Инициализация языка при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);
    // Синхронизируем выбранное значение селектора, если он присутствует
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.value = savedLanguage;
    }
});

// Инициализация переключателя языка безопасно (элемент может отсутствовать на странице)
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function(e) {
            setLanguage(e.target.value);
            // Отправляем кастомное событие для обновления динамического контента
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: e.target.value } }));
        });
    }
});

// Утилиты экспорта для использования в других скриптах
function getCurrentLanguage() {
    return localStorage.getItem('preferredLanguage') || 'en';
}

// Делаем доступными глобально
window.getTranslation = getTranslation;
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;