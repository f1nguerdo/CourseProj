const API_URL = 'http://localhost:3000/trips';

// Элементы управления
const searchInput = document.getElementById('search-input');
const priceFilter = document.getElementById('price-filter');
const sortBy = document.getElementById('sort-by');
const dealsContainer = document.getElementById('deals-container');

// Дебаунс для поиска
let searchTimeout;
function debounceSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(fetchTrips, 300);
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
        const [min, max] = priceRange.split('-').map(Number);
        if (!isNaN(min)) params.append('price_gte', min);
        if (!isNaN(max)) params.append('price_lte', max);
    }

    // Сортировка
    if (sortOption !== 'id') {
        const [field, order] = sortOption.split('_');
        params.append('_sort', field);
        params.append('_order', order);
    }

    return `${API_URL}?${params.toString()}`;
}

// Загрузка данных с сервера
async function fetchTrips() {
    try {
        const url = buildQueryURL();
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Network error');
        
        const trips = await response.json();
        renderTrips(trips);
    } catch (error) {
        console.error('Fetch error:', error);
        dealsContainer.innerHTML = '<div class="no-results">Error loading data</div>';
    }
}

// Отрисовка карточек (аналогично предыдущему примеру)
function renderTrips(trips) {
    if (!trips.length) {
        dealsContainer.innerHTML = '<div class="no-results">No trips found</div>';
        return;
    }

    dealsContainer.innerHTML = trips.map(trip => `
        <div class="deal-card">
            <div class="deal-card-image" style="background-image:url(${trip.image})">
                <div class="image-error-text">Failed to load image</div>
            </div>
            <div class="deal-content">
                <h2 class="deal-location">${trip.place}, ${trip.city}</h2>
                <p class="deal-description">${trip.description}</p>
                <div class="deal-price">$${trip.price}</div>
            </div>
        </div>
    `).join('');

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

// Инициализация
document.addEventListener('DOMContentLoaded', fetchTrips);
searchInput.addEventListener('input', debounceSearch);
priceFilter.addEventListener('change', fetchTrips);
sortBy.addEventListener('change', fetchTrips);