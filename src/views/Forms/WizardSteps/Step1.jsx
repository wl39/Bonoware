import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import LockOutline from "@material-ui/icons/LockOutlined";
import ClickOutSideInput from "components/ClickOutSideInput/ClickOutSideInput";
import Checkbox from "@material-ui/core/Checkbox";
import CustomInput from "components/CustomInput/CustomInput.jsx";
// core components
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";

import React from "react";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  },
  root: {
    height: "50px",
    transition:
      "border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    paddingLeft: "10px",
    border: "1px solid #ebebeb",
    "&:hover": {
      border: "1px solid #a2a9af"
    }
  },
  rootSuccess: {
    height: "50px",
    transition:
      "border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    paddingLeft: "10px",
    border: "1px solid #95d097"
  },
  focused: {
    border: "2px solid black !important"
  },
  focusedSuccess: {
    border: "2px solid #3e8e41 !important"
  },
  error: {
    border: "1px solid #fe0229"
  },
  inputsContainer: {
    display: "flex",
    height: "330px",
    paddingBottom: "40px",
    borderBottom: "1px solid #b7b7b7",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  inputContainer: {
    position: "relative",
    display: "flex"
  },
  inputLabel: {
    width: "20%",
    height: "16px",
    fontSize: "16px",
    letterSpacing: "-0.8px",
    textAlign: "left",
    color: "#2a2a2a",
    lineHeight: "16px",
    margin: "auto 0px",
    position: "absolute",
    top: "17px",
    "@media (max-width: 599px)": {
      width: "18%",
      fontSize: "13px",
      height: "13px"
    }
  },
  inputWrapper: {
    width: "54.143%",
    margin: "0px auto",
    "@media (max-width: 992px)": {
      width: "72%",
      margin: "0px 10px 0px 20%"
    }
  },
  checkboxContainer: {
    display: "flex",
    padding: "10px 0px"
  },
  checkbox: {
    padding: "0px"
  },
  checkboxLabel: {
    fontSize: "16px",
    lineHeight: "16px",
    fontWeight: "200",
    letterSpacing: "-0.8px",
    margin: "auto 0px",
    paddingLeft: "15px"
  }
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameState: "",
      password: "",
      passwordState: "",
      passwordCheck: "",
      passwordCheckState: "",
      email: "",
      emailState: ""
    };
  }

  sendState() {
    return this.state;
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  verifyPw(value) {
    var emailRex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  verifyCheckPw(value, anystate) {
    var emailRex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/;
    if (emailRex.test(value) && anystate === value) {
      return true;
    }

    return false;
  }

  verifyName(value) {
    var nameRex = /^[가-힣]+$/;
    if (nameRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo, anystate) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "name":
        if (this.verifyName(event.target.value)) {
          if (event.target.value.length <= 1) {
            return false;
          } else {
            this.setState({ nameState: "success" });
          }
        } else {
          this.setState({ nameState: "error" });
        }
        break;
      case "password":
        if (this.verifyPw(event.target.value, stateNameEqualTo)) {
          this.setState({ passwordState: "success" });
        } else {
          this.setState({ passwordState: "error" });
        }
        break;
      case "passwordCheck":
        if (this.verifyCheckPw(event.target.value, anystate)) {
          this.setState({ passwordCheckState: "success" });
        } else {
          this.setState({ passwordCheckState: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.nameState === "success" &&
      this.state.passwordState === "success" &&
      this.state.passwordCheckState === "success" &&
      this.state.emailState === "success"
    ) {
      return true;
    } else {
      if (this.state.nameState !== "success") {
        this.setState({ nameState: "error" });
      }
      if (this.state.passwordState !== "success") {
        this.setState({ passwordState: "error" });
      }
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
      if (this.state.passwordState !== "success") {
        this.setState({ passwordState: "error" });
      }
    }
    return false;
  }

  changeToError = newName => {
    this.setState({ emailState: newName });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.inputsContainer}>
        <div>
          <ClickOutSideInput
            email={this.state.email}
            emailState={this.state.emailState}
            changeToError={this.changeToError.bind(this)}
          >
            <div className={classes.inputContainer}>
              <div className={classes.inputLabel}>이메일</div>
              <FormControl className={classes.inputWrapper}>
                <InputBase
                  type="text"
                  fullWidth
                  inputProps={{ autocomplete: "username" }}
                  error={this.state.emailState === "error"}
                  onChange={event => this.change(event, "email", "email")}
                  classes={{
                    root:
                      this.state.emailState === "success"
                        ? classes.rootSuccess
                        : classes.root,
                    error: classes.error,
                    focused:
                      this.state.emailState === "success"
                        ? classes.focusedSuccess
                        : classes.focused
                  }}
                />
                <div className={classes.checkboxContainer}>
                  <Checkbox
                    className={classes.checkbox}
                    color="default"
                    checked={true}
                  />
                  <div className={classes.checkboxLabel}>이메일 정보 수신</div>
                </div>
              </FormControl>
            </div>
            {/* <CustomInput 
              success={this.state.emailState === "success"}
              error={this.state.emailState === "error"}
              labelText={
                <span>
                  이메일 <small>(필수: 인증이 가능한 주소)</small>
                </span>
              }
              id="email"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "email",
                onChange: event => this.change(event, "email", "email"),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            /> */}
          </ClickOutSideInput>
        </div>

        <div className={classes.inputContainer}>
          <div className={classes.inputLabel}>비밀번호</div>
          <FormControl className={classes.inputWrapper}>
            <InputBase
              fullWidth
              error={this.state.passwordState === "error"}
              type="password"
              inputProps={{ autocomplete: "new-password" }}
              placeholder="8자리 이상, 대소문자, 숫자 조합"
              onChange={event => this.change(event, "password", "password", 8)}
              classes={{
                root:
                  this.state.passwordState === "success"
                    ? classes.rootSuccess
                    : classes.root,
                error: classes.error,
                focused:
                  this.state.passwordState === "success"
                    ? classes.focusedSuccess
                    : classes.focused
              }}
            />
          </FormControl>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.inputLabel}>비밀번호 확인</div>
          <FormControl className={classes.inputWrapper}>
            <InputBase
              fullWidth
              error={this.state.passwordCheckState === "error"}
              type="password"
              inputProps={{ autocomplete: "new-password" }}
              onChange={event =>
                this.change(
                  event,
                  "passwordCheck",
                  "passwordCheck",
                  8,
                  this.state.password
                )
              }
              classes={{
                root:
                  this.state.passwordCheckState === "success"
                    ? classes.rootSuccess
                    : classes.root,
                error: classes.error,
                focused:
                  this.state.passwordCheckState === "success"
                    ? classes.focusedSuccess
                    : classes.focused
              }}
            />
          </FormControl>
        </div>
        {/* <CustomInput
            success={this.state.passwordState === "success"}
            error={this.state.passwordState === "error"}
            labelText={
              <span>
                비밀번호 <small>(최소조건: 8자리 소문자,숫자 조합)</small>
              </span>
            }
            type="password"
            id="password"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              onChange: event => this.change(event, "password", "password", 8),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <LockOutline className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          /> */}

        {/* <CustomInput
            success={this.state.passwordCheckState === "success"}
            error={this.state.passwordCheckState === "error"}
            labelText={<span>비밀번호 확인</span>}
            type="password"
            id="password"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              onChange: event =>
                this.change(
                  event,
                  "passwordCheck",
                  "passwordCheck",
                  8,
                  this.state.password
                ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Icon className={classes.inputAdornmentIcon}>
                    done_outline
                  </Icon>
                </InputAdornment>
              )
            }}
          /> */}
        <div className={classes.inputContainer}>
          <div className={classes.inputLabel}>
            이름 <small>(한글)</small>
          </div>
          <FormControl className={classes.inputWrapper}>
            <InputBase
              fullWidth
              error={this.state.nameState === "error"}
              onChange={event => this.change(event, "name", "name")}
              classes={{
                root:
                  this.state.nameState === "success"
                    ? classes.rootSuccess
                    : classes.root,
                error: classes.error,
                focused:
                  this.state.nameState === "success"
                    ? classes.focusedSuccess
                    : classes.focused
              }}
            />
          </FormControl>
        </div>
        {/* <CustomInput
            success={this.state.nameState === "success"}
            error={this.state.nameState === "error"}
            labelText={
              <span>
                이름 <small>(필수: 한글)</small>
              </span>
            }
            id="name"
            formControlProps={{
              fulldivWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "name", "name"),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          /> */}
      </div>
    );
  }
}

export default withStyles(style)(Step1);
