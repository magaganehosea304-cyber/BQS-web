// BQS Web - Main JavaScript (Cart, iPhone Model & Storage dynamic pricing, Size selection, Clear Cart, Validation, Search)

const CART_KEY = 'bqs_cart';

// Retrieve cart from localStorage
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Update displayed price dynamically when iPhone model or storage changes
function updateIPhonePrice(el) {
  const card = el.closest('.product');
  if (!card) return;
  const base = Number(card.dataset.base) || 0;
  const modelSelect = card.querySelector('.iphone-model');
  const storageSelect = card.querySelector('.iphone-storage');

  const modelAdd = modelSelect ? Number(modelSelect.options[modelSelect.selectedIndex].dataset.add) : 0;
  const storageAdd = storageSelect ? Number(storageSelect.options[storageSelect.selectedIndex].dataset.add) : 0;

  const total = base + modelAdd + storageAdd;
  const priceEl = card.querySelector('.price');
  if (priceEl) {
    priceEl.textContent = 'R ' + total.toLocaleString('en-ZA');
  }
}

// Legacy storage price updater fallback
function updateStoragePrice(selectEl) {
  updateIPhonePrice(selectEl);
}

// Add shoe with selected size to cart
function addSelectedToCart(id, baseName, price, buttonEl) {
  const productCard = buttonEl.closest('.product');
  const optionSelect = productCard ? productCard.querySelector('.product-option') : null;
  const variant = optionSelect ? optionSelect.value : '';
  
  const fullName = variant ? `${baseName} (${variant})` : baseName;
  const uniqueKey = `${id}-${variant}`;

  const cart = getCart();
  const existing = cart.find(i => i.uniqueKey === uniqueKey);
  
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      uniqueKey,
      id,
      name: fullName,
      price: Number(price),
      qty: 1,
      variant
    });
  }

  saveCart(cart);
  updateCartUI();
  showToast(`${fullName} added to cart!`);
}

// Add iPhone with selected Model (Standard, Pro, Pro Max) and Storage to cart
function addIPhoneToCart(id, baseName, btnEl) {
  const card = btnEl.closest('.product');
  if (!card) return;
  const modelSel = card.querySelector('.iphone-model');
  const storageSel = card.querySelector('.iphone-storage');
  
  const model = modelSel ? modelSel.value : 'Standard';
  const storage = storageSel ? storageSel.value : '128GB';
  const priceText = card.querySelector('.price').textContent.replace(/[^\d]/g, '');
  const price = Number(priceText) || 0;

  const fullName = `${baseName} ${model} (${storage})`;
  const uniqueKey = `${id}-${model}-${storage}`;

  const cart = getCart();
  const existing = cart.find(i => i.uniqueKey === uniqueKey);
  
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      uniqueKey,
      id,
      name: fullName,
      price: price,
      qty: 1,
      variant: `${model} ${storage}`
    });
  }

  saveCart(cart);
  updateCartUI();
  showToast(`${fullName} added to cart! (R ${price.toLocaleString('en-ZA')})`);
}

// Legacy storage cart adder
function addSelectedStorageToCart(id, baseName, btnEl) {
  addIPhoneToCart(id, baseName, btnEl);
}

// Legacy fallback helper if called directly
function addToCart(id, name, price) {
  addSelectedToCart(id, name, price, { closest: () => null });
}

// Remove item from cart by uniqueKey
function removeFromCart(uniqueKey) {
  const cart = getCart().filter(i => i.uniqueKey !== uniqueKey);
  saveCart(cart);
  updateCartUI();
  showToast('Item removed from cart');
}

// Update item quantity in cart
function changeQty(uniqueKey, qty) {
  const cart = getCart();
  const item = cart.find(i => i.uniqueKey === uniqueKey);
  if (!item) return;
  item.qty = Math.max(1, Number(qty) || 1);
  saveCart(cart);
  updateCartUI();
}

// Clear the entire cart
function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    localStorage.removeItem(CART_KEY);
    updateCartUI();
    showToast('Cart cleared');
  }
}

// Calculate total item count and total price
function cartTotals(cart) {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return { count, total };
}

