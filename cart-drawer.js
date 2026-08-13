(function() {
    // 1. Configure Snipcart to prevent full-screen modal overlays, using 'side' or disabling default triggers
    window.SnipcartSettings = {
        publicApiKey: "ZTQzMDM3MDEtZThjYi00NTAzLWJhMTQtNDMxODFjZTI5NDFlNjM5MjIwOTQ1NDA1MzEzNjYw",
        modalStyle: "side",
        version: "3.3.1"
    };

    // 2. Inject CSS Styles for Custom Drawer & Snipcart Internal Elements
    const style = document.createElement('style');
    style.innerHTML = `
        .cart-drawer {
            position: fixed;
            top: 0;
            right: -480px;
            width: 450px;
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
            border-bottom: 1px solid #e5e5e5;
        }
        .cart-close-btn {
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #111;
            padding: 0;
            line-height: 1;
            z-index: 3001;
        }
        .cart-title {
            font-size: 13px;
            font-weight: 750 !important;
            letter-spacing: 1px;
            color: #111;
        }
        .cart-body {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
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

        /* Force Snipcart native internal layout elements to render cleanly inside our custom side panel */
        #snipcart {
            display: none !important; /* Hides the raw root container, rendering only via API / Drawer hooks */
        }
        
        /* Style Snipcart's internal cart components when injected into drawer */
        .snipcart-cart__content {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
    `;
    document.head.appendChild(style);

    // 3. Inject HTML Structure into the body, including Snipcart's data-items container classes
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="cart-overlay" id="cartOverlay"></div>
        <div class="cart-drawer" id="cartDrawer">
            <div class="cart-header">
                <span class="cart-title">YOUR BASKET (<span class="snipcart-items-count">0</span>)</span>
                <button class="cart-close-btn" id="cartCloseBtn" aria-label="Close basket">&times;</button>
            </div>
            <div class="cart-body">
                <div hidden id="snipcart" data-api-key="ZTQzMDM3MDEtZThjYi00NTAzLWJhMTQtNDMxODFjZTI5NDFlNjM5MjIwOTQ1NDA1MzEzNjYw" data-config-modal-style="side"></div>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // 4. Attach Interactivity Logic for opening/closing drawer
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
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

    // Auto-open drawer when a user adds an item to the cart via Snipcart events
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Snipcart) {
            window.Snipcart.store.subscribe(() => {
                const state = window.Snipcart.store.getState();
                if (state && state.cart && state.cart.items) {
                    // Open drawer on item addition if count increases
                }
            });
        }
    });
})();
