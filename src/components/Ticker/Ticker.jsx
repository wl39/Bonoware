import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./ticker.css";

function Ticker({ ticker }) {
  if (!ticker?.length) return null;

  return (
    <nav className="market-ticker" aria-label="신발 시세">
      <div className="market-ticker__track">
        {[false, true].map((copy) => (
          <div
            className="market-ticker__group"
            key={String(copy)}
            aria-hidden={copy || undefined}
          >
            {ticker.map((item) => (
              <Link
                key={item.id || item.name}
                className={
                  item.lowHigh ? "market-ticker__up" : "market-ticker__down"
                }
                to={"/products/" + encodeURIComponent(item.id || item.name)}
                tabIndex={copy ? -1 : undefined}
              >
                {item.ticker} ₩{item.price.toLocaleString("ko-KR")}
                {item.lowHigh ? "▲" : "▼"}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default connect((state) => ({ ticker: state.ticker }))(Ticker);
