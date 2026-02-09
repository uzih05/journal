# Portfolio v3 — Editorial Enhanced (Design C2)

## 프로젝트 개요

유지헌(uzih05)의 개발 포트폴리오 + 블로그 사이트. 모노크롬 에디토리얼(매거진) 스타일.
- 주황 액센트 (#FF4D00 라이트 / #FF6B30 다크)
- 노이즈 텍스처
- 스크롤 리빌 애니메이션
- 풀스크린 오버레이 네비게이션
- 큰 섹션 번호(01-04)와 비대칭 레이아웃

## 기술 스택

- Next.js 16.1.6, React 19.2.4, TypeScript 5
- Tailwind CSS 4.1.18, Framer Motion 12.33.0
- MDX (next-mdx-remote-client), Shiki (듀얼 테마), Fuse.js

## 사용자 소통 언어

**반드시 한국어로 대화할 것.** 사용자는 한국어를 사용함.

## 현재 상태 (2026-02-09)

### 완료됨
- **Phase 1**: 프로젝트 기반 (테마, 레이아웃, 네비게이션, 푸터)
- **Phase 2**: 홈 페이지 (Hero, Projects 아코디언, Tech+Timeline, BlogPreview, Contact)
- **Phase 3 부분**: 블로그 이식 (lib, 컴포넌트, 페이지)
- **에디토리얼 개선**: 큰 섹션 번호, 비대칭 레이아웃, 풀스크린 오버레이 메뉴
- **데스크톱 텍스트 크기**: 모든 홈 섹션에 `lg:` 브레이크포인트 적용 완료
- **블로그 매거진 개편**: layout, page, [slug]/page, TagFilter를 에디토리얼 스타일로 리라이트
- **주황색 배경 글로우 제거**: HeroSection, ContactSection에서 제거
- **불필요한 요소 제거**: Contact 화살표, TechTimeline 글귀(quote), "Portfolio 2026" → "@uzih05"
- **빌드 통과**: `npm run build` 성공

### 남은 작업
- 모든 항목 완료됨 (아래 "최종 정리" 참조)

### 최종 정리 (2026-02-09)
- **RSS 제거**: `feed.xml/route.ts` 삭제 + Footer RSS 링크 제거
- **Giscus 제거**: `GiscusComments.tsx` 삭제, `@giscus/react` 패키지 제거
- **미사용 파일 정리**: `BlogFooter.tsx`, `PostCard.tsx`, `TagPill.tsx`, `tags.ts` 삭제
- **SearchBar 스타일**: 에디토리얼 톤 적용 (border-bottom 스타일, 각진 드롭다운)
- **TableOfContents 스타일**: 에디토리얼 톤 적용 ("Contents" 라벨, mono 폰트)
- **접근성 개선**:
  - `globals.css`에 `:focus-visible` 전역 스타일 추가
  - Skip-to-content 링크 추가 (`layout.tsx`)
  - `<main id="main">` 래퍼 추가
  - Navbar: ESC 키로 메뉴 닫기, `aria-label` 추가
  - 모든 장식 SVG에 `aria-hidden="true"` 추가
  - SearchBar 드롭다운 `max-h-60 overflow-y-auto` 추가
- **반응형 조정**: ProjectAccordion 모바일 패딩 `pl-10` → `pl-8`
- **빌드 통과**: `npm run build` 성공

## 주요 기술적 해결 사항

### 테마 하이드레이션
- `useSyncExternalStore` 패턴으로 서버/클라이언트 초기 스냅샷 일치
- `layout.tsx`의 인라인 스크립트로 FOUC 방지
- `<html>` 태그에 `style={{ backgroundColor: "#09090b" }}` 인라인

### 흰색 번쩍임 방지
- `overscroll-behavior: none` on `html`
- Navbar border: `border-transparent` ↔ `border-border` 토글 (`transition-colors` 사용)
- `<meta name="color-scheme" content="dark light" />`

### React 19 호환
- `useSyncExternalStore`로 ThemeProvider 구현 (react-hooks/set-state-in-effect 회피)
- Navbar 링크: 개별 transition 속성 사용 (shorthand 충돌 방지)

## 사용자 선호사항
- 블로그는 기록용, 간편하게 사용 (댓글/RSS 불필요)
- 주황 액센트 유지
- 에디토리얼/매거진 스타일 선호
- 프로젝트 상세: 아코디언 확장 (페이지 이동 없음)
- Featured 프로젝트: `featured: true` 플래그로 동적 관리
