// Sample product data for your water bottles
const products = [
    {
        id: "cherry-bottle-01",
        name: "STAINLESS STEEL FLIP BOTTLE",
        subtitle: "SERIES 3 FLIP BOTTLE",
        price: 40.00,
        url: "index.html",
        image: "IMG_0410.png",
        description: "Keeps drinks cold up to three days."
    },
    {
        id: "cherry-bottle-02",
        name: "LIMELITE GREEN FLIP BOTTLE",
        subtitle: "SERIES 3 FLIP BOTTLE",
        price: 40.00,
        url: "index.html",
        image: "IMG_0410.png",
        description: "Keeps drinks cold up to three days."
    },
    {
        id: "cherry-bottle-03",
        name: "CARGO GREEN FLIP BOTTLE",
        subtitle: "SERIES 3 FLIP BOTTLE",
        price: 40.00,
        url: "index.html",
        image: "IMG_0410.png",
        description: "Keeps drinks cold up to three days."
    },
    {
        id: "cherry-bottle-04",
        name: "ASTRAL BLUE FLIP BOTTLE",
        subtitle: "SERIES 3 FLIP BOTTLE",
        price: 40.00,
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
                        <p class="product-sizes">500ML &nbsp; 1L</p>
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

// --- CSS STYLING INJECTION (Add this block into your main CSS file) ---
const styleTag = document.createElement('style');
styleTag.innerHTML = `
    #product-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
    }

    .product-card {
        background: transparent;
        border: none;
        display: flex;
        flex-direction: column;
    }

    .product-image-container {
        background: #f4f4f4;
        border: 1px solid #e0e0e0;
        border-radius: 0px;
        height: 420px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .product-image-container img {
        max-height: 80%;
        object-fit: contain;
    }

    .product-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 15px;
    }

    .product-title {
        font-size: 14px;
        font-weight: 700;
        margin: 0 0 5px 0;
    }

    .product-subtitle, .product-sizes {
        font-size: 12px;
        color: #666;
        margin: 0 0 3px 0;
    }

    .product-price {
        font-size: 14px;
        font-weight: 600;
    }

    .chappy-buy-btn {
        margin-top: 10px;
        width: 100%;
        padding: 10px;
        background: #000;
        color: #fff;
        border: none;
        cursor: pointer;
    }
`;
document.head.appendChild(styleTag);
