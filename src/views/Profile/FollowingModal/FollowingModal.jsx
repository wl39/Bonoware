import React from "react";
import followingModal from "assets/jss/material-kit-react/views/landingPageSections/followingModal.jsx";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Modal, Fade, ClickAwayListener, Button } from "@material-ui/core";
// import * as actions from "store/actions/actions";
import * as actions from "store/actions/actions";

import axios from "axios";

function getModalStyle() {
  return {
    opacity: "1",
    display: "flex",
    flexDirection: "column"
  };
}

class FollowingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      shoeNameEN: "",
      shoeNameKR: "",
      shoeBrand: "",
      shoeImg: "",
      shoePrice: 0,
      isFollowed: false,
      size: 270,
      sizeToPreserve: 270,
      sizePanel: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shoeData) {
      if (nextProps.shoeData.name) {
        let isFollowed = false;
        let shoeNmae = nextProps.shoeData.name.split("|");

        if (nextProps.attr.following.includes(nextProps.shoeData._id)) {
          isFollowed = true;
        }

        this.setState({
          shoeNameEN: shoeNmae[0],
          shoeNameKR: shoeNmae[1],
          shoeImg: nextProps.shoeData.image[0],
          shoeBrand: nextProps.shoeData.brand,
          shoePrice: nextProps.shoeData.releasePrice,
          isFollowed: isFollowed
        });
      }
    }
  }

  handleOpen = () => {
    this.props.modalHandler(true, null);
  };

  handleClose = () => {
    console.log("?");
    this.props.modalHandler(false, null);
  };

  sizePanelHandler = () => {
    this.setState({
      sizePanel: !this.state.sizePanel
    });
  };

  sizePanelColse = () => {
    this.setState({
      sizePanel: false
    });
  };

  sizeHandler = size => {
    this.setState({
      isFollowed: size === this.state.sizeToPreserve,
      size: size
    });
  };

  followHandler = () => {
    if (this.state.isFollowed) {
      axios
        .post(
          "https://api.probe.gg/protected/unfollow",
          {
            shoe: this.props.shoeData._id
          },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "https://probe.gg"
            }
          }
        )
        .then(response => {
          this.props.reRenderHelper();
          this.handleClose();
        })
        .catch(err => {
          alert(err);
        });
    } else {
      axios
        .post(
          "https://api.probe.gg/protected/follow",
          {
            shoe: this.props.shoeData._id
          },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "https://probe.gg"
            }
          }
        )
        .then(response => {
          this.props.reRenderHelper();
          this.handleClose();
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  render() {
    const { classes } = this.props;

    return this.props.open ? (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.handleClose}
      >
        <Fade in={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <div className={classes.container}>
              <img
                className={classes.image}
                src={this.state.shoeImg}
                alt={this.state.shoeName}
              />
              <div className={classes.shoeDetailsContainer}>
                <div className={classes.brand}>{this.state.shoeBrand}</div>
                <div>{this.state.shoeNameEN}</div>
                <div className={classes.modelKR}>{this.state.shoeNameKR}</div>
                <div className={classes.sizePriceContainer}>
                  <div>
                    {this.state.shoePrice
                      ? "₩" + this.state.shoePrice.toLocaleString()
                      : "미정"}
                  </div>
                  <ClickAwayListener onClickAway={this.sizePanelColse}>
                    <div
                      onClick={this.sizePanelHandler}
                      className={classes.sizePanelContainer}
                    >
                      <div>{this.state.size}</div>
                      <div
                        className={
                          this.state.sizePanel
                            ? classes.sizePanelActive
                            : classes.sizePanelHidden
                        }
                      >
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(220)}
                        >
                          220
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(225)}
                        >
                          225
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(230)}
                        >
                          230
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(235)}
                        >
                          235
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(240)}
                        >
                          240
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(245)}
                        >
                          245
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(250)}
                        >
                          250
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(255)}
                        >
                          255
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(260)}
                        >
                          260
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(265)}
                        >
                          265
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(270)}
                        >
                          270
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(275)}
                        >
                          275
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(280)}
                        >
                          280
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(285)}
                        >
                          285
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(290)}
                        >
                          290
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(295)}
                        >
                          295
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(300)}
                        >
                          300
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(305)}
                        >
                          305
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(310)}
                        >
                          310
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(315)}
                        >
                          315
                        </div>
                        <div
                          className={classes.sizeArray}
                          onClick={() => this.sizeHandler(320)}
                        >
                          320
                        </div>
                      </div>
                    </div>
                  </ClickAwayListener>
                </div>
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <Button
                className={
                  this.state.isFollowed ? classes.isFollowed : classes.toFollow
                }
                onClick={this.followHandler}
              >
                {this.state.isFollowed ? "팔로잉 취소" : "팔로잉"}
              </Button>
              <Button className={classes.toFollow} onClick={this.handleClose}>
                닫기
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    ) : null;
  }
}
const mapStateToProps = state => {
  return {
    attr: state.attr,
    isAuth: state.isAuthenticated
  };
};

const mapDispatchToProps = {
  setLogout: actions.setLogout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(followingModal)(FollowingModal));
