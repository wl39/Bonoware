import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";

function Details({ classes, products, date }) {
  const facts = [
    ["브랜드", products.brand?.toUpperCase()],
    ["출시 날짜", date],
    ["재고 수", products.stockCount],
    ["품번", products.sku],
    ...(products.sourceUrl
      ? [
          ...(products.colorway ? [["컬러", products.colorway]] : []),
          ...(products.retailUsd
            ? [["미국 정가", "US$" + products.retailUsd]]
            : []),
          [
            "출처",
            <a
              href={products.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.sourceLink}
            >
              StockX ↗
            </a>,
          ],
        ]
      : []),
  ];
  return (
    <div className={classes.detailFacts}>
      {facts.map(([label, value]) => (
        <div className={classes.detailsContainer} key={label}>
          <span className={classes.detailHeader}>{label}</span>
          <span className={classes.detail}>{value ?? "—"}</span>
        </div>
      ))}
    </div>
  );
}
export default withStyles(propageStyle)(Details);
