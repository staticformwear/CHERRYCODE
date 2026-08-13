(function() {
    // 1. Inject CSS Styles
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
            z-index: 1000;
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
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #111;
            padding: 0;
            line-height: 1;
        }
        .cart-title {
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 1px;
            color: #111;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        .cart-link {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.5px;
            color: #111;
            text-decoration: underline;
            text-underline-offset: 4px;
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
            justify-content: center;
            padding: 40px 20px;
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
            z-index: 999;
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
            <div class="cart-header">
                <button class="cart-close-btn" id="cartCloseBtn" aria-label="Close basket">&times;</button>
                <span class="cart-title">YOUR BASKET</span>
                <a href="cart.html" class="cart-link">GO TO BASKET</a>
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
    
    // Find any cart icon buttons on the page to trigger the drawer
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
        // Prevent default Snipcart behavior if it auto-opens its own modal, replacing it with your custom drawer
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });

    cartCloseBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
})();
