document.addEventListener('DOMContentLoaded', () => {
    const blob = document.getElementById('blob');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;

    // This value controls the "elasticity" or "lag" of the blob.
    // Lower value = more lag and a more 'fluid' feel.
    const speed = 0.05; 

    // Update mouse coordinates when the mouse moves
    document.body.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animation loop for smooth, continuous movement
    function animate() {
        // Calculate the distance between the blob's current position and the mouse
        const dx = mouseX - blobX;
        const dy = mouseY - blobY;

        // Move the blob a fraction of the distance towards the mouse
        blobX += dx * speed;
        blobY += dy * speed;

        // Apply the updated position. We center the blob on its coordinates.
        blob.style.transform = `translate(${blobX - (blob.offsetWidth / 2)}px, ${blobY - (blob.offsetHeight / 2)}px)`;

        // Schedule the next frame of the animation
        requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();
});
