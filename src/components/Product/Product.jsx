import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";

function Product({ product, grid, classes }) {
  const [english, korean] = product.name.split("|");
  return (
    <Link
      className={grid ? classes.link : classes.linkList}
      to={"/products/" + encodeURIComponent(product._id)}
    >
      <div className={grid ? classes.productHeader : classes.productHeaderList}>
        <img
          src={product.image[0]}
          alt=""
          loading="lazy"
          className={classes.cardImage}
        />
      </div>
      <div className={grid ? classes.productBody : classes.productBodyList}>
        <div className={classes.modelEn}>{english}</div>
        <div className={classes.modelKr}>{korean}</div>
      </div>
      <div className={grid ? classes.productFooter : classes.productFooterList}>
        {!grid && (
          <span className={classes.saleCell}>
            {product.lastSalePrice
              ? "₩" + product.lastSalePrice.toLocaleString("ko-KR")
              : "—"}
          </span>
        )}
        {grid && <span className={classes.priceHeader}>최저가</span>}
        <span className={grid ? classes.price : classes.priceList}>
          {product.lowestPrice
            ? "₩" + product.lowestPrice.toLocaleString("ko-KR")
            : "품절"}
        </span>
      </div>
    </Link>
  );
}
export default withStyles(propageStyle)(Product);
