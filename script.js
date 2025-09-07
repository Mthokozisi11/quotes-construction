// Global variables
let cart = [];
let currentService = null;
let searchTerm = '';

// Service data
const services = [
  {
    id: 'tiling',
    title: 'Premium Tiling Solutions',
    description: 'Transform your spaces with expert tiling services for bathrooms, kitchens, and more.',
    features: ['Ceramic & Porcelain', 'Natural Stone', 'Waterproofing', 'Custom Design'],
    image:"tiling.jpeg",
    options: [
      { id: 'bathroom', label: 'Bathroom Tiling' },
      { id: 'kitchen', label: 'Kitchen Backsplash' },
      { id: 'floor', label: 'Floor Tiling' },
      { id: 'wall', label: 'Wall Tiling' },
      { id: 'waterproof', label: 'Waterproofing' }
    ]
  },
  {
    id: 'plumbing',
    title: 'Professional Plumbing Services',
    description: 'Comprehensive plumbing solutions with 24/7 emergency service for all your needs.',
    features: ['Emergency Repairs', 'Pipe Installation', 'Fixture Upgrades', 'Leak Detection'],
    image: "plumbing.jpeg",
    options: [
      { id: 'wc', label: 'Install WC' },
      { id: 'bath', label: 'Install Bath' },
      { id: 'sink', label: 'Install Sink/Basin' },
      { id: 'shower', label: 'Install Shower' },
      { id: 'leaks', label: 'Fix Leaks' },
      { id: 'maintenance', label: 'Maintenance' },
      { id: 'kitchen_sink', label: 'Kitchen Sink' },
      { id: 'gutter', label: 'Gutter Installation' },
      { id: 'washing_machine', label: 'Washing Machine Fitting' },
      { id: 'taps', label: 'Install Taps' },
      { id: 'geyser', label: 'Install Geyser' },
      { id: 'blockage', label: 'Clear Blockage' },
      { id: 'septic', label: 'Build Septic Tank' }
    ]
  },
  {
    id: 'construction',
    title: 'Advanced Construction Management',
    description: 'Full-scale construction projects with professional project management and quality materials.',
    features: ['Project Planning', 'Quality Materials', 'Timeline Management', 'Safety Compliance'],
    image: "construction.jpeg",
    options: [
      { id: 'brick', label: 'Brick Laying' },
      { id: 'plaster', label: 'Plastering' },
      { id: 'roofing', label: 'Roofing' },
      { id: 'concrete', label: 'Concrete Slab' },
      { id: 'electricity', label: 'Electrical Installation' },
      { id: 'foundation', label: 'Foundation Work' },
      { id: 'insulation', label: 'Insulation' }
    ]
  },
  {
    id: 'carpentry',
    title: 'Artisan Carpentry Services',
    description: 'Masterful woodworking creating custom solutions that blend beauty with functionality.',
    features: ['Custom Cabinets', 'Hardwood Flooring', 'Trim & Molding', 'Furniture Restoration'],
    image: "carpentry.jpeg",
    options: [
      { id: 'builtin', label: 'Built-in Cupboards' },
      { id: 'kitchen_cupboards', label: 'Kitchen Cupboards' },
      { id: 'windows', label: 'Window Installation' },
      { id: 'doors', label: 'Door Installation' },
      { id: 'carport', label: 'Carport Construction' },
      { id: 'decking', label: 'Decking' },
      { id: 'flooring', label: 'Hardwood Flooring' }
    ]
  },
  {
    id: 'architecture',
    title: 'Innovative Architectural Design',
    description: 'Cutting-edge architectural design merging creativity with practicality for inspiring spaces.',
    features: ['3D Visualization', 'Sustainable Design', 'Permit Planning', 'Structural Engineering'],
    image: "architecture.jpeg",
    options: [
      { id: 'design', label: 'Architectural Design' },
      { id: 'planning', label: 'Planning Applications' },
      { id: 'renovation', label: 'Renovation Plans' },
      { id: 'extension', label: 'Extension Design' },
      { id: '3d_render', label: '3D Rendering' }
    ]
  },
  {
    id: 'paving',
    title: 'Expert Paving & Hardscaping',
    description: 'Professional paving services enhancing curb appeal with beautiful, durable surfaces.',
    features: ['Interlocking Stone', 'Asphalt & Concrete', 'Decorative Finishing', 'Drainage Solutions'],
    image: "paving.jpeg",
    options: [
      { id: 'driveway', label: 'Driveway Paving' },
      { id: 'walkway', label: 'Walkway Paving' },
      { id: 'patio', label: 'Patio Paving' },
      { id: 'concrete', label: 'Concrete Work' },
      { id: 'interlocking', label: 'Interlocking Stones' }
    ]
  },
  {
    id: 'landscaping',
    title: 'Professional Landscaping',
    description: 'Complete landscaping services to transform outdoor spaces into beautiful, functional areas.',
    features: ['Garden Design', 'Tree Services', 'Maintenance', 'Waste Collection'],
    image: "land.jpeg",
    options: [
      { id: 'grass', label: 'Grass Trimming' },
      { id: 'garden', label: 'Garden Maintenance' },
      { id: 'trees', label: 'Tree Felling' },
      { id: 'waste', label: 'Waste Collection' },
      { id: 'flowers', label: 'Flower Planting' },
      { id: 'irrigation', label: 'Irrigation Systems' }
    ]
  },
  {
    id: 'itsupport',
    title: 'IT Support & Technology',
    description: 'Complete technology solutions from computer repairs to network setup and automation systems.',
    features: ['Computer Repair', 'Network Setup', 'Software Installation', 'Security Systems'],
    image: "it.jpeg",
    options: [
      { id: 'computer', label: 'Computer Repairs' },
      { id: 'printer', label: 'Printer Configuration' },
      { id: 'software', label: 'Software Installation' },
      { id: 'networking', label: 'Network Setup' },
      { id: 'systems', label: 'Information System Design' },
      { id: 'web', label: 'Web & Software Development' },
      { id: 'cctv', label: 'CCTV Installation' },
      { id: 'gate', label: 'Sliding Gate Automation' },
      { id: 'electrical', label: 'Domestic Electrical Maintenance' }
    ]
  }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  renderServices();
  setupEventListeners();
  updateCartCount();
});

