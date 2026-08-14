// Sample product data for your water bottles
const products = [
    {
        id: "cherry-bottle-01",
        name: "SERIES 01 FLOW - OBSIDIAN BLACK",
        subtitle: "SERIES 01 FLOW BOTTLE",
        price: 25.00,
        url: "index.html",
        image: "IMG_0410.png",
        description: "Keeps drinks cold up to three days."
    },
    {
        id: "cherry-bottle-02",
        name: "SERIES 01 FLOW - SAGE GREEN",
        subtitle: "SERIES 01 FLOW BOTTLE",
        price: 25.00,
        url: "index.html",
        image: "IMG_0410.png",
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
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-text-group">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-subtitle">${product.subtitle}</p>
                    </div>
                    <span class="product-price">£${product.price.toFixed(2)}</span>
                </div>
                <button class="snipcart-add-item chappy-buy-btn"
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

loadProducts();
