// Sample product data for your water bottles
const products = [
    {
        id: "cherry-bottle-01",
        name: "Series 01 Flow - Obsidian Black",
        price: 25.00,
        url: "index.html",
        image: "IMG_0410.png", // Replace with your actual product image path
        description: "Keeps drinks cold up to three days."
    },
    {
        id: "cherry-bottle-02",
        name: "Series 01 Flow - Sage Green",
        price: 25.00,
        url: "index.html",
        image: "IMG_0410.png", // Replace with your actual product image path
        description: "Keeps drinks cold up to three days."
    }
];

function loadProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    if (products.length > 0) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">£${product.price.toFixed(2)}</p>
                <button class="snipcart-add-item"
                    data-item-id="${product.id}"
                    data-item-price="${product.price}"
                    data-item-url="${product.url}"
                    data-item-description="${product.description}"
                    data-item-name="${product.name}">
                    Add to Cart
                </button>
            `;
            grid.appendChild(card);
        });
    } else {
        grid.innerHTML = '<p>No products found.</p>';
    }
}

// Run the function when the page loads
loadProducts();
