// ============================================
// LUXORA - Core Application
// ============================================

const App = {
  cart: JSON.parse(localStorage.getItem('luxora_cart') || '[]'),
  currentPage: '',

  init() {
    this.renderShell();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
    this.updateCartCount();
  },

  saveCart() {
    localStorage.setItem('luxora_cart', JSON.stringify(this.cart));
    this.updateCartCount();
  },

  updateCartCount() {
    const badges = document.querySelectorAll('.cart-count');
    const count = this.cart.reduce((s, i) => s + i.qty, 0);
    badges.forEach(b => { b.textContent = count; b.style.display = count > 0 ? 'flex' : 'none'; b.classList.add('bounce'); setTimeout(() => b.classList.remove('bounce'), 400); });
  },

  addToCart(productId, size, color, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const s = size || product.sizes[0];
    const c = color || product.colors[0];
    const key = `${productId}-${s}-${c}`;
    const existing = this.cart.find(i => i.key === key);
    if (existing) { existing.qty += qty; } else {
      this.cart.push({ key, id: productId, name: product.name, brand: product.brand, price: product.price, image: product.images[0], size: s, color: c, qty });
    }
    this.saveCart();
    this.showToast(`${product.name} added to cart`, 'success');
  },

  removeFromCart(key) {
    this.cart = this.cart.filter(i => i.key !== key);
    this.saveCart();
    if (this.currentPage === 'cart') this.renderCart();
  },

  updateQty(key, qty) {
    const item = this.cart.find(i => i.key === key);
    if (item) { item.qty = Math.max(1, qty); this.saveCart(); if (this.currentPage === 'cart') this.renderCart(); }
  },

  getCartTotal() { return this.cart.reduce((s, i) => s + i.price * i.qty, 0); },

  showToast(msg, type = 'success') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${msg} <span class="toast-close" onclick="this.parentElement.remove()">×</span>`;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  },

  handleRoute() {
    const hash = window.location.hash || '#/';
    const [path, query] = hash.split('?');
    const segments = path.replace('#/', '').split('/');
    const page = segments[0] || 'home';
    this.currentPage = page;

    const app = document.getElementById('app');
    app.classList.add('page-transitioning');
    setTimeout(() => {
      window.scrollTo(0, 0);
      switch (page) {
        case 'home': this.renderHome(); break;
        case 'shop': this.renderShop(query); break;
        case 'product': this.renderProduct(segments[1]); break;
        case 'cart': this.renderCart(); break;
        case 'checkout': this.renderCheckout(); break;
        case 'about': this.renderAbout(); break;
        case 'privacy': this.renderPrivacy(); break;
        case 'terms': this.renderTerms(); break;
        default: this.renderHome();
      }
      app.classList.remove('page-transitioning');
      this.updateActiveNav();
    }, 300);
  },

  updateActiveNav() {
    document.querySelectorAll('.main-nav a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === (window.location.hash || '#/'));
    });
  },

  renderShell() {
    document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="./styles.css">');
    document.body.innerHTML = `
    <header class="site-header" id="site-header">
      <div class="header-top">Free shipping on orders over $500 · Easy 30-day returns</div>
      <div class="header-main">
        <a href="#/" class="logo">LUXO<span>RA</span></a>
        <nav class="main-nav" id="main-nav">
          <a href="#/">Home</a><a href="#/shop">Shop</a><a href="#/about">About</a><a href="#/privacy">Privacy</a><a href="#/terms">Terms</a>
        </nav>
        <div class="header-actions">
          <button onclick="App.openSearch()" aria-label="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></button>
          <a href="#/cart" aria-label="Cart" style="position:relative"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg><span class="cart-count" style="display:none">0</span></a>
          <button class="menu-toggle" id="menu-toggle" onclick="App.toggleMobileMenu()" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>
    <div class="search-overlay" id="search-overlay" onclick="if(event.target===this)App.closeSearch()">
      <div class="search-container"><input id="search-input" type="text" placeholder="Search products..." oninput="App.handleSearch(this.value)"><div class="search-results" id="search-results"></div></div>
    </div>
    <div class="mobile-nav-overlay" id="mobile-nav-overlay" onclick="App.toggleMobileMenu()"></div>
    <div class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav-header"><span class="logo">LUXO<span>RA</span></span><button class="mobile-nav-close" onclick="App.toggleMobileMenu()">×</button></div>
      <a href="#/" onclick="App.toggleMobileMenu()">Home</a><a href="#/shop" onclick="App.toggleMobileMenu()">Shop</a><a href="#/about" onclick="App.toggleMobileMenu()">About</a><a href="#/privacy" onclick="App.toggleMobileMenu()">Privacy</a><a href="#/terms" onclick="App.toggleMobileMenu()">Terms</a><a href="#/cart" onclick="App.toggleMobileMenu()">Cart</a>
    </div>
    <main id="app"></main>
    <button class="back-to-top" id="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑</button>
    <div class="toast-container" id="toast-container"></div>`;

    window.addEventListener('scroll', () => {
      document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 50);
      document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
    });
  },

  toggleMobileMenu() {
    document.getElementById('mobile-nav').classList.toggle('active');
    document.getElementById('mobile-nav-overlay').classList.toggle('active');
    document.getElementById('menu-toggle').classList.toggle('active');
  },

  openSearch() { document.getElementById('search-overlay').classList.add('active'); document.getElementById('search-input').focus(); },
  closeSearch() { document.getElementById('search-overlay').classList.remove('active'); document.getElementById('search-input').value = ''; document.getElementById('search-results').innerHTML = ''; },

  handleSearch(q) {
    const results = document.getElementById('search-results');
    if (q.length < 2) { results.innerHTML = ''; return; }
    const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()));
    results.innerHTML = filtered.length === 0 ? '<p style="padding:16px;color:#999">No products found</p>' :
      filtered.slice(0, 8).map(p => `<div class="search-result-item" onclick="App.closeSearch();location.hash='#/product/${p.id}'"><img src="${p.images[0]}" alt="${p.name}"><div class="search-result-info"><h4>${p.name}</h4><p>$${p.price}</p></div></div>`).join('');
  },

  renderStars(rating) {
    return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(rating));
  },

  productCard(p) {
    const badge = p.originalPrice ? `<span class="product-badge badge-sale">${Math.round((1 - p.price / p.originalPrice) * 100)}% OFF</span>` : p.newArrival ? '<span class="product-badge badge-new">New</span>' : p.bestSeller ? '<span class="product-badge badge-bestseller">Best Seller</span>' : '';
    return `<div class="product-card" onclick="location.hash='#/product/${p.id}'">
      <div class="product-card-image">${badge}<img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        <div class="product-card-actions"><button class="btn" onclick="event.stopPropagation();App.addToCart(${p.id})">Add to Cart</button></div>
      </div>
      <div class="product-card-info">
        <div class="product-card-brand">${p.brand}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-price"><span class="current">$${p.price}</span>${p.originalPrice ? `<span class="original">$${p.originalPrice}</span>` : ''}</div>
        <div class="product-card-rating"><span class="stars">${this.renderStars(p.rating)}</span><span class="count">(${p.reviews})</span></div>
      </div></div>`;
  },

  renderFooter() {
    return `<footer class="site-footer"><div class="container">
      <div class="footer-grid">
        <div class="footer-brand"><a href="#/" class="logo">LUXO<span>RA</span></a><p>Curating the finest in luxury fashion since 2020. Every piece tells a story of craftsmanship and timeless elegance.</p>
          <div class="footer-social"><a href="#">𝕏</a><a href="#">𝑓</a><a href="#">𝐈</a><a href="#">𝐏</a></div></div>
        <div class="footer-column"><h4>Shop</h4><ul><li><a href="#/shop?category=men">Men</a></li><li><a href="#/shop?category=women">Women</a></li><li><a href="#/shop?category=footwear">Footwear</a></li><li><a href="#/shop?category=accessories">Accessories</a></li><li><a href="#/shop?category=bags">Bags</a></li></ul></div>
        <div class="footer-column"><h4>Company</h4><ul><li><a href="#/about">About Us</a></li><li><a href="#/privacy">Privacy Policy</a></li><li><a href="#/terms">Terms of Service</a></li><li><a href="#">Contact</a></li></ul></div>
        <div class="footer-column"><h4>Support</h4><ul><li><a href="#">FAQ</a></li><li><a href="#">Shipping Info</a></li><li><a href="#">Returns</a></li><li><a href="#">Size Guide</a></li></ul></div>
      </div>
      <div class="footer-bottom"><span>© 2026 LUXORA. All rights reserved.</span><div class="payment-icons">💳 🏦 📱 🅿️</div></div>
    </div></footer>`;
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
