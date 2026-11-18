import React from "react";

import { connect } from "react-redux";
import * as actions from "store/actions/actions";

import { withStyles, Button } from "@material-ui/core";
import releaseDatePanel from "assets/jss/material-kit-react/components/releaseDatePanel.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";

import FollowingModal from "views/Profile/FollowingModal/FollowingModal.jsx";

import { Link } from "react-router-dom";

import axios from "axios";

class ReleaseDatePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstRow: [],
      secondRow: [],
      userFollowing: [],
      followingModalOpen: false,
      followingModalShoe: {}
    };
  }

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

  renderHelper = (unreleased, attr) => {
    if (!attr) {
      attr = {
        following: []
      };
    }

    if (attr.errors) {
      attr = {
        following: []
      };
    }

    const { classes } = this.props;

    let firstRow = [];
    let secondRow = [];

    unreleased.forEach((value, index) => {
      let splitName = value.name.split("|");

      let date = new Date(value.releaseDate);

      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      date =
        date.getFullYear() +
        "." +
        (mm > 9 ? "" : "0") +
        mm +
        "." +
        (dd > 9 ? "" : "0") +
        dd;

      // if (!(index % 2)) {
      firstRow = [
        ...firstRow,
        <div
          className={
            index === 4
              ? classes.itemContainerFirstRowLast
              : index === 5
              ? classes.itemContainerFirstRowLast2
              : classes.itemContainerFirstRow
          }
          key={index}
        >
          <div className={classes.headerContainer}>
            <div className={classes.dateContainer}>
              <div className={classes.year}>{date}</div>
            </div>
            {attr.following.includes(value._id) ? (
              <IconButton
                className={classes.icon}
                onClick={() => this.followingModalHandler(true, value)}
              >
                <AddCircle classes={{ root: classes.iconFont }} />
              </IconButton>
            ) : (
              <IconButton
                className={classes.icon}
                onClick={() => this.followingModalHandler(true, value)}
              >
                <AddCircleOutline classes={{ root: classes.iconFont }} />
              </IconButton>
            )}
          </div>
          <Link to={"/products/" + value.name} className={classes.eachLink}>
            <Button
              className={classes.eachButton}
              classes={{ label: classes.flexButton }}
            >
              <div className={classes.imageContainer}>
                <img className={classes.image} src={value.image[0]} alt="1" />
              </div>
              <div className={classes.name}>
                <div className={classes.modelEn}>{splitName[0]}</div>
                <div className={classes.modelKr}>{splitName[1]}</div>
              </div>
              <div className={classes.price}>
                {value.releasePrice
                  ? "₩ " + value.releasePrice.toLocaleString()
                  : "--"}
              </div>
            </Button>
          </Link>
        </div>
      ];
      // } else {
      //   secondRow = [
      //     ...secondRow,
      //     <div
      //       className={
      //         index === 5
      //           ? classes.itemContainerSecondRowLast
      //           : classes.itemContainerSecondRow
      //       }
      //       key={index}
      //     >
      //       <div className={classes.headerContainer}>
      //         <div className={classes.dateContainer}>
      //           <div className={classes.year}>{date}</div>
      //         </div>
      //         {attr.following.includes(value._id) ? (
      //           <IconButton
      //             className={classes.icon}
      //             onClick={() => this.unfollow(value._id)}
      //           >
      //             <AddCircle classes={{ root: classes.iconFont }} />
      //           </IconButton>
      //         ) : (
      //           <IconButton
      //             className={classes.icon}
      //             onClick={() => this.follow(value._id)}
      //           >
      //             <AddCircleOutline classes={{ root: classes.iconFont }} />
      //           </IconButton>
      //         )}
      //       </div>
      //       <Link to={"/products/" + value.name} className={classes.eachLink}>
      //         <Button
      //           className={classes.eachButton}
      //           classes={{ label: classes.flexButton }}
      //         >
      //           <div className={classes.imageContainer}>
      //             <img className={classes.image} src={value.image[0]} alt="1" />
      //           </div>
      //           <div className={classes.name}>{value.name}</div>
      //           <div className={classes.price}>
      //             {value.releasePrice
      //               ? "₩ " + value.releasePrice.toLocaleString()
      //               : "--"}
      //           </div>
      //         </Button>
      //       </Link>
      //     </div>
      //   ];
      // }
    });

    this.setState({
      firstRow: firstRow,
      secondRow: secondRow
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.unreleased) {
      this.renderHelper(nextProps.unreleased, nextProps.attr);
    }
  }

  componentWillMount() {
    if (this.props.unreleased.length) {
      this.props.getUser();
      this.renderHelper(this.props.unreleased, this.props.attr);
    }
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
        let attr = {
          following: []
        };

        res.data.following.forEach(value => {
          attr.following = [...attr.following, value._id];
        });

        this.props.setAttrFollowing(this.props.attr, attr.following);

        this.renderHelper(this.props.unreleased, attr);
      });
  };

  handleTooltipClose = () => {
    this.setState({
      open: false
    });
  };

  handleTooltipOpen = () => {
    this.setState({
      open: true
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.cardHeader}>
          <div className={classes.cardHeaderName}>출시 예정 신발</div>
          <Link to="/new-releases" className={classes.releaseLink}>
            <div className={classes.seeAll}>전체보기</div>
          </Link>
        </div>
        {/* <ClickAwayListener onClickAway={this.handleTooltipClose}>
              <Tooltip
                style={{ padding: "0px", marginRight: "" }}
                PopperProps={{
                  disablePortal: true
                }}
                classes={{ tooltip: classes.tooltip }}
                onClose={this.handleTooltipClose}
                open={this.state.open}
                id="tooltip-top"
                title={"출시가 확정된 신발"}
                placement="right"
                disableFocusListener
                disableTouchListener
              >
                <IconButton
                  onClick={this.handleTooltipOpen}
                  className={classes.tooltipButton}
                >
                  <Icon className={classes.tooltipAlert}>live_help</Icon>
                </IconButton>
              </Tooltip>
            </ClickAwayListener> */}
        <div className={classes.rowsContainer}>
          <div className={classes.rowContainer}>{this.state.firstRow}</div>
        </div>
        <FollowingModal
          open={this.state.followingModalOpen}
          modalHandler={this.followingModalHandler}
          shoeData={this.state.followingModalShoe}
          reRenderHelper={this.reRenderHelper}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    unreleased: state.unreleased,
    userData: state.auth,
    attr: state.attr,
    isAuth: state.isAuthenticated
  };
};

const mapDispatchToProps = {
  getUser: actions.getUser,
  setAttrFollowing: actions.setAttrFollowing,
  setLogout: actions.setLogout,
  modalHandler: actions.getModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(releaseDatePanel)(ReleaseDatePanel));
