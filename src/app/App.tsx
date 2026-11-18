import { lazy, Suspense, useEffect } from "react";
import {
  ArrowUpRight,
  Check,
  Heart,
  LogIn,
  ShoppingBag,
  UserRound,
  ArrowRight,
} from "lucide-react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AppProvider, useApp } from "./context";
import { api, mockMode } from "./api";
import { ErrorState, Loading } from "./components";
import { Home, Catalog, NewsPage, Article } from "./explore";
const ProductDetail = lazy(() => import("./product"));
const AccountPages = lazy(() => import("./account"));

function Layout() {
  const { user, pending, sessionError, refreshSession, notice, notify } =
    useApp();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main-content");
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        본문으로 이동
      </a>
      <div className="announcement">
        <span className="status-dot" />
        {mockMode ? "LOCAL EXPERIENCE" : "PROBE MARKET"}
        <span className="announcement-separator">/</span>
        {mockMode
          ? "아카이브를 다시 만나는 새로운 방법. 모든 거래는 가상입니다."
          : "당신의 다음 스니커즈를 발견하세요."}
      </div>
      <header className="header">
        <div className="nav-wrap">
          <Link className="wordmark" aria-label="PROBE 홈" to="/">
            PROBE<span>®</span>
          </Link>
          <nav aria-label="주요 메뉴">
            <NavLink to="/products">스니커즈</NavLink>
            <NavLink to="/new-releases">발매 일정</NavLink>
            <NavLink to="/news">저널</NavLink>
          </nav>
          <div className="nav-actions">
            <Link className="sell-nav" to="/sell">
              판매하기
              <ArrowUpRight size={15} />
            </Link>
            <Link
              className="icon-button"
              aria-label="관심 상품"
              to="/profile/following"
            >
              <Heart size={20} />
            </Link>
            <Link
              className="account-nav"
              to={user ? "/profile" : "/login"}
              aria-label={user ? "마이페이지" : "로그인"}
            >
              {user ? <UserRound size={20} /> : <LogIn size={20} />}
              <span>
                {pending ? "연결 중" : user ? "마이페이지" : "로그인"}
              </span>
            </Link>
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        {sessionError ? (
          <div className="container">
            <ErrorState
              message={sessionError}
              retry={() => void refreshSession()}
            />
            {mockMode && (
              <button
                className="button secondary recovery"
                onClick={async () => {
                  if (
                    window.confirm(
                      "이 브라우저의 데모 계정과 거래 데이터를 모두 초기화할까요?",
                    )
                  ) {
                    try {
                      await api("/demo/reset", { method: "POST" });
                      window.location.reload();
                    } catch (error) {
                      notify((error as Error).message);
                    }
                  }
                }}
              >
                데모 데이터 초기화
              </button>
            )}
          </div>
        ) : (
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Catalog />} />
              <Route path="/new-releases" element={<Catalog releases />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/nfc/:id" element={<ProductDetail />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<Article />} />
              <Route path="/login" element={<AccountPages page="login" />} />
              <Route
                path="/register"
                element={<AccountPages page="register" />}
              />
              <Route path="/sell/*" element={<AccountPages page="sell" />} />
              <Route
                path="/profile/*"
                element={<AccountPages page="profile" />}
              />
              <Route path="/about" element={<Info />} />
              <Route path="/terms" element={<Info />} />
              <Route path="/privacy" element={<Info />} />
              <Route
                path="/payments/complete"
                element={<Navigate to="/profile/orders" replace />}
              />
              <Route
                path="*"
                element={
                  <div className="container not-found">
                    <span className="eyebrow">404 / OFF THE GRID</span>
                    <h1>길을 조금 벗어났네요.</h1>
                    <p>
                      페이지를 찾을 수 없습니다. 새로운 한 켤레를 찾아볼까요?
                    </p>
                    <Link className="button" to="/products">
                      스니커즈 둘러보기
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        )}
      </main>
      <footer className="footer">
        <div className="container footer-top">
          <div>
            <Link className="wordmark" to="/">
              PROBE<span>®</span>
            </Link>
            <p>
              당신의 다음 스니커즈.
              <br />
              Find your next pair.
            </p>
          </div>
          <div className="footer-links">
            <Link to="/about">프로브 소개</Link>
            <Link to="/products">스니커즈</Link>
            <Link to="/news">저널</Link>
            <a
              href="https://github.com/wl39/Bonoware"
              target="_blank"
              rel="noreferrer"
            >
              Bonoware
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} PROBE / BONOWARE ARCHIVE</span>
          <span>
            {mockMode
              ? "로컬 데모 · 실제 결제 및 배송 없음"
              : "PROBE MARKETPLACE"}
          </span>
        </div>
      </footer>
      {notice && (
        <div className="toast" role="status">
          <Check size={18} />
          {notice}
        </div>
      )}
    </>
  );
}
function Info() {
  return (
    <div className="container prose info-page">
      <span className="eyebrow">ABOUT PROBE</span>
      <h1>
        당신의 특별한 신발을
        <br />
        프로브하세요.
      </h1>
      <p>
        Bonoware의 PROBE 스니커즈 마켓을 현대적인 개발 환경으로 다시
        연결했습니다. 원본에 보관된 아카이브 이미지를 사용하며, 탐색부터
        구매·판매까지 직접 체험할 수 있습니다.
      </p>
      <h2>로컬 데모 안내</h2>
      <p>
        표시되는 가격, 거래 추이, 발매 일정과 재고는 가상 데이터입니다. 실제
        결제, 정품 검수, 배송, 메일 발송은 실행되지 않습니다. 원본의 NFC 경로는
        상품 정보로 연결되며 실제 정품 인증을 제공하지 않습니다.
      </p>
      <h2>데이터와 계정</h2>
      <p>
        계정·주문·주소는 현재 브라우저의 저장소에만 보관됩니다. 브라우저
        데이터를 지우거나 마이페이지에서 초기화하면 삭제됩니다. 데모에는 실제
        비밀번호나 개인정보를 입력하지 마세요. 다른 기기와 동기화되지 않으며
        운영 서비스용 인증이 아닙니다.
      </p>
      <Link className="button" to="/products">
        <ShoppingBag size={17} />
        스니커즈 둘러보기
      </Link>
    </div>
  );
}
export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
