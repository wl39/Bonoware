import React from "react";

import { Link } from "react-router-dom";
// import AWS from "aws-sdk";
// import DynamoDB from "aws-sdk/clients/dynamodb";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions/actions";

import Buying from "views/Profile/Buying.jsx";
import Selling from "views/Profile/Selling.jsx";
import Recap from "views/Profile/NewRecap.jsx"; // views/Profile/Recap.jsx
import Following from "views/Profile/Following.jsx";
import Portfolio from "views/Profile/Portfolio.jsx";
import Settings from "views/Profile/Settings.jsx";

import axios from "axios";

import withStyles from "@material-ui/core/styles/withStyles";
import profilePageStyle from "assets/jss/material-kit-react/views/landingPageSections/customProfile.jsx";
import {
  AccountCircleOutlined,
  ShoppingCartOutlined,
  LocalAtmOutlined,
  Timeline,
  PersonAddOutlined,
  AccountBoxOutlined,
  SettingsOutlined
} from "@material-ui/icons";

const dummy1 = {
  ProductID: "TRX501VFIBN",
  ImageURL:
    "https://stockx.imgix.net/Nike-Blazer-High-sacai-White-Black-Legend-Blue-Product.jpg?fit=fill&bg=FFFFFF&w=300&h=214&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1559316744",
  Size: "270",
  SentTime: "2019.7.4|09:05:12",
  OnSale: 2,
  Model: "Aike Blazer High sacai White Black Legend Blue",
  Price: "780,000"
};

const dummy2 = {
  ProductID: "NAPRU145901",
  ImageURL:
    "https://stockx.imgix.net/Nike-Blazer-High-sacai-White-Black-Legend-Blue-Product.jpg?fit=fill&bg=FFFFFF&w=300&h=214&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1559316744",
  Size: "270",
  SentTime: "2019.7.3|09:05:12",
  OnSale: 1,
  Model: "Nike Blazer High sacai White Black Legend Blue",
  Price: "210,000"
};

const dummy3 = {
  ProductID: "NAPRU145901",
  ImageURL:
    "https://stockx.imgix.net/Nike-Blazer-High-sacai-White-Black-Legend-Blue-Product.jpg?fit=fill&bg=FFFFFF&w=300&h=214&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1559316744",
  Size: "270",
  SentTime: "2019.7.3|09:05:12",
  OnSale: 0,
  Model: "Nike Blazer High sacai White Black Legend Blue",
  Price: "190,000"
};

class ProfileContent extends React.Component {
  state = {
    db: null,
    userName: null,
    redirect: false,
    personalData: [],
    userShoeDataBuying: [],
    portfolioData: [],
    followingData: [],
    content: null,
    shoeData: [],
    newPrice: {}
  };

  getShoeData = () => {
    this.setState({
      shoeData: [...this.state.shoeData, dummy1, dummy2, dummy3]
    });
  };

