async function loadPrintfulProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '<p style="text-align:center; width:100%; font-weight:600; padding:40px;">Loading products from Printful...</p>';

    try {
        // Calls your new secure Netlify backend function
        const response = await fetch('https://curious-centaur-aa8bdf.netlify.app/.netlify/functions/get-products');
        const data = await response.json();

        // Printful returns product array under data.result
        const products = data.result || [];
        grid.innerHTML = '';

        if (products.length > 0) {
            products.forEach((product, index) => {
                const card = document.createElement('div');
                card.className = 'product-card';
                
                // Set default pricing and attributes based on Printful data
                const defaultPrice = product.retail_price ? parseFloat(product.retail_price) : 40.00;
                const defaultSize = "500ML"; 
                const uniqueId = `printful-${product.id}-${defaultSize.toLowerCase()}`;

                card.innerHTML = `
                    <div class="product-image-container">
                        <img src="${product.thumbnail_url || product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <div class="product-text-group">
                            <h3 class="product-title">${product.name.toUpperCase()}</h3>
                            <p class="product-subtitle">SERIES 3 FLIP BOTTLE</p>
                            <div class="product-sizes-container">
                                <span class="size-option active" data-size="500ML" data-price="${defaultPrice}">500ML</span>
                                <span class="size-option" data-size="1L" data-price="${defaultPrice + 5}">1L</span>
                            </div>
                        </div>
                        <span class="product-price" id="price-${index}">£${defaultPrice.toFixed(2)}</span>
                    </div>
                    <button class="snipcart-add-item chappy-buy-btn"
                        id="btn-${index}"
                        data-item-id="${uniqueId}"
                        data-item-price="${defaultPrice}"
                        data-item-url="index.html"
                        data-item-description="${product.name} (${defaultSize})"
                        data-item-name="${product.name} - ${defaultSize}">
                        Add to Cart
                    </button>
                `;
                grid.appendChild(card);
            });

            // Handle interactive size switches
            document.querySelectorAll('.product-sizes-container').forEach((container, index) => {
                const sizeOptions = container.querySelectorAll('.size-option');
                const priceSpan = document.getElementById(`price-${index}`);
                const buyButton = document.getElementById(`btn-${index}`);
                const product = products[index];

                sizeOptions.forEach(option => {
                    option.addEventListener('click', (e) => {
                        sizeOptions.forEach(opt => opt.classList.remove('active'));
                        e.target.classList.add('active');

                        const selectedSize = e.target.getAttribute('data-size');
                        const selectedPrice = parseFloat(e.target.getAttribute('data-price'));
                        const newUniqueId = `printful-${product.id}-${selectedSize.toLowerCase()}`;

                        priceSpan.textContent = `£${selectedPrice.toFixed(2)}`;

                        buyButton.setAttribute('data-item-id', newUniqueId);
                        buyButton.setAttribute('data-item-price', selectedPrice);
                        buyButton.setAttribute('data-item-description', `${product.name} (${selectedSize})`);
                        buyButton.setAttribute('data-item-name`, `${product.name} - ${selectedSize}`);
                    });
                });
            });

        } else {
            grid.innerHTML = '<p style="text-align:center; width:100%;">No products found in your Printful store.</p>';
        }
    } catch (error) {
        console.error('Error loading Printful products:', error);
        // This will print the exact error right on your webpage screen:
        grid.innerHTML = `<p style="text-align:center; width:100%; color:red; padding:20px;">Error: ${error.message || error}</p>`;
    }
}

loadPrintfulProducts();

// --- CSS STYLING INJECTION ---
const styleTag = document.createElement('style');
styleTag.innerHTML = `
    #product-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 40px;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 40px;
    }

    .product-card {
        background: transparent;
        border: none;
        display: flex;
        flex-direction: column;
    }

    .product-image-container {
        background: #f4f4f4;
        border: none;
        border-radius: 0px;
        height: 520px; 
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .product-image-container img {
        max-height: 88%;
        object-fit: contain;
    }

    .product-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 18px;
    }

    .product-text-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }

    .product-title {
        font-size: 16px;
        font-weight: 900;
        letter-spacing: 0.5px;
        margin: 0 0 6px 0;
        color: #111;
        line-height: 1.2;
    }

    .product-subtitle {
        font-size: 13px;
        font-weight: 600;
        color: #777;
        margin: 0 0 12px 0;
        letter-spacing: 0.3px;
    }

    .product-sizes-container {
        display: flex;
        gap: 16px;
    }

    .size-option {
        font-size: 12px;
        font-weight: 600;
        color: #555;
        cursor: pointer;
        padding-bottom: 2px;
        display: inline-block;
    }

    .size-option.active {
        color: #000;
        text-decoration: underline;
        text-underline-offset: 3px;
        font-weight: 800;
    }

    .product-price {
        font-size: 16px;
        font-weight: 800;
        color: #111;
    }

    .chappy-buy-btn {
        margin-top: 14px;
        width: 100%;
        padding: 14px;
        background: #000;
        color: #fff;
        border: none;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        letter-spacing: 0.5px;
    }
`;
document.head.appendChild(styleTag);
