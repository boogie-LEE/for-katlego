document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // OPENING ENVELOPE ANIMATION
    // ============================================
    const openingScreen = document.getElementById('openingScreen');
    const bigEnvelope = document.getElementById('bigEnvelope');
    const openingBgHearts = document.getElementById('openingBgHearts');
    const questionsModal = document.getElementById('questionsModal');
    const questionsBgHearts = document.getElementById('questionsBgHearts');

    // Add floating hearts to opening screen
    function addBackgroundHearts(container) {
        const hearts = ['💕', '💖', '💗', '💓', '❤️', '💝', '💘'];
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDelay = Math.random() * 8 + 's';
            heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
            container.appendChild(heart);
        }
    }
    addBackgroundHearts(openingBgHearts);
    addBackgroundHearts(questionsBgHearts);

    // Click envelope
    bigEnvelope.addEventListener('click', () => {
        bigEnvelope.classList.add('opened');
        document.getElementById('openingHint').style.opacity = '0';

        // After envelope opens, go to questions
        setTimeout(() => {
            openingScreen.classList.add('hidden');
            questionsModal.classList.add('active');
            startQuestions();
        }, 2500);
    });


    // ============================================
    // LOVE QUESTIONS (No button runs away!)
    // ============================================
    const questions = [
        {
            text: "Do you love Thembi? 💕",
            yes: "Yes, always 💖",
            no: "No"
        },
        {
            text: "Are you happy we started talking in December? 😌",
            yes: "Best decision ever ✨",
            no: "Nope"
        },
        {
            text: "Do you admit you slid into MY DMs first? 😏",
            yes: "Fine, yes 🙈",
            no: "Never"
        },
        {
            text: "Do you still get butterflies when you see me? 🦋",
            yes: "Every time 🥰",
            no: "No"
        },
        {
            text: "Will you keep loving me forever? 💍",
            yes: "Forever and always 💕",
            no: "No"
        }
    ];

    let currentQuestion = 0;
    const questionText = document.getElementById('questionText');
    const questionNumber = document.getElementById('questionNumber');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const progressBar = document.getElementById('progressBar');
    const questionHint = document.getElementById('questionHint');
    const celebrationScreen = document.getElementById('celebrationScreen');

    function startQuestions() {
        loadQuestion();
    }

    function loadQuestion() {
        const q = questions[currentQuestion];
        questionText.textContent = q.text;
        questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        yesBtn.textContent = q.yes;
        noBtn.textContent = q.no;
        progressBar.style.width = ((currentQuestion + 1) / questions.length * 100) + '%';

        // Reset no button position
        noBtn.style.position = 'static';
        noBtn.style.transform = 'none';
    }

    // YES button - go to next question
    yesBtn.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            // Add cute little animation
            questionText.style.opacity = '0';
            setTimeout(() => {
                loadQuestion();
                questionText.style.opacity = '1';
            }, 300);
        } else {
            // All questions answered - show celebration
            showCelebration();
        }
    });

    // NO button - RUNS AWAY! (or shakes)
    noBtn.addEventListener('mouseenter', () => {
        // Random position within the question container
        const container = document.querySelector('.question-container');
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        const maxX = containerRect.width - btnRect.width - 20;
        const maxY = containerRect.height - btnRect.height - 20;

        const randomX = Math.random() * maxX - maxX/2;
        const randomY = Math.random() * 100 - 50;

        noBtn.style.position = 'relative';
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        noBtn.style.transition = 'transform 0.3s ease';
    });

    // Also on touch for mobile
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 100 - 50;
        noBtn.style.position = 'relative';
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    // If somehow clicked, show funny message
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        questionHint.textContent = "Nice try 😂 but that's not an option baby ❤️";
        questionHint.style.color = '#e63e6d';
        questionHint.style.fontWeight = '600';
    });


    // ============================================
    // CELEBRATION SCREEN
    // ============================================
    function showCelebration() {
        questionsModal.classList.remove('active');
        setTimeout(() => {
            celebrationScreen.classList.add('active');
            createConfetti();
        }, 500);
    }

    function createConfetti() {
        const confettiContainer = document.getElementById('confetti');
        const colors = ['#ff85a2', '#ffc1d4', '#ffe0eb', '#e63e6d', '#ffffff', '#f0c27f'];

        for (let i = 0; i < 100; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = Math.random() * 3 + 's';
            piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
            piece.style.width = (Math.random() * 10 + 5) + 'px';
            piece.style.height = piece.style.width;
            if (Math.random() > 0.5) piece.style.borderRadius = '50%';
            confettiContainer.appendChild(piece);
        }
    }

    // Enter main content
    document.getElementById('enterBtn').addEventListener('click', () => {
        celebrationScreen.classList.remove('active');
        setTimeout(() => {
            document.getElementById('mainContent').classList.add('active');
            initMainContent();
            // Try to start music
            const music = document.getElementById('bgMusic');
            music.volume = 0.4;
            music.play().catch(() => console.log('Autoplay blocked'));
            document.getElementById('musicToggle').classList.add('playing');
        }, 800);
    });


    // ============================================
    // MAIN CONTENT INIT
    // ============================================
    function initMainContent() {

        // Floating Hearts
        const floatingHearts = document.getElementById('floatingHearts');
        const heartEmojis = ['❤️','💕','💖','💗','💓','💘','💝','✨','🌸'];

        function createFloatingHeart() {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            floatingHearts.appendChild(heart);
            setTimeout(() => heart.remove(), 20000);
        }
        for (let i = 0; i < 15; i++) setTimeout(createFloatingHeart, i * 500);
        setInterval(createFloatingHeart, 2000);

        // Particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            particlesContainer.appendChild(p);
        }

        // Navbar
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');

            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 150;
            sections.forEach(sec => {
                const top = sec.offsetTop;
                const h = sec.offsetHeight;
                const id = sec.getAttribute('id');
                if (scrollPos >= top && scrollPos < top + h) {
                    navLinks.forEach(l => {
                        l.classList.remove('active');
                        if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
                    });
                }
            });
        });

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Scroll Animations
        const animEls = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('animated'), i * 80);
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        animEls.forEach(el => observer.observe(el));

        // Gallery Lightbox
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        const lightboxCap = document.getElementById('lightboxCaption');
        let currentIdx = 0;
        let images = [];

        function collectImages() {
            images = [];
            galleryItems.forEach(item => {
                const img = item.querySelector('img');
                images.push({
                    src: img.src,
                    caption: item.querySelector('h4')?.textContent || '',
                    date: item.querySelector('.overlay-content p')?.textContent || ''
                });
            });
        }

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                collectImages();
                const src = item.querySelector('img').src;
                currentIdx = images.findIndex(i => i.src === src);
                showLightbox(currentIdx);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function showLightbox(i) {
            if (images[i]) {
                lightboxImg.src = images[i].src;
                lightboxCap.textContent = `${images[i].caption} — ${images[i].date}`;
            }
        }

        document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        document.getElementById('lightboxPrev').addEventListener('click', e => {
            e.stopPropagation();
            currentIdx = (currentIdx - 1 + images.length) % images.length;
            showLightbox(currentIdx);
        });
        document.getElementById('lightboxNext').addEventListener('click', e => {
            e.stopPropagation();
            currentIdx = (currentIdx + 1) % images.length;
            showLightbox(currentIdx);
        });

        document.addEventListener('keydown', e => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
            if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
            if (e.key === 'Escape') closeLightbox();
        });

        // Letter Envelopes
        const letterEnvs = document.querySelectorAll('.letter-envelope');
        letterEnvs.forEach(env => {
            env.addEventListener('click', () => {
                env.classList.toggle('opened');
                letterEnvs.forEach(o => { if (o !== env) o.classList.remove('opened'); });
            });
        });

        // Love Counter - March 3, 2025
        const startDate = new Date('2025-03-03T00:00:00');

        function updateCounter() {
            const now = new Date();
            const diff = now - startDate;
            const days = Math.floor(diff / (1000*60*60*24));
            const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
            const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
            const seconds = Math.floor((diff % (1000*60)) / 1000);

            document.getElementById('counterDays').textContent = days;
            document.getElementById('counterHours').textContent = hours;
            document.getElementById('counterMinutes').textContent = minutes;
            document.getElementById('counterSeconds').textContent = seconds;
        }
        updateCounter();
        setInterval(updateCounter, 1000);

        // Music Toggle
        const musicBtn = document.getElementById('musicToggle');
        const music = document.getElementById('bgMusic');
        let isPlaying = true;

        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                music.pause();
                musicBtn.classList.remove('playing');
                musicBtn.querySelector('i').className = 'fas fa-volume-mute';
            } else {
                music.play();
                musicBtn.classList.add('playing');
                musicBtn.querySelector('i').className = 'fas fa-music';
            }
            isPlaying = !isPlaying;
        });

        // Click heart effect
        document.addEventListener('click', e => {
            if (e.target.closest('button') || e.target.closest('a')) return;
            const heart = document.createElement('span');
            heart.textContent = '❤️';
            heart.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 99999;
                animation: clickHeart 1s ease forwards;
            `;
            if (!document.getElementById('clickHeartStyle')) {
                const style = document.createElement('style');
                style.id = 'clickHeartStyle';
                style.textContent = `
                    @keyframes clickHeart {
                        0% { opacity: 1; transform: translate(-50%,-50%) scale(0); }
                        50% { opacity: 1; transform: translate(-50%,-100%) scale(1.2); }
                        100% { opacity: 0; transform: translate(-50%,-200%) scale(0.5); }
                    }
                `;
                document.head.appendChild(style);
            }
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        });

        console.log('%c❤️ Made with love by Thembi for Katlego ❤️', 'color: #e63e6d; font-size: 20px; font-weight: bold;');
    }
});
