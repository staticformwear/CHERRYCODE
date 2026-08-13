(function() {
    // 1. Configure Snipcart settings
    window.SnipcartSettings = {
        publicApiKey: "ZTQzMDM3MDEtZThjYi00NTAzLWJhMTQtNDMxODFjZTI5NDFlNjM5MjIwOTQ1NDA1MzEzNjYw",
        modalStyle: "side",
        version: "3.3.1"
    };

    // 2. Inject CSS Styles for Custom Drawer, Narrow Width, and Chilly's Layout Alignment
    const style = document.createElement('style');
    style.innerHTML = `
        .cart-drawer {
            position: fixed;
            top: 0;
            right: -420px;
            width: 390px; /* Narrower width matching upload reference */
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
        /* White close button moved outside the drawer panel on the left */
        .cart-close-btn {
            position: absolute;
            left: -45px;
            top: 20px;
            background: none;
            border: none;
            font-size: 32px;
            cursor: pointer;
            color: #ffffff !important;
            padding: 0;
            line-height: 1;
            z-index: 3001;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .cart-title {
            font-size: 13px;
            font-weight: 750 !important;
            letter-spacing: 1px;
            color: #111;
        }
        .cart-go-to-basket {
            font-size: 12px;
            font-weight: 600;
            color: #111;
            text-decoration: underline;
            text-underline-offset: 4px;
            background: none;
            border: none;
            cursor: pointer;
            letter-spacing: 0.5px;
        }
        .cart-body {
            flex: 1;
            overflow-y: auto;
            padding: 0;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        /* Empty basket view aligned nicely around 3/4 down the top header area */
        .cart-empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding-top: 140px; /* Positions it nicely around the upper portion */
            color: #52525b;
            gap: 12px;
        }
        .cart-empty-state svg {
            width: 20px;
            height: 20px;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            margin-bottom: 4px;
        }
        .cart-empty-text {
            font-size: 14px;
            color: #52525b;
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
        #snipcart {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Inject HTML Structure with exact layout elements matching your layout specifications
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="cart-overlay" id="cartOverlay"></div>
        <div class="cart-drawer" id="cartDrawer">
            <button class="cart-close-btn" id="cartCloseBtn" aria-label="Close basket">&times;</button>
            <div class="cart-header">
                <span class="cart-title">YOUR BASKET</span>
                <button class="cart-go-to-basket snipcart-checkout">GO TO BASKET</button>
            </div>
            <div class="cart-body" id="cartBodyContent">
                <div class="cart-empty-state" id="cartEmptyState">
                    <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <span class="cart-empty-text">Your basket is currently empty.</span>
                </div>
                <div hidden id="snipcart" data-api-key="ZTQzMDM3MDEtZThjYi00NTAzLWJhMTQtNDMxODFjZTI5NDFlNjM5MjIwOTQ1NDA1MzEzNjYw" data-config-modal-style="side"></div>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // 4. Attach Interactivity Logic for opening/closing drawer & syncing states
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

    // Sync with Snipcart store to toggle items list or empty state dynamically if items exist
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Snipcart) {
            window.Snipcart.store.subscribe(() => {
                const state = window.Snipcart.store.getState();
                if (state && state.cart) {
                    const itemCount = state.cart.items.count;
                    const emptyStateEl = document.getElementById('cartEmptyState');
                    if (itemCount > 0) {
                        if (emptyStateEl) emptyStateEl.style.display = 'none';
                    } else {
                        if (emptyStateEl) emptyStateEl.style.display = 'flex';
                    }
                }
            });
        }
    });
})();
