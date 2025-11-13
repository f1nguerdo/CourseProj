document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.head');
    if (!header) {
        return;
    }

    const burgerBtn = header.querySelector('#burgerBtn');
    const mobileMenu = header.querySelector('#mobileMenu');

    if (!burgerBtn || !mobileMenu) {
        return;
    }

    const body = document.body;

    function setAria(expanded) {
        burgerBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        mobileMenu.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    }

    function openMenu() {
        mobileMenu.classList.add('active');
        burgerBtn.classList.add('active');
        setAria(true);
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        burgerBtn.classList.remove('active');
        setAria(false);
        body.style.overflow = '';
    }

    function toggleMenu() {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    burgerBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    mobileMenu.querySelectorAll('a').forEach((interactiveEl) => {
        interactiveEl.addEventListener('click', () => {
            closeMenu();
        });
    });

    const signUpBtn = mobileMenu.querySelector('#signUpBtn');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', () => {
            closeMenu();
        });
    }

    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !burgerBtn.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    setAria(false);
});
