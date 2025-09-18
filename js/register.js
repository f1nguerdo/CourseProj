document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы
    const form = document.getElementById('registrationForm');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const birthdateInput = document.getElementById('birthdate');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const generatedPasswordInput = document.getElementById('generated-password');
    const lastnameInput = document.getElementById('lastname');
    const firstnameInput = document.getElementById('firstname');
    const nicknameInput = document.getElementById('nickname');
    const agreementCheckbox = document.getElementById('agreement');
    const submitBtn = document.getElementById('submit-btn');
    const middlenameInput = document.getElementById('middlename'); // Предполагаем, что это поле существует или будет пустым

    // Радиокнопки выбора типа пароля
    const manualPasswordRadio = document.getElementById('manual-password');
    const autoPasswordRadio = document.getElementById('auto-password');
    const manualPasswordSection = document.getElementById('manual-password-section');
    const autoPasswordSection = document.getElementById('auto-password-section');

    // Кнопки генерации
    const generatePasswordBtn = document.getElementById('generate-password-btn');
    const generateNicknameBtn = document.getElementById('generate-nickname-btn');

    // Попытки генерации никнейма
    const nicknameAttempts = document.getElementById('nickname-attempts');
    const attemptsCount = document.getElementById('attempts-count');
    let attemptsLeft = 5;

    // Топ-100 плохих паролей (сокращенный список для примера)
    const badPasswords = [
        'password', '123456', '12345678', '123456789', '12345',
        'qwerty', 'abc123', 'password1', '1234567', '1234567890',
        'iloveyou', '111111', '123123', 'admin', 'welcome'
    ];

    // Маска для телефона в формате +375XXXXXXXXX
    phoneInput.addEventListener('input', function(e) {
        let input = e.target.value.replace(/\D/g, ''); // Удаляем все не-цифры
        if (input.startsWith('375')) {
            input = input.slice(0, 12); // Ограничиваем длину: +375 + 9 цифр
        } else if (input.startsWith('+375')) {
            input = input.slice(1, 13); // Удаляем '+' и ограничиваем длину
        }
        e.target.value = input ? `+375${input.slice(3, 12)}` : '';
        
        validatePhone();
        checkFormValidity();
    });

    // Валидация телефона
    function validatePhone() {
        const phoneRegex = /^\+375\d{9}$/;
        const isValid = phoneRegex.test(phoneInput.value);
        
        toggleError(phoneInput, 'phone-error', isValid, 'Введите корректный номер телефона РБ (+375XXXXXXXXX)');
        return isValid;
    }

    // Валидация email
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(emailInput.value);
        
        toggleError(emailInput, 'email-error', isValid, 'Введите корректный email');
        checkFormValidity();
    });

    // Валидация даты рождения
    birthdateInput.addEventListener('change', function() {
        const birthdate = new Date(birthdateInput.value);
        const today = new Date();
        const minAgeDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
        
        const isValid = birthdate <= minAgeDate;
        
        toggleError(birthdateInput, 'birthdate-error', isValid, 'Вам должно быть не менее 16 лет');
        checkFormValidity();
    });

    // Переключение между ручным и автоматическим паролем
    manualPasswordRadio.addEventListener('change', function() {
        if (manualPasswordRadio.checked) {
            manualPasswordSection.classList.remove('hidden');
            autoPasswordSection.classList.add('hidden');
            passwordInput.required = true;
            confirmPasswordInput.required = true;
            generatedPasswordInput.required = false;
        }
        checkFormValidity();
    });

    autoPasswordRadio.addEventListener('change', function() {
        if (autoPasswordRadio.checked) {
            manualPasswordSection.classList.add('hidden');
            autoPasswordSection.classList.remove('hidden');
            passwordInput.required = false;
            confirmPasswordInput.required = false;
            generatedPasswordInput.required = true;
            generatePassword();
        }
        checkFormValidity();
    });

    // Генерация пароля
    function generatePassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';

        // Гарантируем, что пароль содержит все необходимые символы
        password += getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        password += getRandomChar('abcdefghijklmnopqrstuvwxyz');
        password += getRandomChar('0123456789');
        password += getRandomChar('!@#$%^&*()');

        // Добиваем до 12 символов
        for (let i = 0; i < 8; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Перемешиваем символы
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        generatedPasswordInput.value = password;
        validateGeneratedPassword();
    }

    function getRandomChar(charSet) {
        return charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    generatePasswordBtn.addEventListener('click', generatePassword);

    // Валидация сгенерированного пароля
    function validateGeneratedPassword() {
        const password = generatedPasswordInput.value;
        const isValid = password.length >= 8 && password.length <= 20;

        toggleError(generatedPasswordInput, null, isValid, '');
        checkFormValidity();
        return isValid;
    }

    // Валидация ручного пароля
    passwordInput.addEventListener('input', function() {
        validatePassword();
        checkFormValidity();
    });

    confirmPasswordInput.addEventListener('input', function() {
        validateConfirmPassword();
        checkFormValidity();
    });

    function validatePassword() {
        const password = passwordInput.value;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*()]/.test(password);
        const isCommon = badPasswords.includes(password.toLowerCase());

        let isValid = password.length >= 8 && password.length <= 20 &&
                      hasUpper && hasLower && hasNumber && hasSpecial &&
                      !isCommon;

        // Обновляем индикатор сложности
        updatePasswordStrength(password, hasUpper, hasLower, hasNumber, hasSpecial);

        toggleError(passwordInput, 'password-error', isValid,
            'Пароль должен содержать: 8-20 символов, заглавную и строчную буквы, цифру и спецсимвол');

        // Если пароль изменился, проверяем подтверждение
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }

        return isValid;
    }

    function updatePasswordStrength(password, hasUpper, hasLower, hasNumber, hasSpecial) {
        const strengthBar = document.getElementById('password-strength');
        let strength = 0;

        // Длина
        if (password.length >= 8) strength += 20;
        if (password.length >= 12) strength += 20;

        // Сложность
        if (hasUpper) strength += 20;
        if (hasLower) strength += 10;
        if (hasNumber) strength += 10;
        if (hasSpecial) strength += 20;

        // Цвет индикатора
        strengthBar.style.width = `${strength}%`;

        if (strength < 40) {
            strengthBar.style.backgroundColor = '#e74c3c'; // Красный
        } else if (strength < 70) {
            strengthBar.style.backgroundColor = '#f39c12'; // Оранжевый
        } else {
            strengthBar.style.backgroundColor = '#2ecc71'; // Зеленый
        }
    }

    function validateConfirmPassword() {
        const isValid = confirmPasswordInput.value === passwordInput.value;

        toggleError(confirmPasswordInput, 'confirm-password-error', isValid, 'Пароли не совпадают');
        return isValid;
    }

    // Валидация ФИО
    lastnameInput.addEventListener('input', function() {
        const isValid = lastnameInput.value.trim().length > 0;

        toggleError(lastnameInput, 'lastname-error', isValid, 'Введите фамилию');
        checkFormValidity();
    });

    firstnameInput.addEventListener('input', function() {
        const isValid = firstnameInput.value.trim().length > 0;

        toggleError(firstnameInput, 'firstname-error', isValid, 'Введите имя');
        checkFormValidity();
    });

    // Генерация никнейма
    generateNicknameBtn.addEventListener('click', function() {
        if (attemptsLeft > 0) {
            generateRandomNickname();
            attemptsLeft--;
            attemptsCount.textContent = attemptsLeft;

            if (attemptsLeft === 0) {
                nicknameAttempts.classList.add('hidden');
                nicknameInput.readOnly = false;
                generateNicknameBtn.disabled = true;
            }
        }
    });

    function generateRandomNickname() {
        const adjectives = ['Cool', 'Smart', 'Happy', 'Brave', 'Funny', 'Kind', 'Wise', 'Gentle'];
        const nouns = ['Cat', 'Dog', 'Tiger', 'Lion', 'Eagle', 'Wolf', 'Bear', 'Fox'];
        const numbers = Math.floor(Math.random() * 1000);

        const nickname = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${numbers}`;
        nicknameInput.value = nickname;

        validateNickname();
        checkFormValidity();
    }

    // Валидация никнейма
    nicknameInput.addEventListener('input', function() {
        validateNickname();
        checkFormValidity();
    });

    function validateNickname() {
        const isValid = nicknameInput.value.trim().length > 0;

        toggleError(nicknameInput, 'nickname-error', isValid, 'Введите никнейм');
        return isValid;
    }

    // Соглашение
    agreementCheckbox.addEventListener('change', function() {
        const isValid = agreementCheckbox.checked;

        toggleError(agreementCheckbox, 'agreement-error', isValid, 'Необходимо принять соглашение');
        checkFormValidity();
    });

    // Вспомогательная функция для отображения ошибок
    function toggleError(input, errorId, isValid, errorMessage) {
        if (errorId) {
            const errorElement = document.getElementById(errorId);

            if (!isValid && input.value) {
                input.classList.add('error');
                input.classList.remove('success');
                errorElement.style.display = 'block';
                errorElement.textContent = errorMessage;
            } else {
                input.classList.remove('error');
                input.classList.add('success');
                errorElement.style.display = 'none';
            }
        }
    }

    // Проверка валидности всей формы
    function checkFormValidity() {
        let isFormValid = true;

        // Проверяем все обязательные поля
        isFormValid = isFormValid && validatePhone();
        isFormValid = isFormValid && emailInput.value && document.getElementById('email-error').style.display === 'none';
        isFormValid = isFormValid && birthdateInput.value && document.getElementById('birthdate-error').style.display === 'none';

        // Проверяем пароль в зависимости от выбранного типа
        if (manualPasswordRadio.checked) {
            isFormValid = isFormValid && validatePassword() && validateConfirmPassword();
        } else {
            isFormValid = isFormValid && validateGeneratedPassword();
        }

        isFormValid = isFormValid && lastnameInput.value.trim() && document.getElementById('lastname-error').style.display === 'none';
        isFormValid = isFormValid && firstnameInput.value.trim() && document.getElementById('firstname-error').style.display === 'none';
        isFormValid = isFormValid && nicknameInput.value.trim() && document.getElementById('nickname-error').style.display === 'none';
        isFormValid = isFormValid && agreementCheckbox.checked;

        // Активируем/деактивируем кнопку отправки
        if (isFormValid) {
            submitBtn.classList.add('active');
        } else {
            submitBtn.classList.remove('active');
        }

        return isFormValid;
    }

    // Обработка отправки формы
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (checkFormValidity()) {
            // Собираем данные формы
            const formData = {
                phone: phoneInput.value,
                email: emailInput.value,
                birthdate: birthdateInput.value,
                password: manualPasswordRadio.checked ? passwordInput.value : generatedPasswordInput.value,
                lastname: lastnameInput.value,
                firstname: firstnameInput.value,
                middlename: middlenameInput ? middlenameInput.value : '',
                nickname: nicknameInput.value,
                agreement: agreementCheckbox.checked,
                role: 'user' // Добавляем роль
            };

            try {
                // Проверяем уникальность email
                const existingUser = await fetch(`http://localhost:3000/users?email=${formData.email}`);
                const users = await existingUser.json();
                if (users.length > 0) {
                    alert('Email уже зарегистрирован');
                    return;
                }

                // Отправляем данные на json-server
                const response = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }

                const result = await response.json();
                console.log('Пользователь успешно зарегистрирован:', result);

                // Показываем сообщение об успехе
                alert('Регистрация прошла успешно!');
                form.reset();
                submitBtn.classList.remove('active');

                // Сохраняем данные пользователя в localStorage (для соответствия с header_footer.js)
                localStorage.setItem('currentUser', JSON.stringify({
                    userName: formData.nickname,
                    email: formData.email
                }));

                // Перенаправляем на главную страницу
                window.location.assign('index.html');
            } catch (error) {
                console.error('Ошибка при регистрации:', error);
                alert('Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.');
            }
        }
    });

    // Инициализация
    nicknameAttempts.classList.remove('hidden');
    generateRandomNickname();
});