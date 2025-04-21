
    function toggleDropdown() {
        document.getElementById("myDropdown").style.display = 
            document.getElementById("myDropdown").style.display === "block" ? "none" : "block";
    }
    
    function changeValue(id, delta) {
        const element = document.getElementById(id);
        let value = parseInt(element.textContent);
        value += delta;
        element.textContent = value;
    }
    
    // Закрываем dropdown при клике вне его области
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.style.display === "block") {
                    openDropdown.style.display = "none";
                }
            }
        }
    }
