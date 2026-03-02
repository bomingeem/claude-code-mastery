// DOMContentLoaded 이후 모든 기능 실행
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollSpy();
    initNavbarScroll();
    initProjectFilter();
    initFadeInSections();
    initTypingEffect();
    initFooterYear();
    initTicker();
    initCountUpAnimation();
});

/* ==================== 1. 모바일 메뉴 토글 ==================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isOpen = false;

    // 햄버거 버튼 클릭 핸들러
    menuBtn.addEventListener('click', function() {
        isOpen = !isOpen;

        if (isOpen) {
            mobileMenu.classList.remove('hidden');
            menuBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // 메뉴 링크 클릭 시 메뉴 닫기
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
            isOpen = false;
        });
    });

    // 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickInsideBtn = menuBtn.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideBtn && isOpen) {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
            isOpen = false;
        }
    });
}

/* ==================== 2. 스크롤 스파이 (네비 링크 강조) ==================== */
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // IntersectionObserver로 현재 보이는 섹션 감지
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 모든 링크에서 활성 클래스 제거
                navLinks.forEach(link => {
                    link.classList.remove('text-primary');
                    link.classList.add('text-gray-300');
                });

                // 현재 섹션에 해당하는 링크 활성화
                const targetLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (targetLink) {
                    targetLink.classList.remove('text-gray-300');
                    targetLink.classList.add('text-primary');
                }
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
}

/* ==================== 3. 네비게이션 바 스크롤 그림자 ==================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==================== 4. 프로젝트 필터링 ==================== */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // 활성 버튼 스타일 업데이트
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary/10', 'border-primary', 'text-primary');
                btn.classList.add('border-gray-600', 'text-gray-300');
            });

            this.classList.add('active', 'bg-primary/10', 'border-primary', 'text-primary');
            this.classList.remove('border-gray-600', 'text-gray-300');

            // 카드 필터링
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        card.classList.remove('hidden');
                        card.style.display = '';
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

/* ==================== 5. 섹션 페이드인 애니메이션 ==================== */
function initFadeInSections() {
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    // IntersectionObserver로 섹션이 보이면 페이드인
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 한 번 애니메이션 실행 후 observer 제거 (성능)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInSections.forEach(section => {
        observer.observe(section);
    });
}

/* ==================== 6. 타이핑 효과 (직함 순환) ==================== */
function initTypingEffect() {
    const typedText = document.getElementById('typed-text');

    // 순환할 직함 목록
    const titles = [
        '풀스택 개발자',
        '프론트엔드 엔지니어',
        '오픈소스 기여자'
    ];

    let currentTitleIndex = 0;
    let isDeleting = false;
    let charIndex = 0;
    const typingSpeed = 100;        // 타이핑 속도 (ms)
    const deletingSpeed = 50;       // 삭제 속도 (ms)
    const pauseTime = 1500;         // 일시 정지 시간 (ms)

    function typeTitle() {
        const currentTitle = titles[currentTitleIndex];

        if (!isDeleting) {
            // 타이핑 중
            if (charIndex < currentTitle.length) {
                typedText.textContent += currentTitle.charAt(charIndex);
                charIndex++;
                setTimeout(typeTitle, typingSpeed);
            } else {
                // 타이핑 완료, 일시 정지
                isDeleting = true;
                setTimeout(typeTitle, pauseTime);
            }
        } else {
            // 삭제 중
            if (charIndex > 0) {
                typedText.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeTitle, deletingSpeed);
            } else {
                // 삭제 완료, 다음 직함으로 이동
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                setTimeout(typeTitle, 500);
            }
        }
    }

    typeTitle();
}

/* ==================== 7. 푸터 연도 자동 업데이트 ==================== */
function initFooterYear() {
    const currentYearElement = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

/* ==================== 8. 티커 무한 스크롤 DOM 복제 ==================== */
function initTicker() {
    const track = document.querySelector('.ticker-track');
    if (!track) return;

    // CSS 애니메이션이 -50% 지점에서 원위치하는 무한 루프를 위해 2배 복제
    track.innerHTML = track.innerHTML + track.innerHTML;
}

/* ==================== 9. 어바웃 섹션 숫자 카운트업 애니메이션 ==================== */
function initCountUpAnimation() {
    const counters = document.querySelectorAll('[data-count-to]');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || entry.target.classList.contains('counted')) return;

            entry.target.classList.add('counted');
            const target = parseInt(entry.target.dataset.countTo, 10);
            const suffix = entry.target.dataset.suffix || '';
            let current = 0;
            const step = target / (1500 / 16); // 1.5초 동안 카운트업

            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                entry.target.textContent = Math.floor(current) + suffix;

                if (current >= target) {
                    clearInterval(timer);
                }
            }, 16); // 약 60fps

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}
