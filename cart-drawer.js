(function() {
    // Configure Snipcart to prevent its default full-screen modal from showing, keeping only your custom drawer
    window.SnipcartSettings = {
        publicApiKey: "ZTQzMDM3MDEtZThjYi00NTAzLWJhMTQtNDMxODFjZTI5NDFlNjM5MjIwOTQ1NDA1MzEzNjYw",
        modalStyle: "none",
        version: "3.3.1"
    };

    // 1. Inject CSS Styles for Custom Drawer
    const style = document.createElement('style');
    style.innerHTML = `
        .cart-drawer {
            position: fixed;
            top: 0;
            right: -450px;
            width: 420px;
            max-width: 100%;
            height: 100vh;
            background-color: #ffffff;
            box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
            transition: right 0.3s ease-in-out;
            z-index: 3000;
            display: flex;
            flex-direction: column;
        }
        .cart-drawer.open {
            right: 0;
        }
        .cart-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 24px 20px;
            position: relative;
        }
        .cart-close-btn {
            position: absolute;
            left: -45px;
            top: 24px;
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #ffffff;
            padding: 0;
            line-height: 1;
            z-index: 3001;
            transition: opacity 0.2s ease;
        }
        .cart-close-btn:hover {
            opacity: 0.8;
        }
        .cart-title {
            font-size: 13px;
            font-weight: 750 !important;
            letter-spacing: 1px;
            color: #111;
        }
        .cart-link {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.5px;
            color: #111;
            text-decoration: underline;
            text-underline-offset: 4px;
            cursor: pointer;
            background: none;
            border: none;
        }
        .cart-divider {
            border: none;
            border-top: 1px solid #e5e5e5;
            margin: 0;
        }
        .cart-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 80px; 
            padding-left: 20px;
            padding-right: 20px;
        }
        .cart-empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            color: #333;
            font-size: 14px;
            font-weight: 400;
        }
        .cart-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.4);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            z-index: 2999;
        }
        .cart-overlay.open {
            opacity: 1;
            visibility: visible;
        }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML Structure into the body
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="cart-overlay" id="cartOverlay"></div>
        <div class="cart-drawer" id="cartDrawer">
            <button class="cart-close-btn" id="cartCloseBtn" aria-label="Close basket">&times;</button>
            <div class="cart-header">
                <span class="cart-title">YOUR BASKET</span>
                <button class="cart-link snipcart-checkout">GO TO CHECKOUT</button>
            </div>
            <hr class="cart-divider">
            <div class="cart-body">
                <div class="cart-empty-state">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <p>Your basket is currently empty.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // 3. Attach Interactivity Logic
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    
    // Target any element with class 'cart-icon-btn' or 'snipcart-checkout' to open the drawer instead of the full page
    const cartTriggerBtns = document.querySelectorAll('.cart-icon-btn');

    function openCart() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
    }

    function closeCart() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    }

    cartTriggerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });

    cartCloseBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Automatically open drawer when items are added to cart via Snipcart events
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Snipcart) {
            window.Snipcart.store.subscribe(() => {
                const state = window.Snipcart.store.getState();
                if (state && state.cart && state.cart.items && state.cart.items.count > 0) {
                    // Update item count badges dynamically if desired
                }
            });
        }
    });
})();
