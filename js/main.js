/**
 * AI Pipeline Portfolio — Workflow Engine (Optimized)
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initThemeSwitcher();
    initAdvancedLoader();
    initBackgroundCanvas();
    initWorkflow();
    initScrollObserver();
    initCounters();
    initSmoothScroll();
    initNotebook();
});

/* ============ NAVBAR ============ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.navbar__toggle');
    const mobileMenuLinks = document.querySelectorAll('.navbar__mobile-link');
    let lastScroll = 0;

    if (!navbar) return;

    // Handle scroll hide/show
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll <= 0) {
            navbar.classList.remove('hidden');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('menu-open')) {
            // Scroll down & menu closed -> hide
            navbar.classList.add('hidden');
        } else {
            // Scroll up -> show
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });

    // Handle mobile toggle
    if (toggle) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when a link is clicked
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('menu-open');
        });
    });
}

/* ============ THEME SWITCHER ============ */
window.globalCanvasRGB = '157, 0, 255'; // Default purple
function initThemeSwitcher() {
    const btns = document.querySelectorAll('.theme-btn');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'purple';
    applyTheme(savedTheme);

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-set');
            applyTheme(theme);
        });
    });

    function applyTheme(theme) {
        if (theme === 'purple') root.removeAttribute('data-theme');
        else root.setAttribute('data-theme', theme);

        btns.forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.theme-btn[data-set="${theme}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        localStorage.setItem('portfolio-theme', theme);

        if (theme === 'blue') window.globalCanvasRGB = '0, 136, 255';
        else if (theme === 'emerald') window.globalCanvasRGB = '0, 255, 136';
        else window.globalCanvasRGB = '157, 0, 255';

        // Trigger resize to rebuild canvas grid with new colors
        window.dispatchEvent(new Event('resize'));
    }
}

/* ============ ADVANCED AI LOADER ============ */
function initAdvancedLoader() {
    const loader = document.getElementById('advanced-loader');
    if (!loader) return;

    // Terminal Log Sequence
    const terminal = document.getElementById('loader-terminal');
    const logs = [
        '[BOOT] Neural engine initializing...',
        '[CORE] Loading cognitive models...',
        '[DATA] Syncing spatial matrices...',
        '[AI] Evaluating user access parameters...',
        '[AUTH] Request accepted. Decrypting profile...',
        '[SYSTEM] All systems nominal. Rendering interface.'
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
        if (logIndex < logs.length) {
            const span = document.createElement('span');
            span.textContent = `> ${logs[logIndex]}`;
            if (terminal) terminal.appendChild(span);
            logIndex++;
        } else {
            clearInterval(logInterval);
        }
    }, 450);

    // Hacker Text Effect for Titles
    function decryptText(element, speed) {
        if (!element) return;
        const targetText = element.getAttribute('data-text');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let iteration = 0;
        const interval = setInterval(() => {
            element.textContent = targetText
                .split('')
                .map((letter, index) => {
                    if (index < iteration) return targetText[index];
                    if (targetText[index] === ' ') return ' ';
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            if (iteration >= targetText.length) clearInterval(interval);
            iteration += speed;
        }, 30);
    }

    decryptText(document.getElementById('loader-title'), 1 / 3);
    setTimeout(() => {
        decryptText(document.getElementById('loader-title-highlight'), 1 / 3);
    }, 400);

    // Progress Bar Animation
    const progressBar = document.getElementById('loader-progress-bar');
    const progressGlow = document.getElementById('loader-progress-glow');
    let progress = 0;
    const duration = 2800; // 2.8 seconds timeline
    const startTime = performance.now();

    function updateProgress(currentTime) {
        const elapsed = currentTime - startTime;
        progress = Math.min((elapsed / duration) * 100, 100);

        // Non-linear progress (starts fast, slows down, then pop to 100)
        let visualProgress = progress;
        if (progress < 40) visualProgress = progress * 1.5;
        else if (progress < 80) visualProgress = 60 + (progress - 40) * 0.5;
        else if (progress < 95) visualProgress = 80 + (progress - 80) * 1.3;
        else visualProgress = 100;

        visualProgress = Math.min(visualProgress, 100);
        if (progressBar) progressBar.style.width = `${visualProgress}%`;
        if (progressGlow) progressGlow.style.left = `${visualProgress}%`;

        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        } else {
            // End sequence
            setTimeout(() => {
                loader.classList.add('flash'); // triggers the big bang core expansion

                setTimeout(() => {
                    loader.classList.add('hidden');

                    setTimeout(() => {
                        if (loader.parentNode) loader.parentNode.removeChild(loader);
                    }, 800);
                }, 600); // Wait for flash to cover screen
            }, 300);
        }
    }

    requestAnimationFrame(updateProgress);
}

