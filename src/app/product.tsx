import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  PackageCheck,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { api, json, type Detail } from "./api";
import { useApp, useResource } from "./context";
import { ErrorState, Loading, PriceChart, date, money } from "./components";
import { imagePath, SIZES } from "./seed";
import type { Order } from "./types";

export default function ProductDetail() {
  const { id = "" } = useParams();
  const { user, following, follow, notify } = useApp();
  const resource = useResource<Detail>(
    `/products/${encodeURIComponent(id)}`,
    user?.id,
  );
  const [size, setSize] = useState<number | null>(null);
  const [offerId, setOfferId] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setSize(null);
    setOfferId("");
    setError("");
    setCheckout(false);
  }, [id]);
  if (resource.loading) return <Loading />;
  if (resource.error || !resource.data)
    return (
      <div className="container">
        <ErrorState
          message={resource.error || "상품을 찾을 수 없습니다."}
          retry={resource.reload}
        />
      </div>
    );
  const { product, offers, comments } = resource.data;
  const saved = following.includes(product.id);
  const available = offers
    .filter((o) => o.size === size)
    .sort((a, b) => a.price - b.price);
  const selected =
    available.find((o) => o.id === offerId && !o.own) ??
    available.find((o) => !o.own);
  const displayPrice = selected?.price ?? product.price;
  async function addComment(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api(`/products/${product.id}/comments`, {
        method: "POST",
        body: json({ text: comment }),
      });
      setComment("");
      resource.reload();
      notify("댓글을 남겼습니다.");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function buy() {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    setCheckout(true);
  }
  return (
    <div className="container detail-page">
      <Link className="back-link" to="/products">
        <ArrowLeft size={15} />
        컬렉션으로 돌아가기
      </Link>
      <div className="detail-layout">
        <div>
          <div className="detail-visual" style={{ background: product.color }}>
            <span className="eyebrow">
              PROBE ARCHIVE / {product.brand.toUpperCase()}
            </span>
            <img
              src={imagePath(product.image)}
              alt={`${product.name} ${product.subtitle}`}
            />
            <span className="visual-caption">EVERY PAIR TELLS A STORY.</span>
          </div>
          <div className="product-facts">
            <div>
              <span>모델 번호</span>
              <strong>{product.model}</strong>
            </div>
            <div>
              <span>브랜드</span>
              <strong>{product.brand}</strong>
            </div>
            <div>
              <span>발매가 · 데모</span>
              <strong>{money(product.retail)}</strong>
            </div>
          </div>
        </div>
        <div className="detail-purchase">
          <span className="eyebrow">
            {product.upcoming
              ? "ARCHIVE DROP / 가상 발매"
              : "THE ARCHIVE COLLECTION"}
          </span>
          <h1>{product.name}</h1>
          <p className="detail-subtitle">{product.subtitle}</p>
          <div className="detail-price">
            <span>
              {product.upcoming
                ? "가상 발매 일정"
                : size
                  ? `${size} mm 즉시 구매가`
                  : "즉시 구매 최저가"}
            </span>
            <strong>
              {product.upcoming
                ? date(product.releaseDate)
                : displayPrice === null
                  ? "품절"
                  : money(displayPrice)}
            </strong>
            <small>가상 데이터 · 실제 시세 및 일정과 무관합니다.</small>
          </div>
          {!product.upcoming && (
            <>
              <div className="size-heading">
                <strong>사이즈 선택</strong>
                <span>KR / mm</span>
              </div>
              <div className="size-grid">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    disabled={!product.sizes.includes(s)}
                    className={size === s ? "selected" : ""}
                    aria-pressed={size === s}
                    onClick={() => {
                      setSize(s);
                      setOfferId("");
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {size && (
                <div className="offer-list">
                  <label htmlFor="offer">구매할 매물</label>
                  <select
                    id="offer"
                    aria-label="구매할 매물"
                    value={selected?.id || ""}
                    onChange={(e) => setOfferId(e.target.value)}
                  >
                    <option value="" disabled>
                      매물을 선택해주세요
                    </option>
                    {available.map((o) => (
                      <option key={o.id} value={o.id} disabled={o.own}>
                        {o.condition === "new" ? "새 상품" : "중고"} ·{" "}
                        {money(o.price)}
                        {o.own ? " · 내 매물" : ""}
                      </option>
                    ))}
                  </select>
                  {available.every((o) => o.own) && (
                    <p className="muted">
                      본인이 등록한 매물은 구매할 수 없습니다.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
          <div className="purchase-buttons">
            {!product.upcoming && (
              <button
                className="button buy-button"
                disabled={!selected}
                onClick={buy}
              >
                {!size
                  ? "사이즈를 선택해주세요"
                  : !selected
                    ? "구매 가능한 매물이 없습니다"
                    : "구매 체험하기"}
                {selected && <ArrowRight size={18} />}
              </button>
            )}
            <button
              className={`button secondary wishlist-button ${saved ? "is-saved" : ""}`}
              aria-pressed={saved}
              onClick={() => void follow(product.id)}
            >
              <Heart size={18} fill={saved ? "currentColor" : "none"} />
              {saved
                ? "관심 상품에 저장됨"
                : product.upcoming
                  ? "발매 관심 저장"
                  : "관심 저장"}
            </button>
          </div>
          <div className="purchase-notes">
            <span>
              <ShieldCheck size={17} />
              아카이브 모델 체험
            </span>
            <span>
              <Truck size={17} />
              모의 배송비 3,000원
            </span>
            <span>
              <PackageCheck size={17} />
              실제 결제 · 배송 없음
            </span>
          </div>
          <p className="detail-description">{product.description}</p>
        </div>
      </div>
      <div className="detail-bottom">
        <PriceChart product={product} />
        <section className="comments">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE CONVERSATION</span>
              <h2>
                이 한 켤레에 대한 이야기 <span>{comments.length}</span>
              </h2>
            </div>
          </div>
          {user ? (
            <form onSubmit={addComment} className="comment-form">
              <label htmlFor="comment">댓글 남기기</label>
              <textarea
                id="comment"
                placeholder="이 스니커즈에 대한 생각을 나눠보세요."
                maxLength={500}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div>
                <small>{comment.length}/500</small>
                <button
                  className="button small"
                  disabled={busy || !comment.trim()}
                >
                  댓글 등록
                  <ArrowRight size={14} />
                </button>
              </div>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
            </form>
          ) : (
            <p className="login-prompt">
              <Link to="/login" state={{ from: location.pathname }}>
                로그인
              </Link>
              하고 이야기를 남겨보세요.
            </p>
          )}
          {!comments.length && (
            <p className="muted">첫 번째 이야기를 남겨보세요.</p>
          )}
          {comments
            .slice()
            .reverse()
            .map((c) => (
              <article className="comment" key={c.id}>
                <div>
                  <strong>{c.author}</strong>
                  <span>{date(c.createdAt)}</span>
                </div>
                <p>{c.text}</p>
              </article>
            ))}
        </section>
      </div>
      {checkout && selected && (
        <Checkout
          offer={selected}
          detail={resource.data}
          size={size!}
          close={() => setCheckout(false)}
          onSuccess={(order) => {
            setCheckout(false);
            notify(`모의 주문이 완료되었습니다. 총 ${money(order.total)}`);
            navigate("/profile/orders");
          }}
        />
      )}
    </div>
  );
}
function Checkout({
  offer,
  detail,
  size,
  close,
  onSuccess,
}: {
  offer: Detail["offers"][number];
  detail: Detail;
  size: number;
  close: () => void;
  onSuccess: (order: Order) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const node = dialog.current!;
    node.showModal();
    return () => node.close();
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const order = await api<Order>("/orders", {
        method: "POST",
        body: json({
          offerId: offer.id,
          recipient: values.get("recipient"),
          address: values.get("address"),
        }),
      });
      onSuccess(order);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <dialog
      className="checkout-dialog"
      ref={dialog}
      aria-labelledby="checkout-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) close();
      }}
      onClick={(event) => {
        if (event.target === dialog.current && !busy) close();
      }}
    >
      <div className="dialog-header">
        <span className="eyebrow">CHECKOUT / LOCAL DEMO</span>
        <button
          className="icon-button"
          aria-label="구매 창 닫기"
          onClick={close}
          disabled={busy}
        >
          <X size={20} />
        </button>
      </div>
      <h2 id="checkout-title">새로운 한 걸음의 시작.</h2>
      <p className="muted">실제 결제 없이 구매 과정을 체험합니다.</p>
      <div className="checkout-product">
        <img src={imagePath(detail.product.image)} alt="" />
        <div>
          <strong>{detail.product.name}</strong>
          <p>{detail.product.subtitle}</p>
          <span>
            {size} mm · {offer.condition === "new" ? "새 상품" : "중고"}
          </span>
        </div>
      </div>
      <form onSubmit={submit}>
        <label>
          받는 분
          <input
            name="recipient"
            placeholder="예: 프로브 (가상 이름)"
            minLength={2}
            maxLength={40}
            required
            autoComplete="off"
          />
        </label>
        <label>
          배송 주소
          <input
            name="address"
            placeholder="예: 서울시 데모구 프로브로 123 (가상 주소)"
            minLength={5}
            maxLength={200}
            required
            autoComplete="off"
          />
        </label>
        <div className="order-summary">
          <div>
            <span>상품 금액</span>
            <strong>{money(offer.price)}</strong>
          </div>
          <div>
            <span>모의 배송비</span>
            <strong>{money(3000)}</strong>
          </div>
          <div className="total">
            <span>총 체험 금액</span>
            <strong>{money(offer.price + 3000)}</strong>
          </div>
        </div>
        <label className="checkbox-label">
          <input type="checkbox" required />
          가상 거래이며 실제 결제가 발생하지 않음을 확인했습니다.
        </label>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <button className="button full" disabled={busy}>
          {busy ? "주문 처리 중…" : "모의 주문 확정"}
          <ArrowRight size={17} />
        </button>
      </form>
    </dialog>
  );
}
