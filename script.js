/**
 * WINDI RIHANAFSA • OFFICIAL PORTFOLIO & BIODATA REDESIGN
 * INTERACTIVE ENGINE: Music Player (everything u are - Hindia), 
 * Lyrics Sync, Petal Particles, Modals, Lightbox, Theme Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. THEME SWITCHER (SOFT ROSE LIGHT / VELVET DARK)
    // ----------------------------------------------------
    const htmlElem = document.documentElement;
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('windi_theme') || 'light';
    htmlElem.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElem.getAttribute('data-theme');
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElem.setAttribute('data-theme', nextTheme);
            localStorage.setItem('windi_theme', nextTheme);
            showToast(nextTheme === 'dark' ? '🌙 Mode Velvet Gelap aktif' : '🌸 Mode Soft Rose aktif');
        });
    }

    // ----------------------------------------------------
    // 2. MOBILE MENU DRAWER
    // ----------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ----------------------------------------------------
    // 3. AUDIO ENGINE: "everything u are" BY HINDIA
    // ----------------------------------------------------
    const audio = document.getElementById('mainAudioPlayer');

    // Controls - Hero Player
    const btnPlayPause = document.getElementById('btnPlayPause');
    const playIconSvg = document.getElementById('playIconSvg');
    const pauseIconSvg = document.getElementById('pauseIconSvg');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressThumb = document.getElementById('progressThumb');
    const timeCurrent = document.getElementById('timeCurrent');
    const timeDuration = document.getElementById('timeDuration');
    const heroSoundWaves = document.getElementById('heroSoundWaves');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeHighSvg = document.getElementById('volumeHighSvg');
    const volumeMutedSvg = document.getElementById('volumeMutedSvg');
    const trackLikeBtn = document.getElementById('trackLikeBtn');
    const btnShuffle = document.getElementById('btnShuffle');
    const heroPlayMusicBtn = document.getElementById('heroPlayMusicBtn');

    // Controls - Section 4 Console Player
    const consolePlayBtn = document.getElementById('consolePlayBtn');
    const consolePlaySvg = document.getElementById('consolePlaySvg');
    const consolePauseSvg = document.getElementById('consolePauseSvg');
    const consoleProgressFill = document.getElementById('consoleProgressFill');
    const consoleProgressContainer = document.getElementById('consoleProgressContainer');
    const consoleTimeCurrent = document.getElementById('consoleTimeCurrent');
    const consoleTimeTotal = document.getElementById('consoleTimeTotal');
    const consoleMainToggle = document.getElementById('consoleMainToggle');
    const consoleToggleLabel = document.getElementById('consoleToggleLabel');
    const consoleLoopBtn = document.getElementById('consoleLoopBtn');

    // Controls - Floating Dock Player
    const floatingMusicDock = document.getElementById('floatingMusicDock');
    const dockPlayBtn = document.getElementById('dockPlayBtn');
    const dockPlaySvg = document.getElementById('dockPlaySvg');
    const dockPauseSvg = document.getElementById('dockPauseSvg');
    const dockProgressFill = document.getElementById('dockProgressFill');
    const dockTime = document.getElementById('dockTime');
    const dockSoundBars = document.getElementById('dockSoundBars');
    const dockExpandBtn = document.getElementById('dockExpandBtn');

    let isPlaying = false;
    let isLooping = false;
    let previousVolume = 0.9;

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updatePlayState(playing) {
        isPlaying = playing;
        
        // Update Hero Player
        if (playing) {
            btnPlayPause.classList.add('playing');
            playIconSvg.style.display = 'none';
            pauseIconSvg.style.display = 'block';
            heroSoundWaves.classList.add('playing');
        } else {
            btnPlayPause.classList.remove('playing');
            playIconSvg.style.display = 'block';
            pauseIconSvg.style.display = 'none';
            heroSoundWaves.classList.remove('playing');
        }

        // Update Console Player
        if (consolePlaySvg && consolePauseSvg) {
            consolePlaySvg.style.display = playing ? 'none' : 'block';
            consolePauseSvg.style.display = playing ? 'block' : 'none';
            if (consoleToggleLabel) {
                consoleToggleLabel.textContent = playing ? 'Jeda Musik (Playing)' : 'Putar Musik Sekarang';
            }
        }

        // Update Floating Dock Player
        if (dockPlaySvg && dockPauseSvg) {
            dockPlaySvg.style.display = playing ? 'none' : 'block';
            dockPauseSvg.style.display = playing ? 'block' : 'none';
            if (playing) {
                dockSoundBars.classList.add('playing');
            } else {
                dockSoundBars.classList.remove('playing');
            }
        }
    }

    async function togglePlay() {
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            updatePlayState(false);
            showToast('⏸ Musik dijeda');
        } else {
            try {
                await audio.play();
                updatePlayState(true);
                showToast('▶ Memutar "everything u are" • Hindia 🌸');
            } catch (err) {
                console.warn('Audio play restricted or waiting user gesture:', err);
                showToast('Klik sekali lagi untuk memutar musik 🎧');
            }
        }
    }

    // Attach Play/Pause Listeners
    if (btnPlayPause) btnPlayPause.addEventListener('click', togglePlay);
    if (consolePlayBtn) consolePlayBtn.addEventListener('click', togglePlay);
    if (consoleMainToggle) consoleMainToggle.addEventListener('click', togglePlay);
    if (dockPlayBtn) dockPlayBtn.addEventListener('click', togglePlay);
    if (heroPlayMusicBtn) {
        heroPlayMusicBtn.addEventListener('click', () => {
            if (!isPlaying) togglePlay();
            document.getElementById('music-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Time & Progress Updates
    audio.addEventListener('timeupdate', () => {
        const cur = audio.currentTime;
        const dur = audio.duration || 236; // 3:56 = 236s default
        const percent = (cur / dur) * 100;
        const timeStr = formatTime(cur);

        // Hero Player
        if (progressBarFill) progressBarFill.style.width = `${percent}%`;
        if (progressThumb) progressThumb.style.left = `${percent}%`;
        if (timeCurrent) timeCurrent.textContent = timeStr;
        if (progressBarContainer) progressBarContainer.setAttribute('aria-valuenow', Math.round(percent));

        // Console Player
        if (consoleProgressFill) consoleProgressFill.style.width = `${percent}%`;
        if (consoleTimeCurrent) consoleTimeCurrent.textContent = timeStr;

        // Floating Dock
        if (dockProgressFill) dockProgressFill.style.width = `${percent}%`;
        if (dockTime) dockTime.textContent = timeStr;

        // Sync with Lyrics
        syncLyrics(cur);
    });

    audio.addEventListener('loadedmetadata', () => {
        const durStr = formatTime(audio.duration);
        if (timeDuration) timeDuration.textContent = durStr;
        if (consoleTimeTotal) consoleTimeTotal.textContent = durStr;
    });

    audio.addEventListener('ended', () => {
        if (!isLooping) {
            updatePlayState(false);
            if (progressBarFill) progressBarFill.style.width = '0%';
            if (consoleProgressFill) consoleProgressFill.style.width = '0%';
            if (dockProgressFill) dockProgressFill.style.width = '0%';
        }
    });

    // Seeking Logic for progress bars
    function handleSeek(e, container) {
        const rect = container.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clickX = clientX - rect.left;
        const width = rect.width;
        const seekPercent = Math.max(0, Math.min(1, clickX / width));
        const dur = audio.duration || 236;
        audio.currentTime = seekPercent * dur;
    }

    if (progressBarContainer) {
        progressBarContainer.addEventListener('click', (e) => handleSeek(e, progressBarContainer));
    }
    if (consoleProgressContainer) {
        consoleProgressContainer.addEventListener('click', (e) => handleSeek(e, consoleProgressContainer));
    }

    // Volume Controls
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            audio.volume = val;
            if (val === 0) {
                volumeHighSvg.style.display = 'none';
                volumeMutedSvg.style.display = 'block';
            } else {
                volumeHighSvg.style.display = 'block';
                volumeMutedSvg.style.display = 'none';
                previousVolume = val;
            }
        });
    }

    if (volumeBtn) {
        volumeBtn.addEventListener('click', () => {
            if (audio.volume > 0) {
                previousVolume = audio.volume;
                audio.volume = 0;
                volumeSlider.value = 0;
                volumeHighSvg.style.display = 'none';
                volumeMutedSvg.style.display = 'block';
                showToast('🔇 Suara dibisukan');
            } else {
                audio.volume = previousVolume || 0.8;
                volumeSlider.value = audio.volume;
                volumeHighSvg.style.display = 'block';
                volumeMutedSvg.style.display = 'none';
                showToast('🔊 Suara diaktifkan');
            }
        });
    }

    // Like Button
    if (trackLikeBtn) {
        trackLikeBtn.addEventListener('click', () => {
            const liked = trackLikeBtn.classList.toggle('liked');
            showToast(liked ? '💖 Ditambahkan ke lagu favoritmu!' : 'Lagu dihapus dari favorit');
        });
    }

    // Shuffle Button
    if (btnShuffle) {
        btnShuffle.addEventListener('click', () => {
            const active = btnShuffle.classList.toggle('active');
            showToast(active ? '🔀 Mode acak aktif' : 'Mode acak nonaktif');
        });
    }

    // Loop Button
    if (consoleLoopBtn) {
        consoleLoopBtn.addEventListener('click', () => {
            isLooping = !isLooping;
            audio.loop = isLooping;
            consoleLoopBtn.classList.toggle('active', isLooping);
            showToast(isLooping ? '🔁 Putar ulang lagu aktif' : 'Putar ulang lagu nonaktif');
        });
    }

    // Prev / Next Buttons
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            audio.currentTime = 0;
            showToast('⏮ Mengulang dari awal');
        });
    }
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            showToast('🎵 Ini adalah lagu pilihan utama Windi: "everything u are"');
        });
    }

    // Scroll to music section from dock
    if (dockExpandBtn) {
        dockExpandBtn.addEventListener('click', () => {
            document.getElementById('music-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------
    // 4. SYNCHRONIZED LYRICS HIGHLIGHTING
    // ----------------------------------------------------
    const lyricsLines = document.querySelectorAll('.lyrics-line');
    const lyricsScrollBox = document.getElementById('lyricsScrollBox');

    function syncLyrics(currentTime) {
        let activeIndex = -1;
        lyricsLines.forEach((line, index) => {
            const lineTime = parseFloat(line.getAttribute('data-time'));
            if (currentTime >= lineTime) {
                activeIndex = index;
            }
        });

        lyricsLines.forEach((line, index) => {
            if (index === activeIndex) {
                if (!line.classList.contains('active')) {
                    line.classList.add('active');
                    // Auto-scroll inside lyrics card smoothly
                    if (lyricsScrollBox) {
                        const lineTop = line.offsetTop - lyricsScrollBox.offsetTop;
                        lyricsScrollBox.scrollTo({
                            top: lineTop - 120,
                            behavior: 'smooth'
                        });
                    }
                }
            } else {
                line.classList.remove('active');
            }
        });
    }

    // Click lyric line to seek directly
    lyricsLines.forEach(line => {
        line.addEventListener('click', () => {
            const time = parseFloat(line.getAttribute('data-time'));
            if (!isNaN(time)) {
                audio.currentTime = time;
                if (!isPlaying) togglePlay();
            }
        });
    });

    const btnToggleLyrics = document.getElementById('btnToggleLyrics');
    if (btnToggleLyrics) {
        btnToggleLyrics.addEventListener('click', () => {
            document.getElementById('music-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------
    // 5. INTERACTIVE "KLIK UNTUK SAPA 👋" MODAL & CONFETTI
    // ----------------------------------------------------
    const greetModal = document.getElementById('greetModal');
    const btnSapaNav = document.getElementById('btnSapaNav');
    const btnSapaMobile = document.getElementById('btnSapaMobile');
    const heroGreetBtn = document.getElementById('heroGreetBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCloseBtn2 = document.getElementById('modalCloseBtn2');
    const modalPlayMusic = document.getElementById('modalPlayMusic');

    function openGreetModal() {
        if (!greetModal) return;
        greetModal.style.display = 'flex';
        playFriendlyChime();
        triggerPinkConfetti();
    }

    function closeGreetModal() {
        if (!greetModal) return;
        greetModal.style.display = 'none';
    }

    if (btnSapaNav) btnSapaNav.addEventListener('click', openGreetModal);
    if (btnSapaMobile) btnSapaMobile.addEventListener('click', openGreetModal);
    if (heroGreetBtn) heroGreetBtn.addEventListener('click', openGreetModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeGreetModal);
    if (modalCloseBtn2) modalCloseBtn2.addEventListener('click', closeGreetModal);

    if (modalPlayMusic) {
        modalPlayMusic.addEventListener('click', () => {
            closeGreetModal();
            if (!isPlaying) togglePlay();
            document.getElementById('music-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    greetModal.addEventListener('click', (e) => {
        if (e.target === greetModal) closeGreetModal();
    });

    // Friendly Synthesizer Chime with Web Audio API (gentle chord)
    function playFriendlyChime() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Bright cheerful chord)
            
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
                
                gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.8);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + idx * 0.08);
                osc.stop(ctx.currentTime + idx * 0.08 + 0.9);
            });
        } catch (e) {
            console.log('AudioContext not allowed yet:', e);
        }
    }

    // Pink Aesthetic Confetti
    function triggerPinkConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 75,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff4d8d', '#f472b6', '#fb7185', '#ffe4e6', '#ffffff']
            });
            setTimeout(() => {
                confetti({
                    particleCount: 50,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff4d8d', '#f472b6', '#ffffff']
                });
                confetti({
                    particleCount: 50,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff4d8d', '#f472b6', '#ffffff']
                });
            }, 250);
        }
    }

    // ----------------------------------------------------
    // 6. LIGHTBOX MODAL FOR THE 2 FEATURED CAMPUS PHOTOS
    // ----------------------------------------------------
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const expandButtons = document.querySelectorAll('.btn-expand-photo');

    expandButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const src = btn.getAttribute('data-img-src');
            const caption = btn.getAttribute('data-caption');
            if (lightboxImg && lightboxCaption && lightboxModal) {
                lightboxImg.src = src;
                lightboxCaption.textContent = caption;
                lightboxModal.style.display = 'flex';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.style.display = 'none';
        });
    }

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
        }
    });

    // ----------------------------------------------------
    // 7. COPY EMAIL TO CLIPBOARD & QUICK MESSAGE FORM
    // ----------------------------------------------------
    const btnCopyEmail = document.getElementById('btnCopyEmail');
    if (btnCopyEmail) {
        btnCopyEmail.addEventListener('click', () => {
            navigator.clipboard.writeText('rihanafsawindi@gmail.com').then(() => {
                btnCopyEmail.textContent = 'Tersalin! ✓';
                showToast('📋 Email Windi berhasil disalin ke clipboard');
                setTimeout(() => {
                    btnCopyEmail.textContent = 'Salin';
                }, 2000);
            });
        });
    }

    const quickMessageForm = document.getElementById('quickMessageForm');
    if (quickMessageForm) {
        quickMessageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const senderName = document.getElementById('senderName').value;
            triggerPinkConfetti();
            showToast(`💌 Terima kasih, ${senderName}! Pesanmu telah tersampaikan ke Windi.`);
            quickMessageForm.reset();
        });
    }

    // ----------------------------------------------------
    // 8. SCROLL LISTENER (HEADER GLOW & FLOATING DOCK)
    // ----------------------------------------------------
    const siteHeader = document.getElementById('siteHeader');
    const heroSection = document.getElementById('hero');
    const btnBackToTop = document.getElementById('btnBackToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header shadow
        if (siteHeader) {
            if (scrollY > 50) siteHeader.classList.add('scrolled');
            else siteHeader.classList.remove('scrolled');
        }

        // Floating Bottom Music Dock Visibility
        if (floatingMusicDock && heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 100;
            if (scrollY > heroBottom) {
                floatingMusicDock.classList.add('visible');
            } else {
                floatingMusicDock.classList.remove('visible');
            }
        }

        // Active navigation link highlighting
        highlightNavLinks();
    });

    function highlightNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-desktop .nav-item');
        let currentSectionId = '';

        sections.forEach(section => {
            const top = section.offsetTop - 150;
            const height = section.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    if (btnBackToTop) {
        btnBackToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------
    // 9. TOAST NOTIFICATION UTILITY
    // ----------------------------------------------------
    const toastContainer = document.getElementById('toastContainer');
    function showToast(message) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span class="toast-icon">🌸</span><span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 350);
        }, 3200);
    }

    // ----------------------------------------------------
    // 10. BACKGROUND SAKURA & SPARKLE PETAL CANVAS
    // ----------------------------------------------------
    const canvas = document.getElementById('ambientCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const numParticles = 24;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 4 + 2,
                color: Math.random() > 0.4 ? 'rgba(255, 110, 160, ' : 'rgba(254, 205, 225, ',
                alpha: Math.random() * 0.4 + 0.15,
                vx: Math.random() * 0.8 - 0.4,
                vy: Math.random() * 0.7 + 0.3,
                angle: Math.random() * 360,
                spin: Math.random() * 2 - 1
            });
        }

        function renderCanvas() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.angle += p.spin;

                if (p.y > height) {
                    p.y = -10;
                    p.x = Math.random() * width;
                }
                if (p.x > width) p.x = 0;
                if (p.x < 0) p.x = width;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.angle * Math.PI) / 180);
                ctx.fillStyle = p.color + p.alpha + ')';
                ctx.beginPath();
                // Draw petal oval shape
                ctx.ellipse(0, 0, p.radius * 1.5, p.radius, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            requestAnimationFrame(renderCanvas);
        }
        renderCanvas();
    }
});
