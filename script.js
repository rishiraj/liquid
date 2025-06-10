document.addEventListener('DOMContentLoaded', () => {
    const glassContainer = document.getElementById('glass-container');
    const glassContent = document.getElementById('glass-content');
    const contentTemplates = document.getElementById('content-templates');

    // 1. --- MOUSE GLOW EFFECT ---
    glassContainer.addEventListener('mousemove', e => {
        const rect = glassContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glassContainer.style.setProperty('--mouse-x', `${x}px`);
        glassContainer.style.setProperty('--mouse-y', `${y}px`);
    });

    // 2. --- UI STATE AND CONTENT SWITCHING LOGIC ---
    const switchView = (targetId) => {
        // --- Phase 1: Fade out current content ---
        glassContent.classList.remove('visible');

        const handleFadeOutComplete = () => {
            // --- Phase 2: Morph the container ---
            const isNav = targetId === 'nav';
            glassContainer.className = 'glass-ui'; // Reset classes
            if (isNav) {
                glassContainer.classList.add('state-nav');
            } else {
                glassContainer.classList.add('state-content');
            }

            // --- Phase 3: Inject new content ---
            const newContentHTML = contentTemplates.querySelector(`[data-content-id="${targetId}"]`).innerHTML;
            glassContent.innerHTML = newContentHTML;

            // Add event listeners to newly added buttons
            addEventListenersToContent();
            
            // --- Phase 4: Fade in new content (handled by CSS transition-delay) ---
            // A tiny delay ensures the class is applied after the DOM update
            setTimeout(() => {
                glassContent.classList.add('visible');
            }, 50);
        };
        
        // Using setTimeout to simulate the end of the fade-out transition
        setTimeout(handleFadeOutComplete, 150); // Slightly less than CSS fade duration
    };

    // 3. --- EVENT LISTENER SETUP ---
    const addEventListenersToContent = () => {
        const buttons = glassContent.querySelectorAll('[data-target]');
        buttons.forEach(button => {
            // Prevent adding duplicate listeners
            if (!button.hasAttribute('data-listener-added')) {
                button.addEventListener('click', (e) => {
                    const targetId = e.currentTarget.dataset.target;
                    switchView(targetId);
                });
                button.setAttribute('data-listener-added', 'true');
            }
        });
    };
    
    // 4. --- INITIALIZE THE UI ---
    switchView('nav');
});
