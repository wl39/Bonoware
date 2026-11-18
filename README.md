# Bonoware / PROBE 2

기존 PROBE 스니커즈 마켓을 React 19 + TypeScript + Vite 8로 현대화한 로컬 데모입니다. 별도 백엔드, AWS 계정, 결제 키 없이 실행할 수 있습니다.

## 시작하기

Node.js 24와 npm을 사용합니다. 기존 저장소에서 전환하는 경우에도 `npm ci`가 과거 node_modules를 새 잠금 파일 기준으로 교체합니다.

```sh
nvm use
npm ci
npm run dev
```

[http://127.0.0.1:5173](http://127.0.0.1:5173)으로 접속하세요. `npm start`도 같은 명령입니다. HTML 파일을 직접 여는 방식은 지원하지 않습니다.

로그인 화면의 **데모 계정으로 바로 시작** 버튼을 누르면 됩니다.

- 이메일: `demo@probe.local`
- 비밀번호: `Probe1234!`

## 체험할 수 있는 기능

- 상품·모델 번호 검색, 브랜드·사이즈 필터, 가격 정렬
- 상품 상세, 사이즈별 매물 선택, 가상 거래 추이
- 회원가입·로그인·로그아웃, 관심 상품과 댓글
- 모의 구매, 주문 내역, 주문 취소와 재고 복원
- 판매 등록, 판매 취소, 다른 데모 계정으로 매물 구매
- 가상 발매 일정, 저널, 데스크톱·모바일 화면
- 새로고침 후 상태 유지, 여러 탭의 로그인·관심 목록 동기화
- 마이페이지의 전체 데모 초기화 및 손상된 저장소 복구

계정과 주문은 브라우저 `localStorage`의 `probe.database.v2`에 저장합니다. 다른 기기나 브라우저와 공유되지 않습니다. 비밀번호에는 salt와 PBKDF2 해시를 사용하지만, 클라이언트에서 수정 가능한 데모 인증입니다. 실제 비밀번호나 개인정보를 입력하지 마세요.

가격·거래 내역·재고·발매일은 모두 가상입니다. 발매 일정은 최초 초기화 날짜를 기준으로 만들어지며, 실제 최신 발매 정보가 아닙니다. 실제 결제·정품 검수·배송·정산·이메일·NFC 인증은 수행하지 않습니다.

## 빌드와 검증

```sh
npm run check
npx playwright install chromium
npm run test:e2e
npm run format:check
```

`npm run test:e2e`는 직전에 `npm run build`로 생성한 결과물을 검사합니다. 테스트용 preview 서버는 자동으로 실행됩니다.

```sh
npm run build
npm run preview
```

배포 파일은 `dist/`에 생성됩니다. preview는 [http://127.0.0.1:4173](http://127.0.0.1:4173)에서 실행됩니다. 데모는 빌드 후에도 모킹이 활성화되므로 정적 호스팅만으로 작동합니다. 서비스 워커를 위해 localhost 또는 HTTPS가 필요합니다.

GitHub Pages처럼 하위 경로로 배포할 때는 다음과 같이 빌드합니다. 배포는 별도로 수행해야 합니다.

```sh
VITE_BASE_PATH=/Bonoware/ npm run build
```

라우터는 기존처럼 해시 경로를 사용합니다. 상품 예: `/#/products/jordan-unc`.

## 코드 구조

| 경로                  | 역할                                          |
| --------------------- | --------------------------------------------- |
| `src/app/`            | 현재 실행되는 React 앱과 타입                 |
| `src/app/api.ts`      | fetch 기반 API 클라이언트                     |
| `src/app/handlers.ts` | MSW의 HTTP 모킹·입력 검증                     |
| `src/app/database.ts` | 저장·계정 해시·직렬화된 재고 변경             |
| `src/app/seed.ts`     | 가상 상품·발매 일정·저널 데이터               |
| `public/images/`      | 원본 프로젝트에서 가져온 사용 이미지          |
| `tests/`              | API 및 브라우저 회귀 테스트                   |
| `legacy/`             | 구버전 화면·빌드 설정의 참고 사본             |
| `ETC/`                | 기존 Lambda 소스·아카이브, 실행 경로에서 제외 |

구버전 React/Material UI 화면을 그대로 업그레이드하는 대신 주요 사용자 흐름을 현대적인 React 컴포넌트로 다시 구현했습니다. 과거 관리자·지도·템플릿 샘플 화면은 `legacy/`에 보존하고 새 앱에 연결하지 않았습니다. 구형 SDK와 과거 API 도메인을 호출하는 코드는 현재 빌드에 포함되지 않습니다.

`node_modules`, 기존 CRA 빌드, 중복 배포 파일을 Git 추적에서 제외했습니다. 과거 커밋의 대용량 파일은 Git 이력에 그대로 있으므로, 새로 받을 때는 해당 변경이 반영된 브랜치를 `--depth 1`로 복제하면 이력 다운로드를 줄일 수 있습니다. 이력을 강제로 변경하지 않습니다.

## 실제 서버로 전환

`.env.example`을 참고해 `.env.local`을 작성합니다.

```dotenv
VITE_API_MODE=remote
VITE_API_BASE_URL=https://your-api.example/api
```

이 모드에서는 MSW를 시작하지 않습니다. 새 서버가 [API 계약](docs/API.md)을 구현해야 하며, 과거 `api.probe.gg`와의 응답 호환을 보장하지 않습니다. 인증·DB·결제·검수·배송은 별도의 서버 구현이 필요합니다. 환경 변수 변경 후 개발 서버를 재시작하거나 다시 빌드하세요.

변경 범위와 잔여 의존성 감사 항목은 [현대화 기록](docs/MODERNIZATION.md)을 참고하세요.