/* ============ BACKGROUND CANVAS — OPTIMIZED ============ */
function initBackgroundCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;
    let bgNodes = [];
    let bgConnections = [];
    let bgPackets = [];

    // Pre-rendered dot grid on offscreen canvas
    let gridCanvas = null;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        buildGridCache();
        generateNodes();
        updateConnections();
    }

    /* ---- Cached Dot Grid (rendered once) ---- */
    function buildGridCache() {
        gridCanvas = document.createElement('canvas');
        gridCanvas.width = canvas.width;
        gridCanvas.height = canvas.height;
        const gctx = gridCanvas.getContext('2d');
        const spacing = 40;
        gctx.fillStyle = `rgba(${window.globalCanvasRGB}, 0.045)`;
        for (let x = spacing; x < gridCanvas.width; x += spacing) {
            for (let y = spacing; y < gridCanvas.height; y += spacing) {
                gctx.fillRect(x, y, 1.5, 1.5); // fillRect is faster than arc
            }
        }
    }

    function drawDotGrid() {
        if (gridCanvas) ctx.drawImage(gridCanvas, 0, 0);
    }

    /* ---- Decorative Square Nodes ---- */
    class BgNode {
        constructor() { this.init(); }
        init() {
            this.x = 40 + Math.random() * (canvas.width - 80);
            this.y = 40 + Math.random() * (canvas.height - 80);
            this.size = 28 + Math.random() * 30;
            this.borderRadius = 6 + Math.random() * 4;
            this.borderOpacity = 0.06 + Math.random() * 0.06;
            this.driftX = (Math.random() - 0.5) * 0.1;
            this.driftY = (Math.random() - 0.5) * 0.05;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.hasIcon = Math.random() > 0.4;
            this.iconType = Math.floor(Math.random() * 4);
            this.currentOpacity = this.borderOpacity;
        }
        update(t) {
            this.x += this.driftX;
            this.y += this.driftY;
            if (this.x < -80 || this.x > canvas.width + 80 ||
                this.y < -80 || this.y > canvas.height + 80) this.init();
            // Update pulse only every 3 frames for perf
            if (t % 3 === 0) {
                this.currentOpacity = this.borderOpacity + Math.sin(t * 0.008 + this.pulsePhase) * 0.02;
            }
        }
        draw() {
            const half = this.size / 2;
            ctx.fillStyle = 'rgba(10, 14, 26, 0.6)';
            roundRect(ctx, this.x - half, this.y - half, this.size, this.size, this.borderRadius);
            ctx.fill();
            ctx.strokeStyle = `rgba(${window.globalCanvasRGB}, ${this.currentOpacity})`;
            ctx.lineWidth = 1.2;
            roundRect(ctx, this.x - half, this.y - half, this.size, this.size, this.borderRadius);
            ctx.stroke();
            if (this.hasIcon) this.drawIcon();
        }
        drawIcon() {
            const s = this.size * 0.18;
            const op = this.currentOpacity * 0.6;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.strokeStyle = `rgba(${window.globalCanvasRGB}, ${op})`;
            ctx.fillStyle = `rgba(${window.globalCanvasRGB}, ${op})`;
            ctx.lineWidth = 1;
            switch (this.iconType) {
                case 0:
                    ctx.fillRect(-2, -2, 4, 4);
                    break;
                case 1:
                    ctx.beginPath();
                    ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
                    ctx.moveTo(0, -s); ctx.lineTo(0, s);
                    ctx.stroke();
                    break;
                case 2:
                    ctx.beginPath();
                    ctx.moveTo(-s * 0.4, -s); ctx.lineTo(-s, 0); ctx.lineTo(-s * 0.4, s);
                    ctx.moveTo(s * 0.4, -s); ctx.lineTo(s, 0); ctx.lineTo(s * 0.4, s);
                    ctx.stroke();
                    break;
                case 3:
                    for (let i = -1; i <= 1; i++) ctx.fillRect(-s * 0.6, i * s * 0.5 - 1, s * 1.2, 1.5);
                    break;
            }
            ctx.restore();
        }
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    /* ---- Connections (NO shadowBlur) ---- */
    function drawConnection(a, b, opacity) {
        const ax = a.x, ay = a.y, bx = b.x, by = b.y;
        const midX = (ax + bx) / 2;
        ctx.strokeStyle = `rgba(${window.globalCanvasRGB}, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(midX, ay);
        ctx.lineTo(midX, by);
        ctx.lineTo(bx, by);
        ctx.stroke();
        // Diamond at elbows (simple fill, no shadow)
        drawDiamond(midX, ay, opacity * 2);
        drawDiamond(midX, by, opacity * 2);
    }

    function drawDiamond(x, y, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(${window.globalCanvasRGB}, ${Math.min(opacity, 0.5)})`;
        ctx.fillRect(-3, -3, 6, 6);
        ctx.restore();
    }

    /* ---- Data Packets (NO shadowBlur) ---- */
    class BgPacket {
        constructor(a, b) {
            this.a = a; this.b = b;
            this.progress = Math.random();
            this.speed = 0.002 + Math.random() * 0.002;
        }
        update() {
            this.progress += this.speed;
            if (this.progress > 1) this.progress = 0;
        }
        draw() {
            const ax = this.a.x, ay = this.a.y;
            const bx = this.b.x, by = this.b.y;
            const midX = (ax + bx) / 2;
            const s1 = Math.abs(midX - ax), s2 = Math.abs(by - ay), s3 = Math.abs(bx - midX);
            const total = s1 + s2 + s3;
            if (total === 0) return;
            const r1 = s1 / total, r2 = (s1 + s2) / total;
            let x, y;
            if (this.progress < r1) {
                x = ax + (midX - ax) * (this.progress / r1); y = ay;
            } else if (this.progress < r2) {
                x = midX; y = ay + (by - ay) * ((this.progress - r1) / (r2 - r1));
            } else {
                x = midX + (bx - midX) * ((this.progress - r2) / (1 - r2)); y = by;
            }
            const fade = Math.min(this.progress * 6, 1) * Math.min((1 - this.progress) * 6, 1);
            ctx.fillStyle = `rgba(${window.globalCanvasRGB}, ${fade * 0.7})`;
            ctx.fillRect(x - 2, y - 2, 4, 4); // rect faster than arc
        }
    }

    function generateNodes() {
        bgNodes = [];
        // Fewer nodes — max 10 visible in viewport
        const count = Math.max(8, Math.floor((canvas.width * canvas.height) / 120000));
        for (let i = 0; i < count; i++) bgNodes.push(new BgNode());
    }

    function updateConnections() {
        bgConnections = [];
        bgPackets = [];
        const maxDist = 300;
        for (let i = 0; i < bgNodes.length; i++) {
            let c = 0;
            for (let j = i + 1; j < bgNodes.length && c < 1; j++) {
                const dx = bgNodes[i].x - bgNodes[j].x;
                const dy = bgNodes[i].y - bgNodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist && dist > 80) {
                    bgConnections.push({ a: bgNodes[i], b: bgNodes[j], opacity: (1 - dist / maxDist) * 0.08 });
                    bgPackets.push(new BgPacket(bgNodes[i], bgNodes[j]));
                    c++;
                }
            }
        }
    }

    resize();
    window.addEventListener('resize', () => { resize(); });

    let animFrame;
    let connTimer = 0;

    function animate() {
        time++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawDotGrid();
        bgNodes.forEach(n => { n.update(time); n.draw(); });
        connTimer++;
        if (connTimer % 180 === 0) updateConnections();
        bgConnections.forEach(c => drawConnection(c.a, c.b, c.opacity));
        bgPackets.forEach(p => { p.update(); p.draw(); });
        animFrame = requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(animFrame);
        else animate();
    });
}

