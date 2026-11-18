import React, { useState } from "react";
import "./histogram.css";

const formatWon = (value) => (value / 10000).toLocaleString("ko-KR") + "만";

export default function Histogram({ buckets, step, range }) {
  const [active, setActive] = useState(null);
  const occupied = buckets.filter((count) => count > 0).sort((a, b) => a - b);
  // Keep a few very crowded bins from flattening the rest of the distribution.
  const percentile = occupied[Math.ceil(occupied.length * 0.9) - 1] || 1;
  const cap = Math.min(
    250,
    occupied.at(-1) || 1,
    Math.ceil(percentile / 10) * 10,
  );
  const clipped = occupied.at(-1) > cap;
  const label = (i) =>
    `${formatWon(i * step)}~${formatWon((i + 1) * step)}원 · ${buckets[i].toLocaleString("ko-KR")}종`;
  const first = buckets.findIndex((count) => count > 0);
  const [tabStop, setTabStop] = useState(null);

  function moveFocus(event, index) {
    const direction = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!direction) return;
    event.preventDefault();
    let next = index + direction;
    while (next >= 0 && next < buckets.length) {
      if (buckets[next]) {
        event.currentTarget.parentElement.children[next].focus();
        return;
      }
      next += direction;
    }
  }

  return (
    <figure className="price-histogram" aria-label="가격대별 상품 수">
      <figcaption className="price-histogram__caption">
        {active !== null
          ? label(active)
          : clipped
            ? `+ 표시 · ${cap}종 초과`
            : "가격대별 상품 수"}
      </figcaption>
      <div
        className="price-histogram__plot"
        onPointerLeave={() => setActive(null)}
      >
        {buckets.map((count, i) => {
          if (!count)
            return (
              <span
                key={i}
                aria-hidden="true"
                onPointerEnter={() => setActive(i)}
              />
            );
          const outside =
            range && (i * step > range[1] || (i + 1) * step <= range[0]);
          return (
            <button
              type="button"
              className="price-histogram__bin"
              data-active={active === i}
              data-muted={Boolean(outside)}
              aria-label={label(i)}
              tabIndex={i === (tabStop ?? first) ? 0 : -1}
              key={i}
              onPointerEnter={() => setActive(i)}
              onFocus={() => {
                setTabStop(i);
                setActive(i);
              }}
              onBlur={() => setActive(null)}
              onClick={() => setActive(i)}
              onKeyDown={(event) => moveFocus(event, i)}
            >
              <span
                aria-hidden="true"
                className="price-histogram__bar"
                style={{ height: Math.max(2, Math.min(count / cap, 1) * 52) }}
              >
                {count > cap && (
                  <span className="price-histogram__plus">+</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </figure>
  );
}
