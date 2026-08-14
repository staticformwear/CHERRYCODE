document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    try {
        const response = await fetch('/.netlify/functions/get-products');
        const data = await response.json();

        // Clear out the loading text
        productGrid.innerHTML = '';

        // Loop through your Printful products and create the cards dynamically
        // (Adjust property names like .name, .thumbnail_url, .retail_price depending on your function's output)
        if (data && data.items && data.items.length > 0) {
            data.items.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${product.thumbnail_url || product.image}" alt="${product.name}">
                    <div class="product-title">${product.name}</div>
                    <div class="product-price">£${product.price || '25.00'}</div>
                    <button class="btn-primary snipcart-add-item" 
                        data-item-id="${product.id}"
                        data-item-price="${product.price || 25.00}"
                        data-item-name="${product.name}"
                        data-item-url="/">
                        Add to Cart
                    </button>
                `;
                productGrid.appendChild(card);
            });
        } else {
            productGrid.innerHTML = '<p>No products available right now.</p>';
        }
    } catch (error) {
        console.error('Error loading live products:', error);
        productGrid.innerHTML = '<p>Could not load products. Please try again later.</p>';
    }
});
