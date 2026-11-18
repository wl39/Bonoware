import React from "react";

import { connect } from "react-redux";

// react component for creating beautiful carousel
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx";

import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import Card from "components/Card/Card.jsx";
import Icon from "@material-ui/core/Icon";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import Carousel from "../../AdminPage/Carousel";

class MostPopularSection extends React.Component {
  state = {
    open: false,
    shoes: []
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  renderHelper = (classesProps, itemProps, needData) => {
    let arrayOfItems = [];

    itemProps.forEach((element, index) => {
      const product = needData ? element.data[0] : element;
      const name = product.name;
      let nameArray = name.split("|");
      const image = product.image[0];
      let lowestPrice = element.lowestPrice;

      arrayOfItems.push(
        <div key={name}>
          <Button
            className={classesProps.button}
            onClick={() => {
              this.props.history.push("/products/" + encodeURIComponent(product._id || name));
            }}
          >
            <div className={classesProps.paper}>
              <img alt={name} src={image} className={classesProps.image} />

              <div className={classesProps.priceContainer}>
                <div className={classesProps.priceHeader}>최저가</div>
                <div className={classesProps.price}>
                  {lowestPrice
                    ? ("₩" + lowestPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "--"}
                </div>
              </div>
              <div className={classesProps.shoeDetail}>
                <div className={classesProps.shoeNameEnglish}>
                  {nameArray[0]}
                </div>
                <div className={classesProps.shoeName}>{nameArray[1]}</div>
              </div>
            </div>
          </Button>
          {/* </Link> */}
        </div>
      );
    });
    this.setState({
      shoes: arrayOfItems
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.mostPopularSlider) {
      if (this.props.iconName === "whatshot") {
        this.renderHelper(nextProps.classes, nextProps.mostPopularSlider, true);
      }
    }

    if (nextProps.mostRecentSlider) {
      if (this.props.iconName === "new_releases") {
        this.renderHelper(nextProps.classes, nextProps.mostRecentSlider, false);
      }
    }

    if (nextProps.mostCheapestSlider) {
      if (this.props.iconName === "trending_down") {
        this.renderHelper(
          nextProps.classes,
          nextProps.mostCheapestSlider,
          true
        );
      }
    }
  }

  componentWillMount() {
    if (this.props.mostPopularSlider.length) {
      if (this.props.iconName === "whatshot") {
        this.renderHelper(
          this.props.classes,
          this.props.mostPopularSlider,
          true
        );
      }
    }

    if (this.props.mostRecentSlider.length) {
      if (this.props.iconName === "new_releases") {
        this.renderHelper(
          this.props.classes,
          this.props.mostRecentSlider,
          false
        );
      }
    }

    if (this.props.mostCheapestSlider.length) {
      if (this.props.iconName === "trending_down") {
        this.renderHelper(
          this.props.classes,
          this.props.mostCheapestSlider,
          true
        );
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.sectionHeading}>
          <div className={classes.headingLabel}>
            <h2 className={classes.headerName}>{this.props.headerName}</h2>
            <ClickAwayListener onClickAway={this.handleTooltipClose}>
              <Tooltip
                classes={{
                  popper: classes.popper,
                  tooltip: classes.tooltipText
                }}
                className={classes.tooltipIcon}
                // style={{ padding: 0, height: "30px", width: "30px" }}
                PopperProps={{
                  disablePortal: true
                }}
                onClose={this.handleTooltipClose}
                open={this.state.open}
                id="tooltip-top"
                title={this.props.helper}
                placement="right"
                disableFocusListener
                disableTouchListener
              >
                <IconButton
                  onClick={this.handleTooltipOpen}
                  className={classes.tooltipButton}
                >
                  <Icon className={classes.tooltipAlert}>help</Icon>
                </IconButton>
              </Tooltip>
            </ClickAwayListener>
          </div>
          <Link
            className={classes.sectionLink}
            to={{ pathname: "/products", state: { filter: this.props.iconName, brand: "" } }}
          >
            전체보기
          </Link>
        </div>
        <Carousel>{this.state.shoes}</Carousel>
      </Card>
    );
  }
}
const mapStateToProps = state => {
  return {
    mostPopularSlider: state.mostPopularSlider,
    mostRecentSlider: state.mostRecentSlider,
    mostCheapestSlider: state.mostCheapestSlider
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(withStyles(carouselStyle)(MostPopularSection)));
