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
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import Carousel from "../../AdminPage/Carousel";

class RelatedSection extends React.Component {
  state = {
    open: false,
    shoes: [],
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  renderHelper = (classesProps, itemProps, needData) => {
    // let data = {
    //   name: "Nike Air Max FF 720  | 나이키 에어맥스 FF 720",
    //   image: ["https://s3.ap-northeast-2.amazonaws.com/probe.gg/images/shoes/nike-air-max-720-ff-black-ao3189-001-1.jpg"],
    //   lowestPrice: 123125
    // }
    // let a = [data, data, data, data, data, data, data, data]
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
              this.props.history.push('/products/' + name)
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
                <div className={classesProps.shoeNameEnglish}>{nameArray[0]}</div>
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
    // have condition to check if shoes props came in currently recalled twice
    this.renderHelper(
      nextProps.classes,
      nextProps.shoes,
      false
    );
  }

  componentWillMount() {
    this.renderHelper(
      this.props.classes,
      this.props.shoes,
      false
    );
  }

  render() {
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
              fontSize: "24px",
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
        </CardHeader>
        <br />
        <Carousel>{this.state.shoes}</Carousel>
      </Card>
    );
  }
}

export default withRouter(withStyles(carouselStyle)(RelatedSection));
