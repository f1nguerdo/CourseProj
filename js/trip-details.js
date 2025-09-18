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

function renderTripDetails(trip) {
    tripDetailsContainer.innerHTML = `
        <div class="trip-detail-card">
            <div class="trip-main-image" style="background-image:url(${trip.image})">
                <span class="image-error-text" style="display:none">Image not available</span>
            </div>
            
            <div class="trip-info">
                <h1 class="trip-title">${trip.place}, ${trip.city}</h1>
                <div class="trip-price">$${trip.price}</div>
                
                <div class="trip-meta">
                    <span class="trip-duration">${trip.duration || '7 days'}</span>
                    <span class="trip-rating">${trip.rating || '4.5'} ★</span>
                </div>
                
                <p class="trip-full-description">${trip.fullDescription || trip.description}</p>
                
                <div class="trip-highlights">
                    <h3>Highlights</h3>
                    <ul>
                        ${(trip.highlights || ['Comfortable accommodation', 'Guided tours', 'All meals included'])
                            .map(hl => `<li>${hl}</li>`).join('')}
                    </ul>
                </div>
                
                <button class="book-now-btn">Book Now</button>
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
        
        <a href="catalog.html" class="back-to-catalog">← Back to all trips</a>
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
}

function showError(message) {
    tripDetailsContainer.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <a href="catalog.html" class="back-to-catalog">← Back to all trips</a>
        </div>
    `;
}