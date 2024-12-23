document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fetch and display products
    fetchProducts();

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
});

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card', 'fade-in');

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;

    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => addToCart(product));

    return card;
}

function addToCart(product) {
    // Implement cart functionality here
    console.log(`Added ${product.name} to cart`);
    // You can update the cart icon, show a notification, etc.
}

async function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;

    try {
        const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            alert('Thank you for subscribing to our newsletter!');
            event.target.reset();
        } else {
            throw new Error('Newsletter signup failed');
        }
    } catch (error) {
        console.error('Error signing up for newsletter:', error);
        alert('There was an error signing up for the newsletter. Please try again later.');
    }
}

// Implement smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add fade-in animation to elements as they enter the viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.category-card, .product-card, .about-content, #newsletter').forEach(el => {
    observer.observe(el);
});

