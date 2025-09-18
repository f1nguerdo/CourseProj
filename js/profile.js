// Файл для управления страницей профиля пользователя

document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    
    // Обработчик для кнопки редактирования профиля
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            alert('Функция редактирования профиля будет добавлена позже');
        });
    }
});

async function loadUserProfile() {
    try {
        // Получаем данные текущего пользователя из localStorage
        const currentUser = getCurrentUser();
        
        if (!currentUser) {
            // Если пользователь не авторизован, перенаправляем на страницу входа
            window.location.href = 'login.html';
            return;
        }
        
        console.log('Загружаем профиль для пользователя:', currentUser.userName);
        
        // Ищем полные данные пользователя в базе данных
        const response = await fetch(`http://localhost:3000/users?nickname=${encodeURIComponent(currentUser.userName)}`);
        
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        
        const users = await response.json();
        
        if (users.length === 0) {
            throw new Error('Пользователь не найден в базе данных');
        }
        
        const user = users[0];
        console.log('Получены данные пользователя:', user);
        
        // Заполняем поля профиля
        document.getElementById('profileUsername').textContent = user.nickname || 'Не указано';
        document.getElementById('profileFullName').textContent = `${user.firstname || ''} ${user.middlename || ''} ${user.lastname || ''}`.trim() || 'Не указано';
        document.getElementById('profileEmail').textContent = user.email || 'Не указано';
        document.getElementById('profilePhone').textContent = user.phone || 'Не указано';
        
        // Форматируем дату рождения
        if (user.birthdate) {
            const birthDate = new Date(user.birthdate);
            const formattedDate = birthDate.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('profileBirthdate').textContent = formattedDate;
        } else {
            document.getElementById('profileBirthdate').textContent = 'Не указано';
        }
        
    } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
        
        // Показываем сообщение об ошибке
        document.getElementById('profileUsername').textContent = 'Ошибка загрузки';
        document.getElementById('profileFullName').textContent = 'Ошибка загрузки';
        document.getElementById('profileEmail').textContent = 'Ошибка загрузки';
        document.getElementById('profilePhone').textContent = 'Ошибка загрузки';
        document.getElementById('profileBirthdate').textContent = 'Ошибка загрузки';
        
        alert(`Ошибка при загрузке профиля: ${error.message}`);
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

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}