// Update cart interface (count, total, and itemized list)
function updateCartUI() {
  const cart = getCart();
  const { count, total } = cartTotals(cart);

  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = count;

  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = total.toLocaleString('en-ZA');

  const list = document.getElementById('cart-items');
  if (list) {
    list.innerHTML = '';
    if (cart.length === 0) {
      list.innerHTML = '<p style="color: #666; font-style: italic;">Your cart is empty.</p>';
    } else {
      cart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding: 6px; background: #f9f9f9; border-radius: 4px;';
        row.innerHTML = `
          <span style="flex: 2; font-weight: 500;">${item.name}</span>
          <span style="flex: 1; text-align: center;">R ${(item.price * item.qty).toLocaleString('en-ZA')}</span>
          <input type="number" min="1" max="25" value="${item.qty}" data-key="${item.uniqueKey}" class="qty-input" style="width: 70px; text-align: center; margin: 0 8px;">
          <button class="remove-btn" data-key="${item.uniqueKey}">Remove</button>
        `;
        list.appendChild(row);
      });

      list.querySelectorAll('.qty-input').forEach(inp => {
        inp.addEventListener('change', e => changeQty(e.target.dataset.key, e.target.value));
      });
      list.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => removeFromCart(e.target.dataset.key));
      });
    }
  }
}

