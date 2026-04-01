// ============================================
// LUXORA - Page Renderers
// ============================================

// ---------- HOME PAGE ----------
App.renderHome = function () {
  const featured = PRODUCTS.filter(p => p.featured);
  const bestSellers = PRODUCTS.filter(p => p.bestSeller).slice(0, 8);

  document.getElementById('app').innerHTML = `
  <section class="hero">
    <div class="hero-slider">
      <div class="hero-slide active"><img src="${HERO_IMAGES.main}" alt="Luxury fashion collection"></div>
      <div class="hero-slide"><img src="${HERO_IMAGES.secondary}" alt="New arrivals"></div>
      <div class="hero-slide"><img src="${HERO_IMAGES.tertiary}" alt="Style collection"></div>
    </div>
    <div class="hero-content animate-in">
      <div class="subtitle">Spring / Summer 2026</div>
      <h1>Redefine Your Style</h1>
      <p>Discover curated collections of luxury fashion from the world's finest designers and artisans.</p>
      <a href="#/shop" class="btn btn-outline-light btn-lg">Explore Collection</a>
    </div>
    <div class="hero-dots"><button class="hero-dot active" onclick="App.heroSlide(0)"></button><button class="hero-dot" onclick="App.heroSlide(1)"></button><button class="hero-dot" onclick="App.heroSlide(2)"></button></div>
  </section>

  <section class="features-bar"><div class="container"><div class="features-grid">
    <div class="feature-item"><div class="feature-icon">🚚</div><h4>Free Shipping</h4><p>On orders over $500</p></div>
    <div class="feature-item"><div class="feature-icon">↩️</div><h4>Easy Returns</h4><p>30-day return policy</p></div>
    <div class="feature-item"><div class="feature-icon">🔒</div><h4>Secure Payment</h4><p>100% secure checkout</p></div>
    <div class="feature-item"><div class="feature-icon">💎</div><h4>Premium Quality</h4><p>Handpicked luxury items</p></div>
  </div></div></section>

  <section class="categories-section"><div class="container">
    <div class="section-header"><span class="overline">Browse</span><h2>Shop by Category</h2><p>Explore our carefully curated collections</p></div>
    <div class="category-grid">
      ${CATEGORIES.map(c => `<div class="category-card" onclick="location.hash='#/shop?category=${c.id}'"><img src="${CATEGORY_IMAGES[c.id]}" alt="${c.name}" loading="lazy"><div class="category-card-overlay"><h3>${c.name}</h3><span>${PRODUCTS.filter(p => p.category === c.id).length} Products</span></div></div>`).join('')}
    </div>
  </div></section>

  <section class="products-section"><div class="container">
    <div class="section-header"><span class="overline">Curated for You</span><h2>Best Sellers</h2><p>Our most loved pieces, chosen by our discerning customers</p></div>
    <div class="product-grid">${bestSellers.map(p => this.productCard(p)).join('')}</div>
    <div style="text-align:center;margin-top:40px"><a href="#/shop" class="btn btn-outline">View All Products</a></div>
  </div></section>

  <section class="newsletter-section"><div class="container">
    <h2>Stay in the Know</h2><p>Subscribe for exclusive access to new arrivals, private sales, and styling tips.</p>
    <form class="newsletter-form" onsubmit="event.preventDefault();App.showToast('Subscribed successfully!');this.reset()"><input type="email" placeholder="Enter your email address" required><button type="submit" class="btn btn-accent">Subscribe</button></form>
  </div></section>
  ${this.renderFooter()}`;

  // Auto-slide hero
  this._heroInterval = setInterval(() => { const dots = document.querySelectorAll('.hero-dot'); if (!dots.length) return clearInterval(this._heroInterval); const cur = [...dots].findIndex(d => d.classList.contains('active')); this.heroSlide((cur + 1) % 3); }, 5000);
};

