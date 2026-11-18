import React from "react";
import settingsSection from "assets/jss/material-kit-react/views/landingPageSections/settingsSection.jsx";
import { withStyles } from "@material-ui/core/styles";
import dummy from "../../assets/img/shoeImages/dummy.jpeg";
import { connect } from "react-redux";

import { Button, FormControl, InputBase } from "@material-ui/core";
import ResetModal from "./SettingsModal/ResetModal";
import AddressModal from "./SettingsModal/AddressModal";
import AccountModal from "./SettingsModal/AccountModal";

import axios from "axios";

import * as actions from "store/actions/actions";

class NewReacp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resestOpen: false,
      addressOpen: false,
      accountOpen: false,
      editProfile: false,
      sizeAllowance: true,
      nickName: "",
      preferSize: "270",
      email: "",
      phone: "",
      address: "",
      detail: "",
      account: ""
    };
  }

  modalHandler = bool => {
    this.setState({
      resestOpen: bool
    });
  };

  addressModalHandler = bool => {
    this.setState({
      addressOpen: bool
    });
  };

  addressHandler = address => {
    this.setState({
      address: address
    });
  };

  accountModalHandler = bool => {
    this.setState({
      accountOpen: bool
    });
  };

  edit = () => {
    if (this.state.editProfile) {
      axios
        .post("https://api.probe.gg/protected/changeProfile_main", {
          shoe_size: this.state.preferSize
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          alert(err);
        });
    }
    this.setState({
      editProfile: this.state.sizeAllowance
        ? !this.state.editProfile
        : this.state.editProfile
    });
  };

  change = event => {
    let strNum = event.target.value.length;
    let strToNum = event.target.value * 1;

    if (
      Number.isInteger(strToNum) &&
      strNum === 3 &&
      (strToNum % 10 === 5 || strToNum % 10 === 0)
    ) {
      this.setState({
        preferSize: event.target.value,
        sizeAllowance: true
      });
    } else {
      this.setState({
        preferSize: event.target.value,
        sizeAllowance: false
      });
    }

    this.setState({
      preferSize: event.target.value
    });
  };

  componentWillMount() {
    this.setState({
      name: this.props.attr.name,
      address: this.props.attr.address,
      detail: this.props.attr.detail,
      email: this.props.attr.email,
      nickName: this.props.attr.nick_name,
      phone: this.props.attr.phone
    });
  }

  /*
    onClick -> to direct seller page
    onClick -> to direct prober page
    */

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.settings}>
        <div className={classes.settingsHeader}>계정 설정</div>
        <div className={classes.settingsContentContainer}>
          <div className={classes.settingContentHeader}>
            <div>프로필</div>
            <Button
              onClick={this.edit}
              className={
                this.state.editProfile
                  ? classes.editActived
                  : classes.editButton
              }
            >
              편집
            </Button>
          </div>
          <div className={classes.profileContentsContainer}>
            <div className={classes.contentsContainer}>
              <div className={classes.contentsHeader}>이름</div>
              <div className={classes.contents}>{this.state.name}</div>
            </div>
            <div className={classes.contentsContainer}>
              <div className={classes.contentsHeader}>신발 사이즈</div>
              {this.state.editProfile ? (
                <FormControl className={classes.inputWrapper}>
                  <InputBase
                    fullWidth
                    error={!this.state.sizeAllowance}
                    onChange={event => this.change(event)}
                    placeholder={this.state.preferSize}
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
              ) : (
                <div style={{ width: "50px" }} className={classes.contents}>
                  {this.state.preferSize}
                </div>
              )}
            </div>
            <div className={classes.contentsContainer}>
              <div className={classes.contentsHeader}>이메일</div>
              <div className={classes.contents}>{this.state.email}</div>
            </div>
            <div className={classes.contentsContainer}>
              <div className={classes.contentsHeader}>닉네임</div>
              <div className={classes.contentsLast}>{this.state.nickName}</div>
            </div>
          </div>
          <div className={classes.resetButtonContainer}>
            <div className={classes.contentsHeader}>비밀번호 초기화</div>
            <Button
              className={classes.resetButton}
              onClick={() => this.modalHandler(true)}
            >
              클릭하여 비밀번호 재설정하기
            </Button>
            <ResetModal
              email={this.state.email}
              open={this.state.resestOpen}
              modalHandler={this.modalHandler}
            />
          </div>
          <div className={classes.personalInfoContainer}>
            <div className={classes.shippingInfo}>
              <div className={classes.settingContentHeader}>
                <div>배송지 정보</div>
                <Button
                  className={classes.editButton}
                  onClick={() => this.addressModalHandler(true)}
                >
                  변경
                </Button>
                <AddressModal
                  open={this.state.addressOpen}
                  modalHandler={this.addressModalHandler}
                  addressHandler={this.addressHandler}
                />
              </div>
              <div className={classes.personalInfo}>
                {this.state.address
                  ? this.state.address
                  : "아직 배송지 정보가 없습니다."}
              </div>
            </div>
            <div className={classes.accountInfo}>
              <div className={classes.settingContentHeader}>
                <div>계좌 정보</div>
                <Button
                  className={classes.editButton}
                  onClick={() => this.accountModalHandler(true)}
                >
                  변경
                </Button>
                <AccountModal
                  open={this.state.accountOpen}
                  modalHandler={this.accountModalHandler}
                />
              </div>
              <div className={classes.personalInfo}>
                {this.state.account
                  ? this.state.account
                  : "아직 계좌 정보가 없습니다."}
              </div>
            </div>
          </div>
        </div>
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

export default connect(
  mapStateToProps,
  null
)(withStyles(settingsSection)(NewReacp));
