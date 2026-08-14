async function loadProducts() {
    try {
        // Calls your serverless function endpoint
        const response = await fetch('/.netlify/functions/printful');
        const data = await response.json();
        
        const grid = document.getElementById('product-grid');
        grid.innerHTML = '';

        if (data.result && data.result.length > 0) {
            data.result.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${product.thumbnail_url}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <button onclick="buyProduct(${product.id})">Buy Now</button>
                `;
                grid.appendChild(card);
            });
        } else {
            grid.innerHTML = '<p>No products found in your Printful store yet. Add some water bottles to your "Cherry" store dashboard first!</p>';
        }
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('product-grid').innerHTML = '<p>Failed to load products.</p>';
    }
}

function buyProduct(productId) {
    alert(`Checkout flow triggered for product ID: ${productId}`);
    // Here you would collect shipping details and send a POST request to your backend to create the order.
}

loadProducts();
