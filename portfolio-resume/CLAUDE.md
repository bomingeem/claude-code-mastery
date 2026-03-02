# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

이것은 **개발자 웹 이력서** 프로젝트입니다. 전문적인 경험, 프로젝트, 기술을 보여주는 정적 HTML/CSS/JavaScript 웹사이트입니다. 간단하고 가벼우며 쉽게 배포할 수 있도록 설계되었습니다.

**기술 스택:**
- HTML5 (마크업)
- Tailwind CSS (스타일링)
- Vanilla JavaScript (인터랙티브 기능)
- 배포 대상: GitHub Pages, Vercel, 또는 Netlify

---

## 언어 및 커뮤니케이션 규칙

### 기본 응답 언어
- **Claude의 응답**: 한국어로 진행
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

### 예시
```javascript
// ✅ 올바른 예
// 네비게이션 메뉴 토글 함수
function toggleMobileMenu() {
  const menuButton = document.querySelector('.menu-btn');
  const menu = document.querySelector('.mobile-menu');
  menu.classList.toggle('hidden');
}

// ❌ 잘못된 예
function 모바일메뉴토글() { // 함수명은 영어로
  // ...
}
```

---

## 프로젝트 구조

```
.
├── index.html          # 메인 이력서 페이지
├── styles.css          # 커스텀 CSS (보조용)
├── script.js           # Vanilla JavaScript 인터랙티브 기능
├── assets/             # 이미지, 아이콘 등 정적 파일
│   ├── images/
│   └── icons/
├── ROADMAP.md          # 개발 단계 및 체크리스트
└── CLAUDE.md           # 이 파일
```

---

## 개발 환경 설정

### Tailwind CSS 설정

두 가지 접근 방법이 지원됩니다:

1. **CDN (간단한 방식, 빌드 단계 없음)** - 빠른 개발용
   - `<head>`에 추가: `<script src="https://cdn.tailwindcss.com"></script>`
   - 빌드 도구 불필요, 즉시 변경사항 반영

2. **NPM 설치 (프로덕션용)** - 최적화된 CSS
   - 설치: `npm install -D tailwindcss`
   - `tailwind.config.js` 작성 및 빌드 파이프라인 구성
   - npm 스크립트 사용: `npm run build` for CSS 컴파일

### 로컬 개발

- 브라우저에서 `index.html` 직접 열기 (CDN 방식일 경우 서버 불필요)
- 프로덕션 빌드나 최적화된 Tailwind 사용 시 간단한 HTTP 서버 실행:
  ```bash
  python -m http.server 8000
  # 또는
  npx http-server
  ```

---

## 코드 작성 가이드라인

### HTML 구조
- 시맨틱 HTML5 태그 사용: `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- 깔끔하고 읽기 쉬운 들여쓰기 유지
- SEO와 뷰포트 설정을 위한 적절한 메타 태그 포함
- JavaScript 대상 지정을 위해 의미 있는 `id`와 `class` 속성 사용

### Tailwind CSS 스타일링
- 모든 스타일링에 Tailwind 유틸리티 클래스 사용 (커스텀 CSS 최소화)
- 반응형 중단점 정의: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Tailwind 스케일을 사용한 일관된 간격 유지 (0.5rem 증분)
- 다크 모드 구현 시 다크 모드 클래스 사용 (`dark:`)

### JavaScript
- Vanilla JavaScript만 사용 (프레임워크 없음)
- 이벤트 리스너를 구간별로 정리하고 범위 지정
- HTML/JS 통합에 `data-*` 속성 사용
- 앵커 링크에는 부드러운 스크롤 사용: `behavior: 'smooth'`
- 모바일 메뉴 토글 패턴: 상태 추적 및 클래스 추가/제거

---

## 주요 섹션 및 컴포넌트

ROADMAP에 따라 이력서는 다음을 포함해야 합니다:

1. **네비게이션 바** - 고정 또는 스티키 헤더, 섹션으로 부드러운 스크롤
2. **히어로/헤더 섹션** - 프로필 사진, 이름, 간단한 소개, CTA 버튼
3. **경력 섹션** - 시간순 또는 주요 경험 위주의 경력
4. **프로젝트/포트폴리오** - 필터링 가능한 프로젝트 카드
5. **기술/스택** - 카테고리별 정리 (언어, 프레임워크, 도구)
6. **연락처 섹션** - 이메일, 소셜 링크 (GitHub, LinkedIn 등)
7. **푸터** - 저작권, 추가 링크

---

## 공통 개발 작업

- **새 프로젝트 추가**: 프로젝트 섹션에 카드 컴포넌트 생성, 필터링 구현 시 JavaScript 데이터 구조에 추가
- **색상/테마 변경**: `tailwind.config.js`에서 색상 수정 또는 Tailwind 색상 클래스 사용
- **부드러운 스크롤 구현**: CSS에서 `scroll-behavior: smooth` 사용 또는 JavaScript 이벤트 핸들러 작성
- **모바일 반응형 테스트**: 중단점별 테스트: 320px (모바일), 768px (태블릿), 1024px+ (데스크톱)
- **성능 최적화**: 이미지 최적화 (WebP 형식 사용), 화면 아래 이미지 지연 로드
- **접근성 확보**: 적절한 제목 계층 구조, 색상 대비 비율, 시맨틱 HTML 사용

---

## 배포 옵션

- **GitHub Pages**: `main` 브랜치에 푸시, 저장소 설정에서 활성화
- **Vercel/Netlify**: 저장소 연결, 푸시 시 자동 배포
- 필요시 제공자 설정에서 커스텀 도메인 추가

---

## 개발 단계

자세한 내용은 `ROADMAP.md` 참조 (7단계 개발 계획):
1. 프로젝트 설정
2. HTML 구조
3. Tailwind 스타일링
4. JavaScript 인터랙티브 기능
5. 반응형 디자인 테스트
6. 콘텐츠 최종화
7. 성능 최적화 & 배포

---

## 주의사항

- 미니멀하고 전문적인 디자인 유지 (과도한 스타일링 피하기)
- 접근성 고려 (WCAG 2.1 AA 표준)
- 모바일-우선 디자인 접근 방식 사용
- 개발 중 반응형 디자인 자주 테스트
- 성능 중요 - 이미지 최적화, 무거운 스크립트 피하기
