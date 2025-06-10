document.addEventListener('DOMContentLoaded', () => {
    const blob = document.getElementById('blob');
    const container = document.getElementById('container');

    // --- 1. Blob Following & Interaction ---
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;
    const speed = 0.08; // Increased speed for a more responsive feel

    document.body.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateBlob() {
        const dx = mouseX - blobX;
        const dy = mouseY - blobY;
        blobX += dx * speed;
        blobY += dy * speed;
        blob.style.transform = `translate(${blobX - blob.offsetWidth / 2}px, ${blobY - blob.offsetHeight / 2}px)`;
        requestAnimationFrame(animateBlob);
    }
    animateBlob();

    // Blob click effect
    document.body.addEventListener('mousedown', () => blob.classList.add('grow'));
    document.body.addEventListener('mouseup', () => blob.classList.remove('grow'));

    // Blob focus effect on interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-element, a, button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => blob.classList.add('focus'));
        el.addEventListener('mouseleave', () => blob.classList.remove('focus'));
    });

    // --- 2. 3D Tilt Effect on Container ---
    if (container) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = container.offsetWidth / 2;
            const centerY = container.offsetHeight / 2;
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;  // Max 5deg rotation

            container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // --- 3. Scroll-Triggered Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply delay if specified
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                // Animate only once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });
});
