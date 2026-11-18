import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  LogOut,
  Package,
  Plus,
  RotateCcw,
  ShoppingBag,
} from "lucide-react";
import {
  Link,
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { api, json, mockMode } from "./api";
import { useApp, useResource } from "./context";
import {
  Empty,
  ErrorState,
  Loading,
  ProductCard,
  date,
  money,
} from "./components";
import { DEMO_EMAIL, DEMO_PASSWORD, imagePath, SIZES } from "./seed";
import type { Product, Profile, Session } from "./types";

export default function AccountPages({
  page,
}: {
  page: "login" | "register" | "sell" | "profile";
}) {
  if (page === "login" || page === "register")
    return <Auth key={page} register={page === "register"} />;
  return <Protected>{page === "sell" ? <Sell /> : <MyProfile />}</Protected>;
}
function Protected({ children }: { children: ReactNode }) {
  const { user, pending } = useApp();
  const location = useLocation();
  if (pending) return <Loading />;
  if (!user)
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  return children;
}
function Auth({ register }: { register: boolean }) {
  const { user, pending, setSession, notify } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const target =
    from?.startsWith("/") &&
    !from.startsWith("//") &&
    !["/login", "/register"].includes(from)
      ? from
      : "/profile";
  async function authenticate(
    input: object,
    route = register ? "/auth/register" : "/auth/login",
  ) {
    setBusy(true);
    setError("");
    try {
      const session = await api<Session>(route, {
        method: "POST",
        body: json(input),
      });
      setSession(session);
      notify(
        register && route.endsWith("register")
          ? "가입되었습니다. 나만의 컬렉션을 시작하세요."
          : "다시 만나 반갑습니다.",
      );
      navigate(target, { replace: true });
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    void authenticate({
      email: form.get("email"),
      password: form.get("password"),
      name: form.get("name"),
    });
  }
  if (pending) return <Loading />;
  if (user) return <Navigate to={target} replace />;
  return (
    <div className="container auth-page">
      <div className="auth-story">
        <span className="eyebrow">YOUR COLLECTION STARTS HERE</span>
        <h1>
          좋아하는 것을
          <br />
          모으는 사람들.
        </h1>
        <img
          src={imagePath("yeezy-butter.jpg")}
          alt="Yeezy Boost 350 V2 Butter"
        />
        <span className="auth-bottom">GOOD TASTE. GREAT PAIRS.</span>
      </div>
      <div className="auth-form">
        <span className="eyebrow">WELCOME TO PROBE</span>
        <h2>{register ? "취향의 시작, 회원가입" : "다시 만나 반갑습니다."}</h2>
        <p>
          {register
            ? "나만의 스니커즈 컬렉션을 만들어보세요."
            : "로그인하고 다음 한 켤레를 발견하세요."}
        </p>
        <form key={register ? "register" : "login"} onSubmit={submit}>
          {register && (
            <label>
              닉네임
              <input
                name="name"
                autoComplete="nickname"
                required
                minLength={2}
                maxLength={20}
                placeholder="2~20자"
              />
            </label>
          )}
          <label>
            이메일
            <input
              type="email"
              name="email"
              autoComplete="username"
              required
              maxLength={200}
              placeholder="you@example.com"
            />
          </label>
          <label>
            비밀번호
            <input
              type="password"
              name="password"
              autoComplete={register ? "new-password" : "current-password"}
              required
              minLength={register ? 8 : 1}
              maxLength={128}
              placeholder={
                register ? "8자 이상 입력해주세요" : "비밀번호를 입력해주세요"
              }
            />
          </label>
          {register && (
            <label className="checkbox-label">
              <input type="checkbox" required />
              데모용 계정이며 실제 개인정보를 사용하지 않습니다.
            </label>
          )}
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button className="button full" disabled={busy}>
            {busy ? "연결 중…" : register ? "가입하고 시작하기" : "로그인"}
            <ArrowRight size={17} />
          </button>
        </form>
        {mockMode && (
          <div className="demo-login">
            <span>가볍게 먼저 둘러보고 싶다면</span>
            <button
              className="button secondary full"
              disabled={busy}
              onClick={() =>
                void authenticate(
                  { email: DEMO_EMAIL, password: DEMO_PASSWORD },
                  "/auth/login",
                )
              }
            >
              데모 계정으로 바로 시작
              <ArrowUpRight size={16} />
            </button>
            <small>
              {DEMO_EMAIL} / {DEMO_PASSWORD}
            </small>
          </div>
        )}
        <p className="auth-switch">
          {register ? "이미 계정이 있나요?" : "처음 오셨나요?"}{" "}
          <Link to={register ? "/login" : "/register"} state={{ from: target }}>
            {register ? "로그인" : "회원가입"}
          </Link>
        </p>
        {mockMode && (
          <p className="privacy-note">
            계정 정보는 이 브라우저에만 저장됩니다.
            <br />
            실제 사용 중인 비밀번호나 개인정보를 입력하지 마세요.
          </p>
        )}
      </div>
    </div>
  );
}
function Sell() {
  const { user, notify } = useApp();
  const resource = useResource<Product[]>("/products");
  const [productId, setProductId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const product = resource.data?.find((p) => p.id === productId);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      await api("/listings", {
        method: "POST",
        body: json({
          productId,
          size: Number(form.get("size")),
          price: Number(form.get("price")),
          condition: form.get("condition"),
        }),
      });
      notify("판매 등록을 완료했습니다. 상품 상세에 매물이 반영되었습니다.");
      navigate("/profile/selling");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="container sell-page">
      <div className="page-title">
        <div>
          <span className="eyebrow">GIVE YOUR PAIR A NEW STORY</span>
          <h1>다음 주인을 만날 시간.</h1>
          <p>{user?.name}님의 아카이브를 새로운 이야기로 연결하세요.</p>
        </div>
      </div>
      {resource.loading ? (
        <Loading />
      ) : resource.error ? (
        <ErrorState message={resource.error} retry={resource.reload} />
      ) : (
        <div className="sell-layout">
          <form className="sell-form" onSubmit={submit}>
            <div className="form-step">
              <span>01</span>
              <h2>어떤 스니커즈인가요?</h2>
            </div>
            <label>
              상품 모델
              <select
                required
                aria-label="판매할 상품"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              >
                <option value="" disabled>
                  모델을 선택해주세요
                </option>
                {resource.data?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.subtitle}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label>
                사이즈
                <select
                  name="size"
                  aria-label="사이즈"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    사이즈 선택
                  </option>
                  {SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size} mm
                    </option>
                  ))}
                </select>
              </label>
              <label>
                상품 상태
                <select
                  name="condition"
                  aria-label="상품 상태"
                  defaultValue="new"
                >
                  <option value="new">새 상품</option>
                  <option value="used">중고</option>
                </select>
              </label>
            </div>
            <div className="form-step">
              <span>02</span>
              <h2>판매 금액을 정해주세요.</h2>
            </div>
            <label>
              판매 금액 (원)
              <input
                type="number"
                name="price"
                required
                min={10000}
                max={10000000}
                step={1}
                placeholder="10,000~10,000,000"
              />
            </label>
            {product && (
              <p className="muted">
                현재 최저가{" "}
                {product.price === null ? "매물 없음" : money(product.price)} ·
                가상 시세
              </p>
            )}
            <label className="checkbox-label">
              <input type="checkbox" required />
              가상 판매 등록이며 실제 배송·정산이 없음을 확인했습니다.
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="button full" disabled={busy}>
              {busy ? "등록 중…" : "판매 등록하기"}
              <Plus size={18} />
            </button>
          </form>
          <aside className="sell-preview">
            <span className="eyebrow">YOUR NEXT CHAPTER</span>
            {product ? (
              <>
                <div style={{ background: product.color }}>
                  <img src={imagePath(product.image)} alt={product.name} />
                </div>
                <span className="product-brand">{product.brand}</span>
                <h2>{product.name}</h2>
                <p>{product.subtitle}</p>
              </>
            ) : (
              <>
                <ShoppingBag size={65} strokeWidth={1} />
                <h2>
                  한 켤레의
                  <br />
                  새로운 가능성.
                </h2>
                <p>
                  왼쪽에서 모델을 선택하면
                  <br />
                  스니커즈 정보를 확인할 수 있어요.
                </p>
              </>
            )}
            <div className="seller-note">
              <Package size={18} />
              <p>
                등록한 매물은 마이페이지에서 관리할 수 있습니다. 판매 중인
                매물은 언제든 취소할 수 있어요.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
function MyProfile() {
  const { user, following, logout, notify } = useApp();
  const resource = useResource<Profile>("/profile", user?.id);
  const catalog = useResource<Product[]>("/products");
  const releases = useResource<Product[]>("/products?upcoming=true");
  const location = useLocation();
  const [busyId, setBusyId] = useState("");
  const [mutationError, setMutationError] = useState("");
  const tab = location.pathname.endsWith("/following")
    ? "following"
    : location.pathname.endsWith("/selling")
      ? "selling"
      : "orders";
  const products = [...(catalog.data || []), ...(releases.data || [])];
  const productFor = (id: string) => products.find((p) => p.id === id);
  async function cancel(id: string, listing = false) {
    if (
      !window.confirm(
        listing
          ? "이 매물의 판매를 취소할까요?"
          : "이 모의 주문을 취소할까요? 재고가 복원됩니다.",
      )
    )
      return;
    setBusyId(id);
    setMutationError("");
    try {
      await api(listing ? `/listings/${id}` : `/orders/${id}/cancel`, {
        method: listing ? "DELETE" : "POST",
      });
      resource.reload();
      catalog.reload();
      notify(
        listing
          ? "판매 등록을 취소했습니다."
          : "주문을 취소하고 재고를 복원했습니다.",
      );
    } catch (error) {
      setMutationError((error as Error).message);
    } finally {
      setBusyId("");
    }
  }
  async function reset() {
    if (
      !window.confirm(
        "이 브라우저의 모든 데모 계정, 주문, 판매, 댓글과 관심 목록을 초기화할까요?",
      )
    )
      return;
    setBusyId("reset");
    setMutationError("");
    try {
      await api("/demo/reset", { method: "POST" });
      window.location.hash = "/";
      window.location.reload();
    } catch (error) {
      setMutationError((error as Error).message);
      setBusyId("");
    }
  }
  return (
    <div className="container profile-page">
      <div className="profile-heading">
        <div>
          <span className="eyebrow">MY PROBE / YOUR PERSONAL ARCHIVE</span>
          <h1>반가워요, {user?.name}님.</h1>
          <p>취향이 쌓이는 나만의 공간.</p>
        </div>
        <button className="text-link" onClick={() => void logout()}>
          <LogOut size={15} />
          로그아웃
        </button>
      </div>
      <div className="profile-stats">
        <div>
          <span>관심 상품</span>
          <strong>
            {following.length}
            <small>켤레</small>
          </strong>
        </div>
        <div>
          <span>확정 주문</span>
          <strong>
            {resource.data?.orders.filter((o) => o.status === "confirmed")
              .length ?? 0}
            <small>건</small>
          </strong>
        </div>
        <div>
          <span>판매 중</span>
          <strong>
            {resource.data?.listings.filter((o) => o.status === "on_sale")
              .length ?? 0}
            <small>건</small>
          </strong>
        </div>
        <Link to="/sell">
          <Plus size={24} />
          <span>새 판매 등록</span>
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <nav className="profile-tabs" aria-label="마이페이지 메뉴">
        <NavLink
          to="/profile/orders"
          className={tab === "orders" ? "active" : ""}
        >
          구매 내역
        </NavLink>
        <NavLink
          to="/profile/selling"
          className={tab === "selling" ? "active" : ""}
        >
          판매 내역
        </NavLink>
        <NavLink
          to="/profile/following"
          className={tab === "following" ? "active" : ""}
        >
          관심 상품
          <Heart size={14} />
        </NavLink>
      </nav>
      {mutationError && (
        <p className="form-error" role="alert">
          {mutationError}
        </p>
      )}
      {resource.loading || catalog.loading || releases.loading ? (
        <Loading />
      ) : resource.error || catalog.error || releases.error ? (
        <ErrorState
          message={resource.error || catalog.error || releases.error}
          retry={() => {
            resource.reload();
            catalog.reload();
            releases.reload();
          }}
        />
      ) : (
        <>
          {tab === "following" &&
            (following.length ? (
              <div className="product-grid">
                {products
                  .filter((p) => following.includes(p.id))
                  .map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
              </div>
            ) : (
              <Empty
                title="취향을 하나씩 담아보세요."
                description="마음에 드는 스니커즈의 하트를 눌러 나만의 컬렉션을 시작하세요."
              />
            ))}
          {tab === "orders" &&
            (resource.data?.orders.length ? (
              <div className="activity-list">
                {resource.data.orders.map((order) => {
                  const p = productFor(order.productId);
                  return (
                    <article className="activity-card" key={order.id}>
                      <div className="activity-top">
                        <span>
                          {date(order.createdAt)}
                          <small>
                            주문 {order.id.slice(0, 8).toUpperCase()}
                          </small>
                        </span>
                        <span
                          className={`pill ${order.status === "cancelled" ? "neutral" : ""}`}
                        >
                          {order.status === "confirmed"
                            ? "주문 확정 · 모의 거래"
                            : "주문 취소"}
                        </span>
                      </div>
                      <div className="activity-body">
                        <Link to={`/products/${order.productId}`}>
                          <img
                            src={imagePath(p?.image || "jordan-blue.jpg")}
                            alt={p?.name || "상품"}
                          />
                        </Link>
                        <div className="activity-info">
                          <Link to={`/products/${order.productId}`}>
                            <strong>{p?.name}</strong>
                          </Link>
                          <p>{p?.subtitle}</p>
                          <span>
                            {order.size} mm · 상품 {money(order.price)} + 배송비{" "}
                            {money(order.shipping)}
                          </span>
                          <small>
                            {order.recipient} / {order.address}
                          </small>
                        </div>
                        <div className="activity-action">
                          <strong>{money(order.total)}</strong>
                          {order.status === "confirmed" && (
                            <button
                              className="button secondary small"
                              disabled={Boolean(busyId)}
                              onClick={() => void cancel(order.id)}
                            >
                              주문 취소
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <Empty
                title="아직 첫 거래를 기다리고 있어요."
                description="마음에 드는 한 켤레를 찾아 모의 구매를 체험해보세요."
              />
            ))}
          {tab === "selling" &&
            (resource.data?.listings.length ? (
              <div className="activity-list">
                {resource.data.listings.map((listing) => {
                  const p = productFor(listing.productId);
                  return (
                    <article className="activity-card" key={listing.id}>
                      <div className="activity-top">
                        <span>{date(listing.createdAt)}</span>
                        <span
                          className={`pill ${listing.status !== "on_sale" ? "neutral" : ""}`}
                        >
                          {listing.status === "on_sale"
                            ? "판매 중"
                            : listing.status === "sold"
                              ? "판매 완료"
                              : "판매 취소"}
                        </span>
                      </div>
                      <div className="activity-body">
                        <Link to={`/products/${listing.productId}`}>
                          <img
                            src={imagePath(p?.image || "jordan-blue.jpg")}
                            alt={p?.name || "상품"}
                          />
                        </Link>
                        <div className="activity-info">
                          <Link to={`/products/${listing.productId}`}>
                            <strong>{p?.name}</strong>
                          </Link>
                          <p>{p?.subtitle}</p>
                          <span>
                            {listing.size} mm ·{" "}
                            {listing.condition === "new" ? "새 상품" : "중고"}
                          </span>
                        </div>
                        <div className="activity-action">
                          <strong>{money(listing.price)}</strong>
                          {listing.status === "on_sale" && (
                            <button
                              className="button secondary small"
                              disabled={Boolean(busyId)}
                              onClick={() => void cancel(listing.id, true)}
                            >
                              판매 취소
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <Empty
                title="아카이브에 새 이야기를 더해보세요."
                description="스니커즈를 등록하고 판매 흐름을 직접 체험할 수 있습니다."
                link="/sell"
                label="판매 등록하기"
              />
            ))}
        </>
      )}
      {mockMode && (
        <div className="reset-panel">
          <div>
            <strong>이 브라우저만의 로컬 데모</strong>
            <p>
              계정과 거래 데이터는 새로고침 후에도 유지됩니다. 초기화하면 모든
              데모 데이터가 삭제됩니다.
            </p>
          </div>
          <button
            className="text-link"
            disabled={Boolean(busyId)}
            onClick={() => void reset()}
          >
            <RotateCcw size={14} />
            데모 초기화
          </button>
        </div>
      )}
    </div>
  );
}
