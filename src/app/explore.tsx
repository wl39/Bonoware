import {
  ArrowRight,
  ArrowUpRight,
  MoveUpRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useResource } from "./context";
import {
  Empty,
  ErrorState,
  Loading,
  ProductCard,
  SearchForm,
  SectionTitle,
  date,
} from "./components";
import { imagePath, SIZES } from "./seed";
import type { Product, News } from "./types";

export function Home() {
  const products = useResource<Product[]>("/products");
  const navigate = useNavigate();
  const journal = useResource<News[]>("/news");
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-line" />
            THE NEXT CHAPTER / VOL. 02
          </div>
          <h1>
            취향은 선명하게.
            <br />
            다음 한 걸음은
            <br />
            <em>새롭게.</em>
          </h1>
          <p>
            시간이 지나도 변하지 않는 한 켤레의 가치.
            <br />
            스니커즈의 새로운 가능성을 발견하세요.
          </p>
          <SearchForm
            large
            onSearch={(q) => navigate(`/products?q=${encodeURIComponent(q)}`)}
          />
          <div className="hero-keywords">
            <span>지금 많이 찾는</span>
            {["Jordan", "Off-White", "Yeezy"].map((q) => (
              <Link key={q} to={`/products?q=${q}`}>
                {q}
                <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        </div>
        <Link
          to="/products/jordan-unc"
          className="hero-art"
          aria-label="에어 조던 1 오프화이트 유니버시티 블루 만나보기"
        >
          <div className="hero-art-top">
            <span>THE ARCHIVE EDIT</span>
            <span>001 — 010</span>
          </div>
          <div className="hero-orbit" />
          <span className="hero-backword">AIR</span>
          <img
            src={imagePath("jordan-blue.jpg")}
            alt="Air Jordan 1 Off-White University Blue"
          />
          <div className="hero-art-bottom">
            <div>
              <span>OFF-WHITE × JORDAN</span>
              <h2>
                A classic.
                <br />
                Reimagined.
              </h2>
              <p>Air Jordan 1 · University Blue</p>
            </div>
            <span className="round-arrow">
              <MoveUpRight size={25} />
            </span>
          </div>
          <span className="hero-sticker">
            OLD SOLE.
            <br />
            NEW SOUL.
          </span>
        </Link>
      </section>
      <div className="brand-strip">
        <div className="container">
          <span>CURATED, NOT COMPLICATED.</span>
          <Link to="/products?brand=Nike">NIKE</Link>
          <Link to="/products?brand=Jordan">JORDAN</Link>
          <Link to="/products?brand=Adidas">adidas</Link>
          <Link to="/products?q=Off-White">Off-White™</Link>
          <span>
            FIND YOUR NEXT PAIR <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
      <section className="container section">
        <SectionTitle
          eyebrow="THE MOST WANTED"
          title="지금, 눈여겨볼 스니커즈"
          to="/products"
        />
        {products.loading ? (
          <Loading cards />
        ) : products.error ? (
          <ErrorState message={products.error} retry={products.reload} />
        ) : (
          <div className="product-grid">
            {products.data?.slice(0, 4).map((p, i) => (
              <ProductCard product={p} index={i} key={p.id} />
            ))}
          </div>
        )}
      </section>
      <section className="container archive-banner">
        <div>
          <span className="eyebrow">A SECOND LIFE, A NEW STORY</span>
          <h2>
            누군가의 아카이브가
            <br />
            당신의 다음 이야기가 되도록.
          </h2>
          <Link className="button light" to="/sell">
            내 스니커즈 판매하기
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="banner-mark">
          RE:
          <br />
          <span>SOLE</span>
          <span className="asterisk">✳</span>
        </div>
      </section>
      <section className="container section journal-section">
        <SectionTitle
          eyebrow="THE JOURNAL"
          title="스니커즈 너머의 이야기"
          to="/news"
        />
        {journal.loading ? (
          <Loading />
        ) : journal.error ? (
          <ErrorState message={journal.error} retry={journal.reload} />
        ) : (
          <div className="journal-grid">
            {journal.data?.map((n) => (
              <NewsCard article={n} key={n.id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
export function Catalog({ releases = false }: { releases?: boolean }) {
  const [params, setParams] = useSearchParams();
  const query = new URLSearchParams(params);
  if (releases) query.set("upcoming", "true");
  const { data, loading, error, reload } = useResource<Product[]>(
    `/products?${query}`,
  );
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  }
  return (
    <div className="container catalog-page">
      <div className="page-title">
        <div>
          <span className="eyebrow">
            {releases ? "MARK YOUR CALENDAR" : "FIND YOUR NEXT PAIR"}
          </span>
          <h1>
            {releases
              ? "다음 드롭을 기다리는 즐거움."
              : "당신의 취향을 찾아보세요."}
          </h1>
          <p>
            {releases
              ? "아카이브 모델로 구성한 가상 발매 일정입니다. 관심 상품에 저장해두세요."
              : "익숙한 클래식부터 특별한 한 켤레까지, PROBE 아카이브."}
          </p>
        </div>
        <span className="page-number">
          {releases ? "02" : "01"}
          <small>/ COLLECTION</small>
        </span>
      </div>
      <div className="catalog-tools">
        <SearchForm
          key={params.get("q") || ""}
          initial={params.get("q") || ""}
          onSearch={(value) => update("q", value)}
        />
        <div className="select-controls">
          <SlidersHorizontal size={17} />
          <select
            aria-label="사이즈 필터"
            value={params.get("size") || ""}
            onChange={(e) => update("size", e.target.value)}
          >
            <option value="">모든 사이즈</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s} mm
              </option>
            ))}
          </select>
          <select
            aria-label="정렬"
            value={params.get("sort") || ""}
            onChange={(e) => update("sort", e.target.value)}
          >
            <option value="">인기순</option>
            <option value="recent">최근 등록순</option>
            <option value="price-asc">낮은 가격순</option>
            <option value="price-desc">높은 가격순</option>
          </select>
        </div>
      </div>
      <div className="catalog-filters">
        <div className="brand-tabs">
          {["", "Nike", "Jordan", "Adidas"].map((b) => (
            <button
              key={b}
              className={(params.get("brand") || "") === b ? "active" : ""}
              onClick={() => update("brand", b)}
            >
              {b || "전체"}
            </button>
          ))}
        </div>
        {params.size > 0 && (
          <button className="clear-filters" onClick={() => setParams({})}>
            <X size={14} />
            필터 초기화
          </button>
        )}
      </div>
      <div className="result-count">
        {loading ? "검색 중" : `총 ${data?.length ?? 0}개`}
        {params.get("q") && <span>‘{params.get("q")}’ 검색 결과</span>}
      </div>
      {loading ? (
        <Loading cards />
      ) : error ? (
        <ErrorState message={error} retry={reload} />
      ) : !data?.length ? (
        <Empty
          title="아직 만날 스니커즈가 없어요."
          description="검색어나 필터를 바꾸면 다른 한 켤레를 발견할 수 있습니다."
          link={releases ? "/new-releases" : "/products"}
          label="전체 상품 보기"
        />
      ) : (
        <div className="product-grid">
          {data.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      )}
      <p className="catalog-note">
        ARCHIVE COLLECTION — 상품·시세·발매일은 데모 체험용 데이터입니다.
      </p>
    </div>
  );
}
export function NewsCard({ article }: { article: News }) {
  return (
    <Link className="news-card" to={`/news/${article.id}`}>
      <div className={`news-visual news-${article.id}`}>
        <img src={imagePath(article.image)} alt="" loading="lazy" />
        <span>{article.category}</span>
        <ArrowUpRight size={23} />
      </div>
      <div className="news-text">
        <span className="eyebrow">PROBE JOURNAL / {article.category}</span>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
      </div>
    </Link>
  );
}
export function NewsPage() {
  const { data, loading, error, reload } = useResource<News[]>("/news");
  return (
    <div className="container journal-page">
      <div className="page-title">
        <div>
          <span className="eyebrow">PROBE JOURNAL</span>
          <h1>스니커즈 너머의 이야기.</h1>
          <p>한 켤레에 담긴 문화와 취향, 그리고 새로운 관점.</p>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={error} retry={reload} />
      ) : (
        <div className="journal-grid">
          {data?.map((n) => (
            <NewsCard key={n.id} article={n} />
          ))}
        </div>
      )}
    </div>
  );
}
export function Article() {
  const { id } = useParams();
  const { data, loading, error, reload } = useResource<News>(
    `/news/${encodeURIComponent(id || "")}`,
  );
  if (loading) return <Loading />;
  if (error || !data)
    return (
      <ErrorState
        message={error || "기사를 찾을 수 없습니다."}
        retry={reload}
      />
    );
  return (
    <article className="container article-page">
      <Link className="back-link" to="/news">
        ← 저널로 돌아가기
      </Link>
      <div className="article-heading">
        <span className="eyebrow">PROBE JOURNAL / {data.category}</span>
        <h1>{data.title}</h1>
        <p>{data.summary}</p>
      </div>
      <div className={`article-image news-${data.id}`}>
        <img
          src={imagePath(data.image)}
          alt="기사에 소개된 아카이브 스니커즈"
        />
      </div>
      <div className="prose">
        {data.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <Link className="text-link" to="/products">
          아카이브 둘러보기
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
