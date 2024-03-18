import React from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import TickerStyle from "./TickerAnimation";
import { Link } from "react-router-dom";
class Ticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickers: []
    };
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  renderHelper(ticker, classes) {
    console.log("act");
    let temp = [];
    ticker.forEach((element, index) => {
      if (element.lowHigh) {
        temp.push(
          <Link to={"/products/" + element.name} key={index} className={classes.upTrend}>
            {element.ticker} ₩{this.numberWithCommas(element.price)}▲
          </Link>
        );
      } else {
        temp.push(
          <Link to={"/products/" + element.name} key={index} className={classes.downTrend}>
            {element.ticker} ₩{this.numberWithCommas(element.price)}▼
          </Link>
        );
      }
    });
    this.setState({
      tickers: [...temp]
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.ticker) {
      this.renderHelper(nextProps.ticker, nextProps.classes);
    }
  }

  componentWillMount() {
    if (this.props.ticker) {
      // this.props.getUser();
      this.renderHelper(this.props.ticker, this.props.classes);
    }
  }
  render() {
    console.log(this.props.ticker);
    const { classes } = this.props;

    return (
      <div className={classes.tickerWrap}>
        <div className={classes.ticker}>{this.state.tickers}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ticker: state.ticker
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(TickerStyle)(Ticker));
