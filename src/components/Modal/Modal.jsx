import classNames from "classnames";

import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import ModalLogin from "components/Modal/ModalLogin.jsx";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "store/actions/actions";
import axios from "axios";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: "600px",
    height: "470px",
    padding: "70px 43px",
    background: "white",
    "@media (max-width: 599px)": {
      width: "100%",
      padding: "20px 10px",
      height: "fit-content"
    }
  },
  listItem: {
    float: "center",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0"
  },
  buttonTitle: {
    transition: "0.3s",
    // width: "calc(100% - 30px)",
    lineHeight: "1",
    minWidth: "40px",
    "@media (min-width: 600px)": {
      margin: "0px 0px"
    },
    "@media (max-width: 992px)": {
      width: "auto !important"
    },
    // margin: "15px 0px",
    padding: "0px 0px",
    color: "inherit",
    fontSize: "18px",
    fontWeight: "500",
    backgroundColor: "inherit",
    minHeight: "18px",
    textTransform: "capitalize",
    width: "fit-content",
    display: "flex",
    justifyContent: "space-between",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2)"
    }
  },
  buttonTitleLeftOther: {
    "@media (max-width: 992px)": {
      width: "38px !important",
      minWidth: "38px !important"
    }
  },
  buttonTitleRightOther: {
    "@media (max-width: 992px)": {
      width: "54px !important"
    }
  },
  buttonText: {
    height: "18px",
    fontSize: "18px",
    lineHeight: "1",
    "@media (max-width: 992px)": {
      height: "14px",
      fontSize: "14px"
    }
  },
  buttonTextOther: {
    height: "16px",
    fontSize: "16px",
    lineHeight: "1",
    "@media (max-width: 1200px)": {
      height: "14px",
      fontSize: "14px"
    }
  },
  modalContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "142px",
    "@media (max-width: 992px)": {
      width: "122px"
    }
  },
  modalContainerOther: {
    display: "flex",
    justifyContent: "space-between",
    width: "142px",
    padding: "0px 10px",
    "@media (max-width: 1200px)": {
      width: "130px"
    },
    "@media (max-width: 992px)": {
      width: "115px"
    }
  },
  loginContainer: {
    height: "18px",
    fontSize: "18px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 992px)": {
      height: "14px",
      fontSize: "14px"
    }
  }
});

class AccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
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
    this.props.setLogout();
    // this.props.setMountAuth(false, "")
  };

  componentDidMount() {
    axios
      .get("https://api.probe.gg/protected/checkLogin", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg"
        }
      })
      .then(response => {
        let data = response.data;
        // console.log(data);
        this.props.setMountAuth(true, data.name, data, data.email);
      });
  }

  menuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const checker = () => {
      if (this.props.isAuth === false) {
        const isfakeModal = () => {
          if (this.props.fakeModal === true) {
            return <div />;
          } else {
            return (
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open}
                onClose={this.handleClose}
              >
                <Fade in={this.props.open}>
                  <div style={getModalStyle()} className={classes.paper}>
                    <ModalLogin
                      onLoginClicked={this.handleLogin}
                      onClose={this.handleClose}
                    />
                  </div>
                </Fade>
              </Modal>
            );
          }
        };

        return (
          <div>
            {this.props.mobile ? (
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open}
                onClose={this.handleClose}
              >
                <Fade in={this.props.open}>
                  <div style={getModalStyle()} className={classes.paper}>
                    <ModalLogin
                      onLoginClicked={this.handleLogin}
                      onClose={this.handleClose}
                    />
                  </div>
                </Fade>
              </Modal>
            ) : (
              <div
                className={
                  this.props.otherPage
                    ? classes.modalContainerOther
                    : classes.modalContainer
                }
              >
                <Button
                  className={
                    this.props.otherPage
                      ? classNames(
                          classes.buttonTitle,
                          classes.buttonTitleLeftOther
                        )
                      : classes.buttonTitle
                  }
                  onClick={this.handleOpen}
                >
                  <div
                    className={
                      this.props.otherPage
                        ? classes.buttonTextOther
                        : classes.buttonText
                    }
                  >
                    Login
                  </div>
                </Button>
                <div
                  className={
                    this.props.otherPage
                      ? classes.buttonTextOther
                      : classes.buttonText
                  }
                >
                  |
                </div>
                <Button
                  className={
                    this.props.otherPage
                      ? classNames(
                          classes.buttonTitle,
                          classes.buttonTitleRightOther
                        )
                      : classes.buttonTitle
                  }
                >
                  <Link to={"/register"} style={{ color: "inherit" }}>
                    <div
                      className={
                        this.props.otherPage
                          ? classes.buttonTextOther
                          : classes.buttonText
                      }
                    >
                      Sign Up
                    </div>
                  </Link>
                </Button>
              </div>
            )}

            {isfakeModal()}
          </div>
        );
      } else {
        const { anchorEl } = this.state;
        return this.props.mobile ? (
          <div />
        ) : (
          <div
            style={{
              width: "100%",
              // marginLeft: "15px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Button
              className={classes.buttonTitle}
              aria-owns={anchorEl ? "simple-menu2" : null}
              onClick={this.menuClick}
            >
              My Account
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.menuClose}
              transformOrigin={{
                vertical: this.props.orginprops3,
                horizontal: this.props.orginprops4
              }}
              placement={"bottom-end"}
            >
              <Link to="/profile/recap">
                <MenuItem onClick={this.menuClose}>프로필보기</MenuItem>
              </Link>
              <MenuItem onClick={this.signoutHandler}>로그아웃</MenuItem>
            </Menu>
          </div>
        );
      }
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          whiteSpace: "nowrap",
          width: this.props.style,
          margin: "auto"
        }}
      >
        {checker()}
      </div>
    );
  }
}

AccountModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const AccountModalWrapped = withStyles(styles)(AccountModal);

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
