// Файл для управления интерфейсом header'а в зависимости от статуса авторизации

document.addEventListener('DOMContentLoaded', function() {
    updateHeaderInterface();
    updateCartCount();
    
    // Обработчик для кнопки выхода
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});

function updateHeaderInterface() {
    const currentUser = getCurrentUser();
    const authenticatedUser = document.getElementById('authenticatedUser');
    const unauthenticatedUser = document.getElementById('unauthenticatedUser');
    const adminPanel = document.getElementById('adminPanel');
    
    if (currentUser) {
        // Пользователь авторизован - показываем кнопки корзины и профиля
        if (authenticatedUser) {
            authenticatedUser.style.display = 'block';
        }
        if (unauthenticatedUser) {
            unauthenticatedUser.style.display = 'none';
        }
        
        // Показываем кнопку админ-панели только для администраторов
        if (currentUser.role === 'admin' && adminPanel) {
            adminPanel.style.display = 'block';
        } else if (adminPanel) {
            adminPanel.style.display = 'none';
        }
    } else {
        // Пользователь не авторизован - показываем кнопки входа и регистрации
        if (authenticatedUser) {
            authenticatedUser.style.display = 'none';
        }
        if (unauthenticatedUser) {
            unauthenticatedUser.style.display = 'block';
        }
        if (adminPanel) {
            adminPanel.style.display = 'none';
        }
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

function updateCartCount() {
    try {
        const cartData = localStorage.getItem('cart');
        const cartItems = cartData ? JSON.parse(cartData) : [];
        const cartLink = document.getElementById('cartLink');
        
        if (cartLink) {
            if (cartItems.length > 0) {
                cartLink.innerHTML = `Cart (${cartItems.length})`;
            } else {
                cartLink.innerHTML = 'Cart';
            }
        }
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    updateHeaderInterface();
    // Перенаправляем на главную страницу
    window.location.href = 'index.html';
}
