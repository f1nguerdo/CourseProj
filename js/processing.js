const API_URL = 'http://localhost:3000/trips';

// Элементы управления
const searchInput = document.getElementById('search-input');
const priceFilter = document.getElementById('price-filter');
const sortBy = document.getElementById('sort-by');
const dealsContainer = document.getElementById('deals-container');
const paginationContainer = document.getElementById('pagination-container');

// Пагинация
let currentPage = 1;
const itemsPerPage = 7; // Количество элементов на странице
let totalItems = 0; // Общее количество элементов (будет установлено после первого запроса)

// Дебаунс для поиска
let searchTimeout;
function debounceSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentPage = 1; // Сброс на первую страницу при новом поиске
        fetchTrips();
    }, 300);
}

// Генератор URL с параметрами
function buildQueryURL() {
    const params = new URLSearchParams();
    const searchTerm = searchInput.value.trim();
    const priceRange = priceFilter.value;
    const sortOption = sortBy.value;

    // Поиск
    if (searchTerm) {
        params.append('q', searchTerm);
    }

    // Фильтр по цене
    if (priceRange !== 'all') {
        if (priceRange.endsWith('+')) {
            // Обработка "1000+" (только минимальная цена)
            const minPrice = parseInt(priceRange);
            if (!isNaN(minPrice)) {
                params.append('price_gte', minPrice);
            }
        } else {
            // Обработка "500-1000" (диапазон)
            const [min, max] = priceRange.split('-').map(Number);
            if (!isNaN(min)) params.append('price_gte', min);
            if (!isNaN(max)) params.append('price_lte', max);
        }
    }

    // Сортировка
    if (sortOption !== 'id') {
        const [field, order] = sortOption.split('_');
        params.append('_sort', field);
        params.append('_order', order);
    }

    // Пагинация
    params.append('_page', currentPage);
    params.append('_limit', itemsPerPage);

    return `${API_URL}?${params.toString()}`;
}

// Загрузка данных с сервера
async function fetchTrips() {
    try {
        const url = buildQueryURL();
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Network error');
        
        // Получаем общее количество элементов из заголовка X-Total-Count
        totalItems = parseInt(response.headers.get('X-Total-Count')) || 0;
        
        const trips = await response.json();
        renderTrips(trips);
        renderPagination();
    } catch (error) {
        console.error('Fetch error:', error);
        dealsContainer.innerHTML = '<div class="no-results">Error loading data</div>';
        paginationContainer.innerHTML = '';
    }
}

// Отрисовка карточек
function renderTrips(trips) {
    if (!trips.length) {
        dealsContainer.innerHTML = '<div class="no-results">No trips found</div>';
        return;
    }

     dealsContainer.innerHTML = `
        <div class="deals-grid">
            ${trips.map(trip => `
                <div class="catalog-deal-card" data-trip-id="${trip.id}">
                    <div class="deal-card-image" style="background-image:url(${trip.image})">
                        <span class="image-error-text" style="display:none">Image not available</span>
                    </div>
                    <div class="deal-content">
                        <h2 class="deal-location">${trip.place}, ${trip.city}</h2>
                        <p class="deal-description">${trip.description}</p>
                        <div class="deal-price">$${trip.price}</div>
                        <button class="add-to-cart-btn" data-trip-id="${trip.id}">Add to Cart</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;


        document.querySelectorAll('.catalog-deal-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Проверяем, не был ли клик по кнопке или другому интерактивному элементу
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
            
            const tripId = card.dataset.tripId;
            window.location.href = `trip-details.html?id=${tripId}`;
        });
    });

    // Добавляем обработчики для кнопок "Add to Cart"
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation(); // Предотвращаем переход на страницу деталей
            
            const tripId = btn.dataset.tripId;
            try {
                const response = await fetch(`${API_URL}/${tripId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const trip = await response.json();
                
                // Добавляем в корзину
                addToCart(trip);
                
                // Показываем уведомление
                showAddToCartNotification(trip.place);
                
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('Error adding trip to cart. Please try again.');
            }
        });
    });


    // Добавляем обработчики ошибок изображений
    document.querySelectorAll('.deal-card-image').forEach(imgDiv => {
        const img = new Image();
        img.src = imgDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)[1];
        img.onerror = () => {
            imgDiv.style.backgroundImage = 'none';
            imgDiv.querySelector('.image-error-text').style.display = 'block';
        };
    });
}

// Функции для работы с корзиной
function addToCart(trip) {
    const cartItems = getCartItems();
    
    // Проверяем, не добавлена ли уже эта путевка
    const existingItem = cartItems.find(item => item.id === trip.id);
    if (existingItem) {
        alert('This trip is already in your cart!');
        return;
    }
    
    cartItems.push(trip);
    saveCartItems(cartItems);
    updateCartCount();
}

function getCartItems() {
    try {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error('Error loading cart items:', error);
        return [];
    }
}

function saveCartItems(items) {
    try {
        localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
        console.error('Error saving cart items:', error);
    }
}

function updateCartCount() {
    const cartItems = getCartItems();
    const cartLink = document.getElementById('cartLink');
    if (cartLink) {
        if (cartItems.length > 0) {
            cartLink.innerHTML = `Cart (${cartItems.length})`;
        } else {
            cartLink.innerHTML = 'Cart';
        }
    }
}

function showAddToCartNotification(tripName) {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>✅ Added "${tripName}" to cart!</span>
        </div>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    // Добавляем анимацию
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }, 3000);
}

// Отрисовка пагинации
function renderPagination() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Если всего одна страница или нет элементов - скрываем пагинацию
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';
    
    // Кнопка "Назад"
    paginationHTML += `<button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
        onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
        &laquo; Prev
    </button>`;
    
    // Номера страниц
    const maxVisiblePages = 5; // Максимальное количество видимых номеров страниц
    let startPage, endPage;
    
    if (totalPages <= maxVisiblePages) {
        // Все страницы видны
        startPage = 1;
        endPage = totalPages;
    } else {
        // Вычисляем диапазон страниц вокруг текущей
        const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
        const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
        
        if (currentPage <= maxPagesBeforeCurrent) {
            // Текущая страница в начале
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
            // Текущая страница в конце
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            // Текущая страница в середине
            startPage = currentPage - maxPagesBeforeCurrent;
            endPage = currentPage + maxPagesAfterCurrent;
        }
    }
    
    // Добавляем первую страницу и многоточие если нужно
    if (startPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="changePage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination-dots">...</span>`;
        }
    }
    
    // Добавляем номера страниц
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
            onclick="changePage(${i})">${i}</button>`;
    }
    
    // Добавляем последнюю страницу и многоточие если нужно
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination-dots">...</span>`;
        }
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    // Кнопка "Вперед"
    paginationHTML += `<button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
        onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
        Next &raquo;
    </button>`;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Функция для смены страницы
function changePage(newPage) {
    if (newPage < 1 || newPage > Math.ceil(totalItems / itemsPerPage)) return;
    currentPage = newPage;
    fetchTrips();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Инициализация
document.addEventListener('DOMContentLoaded', fetchTrips);
searchInput.addEventListener('input', debounceSearch);
priceFilter.addEventListener('change', () => {
    currentPage = 1;
    fetchTrips();
});
sortBy.addEventListener('change', () => {
    currentPage = 1;
    fetchTrips();
});