/* ============ WORKFLOW DIAGRAM ============ */
function initWorkflow() {
    const svg = document.getElementById('workflow-svg');
    const container = document.getElementById('workflow');
    if (!svg || !container) return;

    const NS = 'http://www.w3.org/2000/svg';
    const hubId = 'wf-hub';

    const connections = [
        { from: hubId, to: 'wf-about' },
        { from: hubId, to: 'wf-skills' },
        { from: hubId, to: 'wf-projects' },
        { from: hubId, to: 'wf-experience' },
        { from: hubId, to: 'wf-contact' },
        { from: 'wf-about', to: 'wf-skills', style: 'dashed' },
        { from: 'wf-projects', to: 'wf-experience', style: 'dashed' },
    ];

    function getNodeCenter(id) {
        const el = document.getElementById(id);
        const cr = container.getBoundingClientRect();
        const nr = el.getBoundingClientRect();
        return { x: nr.left + nr.width / 2 - cr.left, y: nr.top + nr.height / 2 - cr.top };
    }

    function drawConnections() {
        svg.innerHTML = '';
        const defs = document.createElementNS(NS, 'defs');
        const filter = document.createElementNS(NS, 'filter');
        filter.setAttribute('id', 'glow');
        filter.setAttribute('x', '-50%'); filter.setAttribute('y', '-50%');
        filter.setAttribute('width', '200%'); filter.setAttribute('height', '200%');
        const fe = document.createElementNS(NS, 'feGaussianBlur');
        fe.setAttribute('stdDeviation', '3'); fe.setAttribute('result', 'coloredBlur');
        filter.appendChild(fe);
        const fm = document.createElementNS(NS, 'feMerge');
        const f1 = document.createElementNS(NS, 'feMergeNode'); f1.setAttribute('in', 'coloredBlur');
        const f2 = document.createElementNS(NS, 'feMergeNode'); f2.setAttribute('in', 'SourceGraphic');
        fm.appendChild(f1); fm.appendChild(f2);
        filter.appendChild(fm); defs.appendChild(filter); svg.appendChild(defs);

        connections.forEach((conn, idx) => {
            const from = getNodeCenter(conn.from);
            const to = getNodeCenter(conn.to);
            const dx = to.x - from.x, dy = to.y - from.y;
            const t = 0.4;
            let c1x, c1y, c2x, c2y;
            if (Math.abs(dx) > Math.abs(dy)) {
                c1x = from.x + dx * t; c1y = from.y; c2x = to.x - dx * t; c2y = to.y;
            } else {
                c1x = from.x; c1y = from.y + dy * t; c2x = to.x; c2y = to.y - dy * t;
            }
            const d = `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;

            const bg = document.createElementNS(NS, 'path');
            bg.setAttribute('d', d);
            bg.setAttribute('stroke', conn.style === 'dashed' ? `rgba(${window.globalCanvasRGB}, 0.04)` : `rgba(${window.globalCanvasRGB}, 0.06)`);
            bg.setAttribute('stroke-width', '4'); bg.setAttribute('fill', 'none');
            if (conn.style === 'dashed') bg.setAttribute('stroke-dasharray', '6 6');
            svg.appendChild(bg);

            const mp = document.createElementNS(NS, 'path');
            mp.setAttribute('d', d); mp.setAttribute('id', `cp-${idx}`);
            mp.setAttribute('stroke', conn.style === 'dashed' ? `rgba(${window.globalCanvasRGB}, 0.2)` : `rgba(${window.globalCanvasRGB}, 0.3)`);
            mp.setAttribute('stroke-width', '2'); mp.setAttribute('fill', 'none');
            mp.setAttribute('filter', 'url(#glow)');
            if (conn.style === 'dashed') mp.setAttribute('stroke-dasharray', '8 6');
            svg.appendChild(mp);

            if (!conn.style) {
                const mt = 0.5;
                const mx = Math.pow(1 - mt, 3) * from.x + 3 * Math.pow(1 - mt, 2) * mt * c1x + 3 * (1 - mt) * mt * mt * c2x + Math.pow(mt, 3) * to.x;
                const my = Math.pow(1 - mt, 3) * from.y + 3 * Math.pow(1 - mt, 2) * mt * c1y + 3 * (1 - mt) * mt * mt * c2y + Math.pow(mt, 3) * to.y;
                const dm = document.createElementNS(NS, 'rect');
                dm.setAttribute('x', mx - 5); dm.setAttribute('y', my - 5);
                dm.setAttribute('width', '10'); dm.setAttribute('height', '10');
                dm.setAttribute('rx', '2'); dm.setAttribute('fill', `rgba(${window.globalCanvasRGB}, 0.8)`);
                dm.setAttribute('filter', 'url(#glow)');
                dm.setAttribute('transform', `rotate(45 ${mx} ${my})`);
                svg.appendChild(dm);
            }

            const pk = document.createElementNS(NS, 'circle');
            pk.setAttribute('r', '4');
            pk.setAttribute('fill', `rgb(${window.globalCanvasRGB})`);
            pk.setAttribute('filter', 'url(#glow)');
            const am = document.createElementNS(NS, 'animateMotion');
            am.setAttribute('dur', conn.style === 'dashed' ? '3.5s' : '2.5s');
            am.setAttribute('repeatCount', 'indefinite');
            am.setAttribute('begin', `${idx * 0.35}s`);
            const mpa = document.createElementNS(NS, 'mpath');
            mpa.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#cp-${idx}`);
            am.appendChild(mpa); pk.appendChild(am);
            const ao = document.createElementNS(NS, 'animate');
            ao.setAttribute('attributeName', 'opacity');
            ao.setAttribute('values', '0;1;1;0');
            ao.setAttribute('keyTimes', '0;0.1;0.85;1');
            ao.setAttribute('dur', conn.style === 'dashed' ? '3.5s' : '2.5s');
            ao.setAttribute('repeatCount', 'indefinite');
            ao.setAttribute('begin', `${idx * 0.35}s`);
            pk.appendChild(ao);
            svg.appendChild(pk);
        });
    }

    drawConnections();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(drawConnections, 300); });

    const sectionNodes = document.querySelectorAll('.workflow__node--section');
    sectionNodes.forEach(node => {
        node.addEventListener('click', () => {
            const target = document.getElementById(node.getAttribute('data-section'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    function updateNodeStates() {
        const sy = window.scrollY;
        const ids = [];
        sectionNodes.forEach(n => ids.push(n.getAttribute('data-section')));
        let ai = -1;
        ids.forEach((id, i) => {
            const s = document.getElementById(id);
            if (s && sy >= s.offsetTop - window.innerHeight * 0.5) ai = i;
        });
        sectionNodes.forEach((n, i) => {
            n.classList.remove('active', 'completed');
            if (ai >= 0) {
                if (i < ai) n.classList.add('completed');
                else if (i === ai) n.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNodeStates, { passive: true });
    updateNodeStates();
}

/* ============ SCROLL OBSERVER ============ */
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.animate-on-scroll, .skill-module, .experience__item').forEach(el => observer.observe(el));
}

/* ============ SMOOTH SCROLL LINKS ============ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(link.getAttribute('href').slice(1));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/* ============ COUNTER ANIMATION ============ */
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                animateCounter(el, parseInt(el.getAttribute('data-target')), el.getAttribute('data-suffix') || '');
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.about__metric-value').forEach(c => observer.observe(c));
}

function animateCounter(el, target, suffix) {
    const dur = 1800, start = performance.now();
    function ease(t) { return 1 - Math.pow(2, -10 * t); }
    function step(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.floor(ease(p) * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
    }
    setTimeout(() => requestAnimationFrame(step), 300);
}

/* ============ NOTEBOOK PAGE FLIP ============ */
function initNotebook() {
    const notebook = document.querySelector('.notebook');
    if (!notebook) return;

    const pages = [...notebook.querySelectorAll('.notebook__page')];
    const dots = notebook.querySelectorAll('.notebook__dot');
    const currentEl = notebook.querySelector('.notebook__current');
    const clickLeft = notebook.querySelector('.notebook__click-zone--left');
    const clickRight = notebook.querySelector('.notebook__click-zone--right');
    const total = pages.length;
    let current = 0;        // The index of the currently visible (top-right) page
    let animating = false;

    // Initialize: stack pages with reverse z-index so page 0 is on top
    function initPages() {
        pages.forEach((page, i) => {
            page.style.zIndex = total - i;
            page.classList.remove('notebook__page--flipped', 'notebook__page--active');
            page.style.transform = '';
        });
        pages[0].classList.add('notebook__page--active');
    }

    function updateUI() {
        dots.forEach(d => d.classList.remove('notebook__dot--active'));
        if (dots[current]) dots[current].classList.add('notebook__dot--active');
        if (currentEl) currentEl.textContent = String(current + 1).padStart(2, '0');
    }

    // Flip forward: flip page[current] to the left, reveal page[current+1]
    function flipForward() {
        if (animating) return;

        // If on last page, flip all back to page 1
        if (current >= total - 1) {
            animating = true;
            const stepsBack = current;
            for (let s = 0; s < stepsBack; s++) {
                setTimeout(() => {
                    const fromIdx = stepsBack - s;
                    pages[fromIdx].classList.remove('notebook__page--active');
                    const toIdx = fromIdx - 1;
                    const page = pages[toIdx];
                    page.classList.remove('notebook__page--flipped');
                    page.classList.add('notebook__page--active');
                    current = toIdx;
                    updateUI();
                }, s * 200);
            }
            // Final cleanup after all flips done
            setTimeout(() => {
                pages.forEach((p, i) => {
                    p.style.zIndex = total - i;
                    if (i === 0) {
                        p.classList.add('notebook__page--active');
                        p.classList.remove('notebook__page--flipped');
                    } else {
                        p.classList.remove('notebook__page--active');
                        p.classList.remove('notebook__page--flipped');
                    }
                    p.style.transform = '';
                });
                current = 0;
                updateUI();
                animating = false;
            }, stepsBack * 200 + 400);
            return;
        }
        animating = true;

        const page = pages[current];
        page.style.zIndex = total + 1; // Bring to front during flip
        page.classList.add('notebook__page--flipped');
        page.classList.remove('notebook__page--active');

        current++;
        pages[current].classList.add('notebook__page--active');
        updateUI();

        setTimeout(() => {
            page.style.zIndex = total + current; // Stack on left side
            animating = false;
        }, 850);
    }

    // Flip backward: unflip page[current-1] back to right, it covers current
    function flipBackward() {
        if (animating || current <= 0) return;
        animating = true;

        pages[current].classList.remove('notebook__page--active');

        current--;
        const page = pages[current];
        page.style.zIndex = total + 10; // Bring on top during unflip
        page.classList.remove('notebook__page--flipped');
        page.classList.add('notebook__page--active');

        updateUI();

        setTimeout(() => {
            page.style.zIndex = total - current;
            animating = false;
        }, 850);
    }

    // Stop propagation on links inside pages so clicking "Live" or "GitHub" doesn't flip the page
    pages.forEach(page => {
        const links = page.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    });

    // Helper to check if a click actually hit a link underneath the click zone
    function handleZoneClick(e, flipFunction) {
        // Temporarily hide click zones to see what's underneath
        clickLeft.style.display = 'none';
        clickRight.style.display = 'none';

        const elementBelow = document.elementFromPoint(e.clientX, e.clientY);

        // Restore click zones
        clickLeft.style.display = '';
        clickRight.style.display = '';

        // If the click was actually on a link (or inside one), click the link instead
        const link = elementBelow ? elementBelow.closest('a') : null;
        if (link) {
            if (link.target === '_blank') {
                window.open(link.href, '_blank');
            } else {
                window.location.href = link.href;
            }
            return; // Don't flip page
        }

        // Otherwise, flip the page
        resetAutoPlay();
        flipFunction();
    }

    // Click zones (manual override)
    if (clickRight) clickRight.addEventListener('click', (e) => handleZoneClick(e, flipForward));
    if (clickLeft) clickLeft.addEventListener('click', (e) => handleZoneClick(e, flipBackward));

    // Dot navigation (manual override)
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = parseInt(dot.dataset.goto);
            if (target === current || animating) return;

            // Optional: reset timer on manual click
            resetAutoPlay();

            if (target > current) {
                const steps = target - current;
                let i = 0;
                const interval = setInterval(() => {
                    flipForward();
                    i++;
                    if (i >= steps) clearInterval(interval);
                }, 200);
            } else {
                const steps = current - target;
                let i = 0;
                const interval = setInterval(() => {
                    flipBackward();
                    i++;
                    if (i >= steps) clearInterval(interval);
                }, 200);
            }
        });
    });

    // --- AUTO-PLAY FEATURE ---
    let autoPlayTimer;

    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            if (!animating) {
                // If we reach the end, flipForward() already has logic to reset to first page
                flipForward();
            }
        }, 3000); // 3 seconds per page
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Pause on hover so user can read / click links
    const notebookContainer = document.querySelector('.notebook');
    if (notebookContainer) {
        notebookContainer.addEventListener('mouseenter', stopAutoPlay);
        notebookContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Initialize
    initPages();
    updateUI();

    // Start the automatic slide show
    startAutoPlay();
}
