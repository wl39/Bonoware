import Icon from "@material-ui/core/Icon";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomInputPhoneNumber from "components/CustomInputPhoneNumber/CustomInputPhoneNumber.jsx";
import { PropTypes } from "prop-types";
import React from "react";
import MaskedInput from "react-text-mask";
import ClickOutSideInput from "components/ClickOutSideInput/ClickOutsideNickName";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import { Button } from "@material-ui/core";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        "(",
        /[0]/,
        /[1]/,
        /[0-1]/,
        ")",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      placeholder="휴대폰 번호"
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};
let script;

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  stepContainer: {
    height: "420px",
    paddingBottom: "40px",
    borderBottom: "1px solid #b7b7b7",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
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
  rootDisabled: {
    height: "50px",
    paddingLeft: "10px",
    border: "1px solid #f2f2f2"
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
    top: "17px"
  },
  inputWrapper: {
    width: "54.143%",
    margin: "0px auto",
    "@media (max-width: 992px)": {
      width: "72%",
      margin: "0px 0px 0px 20%"
    }
  },
  addressInputWrapper: {
    width: "54.143%",
    margin: "0px auto",
    display: "flex",
    flexDirection: "column",
    height: "170px",
    justifyContent: "space-between",
    "@media (max-width: 992px)": {
      width: "45%",
      margin: "0px 20%"
    }
  },
  addressInputContainer: {
    position: "relative"
  },
  addressSearchButton: {
    position: "absolute",
    top: "0",
    left: "80%",
    width: "20%",
    height: "50px",
    padding: "0px",
    background: "white",
    color: "black",
    borderRadius: "0px",
    border: "1px solid black",
    fontWeight: "200",
    "@media (max-width: 992px)": {
      left: "72%"
    }
  },
  ...customSelectStyle
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postCode: "",
      address: "",
      address1: "",
      detail: "",
      postCodeState: "",
      addressState: "",
      phoneNumber: "010- asd   -    ",
      phoneNumberState: "",
      usingPhoneNumber: "",
      birthday: "1996-11-05",
      birthdayState: "",
      numberformat: "3440",
      nicknameState: "",
      nickname: ""
    };
  }

  componentWillMount() {
    let today = new Date();
    let mm = today.getMonth() + 1; // getMonth() is zero-based
    let dd = today.getDate();

    let newToday = [
      today.getFullYear() - 14,
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd
    ].join("-");
    this.setState({
      birthday: newToday
    });
  }

  componentDidMount() {
    script = document.createElement("script");

    script.src =
      "https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false";
    document.body.appendChild(script);
  }

  openHandler = () => {
    window.daum.postcode.load(() => {
      const Postcode = new window.daum.Postcode({
        oncomplete: data => {
          this.setState({
            postCode: data.zonecode,
            address1: data.address,
            postCodeState: "success"
          });
          // this.updatePostCode(data.zonecode);
          // this.updateAddress(data.address);
        }
      });

      Postcode.open(Postcode.wrap, {
        q: Postcode.defaultQuery,
        autoClose: Postcode.autoClose
      });
    });
  };

  componentWillUnmount() {
    document.body.removeChild(script);
  }

  updatePostCode = postcode => {
    this.setState({
      postCode: postcode
    });
  };

  updateAddress = address => {
    this.setState({
      address: address
    });
  };

  sendState() {
    return this.state;
  }

  verifyBirthday(date) {
    var bdayRex = /(\d{4})-(\d{2})-(\d{2})/;
    let today = new Date();
    //console.log(today.getFullYear())
    //console.log(today)
    //console.log(date)
    if (bdayRex.test(date)) {
      //console.log(date)
      //console.log("Bday Test Working")
      try {
        let year = parseInt(date.split("-")[0], 10);
        //console.log("year:" + year)
        if (year <= 1901 || year >= today.getFullYear()) {
          return false;
        } else {
          return true;
        }
      } catch (err) {
        console.log("err");
        return false;
      }
      return true;
    }

    return false;
  }

  verifyPhoneNumber(value) {
    try {
      let valueArray = value.split("-");
      let tester = false;
      for (let x = 0; x < 3; x++) {
        if (/^\d+$/.test(valueArray[x])) {
          tester = true;
        } else {
          return false;
        }
      }
      if (tester === true) {
        this.setState({
          usingPhoneNumber: valueArray[0] + valueArray[1] + valueArray[2]
        });
      }

      return tester;
    } catch (err) {
      return false;
    }
  }

  verifyName(value) {
    var nameRex = /^[가-힣]+$/;
    if (nameRex.test(value) && 1 < value.length < 8) {
      return true;
    }
    return false;
  }

  verifyNickName(value) {
    var nameRex = /^[가-힣]+$/;
    if (nameRex.test(value) && 1 < value.length < 8) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo, anystate) {
    switch (type) {
      case "phoneNumber":
        if (this.verifyPhoneNumber(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;

      case "nickname":
        if (this.verifyNickName(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "address":
        if (this.verifyName(event.target.value)) {
          return false;
        } else {
          this.setState({ addressState: "success" });
        }
        break;
      case "birthday":
        const bday = event.target.value;
        //console.log(bday);
        if (this.verifyBirthday(bday)) {
          this.setState({ birthdayState: "success" });
        } else {
          this.setState({ birthdayState: "error" });
        }
        break;
      default:
        break;
    }
    if (stateName !== "birthday") {
      this.setState({ [stateName]: event.target.value });
    } else {
      this.setState({ birthday: event.target.value });
    }
  }

  isValidated() {
    if (
      this.state.addressState === "success" &&
      this.state.birthdayState === "success" &&
      this.state.phoneNumberState === "success" &&
      this.state.postCodeState === "success" &&
      this.state.nicknameState === "success"
    ) {
      return true;
    } else {
      if (this.state.addressState !== "success") {
        this.setState({ addressState: "error" });
      }
      if (this.state.birthdayState !== "success") {
        this.setState({ birthdayState: "error" });
      }
      if (this.state.phoneNumberState !== "success") {
        this.setState({ phoneNumberState: "error" });
      }
      if (this.state.postCodeState !== "success") {
        this.setState({ postCodeState: "error" });
      }
      if (this.state.nicknameState !== "success") {
        this.setState({ nicknameState: "error" });
      }
      return false;
    }
  }

  changeToError = newName => {
    this.setState({ nicknameState: newName });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.stepContainer}>
        <div>
          <ClickOutSideInput
            nickname={this.state.nickname}
            nicknameState={this.state.nicknameState}
            changeToError={this.changeToError.bind(this)}
          >
            <div className={classes.inputContainer}>
              <div className={classes.inputLabel}>
                닉네임 <small>(한글)</small>
              </div>
              <FormControl className={classes.inputWrapper}>
                <InputBase
                  fullWidth
                  error={this.state.nicknameState === "error"}
                  onChange={event => this.change(event, "nickname", "nickname")}
                  classes={{
                    root:
                      this.state.nicknameState === "success"
                        ? classes.rootDisabled
                        : classes.root,
                    error: classes.error,
                    focused:
                      this.state.nicknameState === "success"
                        ? classes.focusedSuccess
                        : classes.focused
                  }}
                />
              </FormControl>
            </div>
          </ClickOutSideInput>
        </div>

        <div className={classes.addressInputContainer}>
          <div className={classes.inputContainer}>
            <div className={classes.inputLabel}>주소</div>
            <FormControl className={classes.addressInputWrapper}>
              <InputBase
                fullWidth
                disabled={true}
                error={this.state.postCodeState === "error"}
                value={this.state.postCode}
                classes={{
                  root: classes.rootDisabled,

                  error: classes.error
                }}
              />
              <InputBase
                fullWidth
                error={this.state.postCodeState === "error"}
                placeholder="기본 주소"
                disabled={true}
                value={this.state.address1}
                classes={{
                  root: classes.rootDisabled,

                  error: classes.error
                }}
              />
              <InputBase
                fullWidth
                error={this.state.addressState === "error"}
                placeholder="상세 주소"
                onChange={event => this.change(event, "address", "address")}
                classes={{
                  root:
                    this.state.addressState === "success"
                      ? classes.rootSuccess
                      : classes.root,
                  error: classes.error,
                  focused:
                    this.state.addressState === "success"
                      ? classes.focusedSuccess
                      : classes.focused
                }}
              />
            </FormControl>
          </div>
          <Button
            className={classes.addressSearchButton}
            onClick={this.openHandler}
          >
            우편번호 검색
          </Button>
        </div>

        <div>
          <div className={classes.inputContainer}>
            <div className={classes.inputLabel}>생년월일</div>
            <FormControl className={classes.inputWrapper}>
              <InputBase
                fullWidth
                type="date"
                error={this.state.birthdayState === "error"}
                onChange={event => this.change(event, "birthday", "birthday")}
                classes={{
                  root:
                    this.state.birthdayState === "success"
                      ? classes.rootSuccess
                      : classes.root,
                  error: classes.error,
                  focused:
                    this.state.birthdayState === "success"
                      ? classes.focusedSuccess
                      : classes.focused
                }}
              />
            </FormControl>
          </div>
        </div>

        <div>
          <div className={classes.inputContainer}>
            <div className={classes.inputLabel}>휴대전화 번호</div>
            <FormControl className={classes.inputWrapper}>
              <InputBase
                fullWidth
                error={this.state.phoneNumberState === "error"}
                onChange={event =>
                  this.change(event, "phoneNumber", "phoneNumber")
                }
                classes={{
                  root:
                    this.state.phoneNumberState === "success"
                      ? classes.rootSuccess
                      : classes.root,
                  error: classes.error,
                  focused:
                    this.state.phoneNumberState === "success"
                      ? classes.focusedSuccess
                      : classes.focused
                }}
              />
            </FormControl>
          </div>
          {/* <CustomInputPhoneNumber
            success={this.state.phoneNumberState === "success"}
            error={this.state.phoneNumberState === "error"}
            labelText={<span>휴대폰 번호</span>}
            type="number"
            id="number"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.phoneNumber,
              onChange: event =>
                this.change(event, "phoneNumber", "phoneNumber"),
              endAdornment: <Icon>phone_in_talk</Icon>
            }}
          /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Step2);
