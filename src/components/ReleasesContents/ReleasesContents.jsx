import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import releasesContentsStyle from "assets/jss/material-kit-react/components/releasesContentsStyle";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";

import FollowingModal from "views/Profile/FollowingModal/FollowingModal.jsx";

import { connect } from "react-redux";
import * as actions from "store/actions/actions";

import axios from "axios";

let searching = false;

class ReleasesContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      more: false,
      contents: [],
      skip: 0,
      options: "",
      followingModalOpen: false,
      followingModalShoe: {},
      rerenderValue: {}
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

  renderHelper = (value, options, reset, attr) => {
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
    let contents = [];
    value.data.orderby.item.forEach(value => {
      let newName = value.name.split("|");

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
        dd +
        ".";

      contents = [
        ...contents,
        <div className={classes.item} key={value.name}>
          <div className={classes.dateContainer}>
            <div className={classes.date}>{date}</div>
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
          <div className={classes.imageContainer}>
            <img className={classes.img} src={value.image[0]} alt="1" />
          </div>
          <div className={classes.detailsContainer}>
            <div className={classes.brand}>{value.brand.toUpperCase()}</div>
            <div className={classes.model}>
              <div className={classes.modelEN}>{newName[0]}</div>
              <div className={classes.modelKR}>{newName[1]}</div>
            </div>
            <div className={classes.priceContainer}>
              <div>발매가</div>
              <div className={classes.price}>
                {value.releasePrice
                  ? "₩ " + value.releasePrice.toLocaleString()
                  : "미정"}
              </div>
            </div>
          </div>
        </div>
      ];
    });

    this.setState({
      contents: contents,
      // more: value.data.orderby.item.length === 6, // 원래 이거
      more: false,
      skip: reset ? 1 : this.state.skip + 1,
      options: options,
      rerenderValue: value
    });
  };

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

        this.renderHelper(this.state.rerenderValue, null, false, attr);
      });
  };

  componentWillMount() {
    window.addEventListener("scroll", this.scrollToSearch);
    axios({
      method: "get",
      url: "https://api.probe.gg/open/unreleasedShoe?skip=0"
    }).then(value => {
      this.renderHelper(value, null, true, this.props.attr);
    });
  }

  componentWillReceiveProps(nextProps) {
    let options = this.optionsHandler(nextProps);

    axios({
      method: "get",
      url: "https://api.probe.gg/open/unreleasedShoe?skip=0" + options
    }).then(value => {
      this.renderHelper(value, options, true, nextProps.attr);
    });
  }

  optionsHandler = nextProps => {
    let options = "";

    if (
      nextProps.yeezy ||
      nextProps.ultraBoost ||
      nextProps.nmd ||
      nextProps.iniki ||
      nextProps.aOther ||
      nextProps.airJordan ||
      nextProps.airForce ||
      nextProps.airMax ||
      nextProps.nOther ||
      nextProps.other
    ) {
      options += "&subBrand=";

      if (nextProps.yeezy) {
        options += "yeezy,";
      }
      if (nextProps.ultraBoost) {
        options += "ultra boost,";
      }
      if (nextProps.nmd) {
        options += "nmd,";
      }
      if (nextProps.iniki) {
        options += "iniki,";
      }
      if (nextProps.aOther) {
        options += "aOther,";
      }
      if (nextProps.airJordan) {
        options += "air jordan,";
      }
      if (nextProps.airForce) {
        options += "air force 1,";
      }
      if (nextProps.airMax) {
        options += "airMax,";
      }
      if (nextProps.nOther) {
        options += "nOther,";
      }
      if (nextProps.other) {
        options += "other,";
      }
    }
    return options;
  };

  scrollToSearch = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!searching) {
        this.viewMoreShoes();
      }
    }
  };

  viewMoreShoes = () => {
    if (this.state.more) {
      searching = true;

      axios({
        method: "get",
        url:
          "https://api.probe.gg/open/unreleasedShoe?skip=" +
          this.state.skip +
          this.state.options
      }).then(value => {
        this.renderHelper(value, null, false, this.props.attr);
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        {this.state.contents.length ? (
          this.state.contents
        ) : (
          <div className={classes.empty}>검색 결과가 없습니다.</div>
        )}
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
  modalHandler: actions.getModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(releasesContentsStyle)(ReleasesContents));
