document.addEventListener('DOMContentLoaded', function() {
    // Tema değiştirme
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 
            document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
        );
        themeToggle.innerHTML = document.documentElement.getAttribute('data-theme') === 'light' ? 
            '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // Mobil menü
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Ürün filtreleme
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Active class yönetimi
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Sepet işlevselliği
    let cartCount = 0;
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Animasyon efekti
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-shopping-bag"></i>';
            }, 1000);
        });
    });

    // Quick view
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Ürün detay sayfası yakında eklenecek!');
        });
    });

    // Scroll animasyonları
    AOS.init({
        duration: 800,
        once: true
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if(this.getAttribute('href') === '#') return;
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Mobil menüyü kapat
            if(navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
});
// Mobil Menü Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Body scroll'u engelle/aktif et
    if(mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Mobil menü linklerine tıklanınca menüyü kapat
document.querySelectorAll('.mobile-menu-content a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Sepet sayacını mobil ve desktop'ta senkronize et
const updateCartCount = () => {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = cartCount;
    });
};

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        cartCount++;
        updateCartCount();
        
        button.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-bag"></i>';
        }, 1000);
    });
});