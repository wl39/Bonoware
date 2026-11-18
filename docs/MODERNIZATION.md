# 현대화 기록

기준일: 2026-11-18. 원본 기준 커밋: `fd2205bf`. 작업 브랜치: `codex/modernize-local-demo`.

## 변경 배경

원본은 React 16.4, Webpack 3.8, ejected CRA 1 계열, Babel 6, node-sass-chokidar를 사용했습니다. 루트와 Lambda 하위의 `node_modules` 85,203개 파일이 Git에서 추적되고 있었고, API·Cognito·결제 SDK에 실행 환경이 직접 연결되어 있었습니다.

## 구현

React 19.3.1, React Router 7.18.5, Vite 8.3.8, TypeScript 7.0.2, MSW 3.0.6을 사용합니다. 실제 설치 버전은 package-lock.json으로 고정합니다. Node.js 24에서 검증했습니다. 브라우저는 최신 Chromium 등 ES2023·서비스 워커·Web Crypto 지원 환경을 기준으로 합니다.

현재 앱은 `src/app`입니다. 구버전 소스와 빌드 설정은 `legacy`, Lambda 자료는 `ETC`에 보존했습니다. 과거 SDK를 설치하거나 AWS 자격 증명을 초기화하지 않습니다. 원본 브랜드와 스니커즈 이미지를 유지하면서 주요 화면을 재구성했습니다. 원본 관리자 기능·미사용 템플릿 화면을 모두 복구한 것은 아닙니다.

모킹은 기본 모드입니다. 실제 fetch 요청을 MSW로 처리하고, 브라우저 저장소에 상태를 보관합니다. 계정 비밀번호에는 PBKDF2-SHA256 100,000회와 계정별 salt를 사용하지만 보안 경계는 브라우저 내부에 있으므로 운영 인증으로 쓸 수 없습니다.

Git 추적에서 vendored dependencies와 CRA 생성물을 제거했습니다. 기존 이력은 수정하지 않습니다. `legacy`의 대용량 폰트·이미지는 보존되어 있으나 현재 번들에 포함되지 않습니다. 따라서 새 빌드는 가볍지만, 일반적인 full clone은 과거 이력의 다운로드 비용이 남습니다.

## 검증과 성능 측정

- API 테스트 12개 통과: 검색·정렬, 로그인 실패, 중복 가입, 계정 격리, 관심 목록, 댓글, 가격 변조, 중복·동시 구매, 주문·판매 취소, 저장소 손상 및 저장 차단을 검사합니다.
- Playwright 16개 통과: 데스크톱 Chromium 및 iPhone 13 크기의 Chromium에서 같은 사용자 흐름을 검사합니다. WebKit/Safari 및 Firefox 동작은 별도 검증하지 않았습니다.
- TypeScript 검사와 프로덕션 빌드, 포맷 검사를 통과했습니다.
- 소스 ZIP을 빈 디렉터리에 풀어 `npm ci`와 프로덕션 빌드 성공을 확인했습니다.
- `/Bonoware/` 하위 경로의 서비스 워커·상품 조회와 remote 모드의 모킹 미시작·이전 서비스 워커 해제를 브라우저에서 확인했습니다.
- 360·390·768·1024·1440px에서 상품 목록·발매 일정·저널·로그인·상품 상세의 가로 넘침을 확인했으며 발생하지 않았습니다.
- 첫 의존성 설치 약 9초, 첫 Vite 번들 생성 약 0.8초, 이후 캐시 상태에서는 약 0.2초. macOS ARM64 / Node 24.22.2에서의 관측값이며 타입 검사 시간을 포함하지 않습니다.
- 현재 정적 결과물은 약 1.2MB입니다. 압축 전 디스크 크기이며 브라우저 최초 전송량과는 다릅니다.
- 원본 빌드 시간은 재측정하지 않았으므로 개선 배율을 제시하지 않습니다.

## 남아 있는 의존성 감사 항목

2026-11-18의 `npm audit`는 `picomatch <=4.0.7`의 반복 extglob 처리에 따른 ReDoS 경고([GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf))와 관련 의존성 전파를 포함해 high 6건을 보고했습니다. 현재 npm에서 제공하는 picomatch 안정 버전도 4.0.7이며, 패치 버전을 설치할 수 없었습니다. 경고를 숨기거나 `npm audit fix --force`로 오래된 Vite/Vitest로 내리지 않았습니다.

이 앱은 사용자 검색어를 picomatch 패턴으로 실행하지 않습니다. 개발·preview 서버는 기본적으로 127.0.0.1에만 바인딩됩니다. `npm audit --omit=dev`에서도 MSW의 선택적 Vite peer 경로 때문에 4건이 표시될 수 있습니다. 빌드된 정적 앱과 의존성 설치 트리의 감사 결과를 구분해야 합니다. 패치 배포 후 lockfile을 갱신하고 검증을 다시 수행하세요.

## 참고 문서

- [React 버전](https://react.dev/versions)
- [Vite 시작하기와 Node 요구사항](https://vite.dev/guide/)
- [MSW 브라우저 통합](https://mswjs.io/guides/integrations/browser)

이 문서의 구현·측정 결과는 로컬 코드와 실행 결과를 기준으로 작성했습니다.
