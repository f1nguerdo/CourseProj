async function renderTripCards(page = 1, perPage = 10) {
  try {
    const response = await fetch('http://localhost:3000/trips');
    const allTrips = await response.json();
    const container = document.querySelector('.deals-container');
    const paginationContainer = document.querySelector('.pagination-container') || createPaginationContainer();
    
    container.innerHTML = '';

    // Вычисляем индексы для текущей страницы
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const trips = allTrips.slice(startIndex, endIndex);

    // Рендерим карточки для текущей страницы
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

    // Рендерим пагинацию
    renderPagination(allTrips.length, page, perPage);

  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

function createPaginationContainer() {
  const container = document.createElement('div');
  container.className = 'pagination-container';
  document.querySelector('main').appendChild(container); // или другой родительский элемент
  return container;
}

function renderPagination(totalItems, currentPage, perPage) {
  const totalPages = Math.ceil(totalItems / perPage);
  const paginationContainer = document.querySelector('.pagination-container');
  
  paginationContainer.innerHTML = '';

  // Кнопка "Назад"
  const prevButton = document.createElement('button');
  prevButton.textContent = '←';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => renderTripCards(currentPage - 1, perPage));
  paginationContainer.appendChild(prevButton);

  // Нумерация страниц
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.className = i === currentPage ? 'active' : '';
    pageButton.addEventListener('click', () => renderTripCards(i, perPage));
    paginationContainer.appendChild(pageButton);
  }

  // Кнопка "Вперед"
  const nextButton = document.createElement('button');
  nextButton.textContent = '→';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => renderTripCards(currentPage + 1, perPage));
  paginationContainer.appendChild(nextButton);
}

document.addEventListener('DOMContentLoaded', () => renderTripCards(1, 10));