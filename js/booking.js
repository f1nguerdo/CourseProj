const API_URL = 'http://localhost:3000/trips';
const bookingContainer = document.getElementById('booking-container');

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tripId = urlParams.get('tripId');

    if (!tripId) {
        showError(window.getTranslation ? window.getTranslation('trip_id_not_specified', window.getCurrentLanguage()) : 'Trip ID not specified');
        return;
    }

    fetchTripDetails(tripId);
});

async function fetchTripDetails(tripId) {
    try {
        const response = await fetch(`${API_URL}/${tripId}`);
        
        if (!response.ok) throw new Error(window.getTranslation ? window.getTranslation('trip_not_found', window.getCurrentLanguage()) : 'Trip not found');
        
        const trip = await response.json();
        renderBookingForm(trip);
    } catch (error) {
        console.error('Error loading trip details:', error);
        showError(error.message || 'Failed to load trip details');
    }
}

function renderBookingForm(trip) {
    const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
    const t = (key) => window.getTranslation ? window.getTranslation(key, lang) : key;
    const place = lang === 'ru' && trip.place_ru ? trip.place_ru : trip.place;
    const city = lang === 'ru' && trip.city_ru ? trip.city_ru : trip.city;
    const description = lang === 'ru' && trip.description_ru ? trip.description_ru : trip.description;
    const duration = lang === 'ru' && trip.duration_ru ? trip.duration_ru : (trip.duration || '7 days');
    bookingContainer.innerHTML = `
        <div class="booking-form-container">
            <div class="booking-header">
                <h1>${t('book_your_flight')}</h1>
                <div class="trip-summary">
                    <h2>${place}, ${city}</h2>
                    <div class="trip-price">$${trip.price}</div>
                    <div class="trip-duration">${duration}</div>
                </div>
            </div>

            <form class="booking-form" id="bookingForm">
                <div class="form-section">
                    <h3>${t('passenger_information')}</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">${t('first_name')} *</label>
                            <input type="text" id="firstName" name="firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">${t('last_name')} *</label>
                            <input type="text" id="lastName" name="lastName" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">${t('email_label')} *</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">${t('phone_label')} *</label>
                            <input type="tel" id="phone" name="phone" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="passport">${t('passport_number')} *</label>
                            <input type="text" id="passport" name="passport" required>
                        </div>
                        <div class="form-group">
                            <label for="nationality">${t('nationality')} *</label>
                            <input type="text" id="nationality" name="nationality" required>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>${t('flight_preferences')}</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="departureDate">${t('departure_date')} *</label>
                            <input type="date" id="departureDate" name="departureDate" required>
                        </div>
                        <div class="form-group">
                            <label for="returnDate">${t('return_date')} *</label>
                            <input type="date" id="returnDate" name="returnDate" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="departureCity">${t('departure_city')} *</label>
                            <select id="departureCity" name="departureCity" required>
                                <option value="">${t('select_departure_city')}</option>
                                <option value="Moscow">Moscow</option>
                                <option value="St. Petersburg">St. Petersburg</option>
                                <option value="Minsk">Minsk</option>
                                <option value="Kiev">Kiev</option>
                                <option value="Warsaw">Warsaw</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="seatClass">${t('seat_class')} *</label>
                            <select id="seatClass" name="seatClass" required>
                                <option value="">${t('select_seat_class')}</option>
                                <option value="economy">${t('economy')}</option>
                                <option value="business">${t('business')}</option>
                                <option value="first">${t('first_class')}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>${t('special_requests_label')}</h3>
                    <div class="form-group">
                        <label for="specialRequests">${t('special_requests_label')}</label>
                        <textarea id="specialRequests" name="specialRequests" rows="4" placeholder="${t('special_requests_placeholder')}"></textarea>
                    </div>
                </div>

                <div class="form-section">
                    <h3>${t('payment_information')}</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cardNumber">${t('card_number')} *</label>
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required>
                        </div>
                        <div class="form-group">
                            <label for="expiryDate">${t('expiry_date')} *</label>
                            <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cvv">${t('cvv')} *</label>
                            <input type="text" id="cvv" name="cvv" placeholder="123" required>
                        </div>
                        <div class="form-group">
                            <label for="cardholderName">${t('cardholder_name')} *</label>
                            <input type="text" id="cardholderName" name="cardholderName" required>
                        </div>
                    </div>
                </div>

                <div class="booking-summary">
                    <div class="summary-item">
                        <span>${t('trip_price')}</span>
                        <span>$${trip.price}</span>
                    </div>
                    <div class="summary-item">
                        <span>${t('taxes_fees')}</span>
                        <span>$50</span>
                    </div>
                    <div class="summary-item total">
                        <span>${t('total')}</span>
                        <span>$${trip.price + 50}</span>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" class="back-btn" onclick="history.back()">${t('back')}</button>
                    <button type="submit" class="book-btn">${t('complete_booking')}</button>
                </div>
            </form>
        </div>
    `;

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departureDate').min = today;
    document.getElementById('returnDate').min = today;

    // Add form submission handler
    document.getElementById('bookingForm').addEventListener('submit', handleBookingSubmission);
}

function handleBookingSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const bookingData = Object.fromEntries(formData.entries());
    
    // Validate dates
    const departureDate = new Date(bookingData.departureDate);
    const returnDate = new Date(bookingData.returnDate);
    
    if (returnDate <= departureDate) {
        const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
        alert(window.getTranslation ? window.getTranslation('return_after_departure_error', lang) : 'Return date must be after departure date');
        return;
    }
    
    // Simulate booking process
    showBookingConfirmation(bookingData);
}

function showBookingConfirmation(bookingData) {
    const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
    const t = (key) => window.getTranslation ? window.getTranslation(key, lang) : key;
    bookingContainer.innerHTML = `
        <div class="booking-confirmation">
            <div class="confirmation-header">
                <h1>${t('booking_confirmed')}</h1>
                <div class="confirmation-icon">✓</div>
            </div>
            
            <div class="confirmation-details">
                <h2>${t('booking_details')}</h2>
                <div class="detail-item">
                    <span>${t('passenger')}</span>
                    <span>${bookingData.firstName} ${bookingData.lastName}</span>
                </div>
                <div class="detail-item">
                    <span>${t('email_label')}:</span>
                    <span>${bookingData.email}</span>
                </div>
                <div class="detail-item">
                    <span>${t('phone_label')}:</span>
                    <span>${bookingData.phone}</span>
                </div>
                <div class="detail-item">
                    <span>${t('departure_label')}</span>
                    <span>${bookingData.departureDate}</span>
                </div>
                <div class="detail-item">
                    <span>${t('return_label')}</span>
                    <span>${bookingData.returnDate}</span>
                </div>
                <div class="detail-item">
                    <span>${t('seat_class_label')}</span>
                    <span>${bookingData.seatClass}</span>
                </div>
            </div>
            
            <div class="confirmation-actions">
                <button class="home-btn" onclick="window.location.href='index.html'">${t('go_home')}</button>
                <button class="catalog-btn" onclick="window.location.href='catalog.html'">${t('browse_more_trips')}</button>
            </div>
        </div>
    `;

    // Clear cart after successful booking
    try { localStorage.removeItem('cart'); } catch (e) {}
    // Update cart count if header present
    if (typeof updateCartCount === 'function') { try { updateCartCount(); } catch(e) {} }

    // Show success notification modal after rendering confirmation
    showPurchaseNotification();
}

function showError(message) {
    const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
    const t = (key) => window.getTranslation ? window.getTranslation(key, lang) : key;
    bookingContainer.innerHTML = `
        <div class="error-message">
            <h2>${t('error')}</h2>
            <p>${message}</p>
            <a href="catalog.html" class="back-to-catalog">${t('back_to_all_trips')}</a>
        </div>
    `;
}

// Simple purchase notification modal
function showPurchaseNotification() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
    const t = (key) => window.getTranslation ? window.getTranslation(key, lang) : key;
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${t('purchase_completed')}</h2>
                <button class="close-modal" id="closePurchaseModal">&times;</button>
            </div>
            <div class="modal-body">
                <p>${t('booking_completed_message')}</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn" id="okPurchaseModal">${t('ok')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    function close() { if (modal && modal.parentNode) modal.parentNode.removeChild(modal); }
    document.getElementById('closePurchaseModal').addEventListener('click', close);
    document.getElementById('okPurchaseModal').addEventListener('click', close);
    window.addEventListener('click', function onWinClick(e){
        if (e.target === modal) { close(); window.removeEventListener('click', onWinClick); }
    });
}
