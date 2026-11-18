import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import * as actions from "store/actions/actions";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import Authenticated from "./Mobile/Authenticated";
import Menu from "./Mobile/Menu";

class MobileHeaderLink extends React.Component {
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(data => {
        try {
          let usersname = data.attributes.name;
          if (usersname.length > 4) {
            let splitname = usersname.split("");
            usersname =
              splitname[0] + splitname[1] + splitname[2] + splitname[4] + "..";
          }
          this.props.setMountAuth(
            true,
            usersname,
            data.attributes,
            data.username
          );
        } catch (error) {}
      })
      .catch(error => {});
  }

  handleOpen = () => {
    this.props.modalHandler(true);
  };

  handleClose = () => {
    this.props.modalHandler(false);
  };

  handleLogin = () => {
    this.props.authUser({
      email: this.props.id,
      pw: this.props.pw
    });
    this.setState({
      anchorEl: null,
      authenticated: true
    });
  };

  signoutHandler = event => {
    this.setState({
      anchorEl: null
    });
    // this.props.modalHandler(false)

    Auth.signOut()
      .then(data => null)
      .catch(err => null);
    this.props.setLogout();
    // this.props.setMountAuth(false, "")
  };

  render() {
    return (
      <div>
        <Authenticated
          userName={this.props.userName}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
          handleLogin={this.handleLogin}
        />
        <Menu handleClose={this.props.onClose} />
      </div>
    );
  }
}
const AccountModalWrapped = withStyles(null)(MobileHeaderLink);

const mapStateToProps = state => {
  return {
    isAuth: state.isAuthenticated,
    userName: state.userName,
    id: state.id,
    pw: state.pw,
    open: state.modalOpen
  };
};
const mapDispatchToProps = {
  authUser: actions.authUser,
  setMountAuth: actions.setAuth,
  setLogout: actions.setLogout,
  modalHandler: actions.getModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountModalWrapped);
