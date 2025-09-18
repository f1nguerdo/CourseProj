document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const head = document.querySelector('.head');

    function updateMenuCollapse() {
        if (!head || !mobileMenu || !burgerBtn) return;
        const isNarrow = window.innerWidth <= 1100;
        if (isNarrow) {
            burgerBtn.style.display = 'flex';
            mobileMenu.classList.add('collapsed');
        } else {
            burgerBtn.style.display = '';
            mobileMenu.classList.remove('collapsed');
            mobileMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                burgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    updateMenuCollapse();
    window.addEventListener('resize', updateMenuCollapse);
});


