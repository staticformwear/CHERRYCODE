document.addEventListener("DOMContentLoaded", function() {
    function loadComponent(id, file) {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Could not load ${file}`);
                return response.text();
            })
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error('Error loading component:', error));
    }

    loadComponent('header-placeholder', 'header.html');
    loadComponent('discount-btn-placeholder', 'discount-btn.html');
});
