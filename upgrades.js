/* ===== SCROLL REVEAL + PARTICLE EFFECTS ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal for panels
    const panels = document.querySelectorAll('.panel');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    panels.forEach((panel, i) => {
        panel.style.transitionDelay = `${(i % 3) * 0.1}s`;
        observer.observe(panel);
    });

    // Particle effect for dark panels
    document.querySelectorAll('.panel').forEach(panel => {
        const bg = panel.getAttribute('style') || '';
        if (bg.includes('#0') || bg.includes('#1a')) {
            createParticles(panel, 6);
        }
    });

    function createParticles(container, count) {
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.style.cssText = `
                position:absolute;
                width:${1 + Math.random()*2}px;
                height:${1 + Math.random()*2}px;
                background:rgba(255,255,255,${0.1 + Math.random()*0.2});
                border-radius:50%;
                top:${Math.random()*100}%;
                left:${Math.random()*100}%;
                animation: particle-float ${3 + Math.random()*4}s ease-in-out infinite;
                animation-delay: ${Math.random()*3}s;
                pointer-events:none;
                z-index:1;
            `;
            container.appendChild(p);
        }
    }

    // Add particle float keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0%, 100% { transform: translate(0, 0); opacity: 0.1; }
            25% { transform: translate(${Math.random()*20-10}px, -15px); opacity: 0.4; }
            50% { transform: translate(${Math.random()*20-10}px, -30px); opacity: 0.2; }
            75% { transform: translate(${Math.random()*20-10}px, -15px); opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);

    // Panel click flash effect
    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            const flash = document.createElement('div');
            flash.style.cssText = `
                position:absolute; top:0; left:0; right:0; bottom:0;
                background:rgba(255,255,255,0.1);
                pointer-events:none; z-index:100;
                animation: clickFlash 0.3s ease forwards;
            `;
            panel.appendChild(flash);
            setTimeout(() => flash.remove(), 300);
        });
    });

    const flashStyle = document.createElement('style');
    flashStyle.textContent = `
        @keyframes clickFlash {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(flashStyle);

    // Smooth scroll to next page on page-number click
    document.querySelectorAll('.page-number').forEach(pn => {
        pn.style.cursor = 'pointer';
        pn.title = 'לחץ להמשך';
        pn.addEventListener('click', () => {
            const nextPage = pn.closest('.comic-page').nextElementSibling;
            if (nextPage) {
                nextPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});