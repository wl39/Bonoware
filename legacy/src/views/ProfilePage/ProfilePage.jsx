// @material-ui/core components
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import profilePageStyle from "assets/jss/material-kit-react/views/landingPageSections/customProfile.jsx";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Recap from "views/Profile/NewRecap.jsx"; // views/Profile/Recap.jsx
import axios from "axios";

class ProfilePage extends React.Component {
  state = {
    authID: null,
    redirect: false,
    personalData: [],
    content: null
  };

  componentWillReceiveProps(prevProps) {
    // if (prevProps.authID === null || prevProps.authID === "") {
    //   this.setState({
    //     redirect: false
    //   });
    // }
  }

  componentWillMount() {
    // if (this.props.authID === null || this.props.authID === "") {
    //   this.setState({
    //     redirect: false
    //   });
    // }

    axios
      .get("https://api.probe.gg/protected/getUserData", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg/"
        }
      })
      .then(resposne => {
        console.log("SDFJLKSDJFLK");
        console.log(resposne);
      });

    // Auth.currentAuthenticatedUser().then(data => {
    //   // if (data.username === this.props.authID) {
    //   Auth.currentCredentials().then(credentials => {
    //     this.setState({
    //       redirect: false,
    //       personalData: data.attributes,
    //       content: <Recap data={data.attributes} />
    //     });
    //   });
    //   // } else {
    //   //   this.setState({
    //   //     redirect: true
    //   //   });
    //   // }
    // });
    // Auth.currentSession();
  }

  componentDidMount() {
    // if (this.props.authID === null || this.props.authID === "") {
    //   this.setState({
    //     redirect: false
    //   });
    // }
    // if (this.state.redirect === false) {
    //   this.getShoeData();
    // }
  }

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
            className={classes.focused}
          // onClick={() => this.showContent("recap")}
          >
            {this.state.personalData.name}
          </Link>
          <Link to={"/profile/buying"} className={classes.drawerContent}>
            구매내역
          </Link>
          <Link to={"/profile/selling"} className={classes.drawerContent}>
            판매내역
          </Link>
          <Link to={"/profile/portfolio"} className={classes.drawerContent}>
            포트폴리오
          </Link>
          <Link to={"/profile/following"} className={classes.drawerContent}>
            팔로잉
          </Link>
        </div>
        <Recap data={this.state.personalData} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    attr: state.attr,
    authID: state.authID
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(profilePageStyle)(ProfilePage));
