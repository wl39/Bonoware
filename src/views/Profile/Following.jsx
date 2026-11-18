import React from "react";
import { withStyles } from "@material-ui/core/styles";
import profilePageStyle from "assets/jss/material-kit-react/views/landingPageSections/customProfile.jsx";
import { Button, IconButton } from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import axios from "axios";
import FollowingModal from "./FollowingModal/FollowingModal";
import { connect } from "react-redux";

import * as actions from "store/actions/actions";

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoeData: [],
      data: {},
      following: this.props.text,
      name: 0,
      price: 0,
      lowestPrice: 0,
      size: 0,
      followingModalOpen: false,
      followingModalShoe: {}
    };
  }

  componentWillMount() {
    axios
      .get("https://api.probe.gg/protected/following", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg"
        }
      })
      .then(res => {
        this.renderHelper(res.data.following);
      });
  }

  reRenderHelper = () => {
    axios
      .get("https://api.probe.gg/protected/following", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg"
        }
      })
      .then(res => {
        this.renderHelper(res.data.following);
      });
  };

  ascendingOrderHandler = name => {
    if (this.state[name] === 1) {
      this.descendingOrderHandler(name);
    } else {
      let shoeData = this.state.shoeData;

      shoeData.sort((a, b) => (a[name] > b[name] ? 1 : -1));

      this.setState({
        name: 0,
        price: 0,
        lowestPrice: 0,
        size: 0,
        [name]: 1
      });
    }
  };

  followingModalHandler = (bool, shoeData) => {
    if (bool) {
      axios
        .get("https://api.probe.gg/protected/checkLogin", {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://probe.gg"
          }
        })
        .then(response => {
          this.setState({
            followingModalOpen: bool,
            followingModalShoe: shoeData
          });
        })
        .catch(err => {
          if (this.props.isAuthenticated) {
            this.props.setLogout();
          }
          this.props.modalHandler(true);
        });
    } else {
      this.setState({
        followingModalOpen: bool,
        followingModalShoe: shoeData
      });
    }
  };

  renderHelper = shoeData => {
    const { classes } = this.props;
    let following = [];

    shoeData.forEach(shoeData => {
      let item = (
        <Button
          className={classes.soldShoeButton}
          key={shoeData._id}
          onClick={() => this.followingModalHandler(true, shoeData)}
        >
          <div
            id={shoeData.name}
            key={shoeData.name}
            className={classes.followingShoeContainer}
          >
            <div className={classes.modelContainer}>
              <img
                src={shoeData.image[0]}
                className={classes.image}
                alt={shoeData.ProductID}
              />
              <div className={classes.shoeModelContainer}>
                <div className={classes.brand}>{shoeData.brand}</div>
                <div className={classes.model}>
                  {shoeData.name.split("|")[1]}
                </div>
              </div>
            </div>
            <div className={classes.followingDetails}>
              <div className={classes.profit}>270</div>

              <div className={classes.price}>
                {shoeData.releasePrice
                  ? "₩" + shoeData.releasePrice.toLocaleString()
                  : "미정"}
              </div>
            </div>
          </div>
        </Button>
      );

      following = [...following, item];
    });

    this.setState({
      data: {
        following: following
      }
    });
  };

  descendingOrderHandler = name => {
    if (this.state[name] === 2) {
      this.ascendingOrderHandler(name);
    } else {
      let shoeData = this.state.shoeData;

      shoeData.sort((a, b) => (a[name] < b[name] ? 1 : -1));

      this.setState({
        name: 0,
        price: 0,
        lowestPrice: 0,
        size: 0,
        [name]: 2
      });

      // this.renderHelper(shoeData);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.following}>
        <div className={classes.pageName}>FOLLOWING</div>
        <div className={classes.table}>
          <div className={classes.followingTableHeader}>
            <div className={classes.headerContainer}>
              <div className={classes.headerName}>제품명</div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.name === 0 || this.state.name === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("name")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.name === 1
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.name === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("name")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.name === 2
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
            <div className={classes.headerContainerMobileHidden}>
              <div className={classes.headerName}>사이즈</div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.size === 0 || this.state.size === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("size")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.size === 1
                        ? classes.arrowsActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.size === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("size")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.size === 2
                        ? classes.arrowsActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
            <div
              className={classes.headerContainer}
              style={{ borderRight: "0px" }}
            >
              <div className={classes.headerName}>현재 가격</div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.price === 0 || this.state.price === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("price")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.price === 1
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.price === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("price")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.price === 2
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
          </div>
          <FollowingModal
            open={this.state.followingModalOpen}
            modalHandler={this.followingModalHandler}
            shoeData={this.state.followingModalShoe}
            reRenderHelper={this.reRenderHelper}
          />
          <div className={classes.sellingDummyContainer}>
            {this.state.data.following ? (
              this.state.data.following
            ) : (
              <div style={{ margin: "20px", textAlign: "center" }}>
                팔로잉한 물품이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    attr: state.attr,
    isAuth: state.isAuthenticated
  };
};

const mapDispatchToProps = {
  setLogout: actions.setLogout,
  modalHandler: actions.getModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(profilePageStyle)(Following));
