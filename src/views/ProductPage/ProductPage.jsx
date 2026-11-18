import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, ClickAwayListener, IconButton } from "@material-ui/core";
import { KeyboardArrowDown, ViewModule, ViewStream } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";
import Product from "components/Product/Product.jsx";
import ProductSearchPanel, {
  brands,
} from "components/Product/ProductSearchPanel.jsx";
import { api } from "../../app/api";

const sortOptions = [
  ["mostPopular", "인기순", "인기 있는 제품부터 봅니다.", "whatshot"],
  ["mostRecent", "최신순", "최근 발매한 제품부터 봅니다.", "new_releases"],
  ["lowestPrice", "가격순", "최저가가 낮은 제품부터 봅니다.", "trending_down"],
];
const pageSize = 12;

function ProductPage({ classes, location }) {
  const [catalog, setCatalog] = useState([]);
  const [brand, setBrand] = useState(
    location.state?.brand?.toLowerCase() || "",
  );
  const [sort, setSort] = useState(
    sortOptions.find((option) => option[3] === location.state?.filter)?.[0] ||
      "",
  );
  const [range, setRange] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [years, setYears] = useState([]);
  const [grid, setGrid] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const request = useRef(null);
  const nextPage = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    api("/products", { signal: controller.signal })
      .then(setCatalog)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setBrand(location.state?.brand?.toLowerCase() || "");
    setSort(
      sortOptions.find((option) => option[3] === location.state?.filter)?.[0] ||
        "",
    );
    setYears([]);
    setSizes([]);
    setRange(null);
  }, [location.key]);

  const load = useCallback(
    async (page) => {
      if (page && request.current) return;
      request.current?.abort();
      const controller = new AbortController();
      request.current = controller;
      setLoading(true);
      setError("");
      if (!page) {
        setItems([]);
        setNext(false);
        nextPage.current = 0;
      }
      try {
        const params = { skip: page };
        if (brand) params.brand = brand;
        if (sort) params[sort] = 1;
        if (sizes.length) params.size = sizes.join(",");
        if (years.length) params.year = years.join(",");
        if (range) params.price = range.join(",");
        const { data } = await axios.get(
          "https://api.probe.gg/open/search_option",
          { params, signal: controller.signal },
        );
        if (controller.signal.aborted) return;
        const rows = data.slice(0, pageSize);
        setItems((previous) => (page ? [...previous, ...rows] : rows));
        setNext(data.length > pageSize);
        nextPage.current = page + 1;
      } catch (cause) {
        if (!controller.signal.aborted)
          setError(
            cause.response?.data?.message || "상품을 불러오지 못했습니다.",
          );
      } finally {
        if (request.current === controller) {
          request.current = null;
          setLoading(false);
        }
      }
    },
    [brand, range, sizes, sort, years],
  );

  useEffect(() => {
    load(0);
    return () => {
      request.current?.abort();
      request.current = null;
    };
  }, [load]);

  useEffect(() => {
    if (!next || error) return;
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      )
        load(nextPage.current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [next, error, load]);

  const sortLabel =
    sortOptions.find((option) => option[0] === sort)?.[1] || "정렬 방식";
  return (
    <div>
      <div className={classes.pageHeaderContainer}>
        <div className={classes.pageHeaderLeft}>
          <div className={classes.descriptionContainer}>
            <div className={classes.type}>
              {brands.find((option) => option[0] === brand)?.[1] || "Browse"}
            </div>
            <div className={classes.headerDescription}>
              {catalog.length
                ? `전체 컬렉션 · ${catalog.length}개 모델`
                : "상품 목록"}
            </div>
          </div>
        </div>
        <div className={classes.pageHeaderRight} />
      </div>
      <div className={classes.container}>
        <ProductSearchPanel
          {...{
            catalog,
            brand,
            setBrand,
            range,
            setRange,
            sizes,
            setSizes,
            years,
            setYears,
          }}
        />
        <div className={classes.productContainer}>
          <div className={classes.productFilter}>
            <ClickAwayListener onClickAway={() => setSortOpen(false)}>
              <div className={classes.filterOptionContainer}>
                <button
                  className={classes.sortToggle}
                  type="button"
                  onClick={() => setSortOpen(!sortOpen)}
                  aria-expanded={sortOpen}
                >
                  {sortLabel}
                  <KeyboardArrowDown className={classes.filterIcon} />
                </button>
                {sortOpen && (
                  <div className={classes.filterActive}>
                    {sortOptions.map(([key, label, description]) => (
                      <button
                        type="button"
                        key={key}
                        className={classes.filterOptionActive}
                        onClick={() => {
                          setSort(key);
                          setSortOpen(false);
                        }}
                      >
                        <span className={classes.filterOptionTitle}>
                          {label}
                        </span>
                        <span className={classes.filterOptionDescription}>
                          {description}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </ClickAwayListener>
            <IconButton
              aria-label="격자 보기"
              aria-pressed={grid}
              onClick={() => setGrid(true)}
              className={classes.viewToggle}
            >
              <ViewModule />
            </IconButton>
            <IconButton
              aria-label="목록 보기"
              aria-pressed={!grid}
              onClick={() => setGrid(false)}
              className={classes.viewToggle}
            >
              <ViewStream />
            </IconButton>
          </div>
          {!grid && (
            <div className={classes.listHeader}>
              <span className={classes.shoeName}>제품명</span>
              <span className={classes.listPrices}>
                <span className={classes.saleCell}>최근 판매가</span>
                <span className={classes.headerLowestPrice}>최저가</span>
              </span>
            </div>
          )}
          <div className={grid ? classes.cards : classes.rows}>
            {items.map((item) => (
              <Product key={item._id} product={item} grid={grid} />
            ))}
          </div>
          {error ? (
            <div className={classes.noResults} role="alert">
              {error}{" "}
              <Button onClick={() => load(nextPage.current)}>다시 시도</Button>
            </div>
          ) : !loading && !items.length ? (
            <div className={classes.noResults}>검색 결과가 없습니다.</div>
          ) : null}
          {next && !error && (
            <Button
              className={classes.moreButton}
              disabled={loading}
              onClick={() => load(nextPage.current)}
            >
              물품 더 보기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
export default withStyles(propageStyle)(ProductPage);