  componentWillMount() {
    axios
      .get("https://api.probe.gg/protected/getUserData", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg/"
        }
      })
      .then(response => {
        this.setState({
          personalData: response.data
        });
      });
    if (this.props.userName === null || this.props.userName === "") {
      this.setState({
        redirect: true
      });
      this.props.setLogout();
    } else {
      this.getShoeData();

      // Auth.currentAuthenticatedUser().then(data => {
      //   if (data.username === this.props.userName) {
      //     Auth.currentCredentials().then(credentials => {
      //       this.setState({
      //         redirect: false,
      //         personalData: data.attributes
      //       });
      //     });
      //   } else {
      //     this.setState({
      //       redirect: true
      //     });
      //   }
      // });
      // Auth.currentSession();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userName === null || nextProps.userName === "") {
      this.setState({
        redirect: true
      });
    } else {
      if (this.content !== nextProps.match.params.content) {
        this.content = nextProps.match.params.content;
        switch (this.content) {
          case "buying":
            this.setState({
              content: <Buying data={this.state.userShoeDataBuying} />
            });
            break;
          case "selling":
            this.setState({
              content: <Selling shoeData={this.state.shoeData} text={true} />
            });
            break;
          case "recap":
            this.setState({
              content: <Recap data={this.state.personalData} />
            });
            break;
          case "following":
            this.setState({
              content: <Following data={this.state.followingData} />
            });
            break;
          case "portfolio":
            this.setState({
              content: (
                <Portfolio
                  data={this.state.portfolioData}
                  shoeData={this.state.shoeData}
                />
              )
            });
            break;
          case "settings":
            this.setState({
              content: (
                <Settings
                  data={this.state.portfolioData}
                  shoeData={this.state.shoeData}
                />
              )
            });
            break;
          default:
            break;
        }
      }
    }
  }

  componentDidMount() {
    this.content = this.props.match.params.content;

    if (this.props.userName === null || this.props.userName === "") {
      this.setState({
        redirect: true
      });
    } else {
      switch (this.content) {
        case "buying":
          this.setState({
            content: <Buying data={this.state.userShoeDataBuying} />
          });
          break;
        case "selling":
          console.log(this.state.shoeData);
          this.setState({
            content: <Selling shoeData={this.state.shoeData} text={true} />
          });
          break;
        case "recap":
          this.setState({
            content: <Recap data={this.state.personalData} />
          });
          break;
        case "following":
          this.setState({
            content: <Following data={this.state.followingData} />
          });
          break;
        case "portfolio":
          this.setState({
            content: (
              <Portfolio
                data={this.state.portfolioData}
                shoeData={this.state.shoeData}
              />
            )
          });
          break;
        case "settings":
          this.setState({
            content: (
              <Settings
                data={this.state.portfolioData}
                shoeData={this.state.shoeData}
              />
            )
          });
          break;
        default:
          break;
      }
    }
  }

  // this.props.match.params.content
  render() {
    const { classes } = this.props;
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className={classes.container}>
        <div className={classes.drawer}>
          <Link
            to={"/profile/recap"}
            className={classes.profileName}
            // onClick={() => this.showContent("recap")}
          >
            <AccountCircleOutlined className={classes.accountIcon} />
            {this.props.userName}
          </Link>
          <Link
            to={"/profile/buying"}
            className={
              this.content === "buying"
                ? classes.focused
                : classes.drawerContent
            }
          >
            <ShoppingCartOutlined className={classes.contentIcon} />
            <div className={classes.contentText}>구매내역</div>
          </Link>
          <Link
            to={"/profile/selling"}
            className={
              this.content === "selling"
                ? classes.focused
                : classes.drawerContent
            }
          >
            <LocalAtmOutlined className={classes.contentIcon} />
            <div className={classes.contentText}>판매내역</div>
          </Link>
          <Link
            to={"/profile/portfolio"}
            className={
              this.content === "portfolio"
                ? classes.focused
                : classes.drawerContent
            }
          >
            {/* <AccountBoxOutlined /> */}
            <Timeline className={classes.contentIcon} />
            <div className={classes.contentText}>포트폴리오</div>
          </Link>
          <Link
            to={"/profile/recap"}
            className={
              this.content === "recap" ? classes.focused : classes.drawerContent
            }
          >
            {/* <AccountBoxOutlined /> */}
            <AccountBoxOutlined className={classes.contentIcon} />
            <div className={classes.contentText}>프로필</div>
          </Link>
          <Link
            to={"/profile/following"}
            className={
              this.content === "following"
                ? classes.focused
                : classes.drawerContent
            }
          >
            <PersonAddOutlined className={classes.contentIcon} />
            <div className={classes.contentText}>팔로잉</div>
          </Link>
          <Link
            to={"/profile/settings"}
            className={
              this.content === "settings"
                ? classes.focused
                : classes.drawerContent
            }
          >
            <SettingsOutlined className={classes.contentIcon} />
            <div className={classes.contentText}>설정</div>
          </Link>
        </div>
        {this.state.content}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    attr: state.attr,
    userName: state.userName
  };
};

const mapDispatchToProps = {
  setLogout: actions.setLogout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(profilePageStyle)(ProfileContent));
