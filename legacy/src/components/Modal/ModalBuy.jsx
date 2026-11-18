import React from "react";

import Modal from "@material-ui/core/Modal";
import Hidden from "@material-ui/core/Hidden";
import withStyles from "@material-ui/core/styles/withStyles";
import Fade from "@material-ui/core/Fade";

import BuyStepper from "components/BuyStepper/BuyStepper.jsx";
import MobileBuyStepper from "components/MobileBuyStepper/MobileBuyStepper.jsx";

import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "store/actions/actions";
class ModalBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    axios
      .get("https://api.probe.gg/protected/checkLogin", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg"
        }
      })
      .then(response => {
        this.setState({
          open: true
        });
        this.props.tempHandler(true);
      })
      .catch(err => {
        if (this.props.isAuthenticated) {
          this.props.setLogout();
        }
        this.props.modalHandler(true);
      });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
    this.props.tempHandler(false);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div
          className={classes.singleSizeContainerAvailable}
          key={this.props.size}
          onClick={this.handleOpen}
        >
          <div>{this.props.size}</div>
          <div> ₩ {this.props.price}</div>
        </div>
        {/* <Hidden xsDown> */}
        <Modal open={this.state.open} onClose={this.handleClose}>
          <Fade in={this.state.open}>
            <BuyStepper
              size={this.props.size}
              price={this.props.price}
              model={this.props.model}
              sid={this.props.sid}
            />
          </Fade>
        </Modal>
        {/* </Hidden> */}
        {/* <Hidden smUp> */}
        {/* <Modal open={this.state.open} onClose={this.handleClose}>
            <Fade in={this.state.open}>
              <MobileBuyStepper
                onClose={this.handleClose}
                size={this.props.size}
                price={this.props.price}
                model={this.props.model}
                sid={this.props.sid}
              />
            </Fade>
          </Modal>
        </Hidden> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuthenticated,
    userName: state.userName
  };
};

const mapDispatchToProps = {
  authUser: actions.authUser,
  setMountAuth: actions.setAuth,
  setLogout: actions.setLogout,
  modalHandler: actions.getModal
};

const AccountModalWrapped = withStyles(propageStyle)(ModalBuy);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountModalWrapped);
