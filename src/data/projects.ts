export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  tags: string[];
  role: string;
  scope: "Solo" | "Team" | "Open Source";
  contributions: string[];
  github?: string;
  featured?: boolean;
  org?: string;
}

export const allProjects: Project[] = [
  {
    slug: "domo",
    title: "DOMO",
    subtitle: "대학 커뮤니티 협업 플랫폼",
    org: "DOMO-UNIV",
    period: "2026.01 ~ 현재",
    tags: ["Next.js", "FastAPI", "WebSocket", "WebRTC", "TypeScript"],
    role: "프론트엔드 리드 + 백엔드 기여",
    scope: "Team",
    contributions: [
      "App Router 기반 전체 라우팅 설계 — 인증 가드, route group, 동적 라우트",
      "HTTP 폴링/SSE 채팅을 WebSocket으로 전면 마이그레이션 (백엔드 포함)",
      "WebRTC 음성 채팅 — ICE candidate 큐잉, multi-peer signaling, offer collision 처리",
      "칸반 보드 — 드래그앤드롭, 상대 좌표 체계, 배치 API로 네트워크 최소화",
      "낙관적 업데이트 + Entity Lock으로 동시 편집 충돌 방지",
      "Liquid Glass 디자인 시스템 구축, 다크 모드, 커뮤니티 게시판",
    ],
    github: "https://github.com/DOMO-UNIV",
    featured: true,
  },
  {
    slug: "discord-music-bot",
    title: "discord-music-bot",
    subtitle: "Discord 음악 봇",
    period: "2026.02",
    tags: ["Python", "discord.py", "yt-dlp", "FFmpeg"],
    role: "1인 개발",
    scope: "Solo",
    contributions: [
      "yt-dlp + FFmpeg 기반 실시간 오디오 스트리밍",
      "큐 관리, 반복 재생, 볼륨 조절 명령어 구현",
      "비동기 이벤트 처리로 안정적인 봇 운영",
    ],
    github: "https://github.com/uzih05/discord-music-bot",
  },
  {
    slug: "discord-ai-bot",
    title: "discord-ai-bot",
    subtitle: "Discord AI 챗봇",
    period: "2026.02",
    tags: ["Python", "discord.py", "Claude API"],
    role: "1인 개발",
    scope: "Solo",
    contributions: [
      "Claude API 연동 대화형 AI 봇 구현",
      "컨텍스트 유지 멀티턴 대화 처리",
      "명령어 기반 모드 전환 (일반/코드/번역)",
    ],
    github: "https://github.com/uzih05/discord-ai-bot",
  },
  {
    slug: "doa",
    title: "Doa",
    subtitle: "Linux 원격 모니터링 시스템",
    period: "2026.01",
    tags: ["Python", "Master-Agent"],
    role: "1인 개발",
    scope: "Solo",
    contributions: [
      "Master-Agent 아키텍처 — 서버(분석기/핸들러) + Agent(콜렉터/고스트/데몬)",
      "공통 모듈(프로토콜/설정/로거) 분리 설계",
      "단위 + 통합 테스트 127개 전수 통과",
    ],
    github: "https://github.com/uzih05/Doa",
  },
  {
    slug: "vectorwave",
    title: "VectorWave",
    subtitle: "Python Auto-Vectorization Framework",
    org: "Cozymori",
    period: "2025.10 ~ 2025.12",
    tags: ["Python", "FastAPI", "Next.js", "Docusaurus"],
    role: "코어 기여 + 대시보드/문서 개발",
    scope: "Open Source",
    contributions: [
      "VectorWave 코어 — tracer 단위 테스트, 로깅 마이그레이션, PyPI 배포 CI/CD",
      "VectorSurfer 대시보드 — FastAPI 백엔드 설계, 차트/레이아웃 전체 구현",
      "에러 집계/KPI 쿼리 최적화, 비동기 배치 진단(HealerService) 구현",
      "vectorwave-docs — Docusaurus 랜딩 페이지, 다크/라이트 모드, GitHub Pages 배포",
    ],
    github: "https://github.com/Cozymori/VectorWave",
  },
  {
    slug: "catp",
    title: "CATP",
    subtitle: "적성검사 웹 애플리케이션",
    period: "2025.11 ~ 2025.12",
    tags: ["Spring Boot", "Azure", "Cosine Similarity"],
    role: "백엔드 개발",
    scope: "Team",
    contributions: [
      "Cosine Similarity 기반 적성 점수 계산 — 전략 패턴으로 알고리즘 교체 가능",
      "캐릭터 프로그레스바 애니메이션 직접 구현 (걷기/넘어짐/야호 상태 전환)",
      "학과 추천 + 마스코트 70종 연동, 30일 자동 삭제 스케줄링",
      "Azure App Service CI/CD 배포",
    ],
    github: "https://github.com/uzih05/CATP",
  },
  {
    slug: "studyplatform",
    title: "studyplatform",
    subtitle: "실시간 학습 플랫폼",
    period: "2025.11 ~ 2025.12",
    tags: ["Spring Boot", "Swing", "Socket"],
    role: "1인 개발",
    scope: "Solo",
    contributions: [
      "자체 소켓 통신 프로토콜 설계 — 특수문자 인코딩, 메시지 파싱 안정성",
      "서버 스레드 풀 + 데드락 해결",
      "과제 관리 (출제/제출/채점) 전체 흐름",
      "BaseLoginFrame, BaseMainFrame 공통 추출로 서버/클라이언트 UI 코드 중복 제거",
    ],
    github: "https://github.com/uzih05/studyplatform",
  },
  {
    slug: "dgit",
    title: "DGIT",
    subtitle: "디자인 파일 버전 관리 시스템",
    org: "3pxTeam",
    period: "2025.08 ~ 2025.10",
    tags: ["Go", "Electron", "Binary Delta", "LZ4"],
    role: "코어 엔진 + GUI 전체 개발",
    scope: "Team",
    contributions: [
      "파일 크기별 스마트 압축 — 100MB 이하 Binary Delta, 이상 LZ4 Snapshot",
      "bsdiff 알고리즘을 Pure Go로 직접 구현 (크로스 플랫폼 지원)",
      "PSD 레이어 파싱으로 레이어 단위 변경 감지",
      "저장소 구조 3-tier → 2-tier 단순화로 I/O 오버헤드 감소",
      "Electron GUI — 커밋 프로그레스 바, 한국어 인코딩 처리",
    ],
    github: "https://github.com/3pxTeam/DGIT",
  },
];

export const featuredProject =
  allProjects.find((p) => p.featured) ?? allProjects[0];