// Toast notification popup
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#333;color:#fff;padding:12px 20px;border-radius:6px;z-index:9999;opacity:0;transition:opacity .3s;box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// Enquiry form validation, cost/availability response processing, and direct store email (`magaganehosea304@gmail.com``)
function setupEnquiryForm() {
  if (!location.pathname.includes('enquiry.html')) return;
  const form = document.querySelector('form');
  if (!form) return;

  const deliveryRadio = document.getElementById('delivery');
  const pickupRadio = document.getElementById('pickup');
  const deliveryContainer = document.getElementById('delivery-info-container');

  function toggleDeliveryInfo() {
    if (deliveryContainer) {
      deliveryContainer.style.display = deliveryRadio && deliveryRadio.checked ? 'block' : 'none';
    }
  }

  if (deliveryRadio && pickupRadio) {
    deliveryRadio.addEventListener('change', toggleDeliveryInfo);
    pickupRadio.addEventListener('change', toggleDeliveryInfo);
    toggleDeliveryInfo(); // initial state check
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.fullname?.value.trim();
    const email = form.email?.value.trim();
    const phone = form.phone?.value.trim();
    const enquiryType = form.querySelector('#enquiry-type')?.value || 'Product / Service Enquiry';
    
    if (!name) { alert('Please enter your full name.'); return; }
    if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
    if (!phone || phone.replace(/\D/g, '').length < 7) { alert('Please enter a valid phone number.'); return; }

    const serviceRadio = form.querySelector('input[name="services"]:checked');
    const serviceType = serviceRadio ? serviceRadio.value : 'pickup';
    const deliveryAddress = form.querySelector('#delivery-address')?.value.trim() || '';

    if (serviceType === 'delivery' && !deliveryAddress) {
      alert('Please enter your delivery address for delivery service.');
      return;
    }

    const cart = getCart();
    const { total } = cartTotals(cart);

    let responseAspect = '';
    if (enquiryType.includes('Product')) {
      responseAspect = cart.length > 0 
        ? `Estimated Total Cost: R ${total.toLocaleString('en-ZA')} | Availability: In stock, ready for ${serviceType}.`
        : `Product Availability: Available in store and online. Standard delivery or pickup options available.`;
    } else if (enquiryType.includes('Sponsorship')) {
      responseAspect = `Sponsorship Status: Application received. Our investment & partnership team will contact you regarding tier costs and availability.`;
    } else if (enquiryType.includes('Volunteer')) {
      responseAspect = `Volunteer Application: Received successfully. Opportunities are currently open in our Polokwane / Mankweng store network.`;
    } else {
      responseAspect = `Status: Enquiry processed successfully. Availability and fulfillment confirmed.`;
    }

    const storeEmail = 'magaganehosea304@gmail.com';
    const subject = encodeURIComponent(`${enquiryType} from ${name} - Best Quality Store`);
    
    let body = `Full Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nEnquiry Type: ${enquiryType}\nService Preference: ${serviceType.toUpperCase()}\n`;
    if (serviceType === 'delivery') {
      body += `Delivery Address: ${deliveryAddress}\n`;
    }
    if (cart.length > 0) {
      body += `\nCart Items:\n` + cart.map(i => `- ${i.name} x${i.qty} (R ${(i.price * i.qty).toLocaleString('en-ZA')})`).join('\n');
      body += `\n\nCalculated Total Cost: R ${total.toLocaleString('en-ZA')}`;
    }
    const userMsg = form.message?.value.trim();
    if (userMsg) {
      body += `\n\nAdditional Message:\n${userMsg}`;
    }

    const mailtoUrl = `mailto:${storeEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    form.reset();
    toggleDeliveryInfo();
    localStorage.removeItem(CART_KEY);
    updateCartUI();
  });
}

// Contact form validation, compilation into email, and direct store email (`magaganehosea304@gmail`)
function setupContactForm() {
  if (!location.pathname.includes('contact.html')) return;
  const form = document.querySelector('main section form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.fullname?.value.trim();
    const email = form.email?.value.trim();
    const phone = form.phone?.value.trim();
    const messageType = form.querySelector('#message-type')?.value || 'General Inquiry';
    const message = form.message?.value.trim();

    if (!name) { alert('Please enter your full name.'); return; }
    if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
    if (!phone || phone.replace(/\D/g, '').length < 7) { alert('Please enter a valid phone number.'); return; }
    if (!message) { alert('Please enter your message.'); return; }

    const storeEmail = 'magaganehosea304@gmail.com`';
    const subject = encodeURIComponent(`General Message (${messageType}) from ${name} - Best Quality Store`);
    const body = `Full Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage Type: ${messageType}\n\nMessage:\n${message}`;

    const mailtoUrl = `mailto:${storeEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;

    alert(`Message validated successfully!\n\nYour email client is opening to send your ${messageType.toLowerCase()} message directly to ${storeEmail}.`);
    window.location.href = mailtoUrl;

    form.reset();
  });
}

// Product search and filter helper with search button, Enter key, and clear (cross) button support on the left
function setupSearch() {
  const input = document.getElementById('search');
  const btn = document.getElementById('search-btn');
  const clearBtn = document.getElementById('clear-search-btn');
  if (!input) return;

  function updateClearButton() {
    if (clearBtn) {
      clearBtn.style.display = input.value.length > 0 ? 'block' : 'none';
    }
  }

  function performSearch() {
    const q = input.value.toLowerCase().trim();
    let matchCount = 0;
    document.querySelectorAll('.product').forEach(p => {
      const text = p.textContent.toLowerCase();
      const isMatch = text.includes(q);
      p.style.display = isMatch ? '' : 'none';
      if (isMatch) matchCount++;
    });
    updateClearButton();
    if (q) {
      showToast(`Found ${matchCount} product(s) matching "${input.value}"`);
    }
  }

  input.addEventListener('input', performSearch);
  if (btn) {
    btn.addEventListener('click', performSearch);
  }
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      input.value = '';
      performSearch();
      input.focus();
    });
  }

  updateClearButton();
}

// Setup payment methods on cart/checkout page (shows card details or pops up/displays store banking details for EFT)
function setupCheckoutPayment() {
  const payRadios = document.querySelectorAll('input[name="payment_method"]');
  const cardBox = document.getElementById('card-details-box');
  const eftBox = document.getElementById('eft-details-box');

  if (payRadios.length === 0) return;

  payRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'Credit/Debit Card') {
        if (cardBox) cardBox.style.display = 'block';
        if (eftBox) eftBox.style.display = 'none';
      } else if (this.value === 'EFT / Bank Transfer') {
        if (cardBox) cardBox.style.display = 'none';
        if (eftBox) eftBox.style.display = 'block';
        alert("Store Banking Details:\n\nBank: Capitec\nBranch Code: 470010\nAccount Number: 2244826267\nAccount Holder: MH MAGAGANE");
      } else {
        if (cardBox) cardBox.style.display = 'none';
        if (eftBox) eftBox.style.display = 'none';
      }
    });
  });

  const checkedRadio = document.querySelector('input[name="payment_method"]:checked');
  if (checkedRadio) {
    if (checkedRadio.value === 'Credit/Debit Card' && cardBox) {
      cardBox.style.display = 'block';
    } else if (checkedRadio.value === 'EFT / Bank Transfer' && eftBox) {
      eftBox.style.display = 'block';
    }
  }
}

// Highlight active navigation link
function markActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === page) {
      a.style.fontWeight = 'bold';
      a.style.textDecoration = 'underline';
    }
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
  updateCartUI();
  setupEnquiryForm();
  setupContactForm();
  setupSearch();
  setupCheckoutPayment();
  markActiveNav();

  window.updateIPhonePrice = updateIPhonePrice;
  window.updateStoragePrice = updateStoragePrice;
  window.addIPhoneToCart = addIPhoneToCart;
  window.addSelectedStorageToCart = addSelectedStorageToCart;
  window.addSelectedToCart = addSelectedToCart;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.clearCart = clearCart;
});

// Expose globally for inline event handlers
window.updateIPhonePrice = updateIPhonePrice;
window.updateStoragePrice = updateStoragePrice;
window.addIPhoneToCart = addIPhoneToCart;
window.addSelectedStorageToCart = addSelectedStorageToCart;
window.addSelectedToCart = addSelectedToCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;