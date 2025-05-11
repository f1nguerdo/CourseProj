async function renderTripCards() {
  try {
    const response = await fetch('http://localhost:3000/trips');
    const trips = await response.json();
    const container = document.querySelector('.deals-container'); // Контейнер для карточек
    
    container.innerHTML = '';

    trips.forEach(trip => {
      const card = document.createElement('div');
      card.className = 'deal-card';
      
      card.innerHTML = `
        <div class="deal-card-image" style="background-image:url(${trip.image})"></div>
        <div class="deal-content">
          <h2 class="deal-location">${trip.place}, ${trip.city}</h2>
          <p class="deal-description">${trip.description}</p>
          <div class="deal-price">$${trip.price}</div>
        </div>
      `;
      
      container.appendChild(card);
    });

  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

document.addEventListener('DOMContentLoaded', renderTripCards);