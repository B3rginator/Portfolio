// ===== HERO CUBE DRAG INTERACTION MODULE =====

export function initHeroCubeInteraction() {
    const heroCuriosity = document.querySelector('.hero-curiosity');
    const profileCube = document.querySelector('.profile-cube');
    const helperHint = heroCuriosity?.querySelector('.curiosity-helper');

    if (!heroCuriosity || !profileCube || !helperHint) {
        return;
    }

    document.body.appendChild(helperHint);

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let rotationX = -18;
    let rotationY = 18;
    let autoRotating = true;
    let isHovered = false;
    let recovering = false;
    let resumeTimer = null;
    let hintTimer = null;
    let hintDismissed = false;
    const AUTO_SPEED = 20;          // degrees per second (Y-axis spin)
    const RESUME_DELAY = 1500;      // ms before recovery starts
    const RECOVER_SPEED = 90;       // degrees per second for X-axis return
    const REST_X = -18;             // the "readable" tilt angle
    const HINT_DURATION = 3000;
    const HINT_OFFSET_Y = 20;

    const applyRotation = () => {
        profileCube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    };

    // --- Normalize angle to [-180, 180) ---
    const normalizeAngle = (a) => ((a % 360) + 540) % 360 - 180;

    // --- Animation loop ---
    let lastTime = null;
    const tick = (timestamp) => {
        if (lastTime !== null && !isDragging) {
            const dt = (timestamp - lastTime) / 1000;

            // Phase 1: recover X towards REST_X
            if (recovering) {
                const diff = normalizeAngle(REST_X - rotationX);
                if (Math.abs(diff) < 0.5) {
                    rotationX = REST_X;
                    recovering = false;
                    autoRotating = !isHovered;
                } else {
                    const step = Math.sign(diff) * Math.min(RECOVER_SPEED * dt, Math.abs(diff));
                    rotationX += step;
                }
            }

            // Phase 2: steady Y spin
            if (autoRotating) {
                rotationY += AUTO_SPEED * dt;
            }
        }
        lastTime = timestamp;
        applyRotation();
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const stopAutoRotation = () => {
        autoRotating = false;
        recovering = false;
        if (resumeTimer) {
            clearTimeout(resumeTimer);
            resumeTimer = null;
        }
    };

    const clearHintTimer = () => {
        if (hintTimer) {
            clearTimeout(hintTimer);
            hintTimer = null;
        }
    };

    const hideHint = () => {
        clearHintTimer();
        helperHint.classList.remove('is-visible');
    };

    const dismissHint = () => {
        hintDismissed = true;
        hideHint();
    };

    const positionHint = (event) => {
        if (event.clientX === undefined || event.clientY === undefined) {
            return;
        }

        const tooltipWidth = helperHint.offsetWidth;
        const tooltipHeight = helperHint.offsetHeight;
        const nextLeft = Math.min(
            Math.max(event.clientX, 12 + tooltipWidth / 2),
            window.innerWidth - 12 - tooltipWidth / 2
        );
        const nextTop = Math.max(12, event.clientY - tooltipHeight - HINT_OFFSET_Y);

        helperHint.style.left = `${nextLeft}px`;
        helperHint.style.top = `${nextTop}px`;
    };

    const showHint = (event) => {
        if (event.pointerType === 'touch' || hintDismissed) {
            return;
        }

        positionHint(event);
        helperHint.classList.add('is-visible');
        clearHintTimer();
        hintTimer = setTimeout(() => {
            dismissHint();
            hintTimer = null;
        }, HINT_DURATION);
    };

    const scheduleResume = () => {
        if (isHovered) {
            return;
        }
        if (resumeTimer) {
            clearTimeout(resumeTimer);
        }
        resumeTimer = setTimeout(() => {
            // Start recovering X back to the readable angle first
            recovering = true;
        }, RESUME_DELAY);
    };

    const handleHoverStart = (event) => {
        isHovered = true;
        stopAutoRotation();
        showHint(event);
    };

    const handleHoverEnd = () => {
        isHovered = false;
        hideHint();
        if (!isDragging) {
            scheduleResume();
        }
    };

    const handlePointerMove = (event) => {
        if (helperHint.classList.contains('is-visible')) {
            positionHint(event);
        }

        drag(event);
    };

    // --- Drag handlers ---
    const startDrag = (event) => {
        event.preventDefault();
        isDragging = true;
        stopAutoRotation();
        dismissHint();
        startX = event.clientX ?? event.pageX;
        startY = event.clientY ?? event.pageY;
        heroCuriosity.classList.add('is-dragging');

        if (event.pointerId !== undefined) {
            heroCuriosity.setPointerCapture(event.pointerId);
        }
    };

    const drag = (event) => {
        if (!isDragging) {
            return;
        }
        event.preventDefault();

        const clientX = event.clientX ?? event.pageX;
        const clientY = event.clientY ?? event.pageY;
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        rotationY += deltaX * 0.45;
        rotationX -= deltaY * 0.35;
        startX = clientX;
        startY = clientY;
    };

    const endDrag = (event) => {
        if (!isDragging) {
            return;
        }

        isDragging = false;
        heroCuriosity.classList.remove('is-dragging');
        scheduleResume();

        if (event.pointerId !== undefined) {
            try { heroCuriosity.releasePointerCapture(event.pointerId); } catch (_) {}
        }
    };

    heroCuriosity.addEventListener('pointerdown', startDrag);
    heroCuriosity.addEventListener('pointermove', handlePointerMove);
    heroCuriosity.addEventListener('pointerup', endDrag);
    heroCuriosity.addEventListener('pointercancel', endDrag);
    heroCuriosity.addEventListener('lostpointercapture', endDrag);
    heroCuriosity.addEventListener('pointerenter', handleHoverStart);
    heroCuriosity.addEventListener('pointerleave', handleHoverEnd);
}
