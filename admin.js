// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Проверяем права администратора
    checkAdminAccess();
    
    // Инициализируем интерфейс
    initializeAdminInterface();
    
    // Загружаем список путевок
    loadTrips();
});

function checkAdminAccess() {
    const currentUser = getCurrentUser();
    
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Доступ запрещен. Только администраторы могут использовать эту панель.');
        window.location.assign('index.html');
        return;
    }
}

function getCurrentUser() {
    try {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        return null;
    }
}

function initializeAdminInterface() {
    const addTripBtn = document.getElementById('addTripBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const tripForm = document.getElementById('tripForm');
    const tripFormElement = document.getElementById('tripFormElement');
    
    // Обработчики событий
    addTripBtn.addEventListener('click', () => showTripForm());
    refreshBtn.addEventListener('click', () => loadTrips());
    cancelBtn.addEventListener('click', () => hideTripForm());
    
    tripFormElement.addEventListener('submit', handleTripSubmit);
}

async function loadTrips() {
    try {
        const response = await fetch('http://localhost:3000/trips');
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        
        const trips = await response.json();
        displayTrips(trips);
    } catch (error) {
        console.error('Ошибка при загрузке путевок:', error);
        alert('Ошибка при загрузке путевок. Проверьте подключение к серверу.');
    }
}

function displayTrips(trips) {
    const container = document.getElementById('tripsContainer');
    
    if (trips.length === 0) {
        container.innerHTML = '<p>Путевки не найдены.</p>';
        return;
    }
    
    container.innerHTML = trips.map(trip => `
        <div class="trip-card" data-trip-id="${trip.id}">
            <div class="trip-image">
                <img src="${trip.image}" alt="${trip.place}" onerror="this.src='img/slider1.jpg'">
            </div>
            <div class="trip-info">
                <h3>${trip.place} (${trip.place_ru})</h3>
                <p><strong>City:</strong> ${trip.city} (${trip.city_ru})</p>
                <p><strong>Description:</strong> ${trip.description}</p>
                <p><strong>Price:</strong> $${trip.price}</p>
                <p><strong>Duration:</strong> ${trip.duration} (${trip.duration_ru})</p>
                <p><strong>Rating:</strong> ${trip.rating}/5</p>
            </div>
            <div class="trip-actions">
                <button class="admin-btn edit-btn" onclick="editTrip(${trip.id})">Edit</button>
                <button class="admin-btn delete-btn" onclick="deleteTrip(${trip.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function showTripForm(tripId = null) {
    const form = document.getElementById('tripForm');
    const formTitle = document.getElementById('formTitle');
    
    if (tripId) {
        formTitle.textContent = 'Edit Trip';
        loadTripData(tripId);
    } else {
        formTitle.textContent = 'Add New Trip';
        clearForm();
    }
    
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth' });
}

function hideTripForm() {
    const form = document.getElementById('tripForm');
    form.style.display = 'none';
    clearForm();
}

function clearForm() {
    const form = document.getElementById('tripFormElement');
    form.reset();
    document.getElementById('tripId').value = '';
}

async function loadTripData(tripId) {
    try {
        const response = await fetch(`http://localhost:3000/trips/${tripId}`);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        
        const trip = await response.json();
        
        // Заполняем форму данными
        document.getElementById('tripId').value = trip.id;
        document.getElementById('place').value = trip.place;
        document.getElementById('place_ru').value = trip.place_ru;
        document.getElementById('city').value = trip.city;
        document.getElementById('city_ru').value = trip.city_ru;
        document.getElementById('description').value = trip.description;
        document.getElementById('description_ru').value = trip.description_ru;
        document.getElementById('fullDescription').value = trip.fullDescription;
        document.getElementById('fullDescription_ru').value = trip.fullDescription_ru;
        document.getElementById('price').value = trip.price;
        document.getElementById('duration').value = trip.duration;
        document.getElementById('duration_ru').value = trip.duration_ru;
        document.getElementById('rating').value = trip.rating;
        document.getElementById('image').value = trip.image;
        
    } catch (error) {
        console.error('Ошибка при загрузке данных путевки:', error);
        alert('Ошибка при загрузке данных путевки.');
    }
}

async function handleTripSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const tripData = {
        place: document.getElementById('place').value,
        place_ru: document.getElementById('place_ru').value,
        city: document.getElementById('city').value,
        city_ru: document.getElementById('city_ru').value,
        description: document.getElementById('description').value,
        description_ru: document.getElementById('description_ru').value,
        fullDescription: document.getElementById('fullDescription').value,
        fullDescription_ru: document.getElementById('fullDescription_ru').value,
        price: parseFloat(document.getElementById('price').value),
        duration: document.getElementById('duration').value,
        duration_ru: document.getElementById('duration_ru').value,
        rating: parseFloat(document.getElementById('rating').value),
        image: document.getElementById('image').value,
        highlights: ["Guided tour", "Local food tasting", "Cultural experience"],
        highlights_ru: ["Экскурсия с гидом", "Дегустация местной кухни", "Культурный опыт"],
        gallery: [document.getElementById('image').value]
    };
    
    const tripId = document.getElementById('tripId').value;
    
    try {
        let response;
        if (tripId) {
            // Обновление существующей путевки
            response = await fetch(`http://localhost:3000/trips/${tripId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripData)
            });
        } else {
            // Добавление новой путевки
            response = await fetch('http://localhost:3000/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripData)
            });
        }
        
        if (!response.ok) {
            throw new Error(`Ошибка сохранения: ${response.status}`);
        }
        
        alert(tripId ? 'Путевка успешно обновлена!' : 'Путевка успешно добавлена!');
        hideTripForm();
        loadTrips();
        
    } catch (error) {
        console.error('Ошибка при сохранении путевки:', error);
        alert('Ошибка при сохранении путевки. Проверьте подключение к серверу.');
    }
}

async function editTrip(tripId) {
    showTripForm(tripId);
}

async function deleteTrip(tripId) {
    if (!confirm('Вы уверены, что хотите удалить эту путевку?')) {
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/trips/${tripId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`Ошибка удаления: ${response.status}`);
        }
        
        alert('Путевка успешно удалена!');
        loadTrips();
        
    } catch (error) {
        console.error('Ошибка при удалении путевки:', error);
        alert('Ошибка при удалении путевки. Проверьте подключение к серверу.');
    }
}

