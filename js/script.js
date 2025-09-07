document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typed');
    const text = "مرکز پزشک هسته ای کاسپین";
    let index = 0;

    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    function typeText() {
        if (index < text.length) {
            textElement.textContent += text[index++];
            setTimeout(typeText, 100);
        } else {
            setTimeout(eraseText, 1000);
        }
    }

    function eraseText() {
        if (index > 0) {
            textElement.textContent = textElement.textContent.slice(0, -1);
            index--;
            setTimeout(eraseText, 50);
        } else {
            setTimeout(typeText, 500);
        }
    }

    typeText();

    const navLinks = document.querySelectorAll(".nav-links a");
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add("active");
        }
    });

    new Swiper('.my-train', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        allowTouchMove: false,
        speed: 6000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        breakpoints: {
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
            1400: { slidesPerView: 5 },
        }
    });
});
