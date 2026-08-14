// Sample product data for your water bottles with size variations
const products = [
    {
        id: "cherry-bottle-01",
        name: "STAINLESS STEEL FLIP BOTTLE",
        subtitle: "SERIES 3 FLIP BOTTLE",
        prices: { "500ML": 40.00, "1L": 45.00 },
        url: "index.html",
        image: "IMG_0410.png",
        description: "Keeps drinks cold up to three days."
    },
    {
        id: "cherry-bottle-02",
        name: "LIMELITE GREEN FLIP BOTTLE",
        subtitle: "SERIES 3 FLIP BOTTLE",
        prices: { "500ML": 40.00, "1L": 45.00 },
        url: "index.html",
        image: "IMG_0410.png",
        description: "Keeps drinks cold up to three days."
    },
    {
        id: "cherry-bottle-03",
        name: "CARGO GREEN FLIP BOTTLE",
        subtitle: "SERIES 3 FLIP BOTTLE",
        prices: { "500ML": 40.00, "1L": 45.00 },
        url: "index.html",
        image: "IMG_0410.png",
        description: "Keeps drinks cold up to three days."
    },
    {
        id: "cherry-bottle-04",
        name: "ASTRAL BLUE FLIP BOTTLE",
        subtitle: "SERIES 3 FLIP BOTTLE",
        prices: { "500ML": 40.00, "1L": 45.00 },
        url: "index.html",
        image: "IMG_0410.png",
        description: "Keeps drinks cold up to three days."
    }
];

function loadProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    if (products.length > 0) {
        products.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            // Default to 500ML view
            const defaultSize = "500ML";
            const defaultPrice = product.prices[defaultSize];
            const uniqueId = `${product.id}-${defaultSize.toLowerCase()}`;

            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-text-group">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-subtitle">${product.subtitle}</p>
                        <div class="product-sizes-container">
                            <span class="size-option active" data-size="500ML" data-price="${product.prices["500ML"]}" data-base-id="${product.id}">500ML</span>
                            <span class="size-option" data-size="1L" data-price="${product.prices["1L"]}" data-base-id="${product.id}">1L</span>
                        </div>
                    </div>
                    <span class="product-price" id="price-${index}">£${defaultPrice.toFixed(2)}</span>
                </div>
                <button class="snipcart-add-item chappy-buy-btn"
                    id="btn-${index}"
                    data-item-id="${uniqueId}"
                    data-item-price="${defaultPrice}"
                    data-item-url="${product.url}"
                    data-item-description="${product.description} (${defaultSize})"
                    data-item-name="${product.name} - ${defaultSize}">
                    Add to Cart
                </button>
            `;
            grid.appendChild(card);
        });

        // Add click behavior for size options with underline styling
        document.querySelectorAll('.product-sizes-container').forEach((container, index) => {
            const sizeOptions = container.querySelectorAll('.size-option');
            const priceSpan = document.getElementById(`price-${index}`);
            const buyButton = document.getElementById(`btn-${index}`);
            const product = products[index];

            sizeOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    // Remove active underline from sibling options
                    sizeOptions.forEach(opt => opt.classList.remove('active'));
                    // Add active underline to clicked option
                    e.target.classList.add('active');

                    const selectedSize = e.target.getAttribute('data-size');
                    const selectedPrice = parseFloat(e.target.getAttribute('data-price'));
                    const newUniqueId = `${product.id}-${selectedSize.toLowerCase()}`;

                    // Update price display
                    priceSpan.textContent = `£${selectedPrice.toFixed(2)}`;

                    // Update Snipcart attributes dynamically
                    buyButton.setAttribute('data-item-id', newUniqueId);
                    buyButton.setAttribute('data-item-price', selectedPrice);
                    buyButton.setAttribute('data-item-description', `${product.description} (${selectedSize})`);
                    buyButton.setAttribute('data-item-name', `${product.name} - ${selectedSize}`);
                });
            });
        });

    } else {
        grid.innerHTML = '<p>No products found.</p>';
    }
}

loadProducts();

// --- CSS STYLING INJECTION ---
const styleTag = document.createElement('style');
styleTag.innerHTML = `
    #product-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 25px;
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

    /* Wider aspect ratio, shorter height matching Chilly's style */
    .product-image-container {
        background: #f4f4f4;
        border: none;
        border-radius: 0px;
        height: 340px; 
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .product-image-container img {
        max-height: 85%;
        object-fit: contain;
    }

    .product-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 12px;
    }

    .product-title {
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.5px;
        margin: 0 0 3px 0;
        color: #111;
    }

    .product-subtitle {
        font-size: 11px;
        font-weight: 600;
        color: #777;
        margin: 0 0 8px 0;
        letter-spacing: 0.3px;
    }

    .product-sizes-container {
        display: flex;
        gap: 12px;
    }

    .size-option {
        font-size: 11px;
        font-weight: 600;
        color: #555;
        cursor: pointer;
        padding-bottom: 2px;
        display: inline-block;
    }

    /* Underline effect when selected */
    .size-option.active {
        color: #000;
        text-decoration: underline;
        text-underline-offset: 3px;
        font-weight: 700;
    }

    .product-price {
        font-size: 13px;
        font-weight: 700;
        color: #111;
    }

    .chappy-buy-btn {
        margin-top: 12px;
        width: 100%;
        padding: 10px;
        background: #000;
        color: #fff;
        border: none;
        font-weight: 600;
        font-size: 12px;
        cursor: pointer;
        letter-spacing: 0.5px;
    }
`;
document.head.appendChild(styleTag);
