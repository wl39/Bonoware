import React, { useMemo, useRef, useState } from "react";
import { Hidden, IconButton } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Settings from "@material-ui/icons/Settings";
import Nouislider from "react-nouislider";
import Histogram from "components/Histogram/Histogram.jsx";
import SizePanel from "components/SizePanel/SizePanel.jsx";
import ReleaseYearPanel from "components/ReleaseYearPanel/ReleaseYearPanel.jsx";
import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";

export const brands = [
  ["", "Browse"],
  ["nike", "Nike"],
  ["airjordan", "Air Jordan"],
  ["adidas", "Adidas"],
  ["yeezy", "Yeezy"],
  ["other", "Other Brands"],
];
const currency = (value) =>
  "₩" + Math.round(Number(value)).toLocaleString("ko-KR");

function ProductSearchPanel({
  classes,
  catalog,
  brand,
  setBrand,
  range,
  setRange,
  sizes,
  setSizes,
  years,
  setYears,
}) {
  const [open, setOpen] = useState(false);
  const lowPrice = useRef(null);
  const highPrice = useRef(null);
  const releaseYears = useMemo(
    () =>
      [
        ...new Set(
          catalog.map((item) => item.releaseDate?.slice(0, 4)).filter(Boolean),
        ),
      ]
        .sort()
        .reverse(),
    [catalog],
  );
  const { maximum, buckets, step } = useMemo(() => {
    const count = 28;
    const prices = catalog
      .map((item) => item.price)
      .filter((price) => Number.isFinite(price) && price >= 0);
    const highest = prices.reduce((max, price) => Math.max(max, price), 0);
    const step = Math.max(5000, Math.ceil(highest / count / 5000) * 5000);
    const buckets = Array(count).fill(0);
    for (const price of prices) {
      buckets[Math.min(count - 1, Math.floor(price / step))]++;
    }
    return { maximum: count * step, buckets, step };
  }, [catalog]);

  function renderFilters() {
    return (
      <>
        <div className={classes.brandSearchContainer}>
          {brands.map(([key, label]) => (
            <button
              type="button"
              aria-pressed={brand === key}
              key={key}
              className={
                brand === key
                  ? classes.brandSearchValueActive
                  : classes.brandSearchValue
              }
              onClick={() => setBrand(key)}
            >
              {key ? label : "전체"}
            </button>
          ))}
        </div>
        <div className={classes.panel}>
          <div className={classes.panelHeader}>Prices</div>
          <div className={classes.priceRange}>
            <span ref={lowPrice}>{currency(range?.[0] ?? 0)}</span>
            <span ref={highPrice}>{currency(range?.[1] ?? maximum)}</span>
          </div>
          <Histogram buckets={buckets} step={step} range={range} />
          <div className="slider slider-grey">
            <Nouislider
              start={range || [0, maximum]}
              range={{ min: 0, max: maximum }}
              connect
              step={1000}
              onUpdate={(values) => {
                if (lowPrice.current)
                  lowPrice.current.textContent = currency(values[0]);
                if (highPrice.current)
                  highPrice.current.textContent = currency(values[1]);
              }}
              onChange={(values) => {
                const bounds = values.map(Number);
                setRange(
                  bounds[0] === 0 && bounds[1] === maximum ? null : bounds,
                );
              }}
            />
          </div>
        </div>
        <SizePanel sizes={sizes} setSizes={setSizes} />
        <ReleaseYearPanel
          options={releaseYears}
          years={years}
          setYears={setYears}
        />
      </>
    );
  }
  return (
    <aside className={classes.slider}>
      <Hidden smDown>
        <div>{renderFilters()}</div>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          className={classes.filterTrigger}
          aria-expanded={open}
          aria-label="상세 검색"
          onClick={() => setOpen(!open)}
        >
          <Settings />
        </IconButton>
        <div
          className={
            open ? classes.dropdownContainer : classes.dropdownContainerClose
          }
        >
          {renderFilters()}
        </div>
      </Hidden>
    </aside>
  );
}
export default withStyles(propageStyle)(ProductSearchPanel);
