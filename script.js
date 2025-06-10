document.addEventListener('DOMContentLoaded', () => {
    const showcase = document.getElementById('animation-showcase');
    const resumeContainer = document.getElementById('resume-container');

    // --- Create elements for animation ---
    const morphingElement = document.createElement('div');
    morphingElement.className = 'anim-element glass';
    showcase.appendChild(morphingElement);
    
    const iconsContainer = document.createElement('div');
    iconsContainer.style.position = 'absolute';
    iconsContainer.style.display = 'flex';
    iconsContainer.style.gap = '40px';
    iconsContainer.style.color = '#fff';
    iconsContainer.style.fontSize = '32px';
    iconsContainer.style.opacity = '0';
    morphingElement.appendChild(iconsContainer);
    iconsContainer.innerHTML = `<span><</span><span>+</span><span>○</span>`;

    // --- Animation Timeline ---
    const tl = anime.timeline({
        easing: 'spring(1, 80, 15, 0)',
        complete: () => {
            // Animation finished, hide showcase and show resume
            showcase.style.display = 'none';
            resumeContainer.classList.add('visible');
            addInteractivity();
        }
    });

    // 1. Dot appears and grows into a circle
    tl.add({
        targets: morphingElement,
        width: ['0px', '100px'],
        height: ['0px', '100px'],
        borderRadius: ['50%', '50%'],
        duration: 800
    })
    // 2. Circle morphs into a pill
    .add({
        targets: morphingElement,
        width: '300px',
        height: '80px',
        borderRadius: '50px',
        duration: 1000
    }, '-=300')
    // 3. Icons fade in
    .add({
        targets: iconsContainer,
        opacity: [0, 1],
        duration: 500
    }, '-=800')
    // 4. Icons fade out
    .add({
        targets: iconsContainer,
        opacity: 0,
        duration: 500
    }, '+=1000')
    // 5. Pill morphs back to a smaller circle
    .add({
        targets: morphingElement,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        duration: 1000
    }, '-=500')
    // 6. Circle splits into two elements (faked with opacity and position)
    .add({
        targets: morphingElement,
        begin: () => {
            // Create the second element for the split
            const secondElement = document.createElement('div');
            secondElement.className = 'anim-element glass';
            secondElement.style.width = '60px';
            secondElement.style.height = '60px';
            secondElement.style.borderRadius = '50%';
            secondElement.style.opacity = '0';
            showcase.appendChild(secondElement);
            
            anime({
                targets: secondElement,
                translateX: [anime.get(morphingElement, 'translateX'), anime.get(morphingElement, 'translateX') + 180],
                opacity: [0,1],
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                easing: 'spring(1, 80, 15, 0)'
            });
        },
        translateX: anime.get(morphingElement, 'translateX') - 100,
        width: '160px',
        borderRadius: '40px',
        easing: 'spring(1, 80, 15, 0)'
    })
    // 7. Everything fades out for the final transition
    .add({
        targets: '#animation-showcase .anim-element',
        opacity: 0,
        scale: 0.5,
        duration: 500,
        easing: 'easeInExpo'
    }, '+=1200');


    // --- Add interactivity to final resume elements ---
    function addInteractivity() {
        const toggleTrack = document.querySelector('.toggle-track');
        if (toggleTrack) {
            toggleTrack.addEventListener('click', () => {
                toggleTrack.classList.toggle('active');
            });
        }
        
        // Basic draggable slider (for demonstration)
        const sliderThumb = document.querySelector('.slider-thumb');
        let isDragging = false;
        
        sliderThumb.addEventListener('mousedown', () => { isDragging = true; });
        document.addEventListener('mouseup', () => { isDragging = false; });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const track = document.querySelector('.slider-track');
            const rect = track.getBoundingClientRect();
            let x = e.clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width)); // clamp
            sliderThumb.style.left = (x - sliderThumb.offsetWidth / 2) + 'px';
        });
    }
});
