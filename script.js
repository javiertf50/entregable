// Datos de productos (en un caso real, estos vendrían de una API o base de datos)
const products = [
    {
        id: 1,
        name: "Laptop HP Pavilion",
        price: 899.99,
        image: "assets/images/laptop1.jpg",
        rating: 4,
        category: "laptops"
    },
    {
        id: 2,
        name: "Smartphone Samsung Galaxy S21",
        price: 799.99,
        image: "assets/images/phone1.jpg",
        rating: 5,
        category: "smartphones"
    },
    {
        id: 3,
        name: "Tablet Apple iPad Air",
        price: 599.99,
        image: "assets/images/tablet1.jpg",
        rating: 4,
        category: "tablets"
    },
    {
        id: 4,
        name: "Audífonos Sony WH-1000XM4",
        price: 349.99,
        image: "assets/images/headphones1.jpg",
        rating: 5,
        category: "accesorios"
    }
];

// Cargar productos destacados
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.querySelector('.products-grid');
    
    if(productsGrid) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let stars = '';
            for(let i = 0; i < 5; i++) {
                if(i < product.rating) {
                    stars += '<i class="fas fa-star"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price">$${product.price.toFixed(2)}</div>
                    <div class="rating">${stars}</div>
                    <a href="#" class="btn">Añadir al carrito</a>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }
    
    // Simular carga de productos (en un caso real sería una llamada AJAX)
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if(loading) loading.style.display = 'none';
    }, 1000);
});

// Funcionalidad del carrito (simplificada)
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if(product) {
        cart.push(product);
        updateCartCount();
        showNotification(`${product.name} añadido al carrito`);
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if(cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'block' : 'none';
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Event listeners para botones "Añadir al carrito"
document.addEventListener('click', function(e) {
    if(e.target.classList.contains('btn') && e.target.textContent.includes('Añadir')) {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        const productId = parseInt(productCard.dataset.id);
        addToCart(productId);
    }
});