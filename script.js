// Custom shipping dropdown script
document.addEventListener('DOMContentLoaded', function () {
  // Shipping dropdown
  const shippingDropdownToggle = document.querySelector('.custom-shipping-dropdown .dropdown-toggle');
  const shippingDropdownMenu = document.querySelector('.custom-shipping-dropdown .dropdown-menu');
  const selectedCountrySpan = document.querySelector('.custom-shipping-dropdown .selected-country');

  shippingDropdownToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    shippingDropdownMenu.style.display = expanded ? 'none' : 'block';
  });

  shippingDropdownMenu.querySelectorAll('li').forEach(function (item) {
    item.addEventListener('click', function () {
      const img = this.querySelector('img').src;
      const alt = this.querySelector('img').alt;
      const text = this.querySelector('span').textContent;

      selectedCountrySpan.textContent = text;
      shippingDropdownToggle.querySelector('img').src = img;
      shippingDropdownToggle.querySelector('img').alt = alt;

      shippingDropdownToggle.setAttribute('aria-expanded', false);
      shippingDropdownMenu.style.display = 'none';
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Close shipping dropdown if clicked outside
  document.addEventListener('click', function (e) {
    if (!shippingDropdownToggle.contains(e.target) && !shippingDropdownMenu.contains(e.target)) {
      shippingDropdownToggle.setAttribute('aria-expanded', false);
      shippingDropdownMenu.style.display = 'none';
    }
  });

  // Footer language dropdown
  const footerDropdownToggle = document.querySelector('.custom-footer-dropdown .dropdown-toggle');
  const footerDropdownMenu = document.querySelector('.custom-footer-dropdown .dropdown-menu');
  const selectedLanguageSpan = document.querySelector('.custom-footer-dropdown .selected-language');

  footerDropdownToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    footerDropdownMenu.style.display = expanded ? 'none' : 'block';
  });

  footerDropdownMenu.querySelectorAll('li').forEach(function (item) {
    item.addEventListener('click', function () {
      const img = this.querySelector('img').src;
      const alt = this.querySelector('img').alt;
      const text = this.querySelector('span').textContent;

      selectedLanguageSpan.textContent = text;
      footerDropdownToggle.querySelector('img').src = img;
      footerDropdownToggle.querySelector('img').alt = alt;

      footerDropdownToggle.setAttribute('aria-expanded', false);
      footerDropdownMenu.style.display = 'none';
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Close footer dropdown if clicked outside
  document.addEventListener('click', function (e) {
    if (!footerDropdownToggle.contains(e.target) && !footerDropdownMenu.contains(e.target)) {
      footerDropdownToggle.setAttribute('aria-expanded', false);
      footerDropdownMenu.style.display = 'none';
    }
  });

  // Search button click handler for index.html
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-input');

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', function () {
      const query = searchInput.value.trim().toLowerCase();
      if (query === 'electronics') {
        window.location.href = 'listview.html';
        searchInput.value = '';
      } else if (query === 'deals') {
        // Scroll to Deals and offers section on the same page
        const dealsSection = document.querySelector('.countdown-card');
        if (dealsSection) {
          dealsSection.scrollIntoView({ behavior: 'smooth' });
        }
        searchInput.value = '';
      } else if (query === 'home and outdoor') {
        // Scroll to Home and Outdoor section on the same page
        const homeOutdoorSection = document.querySelector('.bg2-card');
        if (homeOutdoorSection) {
          homeOutdoorSection.scrollIntoView({ behavior: 'smooth' });
        }
        searchInput.value = '';
      } else if (query === 'latest') {
        // Scroll to Recommended items section on the same page
        const recommendedSection = document.querySelector('.two-rows-cards-section');
        if (recommendedSection) {
          recommendedSection.scrollIntoView({ behavior: 'smooth' });
        }
        searchInput.value = '';
      } else {
        alert('No results found for "' + searchInput.value + '". Please try "electronics", "deals", "home and outdoor" or "latest".');
      }
    });
  }

  // Countdown timer initialization
  countdownTimer();

  // Add click event listener to cart icon to navigate to cart.html
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.style.cursor = 'pointer';
    cartIcon.addEventListener('click', function () {
      window.location.href = 'cart.html';
    });
  }

  // Add click event listeners to all product cards with class 'clickable-card' to add item to cart and navigate to cart.html
  const productCards = document.querySelectorAll('.clickable-card');
  productCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
      // Extract item details
      const img = card.querySelector('img').src;
      const alt = card.querySelector('img').alt;
      const name = card.querySelector('h3').textContent;

      // Extract price from <p> or <h4> tag
      let priceText = '';
      if (card.querySelector('p')) {
        priceText = card.querySelector('p').textContent;
      } else if (card.querySelector('h4')) {
        priceText = card.querySelector('h4').textContent;
      }

      // Extract numeric price using regex to handle formats like "From USD 19$", "$49.99", etc.
      const priceMatch = priceText.match(/[\d,.]+/);
      let price = priceMatch ? priceMatch[0].replace(/,/g, '') : '0';
      price = parseFloat(price);

      // Get existing cart from localStorage or initialize
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if item already in cart, increment quantity if so
      const existingItemIndex = cart.findIndex(item => item.name === name);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        // Add new item to cart
        cart.push({ img, alt, name, price, quantity: 1 });
      }

      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Navigate to cart page
      window.location.href = 'cart.html';
    });
  });
});

function countdownTimer() {
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 4); // 4 days from now

  function updateTimer() {
    const now = new Date();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// Price range slider and inputs synchronization
document.addEventListener('DOMContentLoaded', function () {
  const minRange = document.getElementById('minRange');
  const maxRange = document.getElementById('maxRange');
  const minInput = document.getElementById('minPrice');
  const maxInput = document.getElementById('maxPrice');
  const applyButton = document.getElementById('applyPrice');

  function syncMinRange() {
    let minVal = parseInt(minInput.value);
    let maxVal = parseInt(maxInput.value);
    if (minVal < 0) minVal = 0;
    if (minVal > maxVal) minVal = maxVal;
    minInput.value = minVal;
    minRange.value = minVal;
  }

  function syncMaxRange() {
    let minVal = parseInt(minInput.value);
    let maxVal = parseInt(maxInput.value);
    if (maxVal > 999999) maxVal = 999999;
    if (maxVal < minVal) maxVal = minVal;
    maxInput.value = maxVal;
    maxRange.value = maxVal;
  }

  minInput.addEventListener('input', syncMinRange);
  maxInput.addEventListener('input', syncMaxRange);
  minRange.addEventListener('input', function () {
    minInput.value = minRange.value;
    if (parseInt(minRange.value) > parseInt(maxRange.value)) {
      maxRange.value = minRange.value;
      maxInput.value = minRange.value;
    }
  });
  maxRange.addEventListener('input', function () {
    maxInput.value = maxRange.value;
    if (parseInt(maxRange.value) < parseInt(minRange.value)) {
      minRange.value = maxRange.value;
      minInput.value = maxRange.value;
    }
  });

  applyButton.addEventListener('click', function () {
    alert('Price range applied: $' + minInput.value + ' - $' + maxInput.value);
    // Placeholder for actual filter logic
  });
});
