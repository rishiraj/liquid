document.addEventListener('DOMContentLoaded', () => {
    const blob = document.getElementById('blob');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;
    const speed = 0.05; // Controls the "elasticity". Lower value = more lag.

    // Update mouse coordinates
    document.body.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animation loop for smooth movement
    function animate() {
        // Calculate the distance to the target
        const dx = mouseX - blobX;
        const dy = mouseY - blobY;

        // Move the blob a fraction of the distance
        blobX += dx * speed;
        blobY += dy * speed;

        // Apply the new position
        blob.style.transform = `translate(${blobX - blob.offsetWidth / 2}px, ${blobY - blob.offsetHeight / 2}px)`;

        // Request the next frame
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
});