// Event listeners
function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', handleSearch);
 
  // Close modals when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target.id);
    }
  });
 
  // Close cart when clicking outside on mobile
  document.addEventListener('click', function(e) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartToggle = document.querySelector('.cart-toggle');
   
    if (cartSidebar.classList.contains('open') &&
        !cartSidebar.contains(e.target) &&
        !cartToggle.contains(e.target) &&
        window.innerWidth < 768) {
      toggleCart();
    }
  });
}

// Search functionality
function handleSearch(e) {
  searchTerm = e.target.value.toLowerCase();
  renderServices();
}

// Render services grid
function renderServices() {
  const servicesGrid = document.getElementById('servicesGrid');
  const noResults = document.getElementById('noResults');
 
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm) ||
    service.description.toLowerCase().includes(searchTerm) ||
    service.features.some(feature => feature.toLowerCase().includes(searchTerm))
  );
 
  if (filteredServices.length === 0) {
    servicesGrid.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }
 
  servicesGrid.style.display = 'grid';
  noResults.style.display = 'none';
 
  servicesGrid.innerHTML = filteredServices.map(service => `
    <div class="service-card" onclick="openServiceModal('${service.id}')">
      <img src="${service.image}" alt="${service.title}" class="service-image" />
      <div class="service-content">
        <h4 class="service-title">${service.title}</h4>
        <p class="service-description">${service.description}</p>
        <div class="service-features">
          ${service.features.map(feature => `
            <span class="service-feature">${feature}</span>
          `).join('')}
        </div>
        <button class="service-button">Select Service</button>
      </div>
    </div>
  `).join('');
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

function openServiceModal(serviceId) {
  currentService = services.find(s => s.id === serviceId);
  if (!currentService) return;
 
  document.getElementById('modalTitle').textContent = currentService.title;
 
  const serviceOptions = document.getElementById('serviceOptions');
  serviceOptions.innerHTML = currentService.options.map(option => `
    <div class="option-item">
      <input type="checkbox" id="option_${option.id}" value="${option.label}">
      <label for="option_${option.id}">${option.label}</label>
    </div>
  `).join('');
 
  document.getElementById('serviceNotes').value = '';
  openModal('serviceModal');
}

