# PROBE API 계약

현재 클라이언트가 사용하는 계약입니다. 기본 mock 모드는 같은 origin의 `<BASE_URL>api` 요청을 로컬 Node HTTP 서버가 받고 MSW 공통 핸들러로 처리합니다. 브라우저 서비스 워커는 사용하지 않습니다. remote 모드에서는 `VITE_API_BASE_URL`을 사용하며 모든 요청에 `credentials: include`를 지정합니다. 서버는 적절한 쿠키 인증과 CORS 정책을 구현해야 합니다.

응답 본문은 JSON입니다. 실패 시 HTTP 400/401/404/409/503 등과 `{ "message": "사용자에게 보여줄 설명" }`을 반환합니다. 알려지지 않은 모킹 경로는 404로 처리하여 실제 구형 API로 전달되지 않습니다.

## 엔드포인트

| 메서드 | 경로                     | 요청 / 결과                                                  |
| ------ | ------------------------ | ------------------------------------------------------------ |
| GET    | `/products`              | `q`, `brand`, `size`, `sort`, `upcoming` 쿼리 / `Product[]`  |
| GET    | `/products/:id`          | `id` 또는 모델 번호 / `{ product, offers, comments }`        |
| GET    | `/session`               | `{ user: { id, email, name } \| null, following: string[] }` |
| POST   | `/auth/login`            | `{ email, password }` / session                              |
| POST   | `/auth/register`         | `{ email, password, name }` / session, 201                   |
| POST   | `/auth/logout`           | `{ ok: true }`                                               |
| PUT    | `/following/:id`         | `{ saved: boolean }` / `{ following: string[] }`             |
| GET    | `/profile`               | `{ orders: Order[], listings: Offer[] }`, 본인 자료만        |
| POST   | `/orders`                | `{ offerId, recipient, address }` / Order, 201               |
| POST   | `/orders/:id/cancel`     | 취소한 Order                                                 |
| POST   | `/listings`              | `{ productId, size, price, condition }` / Offer, 201         |
| DELETE | `/listings/:id`          | 취소한 Offer                                                 |
| POST   | `/products/:id/comments` | `{ text }` / Comment, 201                                    |
| GET    | `/news`                  | News[]                                                       |
| GET    | `/news/:id`              | News                                                         |
| POST   | `/demo/reset`            | 로컬 데모 전체 삭제 / `{ ok: true }`                         |

타입의 전체 정의는 `src/app/types.ts`, 상세 매물 응답은 `src/app/api.ts`의 `Detail`을 참고하세요. 상품 상세의 매물은 `userId` 대신 `own: boolean`을 포함합니다. 계정 응답에 비밀번호 해시나 salt는 포함되지 않습니다.

## 조회와 재고 규칙

- `/products`는 기본적으로 이미 발매된 가상 상품만 반환합니다. `upcoming=true`는 가상 발매 예정 상품만 반환합니다.
- `q`는 브랜드·모델명·부제·모델 번호에 대해 대소문자를 구분하지 않는 부분 검색입니다.
- 브랜드는 `Nike`, `Jordan`, `Adidas`; `sort`는 기본 인기순, `price-asc`, `price-desc`, `recent`입니다. `recent`는 발매일 내림차순입니다.
- 판매 중인 매물의 최저가를 상품 `price`로 사용합니다. 매물이 없으면 `null`입니다. `sizes`는 현재 판매 가능한 사이즈 집합입니다.
- 상품 사이즈는 240~290mm, 5mm 간격입니다. 판매가는 10,000~10,000,000원 정수이며 상태는 `new` 또는 `used`입니다.
- 주문 금액은 매물 가격 + 모의 배송비 3,000원으로 API에서 산출합니다. 클라이언트가 보낸 임의 가격은 무시합니다.
- 동일 매물은 한 번만 구매할 수 있습니다. 재고 변경은 단일 Node 프로세스의 트랜잭션 큐로 직렬화하며, 브라우저·탭이 달라도 동일 매물의 중복 구매는 거절합니다. 여러 Node 프로세스가 같은 데이터 파일을 동시에 사용하는 구성은 지원하지 않습니다.
- 본인 매물 구매, 발매 전 상품의 구매·판매, 타인 주문·매물 변경은 거절합니다.
- 주문 취소 시 매물을 판매 중으로 복원합니다. 이미 취소한 주문이나 판매 중이 아닌 매물의 재취소는 409입니다.
- `recipient`는 2~40자, `address`는 5~200자, 댓글은 1~500자입니다. 앞뒤 공백을 제거합니다.
- 로그인 세션은 HTTP-only `probe_session` 쿠키로 구분하며 같은 브라우저의 탭끼리 공유합니다. 다른 브라우저의 계정과 세션은 분리됩니다. 다른 탭에서 변경한 상태는 재조회·새로고침 시 반영합니다.
- 단위 테스트는 MSW Node 어댑터를, 통합·브라우저 테스트는 실제 로컬 HTTP 서버를 사용합니다. 데이터와 세션은 `.probe/state.json`에 저장되고 서버를 재시작해도 유지됩니다.

## 서버로 전환할 때

모킹은 동작을 설명하는 참조 구현입니다. 실제 서버는 인증, 접근 제어, DB 트랜잭션, 결제·환불, 검수·배송, 감사 로그 등을 직접 구현해야 합니다. `/demo/reset`은 운영 서버에 구현하지 말고, 데모 계정·가상 데이터·모킹 전용 UI를 서비스 정책에 맞춰 교체해야 합니다.

## 원본 UI 응답 호환 계층

현재 화면의 axios 요청은 과거 도메인을 호출하는 대신 `<BASE_URL>classic`으로 변환됩니다. `src/classic/handlers.js`가 원본 응답 구조와 위 `/api` 계약 사이를 연결합니다. `/open`, `/open/products`, `/open/search`, `/open/search_option`, `/open/shoe`, `/open/unreleasedShoe`, 뉴스·댓글·사이즈 가격 조회와 `/protected`의 로그인 확인·관심·구매·판매·프로필 응답을 지원합니다.

이 계층은 원본의 `_id`, `name`의 영문·한글 구분자, `image[]`, `data`, `orderby.item` 구조를 유지합니다. 주문·취소·판매·관심 목록·댓글 변경은 위의 검증된 영속 API로 처리합니다. remote 모드에서는 과거 도메인 대신 `VITE_API_BASE_URL`로 보내므로 서버도 원본 UI 호환 엔드포인트를 제공해야 합니다. 환경 변수만 바꾼다고 과거 서버와 자동 호환되는 것은 아닙니다.
