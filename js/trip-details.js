const API_URL = 'http://localhost:3000/trips';
const tripDetailsContainer = document.getElementById('trip-details');

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tripId = urlParams.get('id');

    if (!tripId) {
        showError('Trip ID not specified');
        return;
    }

    fetchTripDetails(tripId);
});

async function fetchTripDetails(tripId) {
    try {
        const response = await fetch(`${API_URL}/${tripId}`);
        
        if (!response.ok) throw new Error('Trip not found');
        
        const trip = await response.json();
        renderTripDetails(trip);
    } catch (error) {
        console.error('Error loading trip details:', error);
        showError(error.message || 'Failed to load trip details');
    }
}

// Сохраняем текущую поездку для перерисовки при смене языка
let currentTrip = null;

function renderTripDetails(trip) {
    currentTrip = trip; // Сохраняем для перерисовки
    updateTripDetailsContent(trip);
}

function updateTripDetailsContent(trip) {
    const lang = (window.getCurrentLanguage && window.getCurrentLanguage()) || 'en';
    const t = (k) => (window.getTranslation ? window.getTranslation(k, lang) : k);
    const place = lang === 'ru' && trip.place_ru ? trip.place_ru : trip.place;
    const city = lang === 'ru' && trip.city_ru ? trip.city_ru : trip.city;
    const fullDescription = lang === 'ru' && trip.fullDescription_ru ? trip.fullDescription_ru : (trip.fullDescription || trip.description);
    const duration = lang === 'ru' && trip.duration_ru ? trip.duration_ru : (trip.duration || '7 days');
    
    // Обрабатываем highlights с переводами
    let highlights = trip.highlights || ['Comfortable accommodation', 'Guided tours', 'All meals included'];
    if (lang === 'ru' && trip.highlights_ru && Array.isArray(trip.highlights_ru)) {
        highlights = trip.highlights_ru;
    }
    
    tripDetailsContainer.innerHTML = `
        <div class="trip-detail-card">
            <div class="trip-main-image" style="background-image:url(${trip.image})">
                <span class="image-error-text" style="display:none">Image not available</span>
            </div>
            
            <div class="trip-info">
                <h1 class="trip-title">${place}, ${city}</h1>
                <div class="trip-price">$${trip.price}</div>
                
                <div class="trip-meta">
                    <span class="trip-duration">${duration}</span>
                    <span class="trip-rating">${trip.rating || '4.5'} ★</span>
                </div>
                
                <p class="trip-full-description">${fullDescription}</p>
                
                <div class="trip-highlights">
                    <h3>${lang === 'ru' ? 'Особенности' : 'Highlights'}</h3>
                    <ul>
                        ${highlights.map(hl => `<li>${hl}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="trip-actions">
                    <button class="book-now-btn" id="bookNowBtn">${t('complete_booking') || 'Book Now'}</button>
                    <button class="book-now-btn" id="addToCartBtn">${t('add_to_cart') || 'Add to Cart'}</button>
                </div>
            </div>
            
            <div class="trip-gallery">
                ${(trip.gallery || Array(3).fill(trip.image))
                    .map((img, i) => `
                        <div class="gallery-thumbnail" style="background-image:url(${img})">
                            <span class="image-error-text" style="display:none">Image ${i+1} not available</span>
                        </div>
                    `).join('')}
            </div>
        </div>
        
        <a href="catalog.html" class="back-to-catalog">${t('back_to_all_trips') || '← Back to all trips'}</a>
    `;

    // Обработка ошибок изображений
    document.querySelectorAll('.trip-main-image, .gallery-thumbnail').forEach(imgDiv => {
        const img = new Image();
        img.src = imgDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)[1];
        img.onerror = () => {
            imgDiv.style.backgroundImage = 'none';
            imgDiv.querySelector('.image-error-text').style.display = 'block';
        };
    });
    // Кнопки действий
    const bookBtn = document.getElementById('bookNowBtn');
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            window.location.href = `booking.html?tripId=${encodeURIComponent(trip.id)}`;
        });
    }

    const addBtn = document.getElementById('addToCartBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            try {
                const lang = (window.getCurrentLanguage && window.getCurrentLanguage()) || 'en';
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const exists = cart.find((c) => c.id === trip.id);
                if (!exists) {
                    cart.push({ id: trip.id, place: trip.place, place_ru: trip.place_ru, city: trip.city, city_ru: trip.city_ru, price: trip.price, image: trip.image, description: trip.description, description_ru: trip.description_ru, duration: trip.duration, duration_ru: trip.duration_ru, rating: trip.rating });
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
                if (typeof updateCartCount === 'function') { try { updateCartCount(); } catch(e) {} }
                alert((window.getTranslation && window.getTranslation('add_to_cart_success', lang)) || 'Added to cart');
            } catch (e) {
                console.error('Add to cart error', e);
            }
        });
    }
}

// Обновление при смене языка
document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.addEventListener('change', () => {
            // Небольшая задержка, чтобы setLanguage успел выполниться
            setTimeout(() => {
                if (currentTrip) {
                    updateTripDetailsContent(currentTrip);
                }
            }, 50);
        });
    }
    
    // Также слушаем кастомное событие смены языка, если оно есть
    window.addEventListener('languageChanged', () => {
        if (currentTrip) {
            updateTripDetailsContent(currentTrip);
        }
    });
});

function showError(message) {
    tripDetailsContainer.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <a href="catalog.html" class="back-to-catalog">← Back to all trips</a>
        </div>
    `;
}