// Cart functions
function addToCart() {
  if (!currentService) return;
 
  const selectedOptions = Array.from(document.querySelectorAll('#serviceOptions input:checked'))
    .map(checkbox => checkbox.value);
 
  const notes = document.getElementById('serviceNotes').value.trim();
 
  if (selectedOptions.length === 0 && !notes) {
    showToast('Please select at least one option or add notes');
    return;
  }
 
  const cartItem = {
    id: Date.now(),
    service: currentService.title,
    options: selectedOptions,
    notes: notes
  };
 
  cart.push(cartItem);
  updateCartCount();
  updateCartDisplay();
  closeModal('serviceModal');
  showToast(`${currentService.title} added to project cart!`);
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCartCount();
  updateCartDisplay();
  showToast('Item removed from cart');
}

function clearCart() {
  if (cart.length === 0) return;
 
  if (confirm('Are you sure you want to clear all items from your cart?')) {
    cart = [];
    updateCartCount();
    updateCartDisplay();
    showToast('Cart cleared');
  }
}

function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.length;
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cartItems');
 
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">Your project cart is empty</p>';
    return;
  }
 
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-title">${item.service}</div>
      ${item.options.length > 0 ? `<div class="cart-item-options">Options: ${item.options.join(', ')}</div>` : ''}
      ${item.notes ? `<div class="cart-item-notes">Notes: ${item.notes}</div>` : ''}
      <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join('');
}

function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.toggle('open');
 
  if (cartSidebar.classList.contains('open')) {
    updateCartDisplay();
  }
}

// WhatsApp submission
function submitProject() {
  const clientName = document.getElementById('clientName').value.trim();
  const clientPhone = document.getElementById('clientPhone').value.trim();
  const clientAddress = document.getElementById('clientAddress').value.trim();
 
  if (!clientName || !clientPhone || !clientAddress) {
    showToast('Please fill in all contact information');
    return;
  }
 
  if (cart.length === 0) {
    showToast('Please add at least one service to your cart');
    return;
  }
 
  // Format the message
  const projectSummary = cart.map((item, index) => {
    let summary = `${index + 1}. ${item.service}`;
    if (item.options.length > 0) {
      summary += ` - ${item.options.join(', ')}`;
    }
    if (item.notes) {
      summary += ` (Notes: ${item.notes})`;
    }
    return summary;
  }).join('\n');
 
  const message = `🏗️ NEW PROJECT REQUEST - BuildTech Pro\n\n` +
    `👤 Client: ${clientName}\n` +
    `📱 Phone: ${clientPhone}\n` +
    `📍 Address: ${clientAddress}\n\n` +
    `📋 SERVICES REQUESTED:\n${projectSummary}\n\n` +
    `Please contact me with a detailed quote and timeline.\n\n` +
    `Thank you!\n- BuildTech Pro Quote System`;
 
  // WhatsApp numbers (update these with actual numbers)
  const companyNumber = '27670036186'; // Company's WhatsApp number

  // Open WhatsApp
  const whatsappUrl = `https://wa.me/${companyNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  
  const clienturl = `https://wa.me/${clientPhone}?text=${encodeURIComponent(message)}`;
  windows.location.href = clienturl;
 
  // Show success message
  showToast('Quote request sent via WhatsApp!');
 
  // Clear form and cart
  document.getElementById('clientName').value = '';
  document.getElementById('clientPhone').value = '';
  document.getElementById('clientAddress').value = '';
  cart = [];
  updateCartCount();
  updateCartDisplay();
 
  // Close cart
  setTimeout(() => {
    toggleCart();
  }, 2000);
}

// Lightbox functions
function openLightbox(src) {
  document.getElementById('lightboxImage').src = src;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// Utility functions
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
 
  toastMessage.textContent = message;
  toast.classList.add('show');
 
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Normalize SA phone numbers
function normalizeSANumber(phone) {
  const digits = phone.replace(/\D/g, '');
 
  if (digits.startsWith('27')) {
    return digits;
  } else if (digits.startsWith('0')) {
    return '27' + digits.slice(1);
  } else if (digits.length === 9) {
    return '27' + digits;
  }
 
  return digits;
}

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleCart = toggleCart;
window.clearCart = clearCart;
window.submitProject = submitProject;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.scrollToTop = scrollToTop;