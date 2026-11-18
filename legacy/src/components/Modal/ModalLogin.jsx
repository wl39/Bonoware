import IconButton from "@material-ui/core/IconButton";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import Close from "@material-ui/icons/Close";
// @material-ui/icons
import loginPageStyle from "assets/jss/material-kit-react/views/loginPageTest.jsx";
import classNames from "classnames";
// core components

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "store/actions/actions";
import { Checkbox, FormControlLabel, Button } from "@material-ui/core";

import FindAccountModal from "./FindAccountModal/FindAccountModal";
import FindPasswordModal from "./FindPasswordModal/FindPasswordModal";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      accountModal: false,
      passwordModal: false
    };
  }

  idHandler = event => {
    const value = event.target.value;
    this.props.getId(value);
  };

  pwHandler = event => {
    const value = event.target.value;
    this.props.getPw(value);
  };

  accountModalHandler = bool => {
    this.setState({
      accountModal: bool
    });
  };

  passwordModalHandler = bool => {
    this.setState({
      passwordModal: bool
    });
  };

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      150
    );
  }

  login = event => {
    if (event.key === "Enter") {
      this.props.onLoginClicked();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <IconButton
          className={
            this.state.accountModal || this.state.passwordModal
              ? classes.hideIcon
              : classes.modalCloseButton
          }
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={this.props.onClose}
        >
          <Close style={{ fontSize: "40px" }} />
        </IconButton>
        <div className={classes[this.state.cardAnimaton]}>
          <div className={classes.inputContainerWrapper}>
            <div className={classes.inputContainer}>
              <div className={classes.inputHeader}>이메일</div>
              <FormControl className={classes.inputArea}>
                <InputBase
                  onChange={this.idHandler}
                  fullWidth
                  classes={{
                    root: classes.root,
                    focused: classes.focused
                  }}
                  type="text"
                  name="username"
                  autoComplete="username"
                />
              </FormControl>
            </div>
            <div className={classes.inputContainer}>
              <div className={classes.inputHeader}>비밀번호</div>
              <FormControl className={classes.inputArea}>
                <InputBase
                  onKeyDown={this.login}
                  onChange={this.pwHandler}
                  fullWidth
                  type="password"
                  classes={{
                    root: classes.root,
                    focused: classes.focused
                  }}
                />
              </FormControl>
            </div>

            <div
              style={{ textAlign: "center", color: "red", fontWeight: "300" }}
            >
              {this.props.errorMessage}
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <FormControlLabel
              classes={{
                root: classes.formControlLabel
              }}
              control={
                <Checkbox
                  // checked={this.props.mostPopular}
                  // onClick={this.props.setSort("mostPopular")}
                  // value="mostPopular"
                  // color="default"
                  classes={{
                    root: classes.checkbox
                  }}
                  color="default"
                />
              }
              label="아이디 저장"
            />
            <FormControlLabel
              classes={{
                root: classes.formControlLabel
              }}
              control={
                <Checkbox
                  // checked={this.props.mostPopular}
                  // onClick={this.props.setSort("mostPopular")}
                  // value="mostPopular"
                  // color="default"
                  classes={{
                    root: classes.checkbox
                  }}
                  color="default"
                />
              }
              label="비밀번호 저장"
            />
          </div>
          <div className={classes.cardFooter}>
            <Button
              className={classes.loginButton}
              onClick={this.props.onLoginClicked}
              classes={{
                label: classes.loginButtonLabel
              }}
            >
              로그인
            </Button>
            <Link to="/register" className={classes.link}>
              <Button
                className={classes.signInButton}
                onClick={this.props.onClose}
                classes={{
                  label: classes.signInButtonLabel
                }}
              >
                회원가입
              </Button>
            </Link>
          </div>
          <div className={classes.searchContainer}>
            <div
              className={classes.idSearch}
              onClick={() => this.accountModalHandler(true)}
            >
              아이디 찾기
            </div>
            <div
              className={classes.pwSearch}
              onClick={() => this.passwordModalHandler(true)}
              to="/"
            >
              비밀번호 찾기
            </div>
          </div>
        </div>
        <FindAccountModal
          open={this.state.accountModal}
          modalHandler={this.accountModalHandler}
        />
        <FindPasswordModal
          open={this.state.passwordModal}
          modalHandler={this.passwordModalHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuthenticated,
    reduxUserName: state.userName,
    errorMessage: state.error
  };
};
const mapDispatchToProps = {
  authUser: actions.authUser,
  getUser: actions.getUser,
  getId: actions.getId,
  getPw: actions.getPw
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(loginPageStyle)(LoginPage));
