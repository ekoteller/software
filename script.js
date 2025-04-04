// Mobil Menü Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Tema Değiştirme
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    
    // Tema bilgisini localStorage'a kaydet
    localStorage.setItem('theme', newTheme);
});

// Sayfa yüklendiğinde tema kontrolü
if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    themeToggle.innerHTML = localStorage.getItem('theme') === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// Ürün Verileri
const products = {
    1: {
        title: "Fel Classic Saat",
        price: "₺3,499.00",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "The Fel Classic serisi, şıklığın ve zarafetin simgesidir. %100 İsviçre mekanizması ile üretilmiş olup, 50 metre su geçirmezlik özelliğine sahiptir. Kasa çapı 42mm, kalınlığı 9mm'dir. Özel kutulu gönderim yapılır ve 5 yıl garanti kapsamındadır."
    },
    2: {
        title: "Elmas Kolye",
        price: "₺2,899.00",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "0.50 karat elmas taşlı, 14 ayar beyaz altın kolye. Modern kesim elmaslar ile özenle hazırlanmıştır. Tüm The Fel takılarında olduğu gibi ömür boyu cilalama garantisi sunulmaktadır. Özel hediye kutusuyla birlikte gönderilir."
    },
    3: {
        title: "Deri Kemerli Saat",
        price: "₺3,570.00",
        oldPrice: "₺4,200.00",
        image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "İtalyan derisi kayışıyla şıklığı konforla buluşturan bu saat, günlük kullanım için idealdir. Otomatik mekanizma, 42 saat güç rezervi ve safir cam koruma ile donatılmıştır. Su geçirmezlik 30 metre olup, 5 yıl garanti kapsamındadır."
    }
};

// Ürün Detay Popup
const productPopup = document.querySelector('.product-popup');
const viewButtons = document.querySelectorAll('.view-btn');
const closePopup = document.querySelector('.close-popup');

viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product');
        const product = products[productId];
        
        document.getElementById('popupImage').src = product.image;
        document.getElementById('popupTitle').textContent = product.title;
        
        if (product.oldPrice) {
            document.getElementById('popupPrice').innerHTML = `
                <span class="old-price">${product.oldPrice}</span> ${product.price}
            `;
        } else {
            document.getElementById('popupPrice').textContent = product.price;
        }
        
        document.getElementById('popupDesc').textContent = product.description;
        document.getElementById('popupPurchase').href = `https://www.example.com/satin-al?product=${productId}`;
        
        productPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closePopup.addEventListener('click', () => {
    productPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
});

productPopup.addEventListener('click', (e) => {
    if (e.target === productPopup) {
        productPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Satın Al Butonları
document.querySelectorAll('.purchase-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product');
        window.location.href = `https://www.example.com/satin-al?product=${productId}`;
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.getAttribute('href') === '#') return;
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Mobil menüyü kapat
            if (mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});