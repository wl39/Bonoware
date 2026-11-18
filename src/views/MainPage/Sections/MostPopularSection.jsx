import React from "react";
import { connect } from "react-redux";
import ProductShelf from "components/Product/ProductShelf";

function MostPopularSection({ headerName, helper, iconName, items }) {
  return (
    <ProductShelf
      headerName={headerName}
      helper={helper}
      filter={iconName}
      shoes={items.map((item) => {
        const product = item.data?.[0];
        return product
          ? { ...product, lowestPrice: item.lowestPrice ?? product.lowestPrice }
          : item;
      })}
    />
  );
}

export default connect((state, { iconName }) => ({
  items: {
    whatshot: state.mostPopularSlider,
    new_releases: state.mostRecentSlider,
    trending_down: state.mostCheapestSlider,
  }[iconName],
}))(MostPopularSection);
