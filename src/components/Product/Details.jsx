import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";

let brand = "-";
let releaseDate = "-";
let designer = "-";
let stockCount = "-";
let color = "-";
// let test = "-";
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const products = nextProps.products;
    //const formedDate = moment(products.releasedDate, "DD-MM-YYYY-HH-mm").format("LL")
    products.brand ? (brand = products.brand.toUpperCase()) : null;
    nextProps.date ? (releaseDate = nextProps.date) : null;
    products.stockCount ? (stockCount = products.stockCount) : null;
    products.designer ? (designer = products.designer.toUpperCase()) : null;
    products.color ? (color = products.color.toUpperCase()) : null;
    products.test ? (test = products.test) : null;
  }

  componentWillMount() {
    const products = this.props.products;
    products.brand ? (brand = products.brand.toUpperCase()) : null;
    this.props.date ? (releaseDate = this.props.date) : null;
    products.stockCount ? (stockCount = products.stockCount) : null;
    products.designer ? (designer = products.designer.toUpperCase()) : null;
    products.color ? (color = products.color.toUpperCase()) : null;
    products.test ? (test = products.test) : null;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.description0}>
        <div className={classes.detailsContainer}>
          <div className={classes.detailHeader}>브랜드</div>
          <div className={classes.detail}>{brand}</div>
        </div>
        <div className={classes.detailsContainer}>
          <div className={classes.detailHeader}>출시 날짜</div>
          <div className={classes.detail}>{releaseDate}</div>
        </div>
        <div className={classes.detailsContainer}>
          <div className={classes.detailHeader}>재고 수</div>
          <div className={classes.detail}>{stockCount}</div>
        </div>
        {/* <div className={classes.detailsContainer}>
          <div className={classes.detailHeader}>디자이너</div>
          <div className={classes.detail}>{designer}</div>
        </div> */}
        <div className={classes.detailsContainer}>
          <div className={classes.detailHeader}>주 색깔</div>
          <div className={classes.detail}>{color}</div>
        </div>
        {/* <div className={classes.detailsContainer}>
          <div className={classes.detail}>앙 김옥띠</div>
          <div className={classes.detail}>{test}</div>
        </div> */}
      </div>
    );
  }
}

export default withStyles(propageStyle)(Details);
