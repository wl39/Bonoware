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

  componentDidMount() {
    script = document.createElement("script");

    script.src =
      "https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false";
    document.body.appendChild(script);

    //IAM PORT
    let jQueryScript = document.createElement("script");
    jQueryScript.type = "text/javascript";
    jQueryScript.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    document.head.appendChild(jQueryScript);
    let IamPortScript = document.createElement("script");
    IamPortScript.type = "text/javascript";
    IamPortScript.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(IamPortScript);
  }

  zzzzz = () => {
    let str = this.props.price;
    let shippingPrice;
    str = str.replace(/,/g, "");
    if (this.state.jeju) {
      str = parseInt(str, 10) + 5000;
      shippingPrice = 5000;
    } else {
      str = parseInt(str, 10) + 2500;
      shippingPrice = 2500;
    }

    axios
      .post(
        "https://api.probe.gg/protected/buy",
        {
          shoe: this.props.sid,
          shoeSize: this.props.size,
          shoePrice: parseInt(this.props.price.replace(/,/g, ""), 10),
          point: 0,
          coupon: [],
          shippingPrice: shippingPrice * 1,
          address: this.state.address,
          postCode: this.state.postCode,
          totalPrice:
            parseInt(this.props.price.replace(/,/g, ""), 10) +
            shippingPrice * 1 +
            this.state.point * 1
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://probe.gg"
          }
        }
      )
      .then(response => {
        console.log(response);
        console.log(response.data.user_info);
        if (response.data.merchant_id && response.data.totalPrice) {
          //실제 복사하여 사용시에는 모든 주석을 지운 후 사용하세요
          BootPay.request({
            price: response.data.totalPrice, //실제 결제되는 가격
            application_id: "5d0feb12396fa67ca2bd0c5e",
            name: "프로브", //결제창에서 보여질 이름
            pg: "danal",
            method: "", //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
            show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
            items: [
              {
                item_name: "나는 아이템", //상품명
                qty: 1, //수량
                unique: "123", //해당 상품을 구분짓는 primary key
                price: response.data.totalPrice //상품 단가
              }
            ],
            user_info: {
              username: response.data.user_info.username,
              email: response.data.user_info.email,
              addr: this.state.address,
              phone: response.data.user_info.phone
            },
            extra: {
              quota: "[1,2,3]"
            },
            order_id: response.data.merchant_id //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
            // params: { callback1: '그대로 콜백받을 변수 1', callback2: '그대로 콜백받을 변수 2', customvar1234: '변수명도 마음대로' },
          })
            .error(function(data) {
              //결제 진행시 에러가 발생하면 수행됩니다.
              console.log(data);
            })
            .cancel(function(data) {
              //결제가 취소되면 수행됩니다.
              console.log(data);
            })
            .ready(function(data) {
              // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
              console.log(data);
            })
            .confirm(function(data) {
              //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
              //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
              console.log(response.data);
              console.log(data);
              alert("Check process");
              axios
                .post(
                  "https://api.probe.gg/protected/confirm_buy",
                  {
                    transaction: response.data.merchant_id,
                    totalPrice: response.data.totalPrice,
                    receipt_id: data.receipt_id
                  },
                  {
                    withCredentials: true,
                    headers: {
                      "Access-Control-Allow-Origin": "https://probe.gg"
                    }
                  }
                )
                .then(response => {
                  console.log(response.data);
                  if (response.data.confirm) {
                    console.log("confirmed");
                    this.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
                  } else {
                    console.log("not confirmed");
                    this.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
                  }
                });
            })
            .close(function(data) {
              // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
              alert("ok");
            })
            .done(function(data) {
              //결제가 정상적으로 완료되면 수행됩니다
              //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
              alert("completed");
              console.log(data);
            });
        } else {
          //로그인 또는 서버 터짐 또는 오류
        }
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  };

  openHandler = () => {
    window.daum.postcode.load(() => {
      const Postcode = new window.daum.Postcode({
        oncomplete: data => {
          this.setState({
            postCode: data.zonecode,
            address: data.address
          });
          // this.updatePostCode(data.zonecode);
          // this.updateAddress(data.address);
          if (data.zonecode.substr(0, 2) === "63") {
            this.setState({
              jeju: true
            });
          } else {
            this.setState({
              jeju: false
            });
          }
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
                  {this.state.jeju ? "배송비: 5000원" : "배송비: 2500원"}
                </div>
                <div className={classes.recapContents}>
                  {this.state.jeju
                    ? (
                        this.props.price.replace(/\D/g, "") * 1 +
                        5000
                      ).toLocaleString() + "원"
                    : (
                        this.props.price.replace(/\D/g, "") * 1 +
                        2500
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
                  >
                    결제하기
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
