// Sample items
const items = [
  { id: 1, name: "Black Knight", category: "skins", price: 2000, image: "https://via.placeholder.com/150?text=Black+Knight" },
  { id: 2, name: "Reaper", category: "skins", price: 1500, image: "https://via.placeholder.com/150?text=Reaper" },
  { id: 3, name: "Sledgehammer", category: "skins", price: 1200, image: "https://via.placeholder.com/150?text=Sledgehammer" },
  { id: 4, name: "Mako Glider", category: "gliders", price: 800, image: "https://via.placeholder.com/150?text=Mako+Glider" },
  { id: 5, name: "Bunny Brawler", category: "skins", price: 1500, image: "https://via.placeholder.com/150?text=Bunny+Brawler" },
  { id: 6, name: "Pump Shotgun", category: "weapons", price: 1000, image: "https://via.placeholder.com/150?text=Pump+Shotgun" },
  { id: 7, name: "Electro Shuffle", category: "emotes", price: 800, image: "https://via.placeholder.com/150?text=Electro+Shuffle" },
  { id: 8, name: "Take the L", category: "emotes", price: 500, image: "https://via.placeholder.com/150?text=Take+the+L" },
];

let cart = [];
let votes = {};

// Function to display items in the shop
function displayItems() {
  const itemsContainer = document.getElementById('items-container');
  itemsContainer.innerHTML = ''; // Clear the container

  items.forEach(item => {
      const itemCard = document.createElement('div');
      itemCard.className = 'item-card';
      itemCard.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.price} V-Bucks</p>
          <button onclick="addToCart(${item.id})">Add to Cart</button>
      `;
      itemsContainer.appendChild(itemCard);
  });

  const voteSelect = document.getElementById('vote-item');
  items.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      voteSelect.appendChild(option);
  });
}

// Function to add an item to the cart
function addToCart(itemId) {
  const item = items.find(i => i.id === itemId);
  cart.push(item);
  updateCartCount();
  alert(`${item.name} has been added to your cart!`);
}

// Function to update the cart count
function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
  updateCartItems();
}

// Function to update the cart items display
function updateCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `${item.name} - ${item.price} V-Bucks`;
      cartItemsContainer.appendChild(itemElement);
      total += item.price;
  });

  document.getElementById('total-price').textContent = total;
}

// Function to toggle cart visibility
function toggleCart() {
  const cartModal = document.getElementById('cart');
  cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
}

// Function to checkout
function checkout() {
  if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
  }
  alert("Thank you for your purchase!");
  cart = [];
  updateCartCount();
  toggleCart();
}

// Function to filter items
function filterItems() {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const categoryFilter = document.getElementById('category-filter').value;

  const filteredItems = items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery);
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
  });

  const itemsContainer = document.getElementById('items-container');
  itemsContainer.innerHTML = ''; // Clear the container

  filteredItems.forEach(item => {
      const itemCard = document.createElement('div');
      itemCard.className = 'item-card';
      itemCard.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.price} V-Bucks</p>
          <button onclick="addToCart(${item.id})">Add to Cart</button>
      `;
      itemsContainer.appendChild(itemCard);
  });
}

// Function to clear filters
function clearFilters() {
  document.getElementById('search').value = '';
  document.getElementById('category-filter').value = 'all';
  displayItems();
}

// Function to show a random item
function showRandomItem() {
  const randomIndex = Math.floor(Math.random() * items.length);
  const randomItem = items[randomIndex];
  document.getElementById('random-item-display').innerHTML = `
      <img src="${randomItem.image}" alt="${randomItem.name}">
      <h4>${randomItem.name}</h4>
      <p>${randomItem.price} V-Bucks</p>
  `;
}

// Function to handle voting for items
function voteForItem() {
  const selectedItemId = document.getElementById('vote-item').value;
  if (!selectedItemId) {
      alert("Please select an item to vote for!");
      return;
  }
  votes[selectedItemId] = (votes[selectedItemId] || 0) + 1;
  document.getElementById('vote-result').textContent = `You voted for ${items.find(i => i.id == selectedItemId).name}!`;
}

// Countdown Timer for Sales
function startCountdown(duration) {
  const timerElement = document.getElementById('timer');
  let endTime = Date.now() + duration * 1000;

  const interval = setInterval(() => {
      const remainingTime = endTime - Date.now();
      if (remainingTime <= 0) {
          clearInterval(interval);
          timerElement.textContent = "00:00:00";
          return;
      }
      const hours = String(Math.floor((remainingTime / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const minutes = String(Math.floor((remainingTime / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((remainingTime / 1000) % 60)).padStart(2, '0');
      timerElement.textContent = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}

// Start the countdown for 2 hours
startCountdown(7200);

// Display items on page load
window.onload = displayItems;