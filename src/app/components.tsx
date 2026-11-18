import { ArrowRight, Heart, PackageOpen, RotateCw, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useApp } from "./context";
import { imagePath } from "./seed";
import type { Product } from "./types";

export const money = (amount: number) => `${amount.toLocaleString("ko-KR")}원`;
export const date = (value: string) =>
  new Date(value).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
export function ErrorState({
  message,
  retry,
}: {
  message: string;
  retry?: () => void;
}) {
  return (
    <div className="empty error" role="alert">
      <PackageOpen size={34} />
      <h2>잠시 멈췄어요</h2>
      <p>{message}</p>
      {retry && (
        <button className="button secondary" onClick={retry}>
          <RotateCw size={16} />
          다시 시도
        </button>
      )}
    </div>
  );
}
export function Empty({
  title,
  description,
  link = "/products",
  label = "스니커즈 둘러보기",
}: {
  title: string;
  description: string;
  link?: string;
  label?: string;
}) {
  return (
    <div className="empty">
      <PackageOpen size={36} strokeWidth={1.3} />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link className="button secondary" to={link}>
        {label}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
export function Loading({ cards = false }: { cards?: boolean }) {
  return (
    <div
      className={cards ? "product-grid skeleton-grid" : "loading-panel"}
      role="status"
      aria-label="불러오는 중"
    >
      {cards ? (
        Array.from({ length: 4 }, (_, i) => (
          <div className="skeleton" key={i} />
        ))
      ) : (
        <>
          <span className="spinner" />
          불러오는 중
        </>
      )}
    </div>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  to,
  label = "전체 보기",
}: {
  eyebrow: string;
  title: string;
  to?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {to && (
        <Link className="text-link" to={to}>
          {label}
          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
}
export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index?: number;
}) {
  const { following, follow } = useApp();
  const [busy, setBusy] = useState(false);
  const saved = following.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-visual" style={{ background: product.color }}>
        {index !== undefined && (
          <span className="product-rank">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <Link
          to={`/products/${product.id}`}
          aria-label={`${product.name} ${product.subtitle} 상세 보기`}
        >
          <img
            src={imagePath(product.image)}
            alt={`${product.name} ${product.subtitle}`}
            loading="lazy"
          />
        </Link>
        <button
          className={`heart icon-button ${saved ? "saved" : ""}`}
          aria-label={`${product.name} 관심 ${saved ? "해제" : "저장"}`}
          aria-pressed={saved}
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            await follow(product.id);
            setBusy(false);
          }}
        >
          <Heart size={19} fill={saved ? "currentColor" : "none"} />
        </button>
        {product.upcoming && <span className="drop-label">ARCHIVE DROP</span>}
      </div>
      <Link className="product-info" to={`/products/${product.id}`}>
        <span className="product-brand">{product.brand}</span>
        <h3>{product.name}</h3>
        <p>{product.subtitle}</p>
        <div className="product-price">
          <strong>
            {product.upcoming
              ? date(product.releaseDate)
              : product.price === null
                ? "품절"
                : money(product.price)}
          </strong>
          {!product.upcoming && (
            <span className={product.change >= 0 ? "up" : "down"}>
              {product.change >= 0 ? "↗" : "↘"} {Math.abs(product.change)}%
            </span>
          )}
        </div>
        <small>
          {product.upcoming ? "가상 발매 일정" : "즉시 구매가 · 가상 시세"}
        </small>
      </Link>
    </article>
  );
}
export function SearchForm({
  initial = "",
  onSearch,
  large = false,
}: {
  initial?: string;
  onSearch: (value: string) => void;
  large?: boolean;
}) {
  const [value, setValue] = useState(initial);
  function submit(event: FormEvent) {
    event.preventDefault();
    onSearch(value.trim());
  }
  return (
    <form
      className={`search-form ${large ? "large" : ""}`}
      onSubmit={submit}
      role="search"
    >
      <Search size={20} />
      <input
        aria-label="스니커즈 검색"
        placeholder="모델명, 브랜드 또는 모델 번호"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" aria-label="검색">
        <ArrowRight size={20} />
      </button>
    </form>
  );
}
export function PriceChart({ product }: { product: Product }) {
  const values = product.history.map((p) => p.price);
  const min = Math.min(...values) * 0.95,
    max = Math.max(...values) * 1.05;
  const points = product.history
    .map(
      (p, i) => `${18 + i * 56},${145 - ((p.price - min) / (max - min)) * 120}`,
    )
    .join(" ");
  return (
    <div className="chart">
      <div className="chart-heading">
        <strong>최근 거래 흐름</strong>
        <span className="pill">가상 데이터 · 30일</span>
      </div>
      <svg
        viewBox="0 0 656 170"
        role="img"
        aria-label={`${product.name} 가상 거래가 추이. 최저 ${money(Math.min(...values))}, 최고 ${money(Math.max(...values))}`}
      >
        <defs>
          <linearGradient id={`fill-${product.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#719d85" stopOpacity=".25" />
            <stop offset="100%" stopColor="#719d85" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[35, 85, 135].map((y) => (
          <line
            key={y}
            x1="18"
            x2="634"
            y1={y}
            y2={y}
            stroke="#e1e5df"
            strokeDasharray="4 5"
          />
        ))}
        <polygon
          points={`18,155 ${points} 634,155`}
          fill={`url(#fill-${product.id})`}
        />
        <polyline
          points={points}
          fill="none"
          stroke="#315e49"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="chart-axis">
        <span>{date(product.history[0].date)}</span>
        <span>{date(product.history.at(-1)!.date)}</span>
      </div>
      <p className="muted">
        체험용으로 생성한 거래 추이입니다. 실제 시세가 아닙니다.
      </p>
    </div>
  );
}
