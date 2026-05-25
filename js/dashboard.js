// ============================================
// FANTASY TYPER DASHBOARD JAVASCRIPT
// ============================================

/**
 * Initialize the dashboard on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    initializePathSelection();
    playBackgroundMusic();
});

/**
 * Initialize path selection functionality
 */
function initializePathSelection() {
    const pathOptions = document.querySelectorAll('.path-option');

    pathOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const destination = this.getAttribute('data-destination');
            handlePathSelection(this, destination);
        });

        // Add keyboard support
        option.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const destination = this.getAttribute('data-destination');
                handlePathSelection(this, destination);
            }
        });
    });
}

/**
 * Handle path selection with footstep animation
 * @param {HTMLElement} pathElement - The clicked path element
 * @param {string} destination - The URL to navigate to
 */
function handlePathSelection(pathElement, destination) {
    // Disable further interactions
    disablePathSelection();

    // Get the signboard position for animation start point
    const signboard = pathElement.querySelector('.path-signboard');
    const signboardRect = signboard.getBoundingClientRect();
    const startX = signboardRect.left + signboardRect.width / 2;
    const startY = signboardRect.top + signboardRect.height / 2;

    // Get characters position for animation end point
    const charactersSection = document.querySelector('.characters-section');
    const charsRect = charactersSection.getBoundingClientRect();
    const endX = charsRect.left + charsRect.width / 2;
    const endY = charsRect.top + charsRect.height / 2;

    // Create footstep animation
    animateFootsteps(startX, startY, endX, endY, destination);
}

/**
 * Create and animate glowing footsteps along a path
 * @param {number} startX - Starting X coordinate
 * @param {number} startY - Starting Y coordinate
 * @param {number} endX - Ending X coordinate
 * @param {number} endY - Ending Y coordinate
 * @param {string} destination - URL to navigate to after animation
 */
function animateFootsteps(startX, startY, endX, endY, destination) {
    const container = document.querySelector('.footsteps-container');
    const numberOfFootsteps = 12;
    const animationDuration = 1200; // Total animation duration in ms
    const delayBetweenFootsteps = animationDuration / numberOfFootsteps;

    // Calculate path and create footsteps
    for (let i = 0; i < numberOfFootsteps; i++) {
        const progress = i / (numberOfFootsteps - 1);

        // Linear interpolation for smooth path
        const footstepX = startX + (endX - startX) * progress;
        const footstepY = startY + (endY - startY) * progress;

        // Create footstep element
        const footstep = document.createElement('div');
        footstep.className = 'footstep';
        footstep.style.left = footstepX + 'px';
        footstep.style.top = footstepY + 'px';
        footstep.style.transform = 'translate(-50%, -50%)';

        // Schedule footstep appearance
        setTimeout(() => {
            container.appendChild(footstep);

            // Remove footstep after animation completes
            setTimeout(() => {
                footstep.remove();
            }, 800);
        }, i * delayBetweenFootsteps);
    }

    // Navigate after animation completes
    setTimeout(() => {
        navigateToDestination(destination);
    }, animationDuration + 400);
}

/**
 * Navigate to destination page with smooth transition
 * @param {string} destination - URL to navigate to
 */
function navigateToDestination(destination) {
    // Create a smooth fade-out transition
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';

    setTimeout(() => {
        window.location.href = destination;
    }, 500);
}

/**
 * Disable all path selection interactions
 */
function disablePathSelection() {
    const pathOptions = document.querySelectorAll('.path-option');
    pathOptions.forEach(option => {
        option.style.pointerEvents = 'none';
        option.style.opacity = '0.6';
    });
}

/**
 * Re-enable all path selection interactions
 */
function enablePathSelection() {
    const pathOptions = document.querySelectorAll('.path-option');
    pathOptions.forEach(option => {
        option.style.pointerEvents = 'auto';
        option.style.opacity = '1';
    });
}

/**
 * Handle background music playback
 */
function playBackgroundMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');

    if (!backgroundMusic) return;

    // Attempt to play the audio
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(function(error) {
            console.log('Auto-play prevented. Audio will play on user interaction.');

            // Fallback: Play audio on first user interaction
            document.addEventListener(
                'click',
                function playOnClick() {
                    backgroundMusic.play().catch(function(err) {
                        console.error('Failed to play audio:', err);
                    });
                    document.removeEventListener('click', playOnClick);
                },
                { once: true }
            );
        });
    }
}

/**
 * Add ripple effect to paths on hover (enhanced visual feedback)
 */
document.addEventListener('DOMContentLoaded', function() {
    const pathOptions = document.querySelectorAll('.path-option');

    pathOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        option.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

/**
 * Ensure background music loops
 */
document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.3; // Set volume to 30% to avoid being too loud
    }
});
