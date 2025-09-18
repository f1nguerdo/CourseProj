let progress = 0;
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

const interval = setInterval(function() {
    progress += Math.random() * 10;
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(function() {
            document.querySelector('.preloader').style.opacity = '0';
            setTimeout(function() {
                document.querySelector('.preloader').style.display = 'none';
            }, 500);
        }, 300);
    }
    
    progressBar.style.width = progress + '%';
    progressText.textContent = Math.round(progress) + '%';
}, 200);


window.addEventListener('load', function() {
    clearInterval(interval);
    progressBar.style.width = '100%';
    progressText.textContent = '100%';
    setTimeout(function() {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 300);
});