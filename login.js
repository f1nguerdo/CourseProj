document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('login-error');
    const passwordError = document.getElementById('password-error');

    if (!loginForm || !loginInput || !passwordInput) {
        console.error('Элементы формы не найдены:', { loginForm, loginInput, passwordInput });
        return;
    }

    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        const nickname = loginInput.value.trim();
        const password = passwordInput.value.trim();

        // Сбрасываем сообщения об ошибках
        loginError.textContent = '';
        passwordError.textContent = '';
        loginInput.classList.remove('error');
        passwordInput.classList.remove('error');

        // Проверка заполнения полей
        if (!nickname) {
            loginError.textContent = 'Введите никнейм';
            loginInput.classList.add('error');
            return;
        }
        if (!password) {
            passwordError.textContent = 'Введите пароль';
            passwordInput.classList.add('error');
            return;
        }

        try {
            // Ищем пользователя по nickname
            console.log('Отправляем запрос к серверу...');
            const response = await fetch(`http://localhost:3000/users?nickname=${encodeURIComponent(nickname)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            console.log('Получен ответ от сервера:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
            }
            
            const users = await response.json();
            console.log('Получены данные пользователей:', users);

            if (users.length === 0) {
                loginError.textContent = 'Пользователь не найден';
                loginInput.classList.add('error');
                return;
            }
            if (users.length > 1) {
                loginError.textContent = 'Обнаружено несколько пользователей с таким никнеймом. Свяжитесь с поддержкой.';
                loginInput.classList.add('error');
                return;
            }

            const user = users[0];

            if (user.password !== password) {
                passwordError.textContent = 'Неверный пароль';
                passwordInput.classList.add('error');
                return;
            }

            // Успешный вход
            alert(`Добро пожаловать, ${user.nickname}!`);
            localStorage.setItem("currentUser", JSON.stringify({
                userName: user.nickname,
                email: user.email,
                role: user.role
            }));
            window.location.assign("index.html");

        } catch (error) {
            console.error("Ошибка при авторизации:", error);
            
            // Показываем более подробную информацию об ошибке
            let errorMessage = "Ошибка сервера. Попробуйте позже.";
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorMessage = "Не удается подключиться к серверу. Убедитесь, что json-server запущен на порту 3000.";
            } else if (error.message.includes('CORS')) {
                errorMessage = "Ошибка CORS. Попробуйте запустить браузер с отключенной защитой CORS.";
            } else {
                errorMessage = `Ошибка: ${error.message}`;
            }
            
            alert(errorMessage);
        }
    });
});