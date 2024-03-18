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
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import { Link, Redirect, withRouter } from "react-router-dom";
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
      let name = needData ? element.data[0].name : element.name;
      let nameArray = name.split("|");
      let image = needData ? element.data[0].image[0] : element.image[0];
      let lowestPrice = element.lowestPrice;

      arrayOfItems.push(
        <div key={name}>
          <Button
            className={classesProps.button}
            onClick={() => {
              this.props.history.push("/products/" + name);
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
    let bold;
    if (this.props.iconName === "whatshot") bold = "bold";

    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} stats icon>
          <CardIcon
            style={{
              paddingRight: "0px",
              background: "transparent",
              color: "#232020",
              marginTop: "-5px",
              boxShadow: "none",
              marginLeft: "-15px",
              fontWeight: "bold",
              fontSize: "22px"
              // "@media (max-width: 992px)": {
              //   width: "135px",
              //   height: "45px"
              // },
              // "@media (max-width: 599px)": {
              //   width: "100px",
              //   height: "30px"
              // }
            }}
          >
            <ListItem style={{ padding: "0px" }}>
              <div className={classes.headerName}>{this.props.headerName}</div>
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
            </ListItem>
          </CardIcon>
          <ButtonBase className={classes.buttonBase}>
            <CardIcon className={classes.seeAll}>
              <Link
                to={{
                  pathname: "/products",
                  state: {
                    filter: this.props.iconName,
                    brand: ""
                  }
                }}
                className={classes.link}
              >
                <div className={classes.seeAllText}>전체보기</div>
              </Link>
            </CardIcon>
          </ButtonBase>
          {/* <Button className={classes.cardCategory} color="primary" >모두 보기</Button> */}
        </CardHeader>
        {/* <div className={classes.slider}>{this.state.shoes}</div> */}
        {/* <Slider {...settings} className={classes.slider}>
          {this.state.shoes}
        </Slider> */}
        <br />
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
