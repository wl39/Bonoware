import React from "react";
import priceHistoryModal from "assets/jss/material-kit-react/views/landingPageSections/priceHistoryModal.jsx";

import axios from "axios";

import { withStyles } from "@material-ui/core/styles";

class PriceHistoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceHistory: []
    };
  }

  componentWillMount() {
    let sid = this.props.sid;
    let size = this.props.size ? "=" + this.props.size : "";

    axios({
      method: "get",
      url:
        "https://api.probe.gg/open/allShoeSizePrice?shoe=" +
        sid +
        "&size" +
        size
    }).then(response => {
      const { classes } = this.props;
      let priceHistory = [];

      if (!response.data.length) {
        priceHistory = [
          ...priceHistory,
          <div style={{ margin: "20px auto" }} key={"none"}>
            아직 거래된 신발이 없습니다.
          </div>
        ];
      }

      response.data.forEach(value => {
        priceHistory = [
          ...priceHistory,
          <div
            className={classes.priceHistoryDetail}
            key={value._id.size + value._id.price}
          >
            <div className={classes.size}>{value._id.size}</div>
            <div className={classes.price}>
              {"₩" + value._id.price.toLocaleString()}
            </div>
            <div className={classes.stock}>
              {value.count > 999 ? "999+" : value.count}
            </div>
          </div>
        ];
      });

      this.setState({
        priceHistory: [...priceHistory]
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <div className={classes.modalHeader}>품목 내역</div>
        <div className={classes.priceHistoryHeader}>
          <div className={classes.size}>사이즈</div>
          <div className={classes.price}>가격</div>
          <div className={classes.stock}>수량</div>
        </div>
        <div className={classes.priceHistoryContainer}>
          {this.state.priceHistory}
        </div>
      </div>
    );
  }
}

export default withStyles(priceHistoryModal)(PriceHistoryModal);
