document.addEventListener('DOMContentLoaded', () => {
    // 1. AOS Animation Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, offset: 100 });
    }

    // 2. Back to Top Button
    const backToTop = document.getElementById('backToTopBtn');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
    }

    // 3. Animated Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    let animated = false;
    window.addEventListener('scroll', () => {
        const statsSection = document.getElementById('stats');
        if (statsSection && !animated) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                animateCounters();
                animated = true;
            }
        }
    });

    // 4. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const myBar = document.getElementById('myBar');
        if (myBar) myBar.style.width = scrolled + '%';
    });

    // 5. Typed.js Initialization
    if (document.querySelector('.typed-text') && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: ["Pintura.", "Electricidad.", "Gasfitería.", "Mantenimiento.", "tu Hogar."],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true
        });
    }

    // 6. Custom Cursor Logic
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursor-dot');
        if (cursor && cursorDot) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';
            });
            document.querySelectorAll('a, button, input, textarea, .accordion-button, .project-card').forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
            });
        }
    }

    // 7. Dynamic Copyright Year
    const copyrightElement = document.querySelector('.footer .container');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = `Copyright &copy; L&L Global Services ${currentYear}`;
    }
});

// 8. Preloader (Must be window.onload to wait for all assets)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