App.heroSlide = function (i) {
  document.querySelectorAll('.hero-slide').forEach((s, idx) => s.classList.toggle('active', idx === i));
  document.querySelectorAll('.hero-dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
};

// ---------- SHOP PAGE ----------
App.shopFilters = { category: '', brand: '', minPrice: '', maxPrice: '', sort: 'featured' };

App.renderShop = function (query) {
  if (query) { const params = new URLSearchParams(query); if (params.get('category')) this.shopFilters.category = params.get('category'); }

  const app = document.getElementById('app');
  app.innerHTML = `
  <div class="page-header"><div class="container"><h1>Shop All</h1><div class="breadcrumb"><a href="#/">Home</a><span>/</span><span>Shop</span></div></div></div>
  <div class="container"><div class="shop-layout">
    <aside class="filters-sidebar" id="filters-sidebar">${this.renderFilters()}</aside>
    <div>
      <button class="btn btn-outline btn-sm mobile-filter-btn" onclick="App.toggleFilterDrawer()">☰ Filters</button>
      <div class="shop-toolbar"><span class="result-count" id="result-count"></span>
        <select class="sort-select" onchange="App.shopFilters.sort=this.value;App.applyFilters()"><option value="featured">Featured</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="newest">Newest</option><option value="rating">Highest Rated</option></select>
      </div>
      <div class="product-grid" id="shop-products"></div>
    </div>
  </div></div>
  <div class="filter-drawer-overlay" id="filter-drawer-overlay" onclick="App.toggleFilterDrawer()"></div>
  <div class="filter-drawer" id="filter-drawer"><div class="filter-drawer-header"><h3>Filters</h3><button onclick="App.toggleFilterDrawer()">×</button></div><div id="mobile-filters"></div></div>
  ${this.renderFooter()}`;

  document.getElementById('mobile-filters') && (document.getElementById('mobile-filters').innerHTML = this.renderFilters());
  this.applyFilters();
};

App.renderFilters = function () {
  const cats = CATEGORIES.map(c => `<label class="filter-option"><input type="checkbox" value="${c.id}" ${this.shopFilters.category === c.id ? 'checked' : ''} onchange="App.toggleCategoryFilter(this.value, this.checked)"> ${c.name} <span class="count">${PRODUCTS.filter(p => p.category === c.id).length}</span></label>`).join('');
  const brands = BRANDS.map(b => `<label class="filter-option"><input type="checkbox" value="${b}" ${this.shopFilters.brand === b ? 'checked' : ''} onchange="App.toggleBrandFilter(this.value, this.checked)"> ${b} <span class="count">${PRODUCTS.filter(p => p.brand === b).length}</span></label>`).join('');
  return `
    <div class="filter-group"><h3>Category</h3>${cats}</div>
    <div class="filter-group"><h3>Brand</h3>${brands}</div>
    <div class="filter-group"><h3>Price Range</h3><div class="price-range-inputs"><input type="number" placeholder="Min" value="${this.shopFilters.minPrice}" onchange="App.shopFilters.minPrice=this.value;App.applyFilters()"><span>–</span><input type="number" placeholder="Max" value="${this.shopFilters.maxPrice}" onchange="App.shopFilters.maxPrice=this.value;App.applyFilters()"></div></div>
    <button class="btn btn-outline btn-sm btn-full" style="margin-top:16px" onclick="App.clearFilters()">Clear All Filters</button>`;
};

App.toggleCategoryFilter = function (v, checked) { this.shopFilters.category = checked ? v : ''; this.applyFilters(); };
App.toggleBrandFilter = function (v, checked) { this.shopFilters.brand = checked ? v : ''; this.applyFilters(); };
App.clearFilters = function () { this.shopFilters = { category: '', brand: '', minPrice: '', maxPrice: '', sort: this.shopFilters.sort }; this.renderShop(); };
App.toggleFilterDrawer = function () { document.getElementById('filter-drawer').classList.toggle('active'); document.getElementById('filter-drawer-overlay').classList.toggle('active'); };

App.applyFilters = function () {
  let filtered = [...PRODUCTS];
  const f = this.shopFilters;
  if (f.category) filtered = filtered.filter(p => p.category === f.category);
  if (f.brand) filtered = filtered.filter(p => p.brand === f.brand);
  if (f.minPrice) filtered = filtered.filter(p => p.price >= +f.minPrice);
  if (f.maxPrice) filtered = filtered.filter(p => p.price <= +f.maxPrice);
  switch (f.sort) {
    case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    case 'newest': filtered.sort((a, b) => b.newArrival - a.newArrival); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    default: filtered.sort((a, b) => b.featured - a.featured);
  }
  const container = document.getElementById('shop-products');
  const count = document.getElementById('result-count');
  if (container) container.innerHTML = filtered.length ? filtered.map(p => this.productCard(p)).join('') : '<p style="grid-column:1/-1;text-align:center;padding:60px;color:#999">No products match your filters.</p>';
  if (count) count.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`;
};

// ---------- PRODUCT DETAIL ----------
App.renderProduct = function (id) {
  const p = PRODUCTS.find(pr => pr.id === +id);
  if (!p) { document.getElementById('app').innerHTML = '<div class="container" style="padding:200px 0;text-align:center"><h2>Product not found</h2><a href="#/shop" class="btn btn-outline" style="margin-top:20px">Back to Shop</a></div>'; return; }
  const related = PRODUCTS.filter(r => r.category === p.category && r.id !== p.id).slice(0, 4);

  document.getElementById('app').innerHTML = `
  <div class="product-detail"><div class="container">
    <div class="product-detail-grid">
      <div class="product-gallery">
        <div class="product-gallery-main"><img id="main-product-img" src="${p.images[0]}" alt="${p.name}"></div>
        ${p.images.length > 1 ? `<div class="product-gallery-thumbs">${p.images.map((img, i) => `<img src="${img}" alt="${p.name}" class="${i === 0 ? 'active' : ''}" onclick="document.getElementById('main-product-img').src='${img}';document.querySelectorAll('.product-gallery-thumbs img').forEach(t=>t.classList.remove('active'));this.classList.add('active')">`).join('')}</div>` : ''}
      </div>
      <div class="product-info">
        <div class="product-breadcrumb"><a href="#/">Home</a> / <a href="#/shop">Shop</a> / <a href="#/shop?category=${p.category}">${CATEGORIES.find(c => c.id === p.category)?.name}</a> / ${p.name}</div>
        <div class="product-brand">${p.brand}</div>
        <h1>${p.name}</h1>
        <div class="product-price-detail"><span class="current">$${p.price}</span>${p.originalPrice ? `<span class="original">$${p.originalPrice}</span><span class="save">Save $${p.originalPrice - p.price}</span>` : ''}</div>
        <div class="product-rating-detail"><span class="stars">${this.renderStars(p.rating)}</span><span>${p.rating} (${p.reviews} reviews)</span></div>
        <p class="product-description">${p.description}</p>
        <div class="size-selector"><label>Size</label><div class="size-options">${p.sizes.map((s, i) => `<button class="size-option ${i === 0 ? 'selected' : ''}" onclick="document.querySelectorAll('.size-option').forEach(b=>b.classList.remove('selected'));this.classList.add('selected')">${s}</button>`).join('')}</div></div>
        <div class="color-selector"><label>Color</label><div class="color-options">${p.colors.map((c, i) => `<button class="color-option ${i === 0 ? 'selected' : ''}" onclick="document.querySelectorAll('.color-option').forEach(b=>b.classList.remove('selected'));this.classList.add('selected')">${c}</button>`).join('')}</div></div>
        <div class="quantity-row">
          <div class="quantity-control"><button onclick="let i=document.getElementById('qty-input');i.value=Math.max(1,+i.value-1)">−</button><input id="qty-input" type="number" value="1" min="1"><button onclick="let i=document.getElementById('qty-input');i.value=+i.value+1">+</button></div>
          <button class="btn btn-primary btn-lg" style="flex:1" onclick="App.addToCart(${p.id}, document.querySelector('.size-option.selected')?.textContent, document.querySelector('.color-option.selected')?.textContent, +document.getElementById('qty-input').value)">Add to Cart</button>
        </div>
        <div class="product-tabs">
          <div class="product-tabs-nav"><button class="active" onclick="App.switchTab(this,0)">Description</button><button onclick="App.switchTab(this,1)">Details</button><button onclick="App.switchTab(this,2)">Shipping</button></div>
          <div class="product-tab-content" id="tab-content">${p.description}</div>
        </div>
      </div>
    </div>
    ${related.length ? `<div style="margin-top:80px"><div class="section-header"><span class="overline">You May Also Like</span><h2>Related Products</h2></div><div class="product-grid">${related.map(r => this.productCard(r)).join('')}</div></div>` : ''}
  </div></div>${this.renderFooter()}`;

  this._tabData = [p.description, `<ul style="list-style:disc;padding-left:20px"><li>Category: ${CATEGORIES.find(c => c.id === p.category)?.name}</li><li>Brand: ${p.brand}</li><li>Available Sizes: ${p.sizes.join(', ')}</li><li>Colors: ${p.colors.join(', ')}</li><li>Rating: ${p.rating}/5 (${p.reviews} reviews)</li></ul>`, '<p>Free standard shipping on orders over $500. Express shipping available at checkout.</p><p>Delivery within 3-7 business days.</p><p>Free returns within 30 days of delivery.</p>'];
};

App.switchTab = function (btn, idx) {
  document.querySelectorAll('.product-tabs-nav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-content').innerHTML = this._tabData[idx];
};

// ---------- CART PAGE ----------
App.renderCart = function () {
  const app = document.getElementById('app');
  if (this.cart.length === 0) {
    app.innerHTML = `<div class="cart-page"><div class="container"><div class="cart-empty"><div style="font-size:80px;margin-bottom:20px">🛒</div><h2>Your Cart is Empty</h2><p>Looks like you haven't added anything to your cart yet.</p><a href="#/shop" class="btn btn-primary">Continue Shopping</a></div></div></div>${this.renderFooter()}`;
    return;
  }
  const subtotal = this.getCartTotal();
  const shipping = subtotal >= 500 ? 0 : 25;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  app.innerHTML = `
  <div class="cart-page"><div class="container">
    <h1>Shopping Cart</h1>
    <div class="cart-layout">
      <div class="cart-items">${this.cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
          <div class="cart-item-info">
            <div class="cart-item-brand">${item.brand}</div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">Size: ${item.size} · Color: ${item.color}</div>
            <div class="cart-item-bottom">
              <div class="quantity-control" style="border:1px solid var(--clr-border)">
                <button onclick="App.updateQty('${item.key}',${item.qty - 1})">−</button>
                <input type="number" value="${item.qty}" min="1" style="width:40px" onchange="App.updateQty('${item.key}',+this.value)">
                <button onclick="App.updateQty('${item.key}',${item.qty + 1})">+</button>
              </div>
              <span class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</span>
              <button class="cart-item-remove" onclick="App.removeFromCart('${item.key}')">Remove</button>
            </div>
          </div>
        </div>`).join('')}
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="cart-summary-row"><span>Subtotal</span><span>$${subtotal.toLocaleString()}</span></div>
        <div class="cart-summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '$' + shipping}</span></div>
        <div class="cart-summary-row"><span>Tax (8%)</span><span>$${tax.toLocaleString()}</span></div>
        <div class="cart-summary-row total"><span>Total</span><span>$${total.toLocaleString()}</span></div>
        <a href="#/checkout" class="btn btn-primary btn-full btn-lg" style="margin-top:24px">Proceed to Checkout</a>
        <a href="#/shop" class="btn btn-outline btn-full btn-sm" style="margin-top:12px">Continue Shopping</a>
      </div>
    </div>
  </div></div>${this.renderFooter()}`;
};

// ---------- CHECKOUT PAGE ----------
App.renderCheckout = function () {
  if (this.cart.length === 0) { location.hash = '#/cart'; return; }
  const subtotal = this.getCartTotal();
  const shipping = subtotal >= 500 ? 0 : 25;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  document.getElementById('app').innerHTML = `
  <div class="checkout-page"><div class="container">
    <h1>Checkout</h1>
    <div class="checkout-layout">
      <div>
        <div class="checkout-section"><h2>Shipping Information</h2>
          <div class="form-row"><div class="form-group"><label>First Name</label><input type="text" id="co-fname" required></div><div class="form-group"><label>Last Name</label><input type="text" id="co-lname" required></div></div>
          <div class="form-row single"><div class="form-group"><label>Email</label><input type="email" id="co-email" required></div></div>
          <div class="form-row single"><div class="form-group"><label>Address</label><input type="text" id="co-address" required></div></div>
          <div class="form-row"><div class="form-group"><label>City</label><input type="text" id="co-city" required></div><div class="form-group"><label>State / Province</label><input type="text" id="co-state" required></div></div>
          <div class="form-row"><div class="form-group"><label>ZIP / Postal Code</label><input type="text" id="co-zip" required></div><div class="form-group"><label>Country</label><select id="co-country"><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option><option>Germany</option><option>France</option></select></div></div>
          <div class="form-row single"><div class="form-group"><label>Phone</label><input type="tel" id="co-phone"></div></div>
        </div>
        <div class="checkout-section"><h2>Payment Method</h2>
          <div class="payment-methods">
            <label class="payment-method selected" onclick="document.querySelectorAll('.payment-method').forEach(m=>m.classList.remove('selected'));this.classList.add('selected');document.getElementById('card-form').style.display='block'"><input type="radio" name="payment" value="card" checked><div class="payment-method-info"><h4>Credit / Debit Card</h4><p>Visa, Mastercard, Amex</p></div><span class="payment-method-icon">💳</span></label>
            <label class="payment-method" onclick="document.querySelectorAll('.payment-method').forEach(m=>m.classList.remove('selected'));this.classList.add('selected');document.getElementById('card-form').style.display='none'"><input type="radio" name="payment" value="paypal"><div class="payment-method-info"><h4>PayPal</h4><p>Pay with your PayPal account</p></div><span class="payment-method-icon">🅿️</span></label>
            <label class="payment-method" onclick="document.querySelectorAll('.payment-method').forEach(m=>m.classList.remove('selected'));this.classList.add('selected');document.getElementById('card-form').style.display='none'"><input type="radio" name="payment" value="applepay"><div class="payment-method-info"><h4>Apple Pay</h4><p>Quick and secure payment</p></div><span class="payment-method-icon">📱</span></label>
            <label class="payment-method" onclick="document.querySelectorAll('.payment-method').forEach(m=>m.classList.remove('selected'));this.classList.add('selected');document.getElementById('card-form').style.display='none'"><input type="radio" name="payment" value="bank"><div class="payment-method-info"><h4>Bank Transfer</h4><p>Direct bank payment</p></div><span class="payment-method-icon">🏦</span></label>
          </div>
          <div class="card-form" id="card-form">
            <div class="form-row single"><div class="form-group"><label>Card Number</label><input type="text" placeholder="1234 5678 9012 3456" maxlength="19"></div></div>
            <div class="form-row"><div class="form-group"><label>Expiry</label><input type="text" placeholder="MM/YY" maxlength="5"></div><div class="form-group"><label>CVV</label><input type="text" placeholder="123" maxlength="4"></div></div>
            <div class="form-row single"><div class="form-group"><label>Name on Card</label><input type="text"></div></div>
          </div>
        </div>
        <button class="btn btn-accent btn-full btn-lg" onclick="App.placeOrder()">Place Order — $${total.toLocaleString()}</button>
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        ${this.cart.map(item => `<div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--clr-border)"><img src="${item.image}" alt="${item.name}" style="width:60px;height:70px;object-fit:cover;border-radius:6px"><div><div style="font-size:13px;font-weight:600">${item.name}</div><div style="font-size:12px;color:#999">${item.size} · ${item.color} · Qty: ${item.qty}</div><div style="font-size:14px;font-weight:700;margin-top:4px">$${(item.price * item.qty).toLocaleString()}</div></div></div>`).join('')}
        <div class="cart-summary-row" style="margin-top:16px"><span>Subtotal</span><span>$${subtotal.toLocaleString()}</span></div>
        <div class="cart-summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '$' + shipping}</span></div>
        <div class="cart-summary-row"><span>Tax</span><span>$${tax.toLocaleString()}</span></div>
        <div class="cart-summary-row total"><span>Total</span><span>$${total.toLocaleString()}</span></div>
      </div>
    </div>
  </div></div>${this.renderFooter()}`;
};

App.placeOrder = function () {
  const fields = ['co-fname', 'co-lname', 'co-email', 'co-address', 'co-city', 'co-state', 'co-zip'];
  const missing = fields.filter(f => !document.getElementById(f)?.value.trim());
  if (missing.length) { this.showToast('Please fill in all required fields', 'error'); return; }
  this.cart = []; this.saveCart();
  const orderId = 'LX-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  document.getElementById('app').innerHTML = `
  <div class="checkout-page"><div class="container"><div class="order-confirmation">
    <div class="check-circle">✓</div>
    <h2>Order Confirmed!</h2>
    <p>Thank you for your purchase. Your order <strong>${orderId}</strong> has been placed.</p>
    <p>A confirmation email will be sent shortly.</p>
    <a href="#/shop" class="btn btn-primary" style="margin-top:32px">Continue Shopping</a>
  </div></div></div>${this.renderFooter()}`;
};

// ---------- ABOUT PAGE ----------
App.renderAbout = function () {
  document.getElementById('app').innerHTML = `
  <div class="info-page"><div class="container">
    <h1>About LUXORA</h1>
    <p>Founded in 2020, LUXORA was born from a passion for exceptional craftsmanship and timeless design. We believe that luxury fashion should be accessible, sustainable, and deeply personal.</p>
    <p>Our team of curators travels the globe to discover emerging designers and established maisons who share our commitment to quality. Every piece in our collection has been carefully selected to meet our exacting standards of materials, construction, and design.</p>
    <h2>Our Mission</h2>
    <p>To democratize luxury fashion by connecting discerning customers with the world's finest designers and artisans. We believe that true luxury lies not in logos, but in the quality of materials, the precision of craftsmanship, and the stories behind each piece.</p>
    <h2>What Sets Us Apart</h2>
    <ul>
      <li>Curated selection of premium brands and independent designers</li>
      <li>Authenticity guaranteed on every item we sell</li>
      <li>Complimentary styling consultation with our fashion experts</li>
      <li>Sustainable packaging and carbon-neutral shipping</li>
      <li>Exclusive access to limited-edition collections and pre-releases</li>
    </ul>
    <h2>Our Values</h2>
    <p><strong>Quality Over Quantity</strong> — We carefully curate rather than mass-stock. Each item is inspected to ensure it meets LUXORA's standards.</p>
    <p><strong>Sustainability</strong> — We partner with brands committed to ethical sourcing and sustainable manufacturing practices.</p>
    <p><strong>Customer Experience</strong> — From browsing to delivery, every touchpoint is designed to exceed your expectations.</p>
    <div style="text-align:center;margin-top:48px"><a href="#/shop" class="btn btn-primary btn-lg">Explore Our Collection</a></div>
  </div></div>${this.renderFooter()}`;
};

// ---------- PRIVACY PAGE ----------
App.renderPrivacy = function () {
  document.getElementById('app').innerHTML = `
  <div class="info-page"><div class="container">
    <h1>Privacy Policy</h1>
    <p><em>Last updated: March 31, 2026</em></p>
    <p>At LUXORA, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
    <h2>Information We Collect</h2>
    <p>We collect information you provide directly to us, including:</p>
    <ul>
      <li>Name, email address, phone number, and shipping address when you create an account or place an order</li>
      <li>Payment information (credit card numbers, billing address) processed securely through our payment providers</li>
      <li>Communication preferences and correspondence with our customer service team</li>
      <li>Product reviews and feedback you choose to share</li>
    </ul>
    <h2>How We Use Your Information</h2>
    <ul>
      <li>Process and fulfill your orders, including shipping and returns</li>
      <li>Send order confirmations, shipping updates, and delivery notifications</li>
      <li>Personalize your shopping experience based on your preferences</li>
      <li>Send promotional emails (with your consent) about new arrivals and exclusive offers</li>
      <li>Improve our website, products, and customer service</li>
      <li>Detect and prevent fraud and unauthorized transactions</li>
    </ul>
    <h2>Information Sharing</h2>
    <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website, processing payments, and delivering orders.</p>
    <h2>Data Security</h2>
    <p>We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits to protect your personal information from unauthorized access, use, or disclosure.</p>
    <h2>Your Rights</h2>
    <p>You have the right to access, update, or delete your personal information at any time. You may also opt out of marketing communications by clicking the unsubscribe link in any promotional email.</p>
    <h2>Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact us at privacy@luxora.com.</p>
  </div></div>${this.renderFooter()}`;
};

// ---------- TERMS PAGE ----------
App.renderTerms = function () {
  document.getElementById('app').innerHTML = `
  <div class="info-page"><div class="container">
    <h1>Terms of Service</h1>
    <p><em>Last updated: March 31, 2026</em></p>
    <p>Welcome to LUXORA. By accessing and using our website, you agree to be bound by these Terms of Service. Please read them carefully before making any purchase.</p>
    <h2>1. General Terms</h2>
    <p>By using this website, you confirm that you are at least 18 years of age and have the legal authority to enter into these terms. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.</p>
    <h2>2. Products and Pricing</h2>
    <ul>
      <li>All prices are displayed in USD and include applicable taxes unless otherwise stated</li>
      <li>We reserve the right to modify prices without prior notice</li>
      <li>Product images are for illustration purposes; slight variations in color may occur</li>
      <li>Availability is subject to change without notice</li>
    </ul>
    <h2>3. Orders and Payment</h2>
    <p>By placing an order, you make an offer to purchase the selected products. Order confirmation does not guarantee availability. We accept Visa, Mastercard, American Express, PayPal, Apple Pay, and bank transfers.</p>
    <h2>4. Shipping and Delivery</h2>
    <ul>
      <li>Free standard shipping on orders over $500</li>
      <li>Standard delivery: 3-7 business days</li>
      <li>Express delivery: 1-3 business days (additional charges apply)</li>
      <li>International shipping available to select countries</li>
    </ul>
    <h2>5. Returns and Refunds</h2>
    <p>We offer a 30-day return policy for unworn items in original packaging with tags attached. Refunds are processed within 5-10 business days after receiving the returned item. Sale items are final sale unless defective.</p>
    <h2>6. Intellectual Property</h2>
    <p>All content on this website, including text, images, logos, and designs, is the property of LUXORA and protected by copyright laws. Unauthorized use or reproduction is strictly prohibited.</p>
    <h2>7. Limitation of Liability</h2>
    <p>LUXORA shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability shall not exceed the purchase price of the product in question.</p>
    <h2>8. Contact</h2>
    <p>For questions regarding these Terms of Service, please contact us at legal@luxora.com.</p>
  </div></div>${this.renderFooter()}`;
};
