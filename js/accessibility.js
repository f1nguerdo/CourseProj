// Accessibility features for visually impaired users

document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
});

function initializeAccessibility() {
    // Создаем кнопку меню доступности
    createAccessibilityButton();
    
    // Загружаем сохраненные настройки
    loadAccessibilitySettings();
}

function createAccessibilityButton() {
    const button = document.createElement('button');
    button.id = 'accessibilityBtn';
    button.className = 'accessibility-btn';
    button.innerHTML = '♿';
    button.title = 'Accessibility Menu';
    button.setAttribute('aria-label', 'Open accessibility menu');
    // Открытие/закрытие меню по клику
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleAccessibilityMenu();
    });
    
    // Добавляем кнопку в хедер
    const headRight = document.querySelector('.head-right');
    if (headRight) {
        headRight.appendChild(button);
    } else {
        // Если хедер не найден, добавляем в body как fallback
        document.body.appendChild(button);
    }
}

function toggleAccessibilityMenu() {
    const menu = document.getElementById('accessibilityMenu');
    if (menu) {
        menu.remove();
    } else {
        createAccessibilityMenu();
    }
}

function createAccessibilityMenu() {
    const menu = document.createElement('div');
    menu.id = 'accessibilityMenu';
    menu.className = 'accessibility-menu';
    
    menu.innerHTML = `
        <div class="accessibility-header">
            <h3 data-translate="accessibility_menu">Accessibility Menu</h3>
            <button class="close-btn" onclick="closeAccessibilityMenu()">&times;</button>
        </div>
        
        <div class="accessibility-content">
            <!-- Font Size -->
            <div class="accessibility-section">
                <label data-translate="font_size">Font Size:</label>
                <div class="font-size-controls">
                    <button class="font-btn" data-size="small" data-translate="small">Small</button>
                    <button class="font-btn active" data-size="medium" data-translate="medium">Medium</button>
                    <button class="font-btn" data-size="large" data-translate="large">Large</button>
                </div>
            </div>
            
            <!-- Color Scheme -->
            <div class="accessibility-section">
                <label data-translate="color_scheme">Color Scheme:</label>
                <div class="color-scheme-controls">
                    <button class="color-btn active" data-scheme="default" data-translate="default">Default</button>
                    <button class="color-btn" data-scheme="black-white" data-translate="black_white">Black & White</button>
                    <button class="color-btn" data-scheme="black-green" data-translate="black_green">Black & Green</button>
                    <button class="color-btn" data-scheme="white-black" data-translate="white_black">White & Black</button>
                    <button class="color-btn" data-scheme="beige-brown" data-translate="beige_brown">Beige & Brown</button>
                    <button class="color-btn" data-scheme="blue-navy" data-translate="blue_navy">Blue & Navy</button>
                </div>
            </div>
            
            <!-- Image Control -->
            <div class="accessibility-section">
                <label>
                    <input type="checkbox" id="disableImages">
                    <span data-translate="disable_images">Disable Images</span>
                </label>
            </div>
            
            <!-- Reset Button -->
            <div class="accessibility-section">
                <button class="reset-btn" onclick="resetAccessibilitySettings()" data-translate="reset_settings">Reset Settings</button>
            </div>
        </div>
    `;
    
    // Стили для меню
    menu.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 350px;
        background: white;
        border: 2px solid #007bff;
        border-radius: 10px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        z-index: 9999;
        font-family: Arial, sans-serif;
    `;
    
    document.body.appendChild(menu);
    
    // Добавляем обработчики событий
    addAccessibilityEventListeners();
}

function addAccessibilityEventListeners() {
    // Font size buttons
    const fontButtons = document.querySelectorAll('.font-btn');
    fontButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            fontButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            setFontSize(this.dataset.size);
        });
    });
    
    // Color scheme buttons
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            colorButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            setColorScheme(this.dataset.scheme);
        });
    });
    
    // Disable images checkbox
    const disableImagesCheckbox = document.getElementById('disableImages');
    disableImagesCheckbox.addEventListener('change', function() {
        toggleImages(this.checked);
    });
}

function setFontSize(size) {
    const body = document.body;
    
    // Удаляем предыдущие классы размера шрифта
    body.classList.remove('font-small', 'font-medium', 'font-large');
    
    // Добавляем новый класс
    body.classList.add(`font-${size}`);
    
    // Сохраняем настройку
    localStorage.setItem('accessibilityFontSize', size);
}

function setColorScheme(scheme) {
    const body = document.body;
    
    // Удаляем предыдущие классы цветовых схем
    body.classList.remove('scheme-default', 'scheme-black-white', 'scheme-black-green', 
                         'scheme-white-black', 'scheme-beige-brown', 'scheme-blue-navy');
    
    // Добавляем новый класс
    body.classList.add(`scheme-${scheme}`);
    
    // Сохраняем настройку
    localStorage.setItem('accessibilityColorScheme', scheme);
}

function toggleImages(disable) {
    const images = document.querySelectorAll('img');
    const backgroundImages = document.querySelectorAll('[style*="background-image"]');
    
    // Отключаем обычные изображения
    images.forEach(img => {
        if (disable) {
            img.style.display = 'none';
        } else {
            img.style.display = '';
        }
    });
    
    // Отключаем фоновые изображения
    backgroundImages.forEach(element => {
        if (disable) {
            element.style.backgroundImage = 'none';
            element.classList.add('images-disabled');
        } else {
            element.classList.remove('images-disabled');
            // Восстанавливаем оригинальное фоновое изображение
            const originalBg = element.getAttribute('data-original-bg');
            if (originalBg) {
                element.style.backgroundImage = originalBg;
            }
        }
    });
    
    // Сохраняем настройку
    localStorage.setItem('accessibilityDisableImages', disable);
}

function resetAccessibilitySettings() {
    // Сбрасываем все настройки
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.remove('scheme-default', 'scheme-black-white', 'scheme-black-green', 
                                  'scheme-white-black', 'scheme-beige-brown', 'scheme-blue-navy');
    
    // Включаем изображения
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.display = '';
    });
    
    // Восстанавливаем фоновые изображения
    const backgroundImages = document.querySelectorAll('[style*="background-image"]');
    backgroundImages.forEach(element => {
        element.classList.remove('images-disabled');
        const originalBg = element.getAttribute('data-original-bg');
        if (originalBg) {
            element.style.backgroundImage = originalBg;
        }
    });
    
    // Сбрасываем чекбокс
    const disableImagesCheckbox = document.getElementById('disableImages');
    if (disableImagesCheckbox) {
        disableImagesCheckbox.checked = false;
    }
    
    // Сбрасываем активные кнопки
    const fontButtons = document.querySelectorAll('.font-btn');
    fontButtons.forEach(btn => btn.classList.remove('active'));
    const mediumBtn = document.querySelector('.font-btn[data-size="medium"]');
    if (mediumBtn) mediumBtn.classList.add('active');
    
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => btn.classList.remove('active'));
    const defaultBtn = document.querySelector('.color-btn[data-scheme="default"]');
    if (defaultBtn) defaultBtn.classList.add('active');
    
    // Очищаем localStorage
    localStorage.removeItem('accessibilityFontSize');
    localStorage.removeItem('accessibilityColorScheme');
    localStorage.removeItem('accessibilityDisableImages');
}

function loadAccessibilitySettings() {
    // Загружаем размер шрифта
    const fontSize = localStorage.getItem('accessibilityFontSize');
    if (fontSize) {
        setFontSize(fontSize);
    }
    
    // Загружаем цветовую схему
    const colorScheme = localStorage.getItem('accessibilityColorScheme');
    if (colorScheme) {
        setColorScheme(colorScheme);
    }
    
    // Загружаем настройку изображений
    const disableImages = localStorage.getItem('accessibilityDisableImages') === 'true';
    if (disableImages) {
        toggleImages(true);
    }
}

function closeAccessibilityMenu() {
    const menu = document.getElementById('accessibilityMenu');
    if (menu) {
        menu.remove();
    }
}

// Закрытие меню при клике вне его
document.addEventListener('click', function(e) {
    const menu = document.getElementById('accessibilityMenu');
    const button = document.getElementById('accessibilityBtn');
    
    if (menu && !menu.contains(e.target) && !button.contains(e.target)) {
        menu.remove();
    }
});
