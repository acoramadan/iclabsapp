  // ==================== LOADING SCREEN ====================
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 1200);
        });

        // ==================== SCROLL PROGRESS INDICATOR ====================
        window.addEventListener('scroll', () => {
            const scrollIndicator = document.getElementById('scrollIndicator');
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollIndicator.style.width = scrolled + '%';
        });

        // ==================== SCROLL REVEAL ANIMATION ====================
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('show');
                    }, index * 120);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.app-card').forEach(card => {
            observer.observe(card);
        });

        // ==================== RIPPLE EFFECT ====================
        function createRipple(event) {
            const card = event.currentTarget;
            const ripple = document.createElement('span');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 700);
        }

        // ==================== APP CARD INTERACTIONS ====================
        const appCards = document.querySelectorAll('.app-card');
        
        appCards.forEach(card => {
            card.addEventListener('click', function(e) {
                createRipple(e);
                const title = this.getAttribute('data-title');
                showToast(`🚀 Membuka ${title}...`);
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;
                
                card.style.transform = `translateY(-15px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
            });
        });

        // ==================== TOAST NOTIFICATION ====================
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            
            toastMessage.textContent = message;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // ==================== KEYBOARD SHORTCUTS ====================
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.app-card').forEach(card => {
                    card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
                });
            }

            if (e.key === 'Home') {
                e.preventDefault();
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        });

        // ==================== SMOOTH SCROLL FOR FAB ====================
        window.addEventListener('scroll', () => {
            const fab = document.querySelector('.fab');
            if (window.scrollY > 300) {
                fab.style.opacity = '1';
                fab.style.pointerEvents = 'all';
            } else {
                fab.style.opacity = '0';
                fab.style.pointerEvents = 'none';
            }
        });

        document.querySelector('.fab').style.opacity = '0';
        document.querySelector('.fab').style.pointerEvents = 'none';