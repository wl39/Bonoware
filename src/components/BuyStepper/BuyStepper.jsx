import React from "react";
import Confetti from "react-dom-confetti";

import withStyles from "@material-ui/core/styles/withStyles";
import StepConnector from "@material-ui/core/StepConnector";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import ShortUniqueId from "short-unique-id";
import buyStepperStyle from "assets/jss/material-kit-react/components/buyStepperStyle.jsx";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Done } from "@material-ui/icons";
import { InputBase } from "@material-ui/core";

import axios from "axios";

import BootPay from "bootpay-js";

const getSteps = () => {
  return ["상품 확인", "배송지 입력", "결제 수단"];
};

const confetti = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 50,
  decay: 0.9
};

let script;
class BuyStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      step1: false,
      step2: false,
      finish: false,
      postCode: "",
      address: "",
      detail: "",
      test: null,
      selectedValue: null,
      redirect: false,
      msg: null,
      jeju: false,
      point: 0
    };
  }

  componentDidMount() {}

  zzzzz = async () => {
    if (this.state.pending) return;
    this.setState({pending: true});
    try {
      const response = await axios.post("https://api.probe.gg/protected/buy", {shoe: this.props.sid, shoeSize: this.props.size, address: this.state.address + " " + this.state.detail});
      this.setState({redirect: true, msg: "모의 주문이 완료되었습니다. 실제 결제나 배송은 발생하지 않습니다. 주문 번호: " + response.data.id});
    } catch (error) { alert(error.response?.data?.message || "주문하지 못했습니다."); }
    finally { this.setState({pending:false}); }
  };

  openHandler = () => {
    this.setState({postCode: "00000", address: "서울시 가상구 프로브로 123", jeju:false});
  };

  componentWillUnmount() {}

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

  handleRadio = event => {
    this.setState({ selectedValue: event.target.value });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handlePostCode = () => {
    this.setState({
      postCode: "10102"
    });
  };

  compelete = () => {
    this.setState({
      finish: !this.state.finish
    });
  };

  getStepContent = stepIndex => {
    const { classes } = this.props;
    let splitModel = this.props.model.split("|");

    switch (stepIndex) {
      case 0:
        return (
          <div className={classes.textContainer}>
            <div className={classes.modelContainer}>
              <div className={classes.itemHeader}>모델명</div>
              <div className={classes.modelNameContainer}>
                <div className={classes.modelEn}>{splitModel[0]}</div>
                <div className={classes.modelKr}>{splitModel[1]}</div>
              </div>
            </div>
            <div>
              <div className={classes.sizeContainer}>
                <div className={classes.itemHeader}>사이즈</div>
                <div className={classes.size}>{this.props.size}</div>
              </div>
            </div>
            <div>
              <div className={classes.priceContainer}>
                <div className={classes.itemHeader}>가격</div>
                <div className={classes.price}>₩ {this.props.price}</div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={classes.inputContainer}>
            <div className={classes.postCodeContainer}>
              <div className={classes.inputLabel}>주소</div>
              <div className={classes.inputWrapper}>
                <InputBase
                  fullWidth
                  disabled={true}
                  value={this.state.postCode}
                  classes={{
                    root: classes.rootDisabled,
                    error: classes.error
                  }}
                />
                <InputBase
                  fullWidth
                  placeholder="기본 주소"
                  disabled={true}
                  value={this.state.address}
                  classes={{
                    root: classes.rootDisabled,
                    error: classes.error
                  }}
                />
                <InputBase
                  fullWidth
                  placeholder="상세 주소"
                  value={this.state.detail}
                  onChange={this.handleChange("detail")}
                  classes={{
                    root: classes.root,
                    // error: classes.error,
                    focused: classes.focused
                  }}
                />
              </div>
              {/* <Input
                id="postCode"
                placeholder="우편번호"
                className={classes.textField}
                value={this.state.postCode}
                // onChange={this.handleChange("postCode")}
                disabled={true}
              /> */}
              <Button
                className={classes.addressSearchButton}
                onClick={this.openHandler}
              >
                주소 검색
              </Button>
            </div>
            {/* <Input
              id="address"
              placeholder="기본 주소"
              className={classes.textField}
              value={this.state.address}
              // onChange={this.handleChange("postCode")}
              disabled={true}
            />
            <Input
              id="detail"
              placeholder="상세 주소"
              className={classes.textField}
              value={this.state.detail}
              onChange={this.handleChange("detail")}
            /> */}
          </div>
        );
      case 2:
        return (
          <div style={{ display: "flex" }}>
            {/* <FormControl
              component="fieldset"
              className={classes.radioContainer}
            >
              <FormLabel component="legend">결제 수단</FormLabel>
              <RadioGroup
                name="pay-method"
                value={this.state.selectedValue}
                onChange={this.handleRadio}
              >
                <FormControlLabel
                  value="card"
                  control={<Radio color="primary" />}
                  label="카드결제"
                />
                <FormControlLabel
                  value="vbank"
                  control={<Radio color="primary" />}
                  label="가상계좌"
                />
                <FormControlLabel
                  value="phone"
                  control={<Radio color="primary" />}
                  label="핸드폰 결제"
                />
                <FormControlLabel
                  value="trans"
                  control={<Radio color="primary" />}
                  label="실시간계좌이체"
                />
              </RadioGroup>
            </FormControl> */}
            <div>
              <div className={classes.recapHeader}>요약</div>
              <div className={classes.recapContainer}>
                <div className={classes.recapContents}>
                  우편번호 - {this.state.postCode}
                </div>
                <div className={classes.recapContents}>
                  주소 - {this.state.address}
                </div>
                <div className={classes.recapContents}>
                  상세 주소 - {this.state.detail}
                </div>
                <div className={classes.recapContents}>
                  모델명 - {this.props.model}
                </div>
                <div className={classes.recapContents}>
                  사이즈 - {this.props.size}
                </div>
                <div className={classes.recapContents}>
                  가격 - {this.props.price} +{" "}
                  {this.state.jeju ? "모의 배송비: 3000원" : "모의 배송비: 3000원"}
                </div>
                <div className={classes.recapContents}>
                  {this.state.jeju
                    ? (
                        this.props.price.replace(/\D/g, "") * 1 +
                        3000
                      ).toLocaleString() + "원"
                    : (
                        this.props.price.replace(/\D/g, "") * 1 +
                        3000
                      ).toLocaleString() + "원"}
                </div>
              </div>
              {this.showButton()}
              <div className={classes.confetti}>
                <Confetti active={this.state.finish} config={confetti} />
              </div>
            </div>
          </div>
        );
      default:
        return "잘못된 경로입니다.";
    }
  };

  showButton = () => {
    switch (this.state.selectedValue) {
      case "card":
        return <Button onClick={this.compelete}>카드결제</Button>;
      case "account":
        return <Button>가상계좌</Button>;
      case "phone":
        return <Button>핸드폰 결제</Button>;
      case "kakao":
        return <Button>카카오페이</Button>;
      default:
        return;
    }
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  checkCondition = activeStep => {
    if (activeStep === 1) {
      if (this.state.postCode && this.state.detail) return false;
      else return true;
    } else {
      return false;
    }
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/payments/complete",
            state: { msg: this.state.msg, verified: true }
          }}
        />
      );
    }
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <div className={classes.webModalBuy} tabIndex="-1">
        <Stepper
          activeStep={activeStep}
          classes={{
            alternativeLabel: classes.stepper
          }}
          alternativeLabel
          connector={
            <StepConnector
              classes={{
                active: classes.connectorActive,
                completed: classes.connectorCompleted,
                disabled: classes.connectorDisabled,
                line: classes.connectorLine,
                alternativeLabel: classes.alternativeLabel
              }}
            />
          }
        >
          {steps.map((label, index) => {
            return (
              <Step
                key={label}
                classes={{
                  horizontal: classes.stepTest
                }}
              >
                <StepLabel
                  classes={{
                    alternativeLabel:
                      this.state.activeStep === index
                        ? classes.stepLabelActive
                        : this.state.activeStep < index
                        ? classes.stepLabelDisable
                        : classes.stepLabelComplete
                  }}
                  icon={
                    <div
                      className={
                        this.state.activeStep === index
                          ? classes.stepIconActive
                          : this.state.activeStep < index
                          ? classes.stepIconDisable
                          : classes.stepIconComplete
                      }
                    >
                      {this.state.activeStep > index ? (
                        <Done style={{ margin: "auto" }} />
                      ) : (
                        "0" + (index + 1)
                      )}
                    </div>
                  }
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <div className={classes.instructions}>주문이 완료 되었습니다</div>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>
                {this.getStepContent(activeStep)}
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.prev}
                >
                  이전
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    disabled={this.checkCondition(activeStep)}
                    variant="contained"
                    className={classes.next}
                    onClick={this.zzzzz}
                    disabled={Boolean(this.state.pending)}
                  >
                    모의 주문하기
                  </Button>
                ) : (
                  <Button
                    disabled={this.checkCondition(activeStep)}
                    variant="contained"
                    className={classes.next}
                    onClick={this.handleNext}
                  >
                    다음
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userName,
    attr: state.attr
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(buyStepperStyle)(BuyStepper));
