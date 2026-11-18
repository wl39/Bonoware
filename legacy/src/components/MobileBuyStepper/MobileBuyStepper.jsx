import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
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
import axios from "axios";

import BootPay from "bootpay-js";
let script;
let steps;
class MobileBuyStepper extends React.Component {
  state = {
    activeStep: 0,
    postCode: "",
    address: "",
    detail: "",
    jeju: false,
    selectedValue: null,
    point: 0
  };
  componentWillUnmount() {
    document.body.removeChild(script);
  }

  componentWillMount() {
    let jQueryScript = document.createElement("script");
    jQueryScript.type = "text/javascript";
    jQueryScript.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    document.head.appendChild(jQueryScript);
    let IamPortScript = document.createElement("script");
    IamPortScript.type = "text/javascript";
    IamPortScript.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(IamPortScript);
    //IAMPORT

    script = document.createElement("script");

    script.src =
      "https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false";
    document.body.appendChild(script);

    steps = [
      {
        lable: "상품 확인"
      },
      {
        lable: "배송지 입력"
      },
      {
        lable: "결제 수단"
      }
    ];
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
                    this.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
                  } else {
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
          this.updatePostCode(data.zonecode);
          this.updateAddress(data.address);
          if (data.zonecode.substr(0, 2) === "63") {
            this.setState({
              jeju: true
            });
          } else {
            this.setState({
              jeju: false
            });
          }
          // console.log(this.props)
          // this.props.updateAddress(data.address)
        }
      });

      Postcode.open();
    });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

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

  updateDetail = event => {
    this.setState({
      detail: event.target.value
    });
  };

  checkCondition = activeStep => {
    if (activeStep === 1) {
      if (this.state.postCode && this.state.address && this.state.detail)
        return false;
      else return true;
    } else {
      return false;
    }
  };

  handleRadio = event => {
    this.setState({ selectedValue: event.target.value });
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

  stepperTest = activeStep => {
    const { classes } = this.props;
    switch (activeStep) {
      case 0:
        return (
          <div className={classes.textContainer}>
            <div>모델명: {this.props.model}</div>
            <div>사이즈: {this.props.size}</div>
            <div>가격: {this.props.price}</div>
          </div>
        );
      case 1:
        return (
          <div className={classes.inputContainer}>
            <div className={classes.postCodeContainer}>
              <Input
                id="postCode"
                placeholder="우편번호"
                className={classes.textField}
                value={this.state.postCode}
                disabled={true}
              />
              <Button onClick={this.openHandler}>주소 검색</Button>
            </div>
            <Input
              id="address"
              placeholder="주소"
              className={classes.textField}
              value={this.state.address}
              disabled={true}
            />
            <Input
              id="detail"
              placeholder="상세주소"
              className={classes.textField}
              value={this.state.detail}
              onChange={this.updateDetail}
            />
          </div>
        );
      case 2:
        return (
          <div
            style={{ display: "flex", padding: "10px", background: "white" }}
          >
            <FormControl
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
            </FormControl>
            <div>
              <div>
                <div>우편번호 - {this.state.postCode}</div>
                <div>주소 - {this.state.address}</div>
                <div>상세 주소 - {this.state.detail}</div>
                <div>모델명 - {this.props.model}</div>
                <div>사이즈 - {this.props.size}</div>
                <div>
                  가격 - {this.props.price} +{" "}
                  {this.state.jeju ? "배송비: 5000원" : "배송비: 2500원"}
                  <div>
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
              </div>
              {this.showButton()}
            </div>
          </div>
        );
      default:
        break;
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mobModalBuy}>
        <div className={classes.mobileLable}>
          {steps[this.state.activeStep].lable}
        </div>
        {this.stepperTest(this.state.activeStep)}
        {/* <div className={classes.mobileContent}>
          {steps[this.state.activeStep].content}
        </div> */}
        {/* <Input
              id="detail"
              placeholder="상세주소"
              className={classes.textField}
              value={this.state.detail}
              onChange={this.updateDetail}
            /> */}
        <MobileStepper
          variant="dots"
          steps={3}
          position="static"
          activeStep={this.state.activeStep}
          nextButton={
            this.state.activeStep === 2 ? (
              <Button size="small" onClick={this.props.onClose && this.zzzzz}>
                결제하기
              </Button>
            ) : (
              <Button
                size="small"
                onClick={this.handleNext}
                disabled={this.checkCondition(this.state.activeStep)}
              >
                다음
              </Button>
            )
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={this.state.activeStep === 0}
            >
              이전
            </Button>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authID: state.authID,
    attr: state.attr
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(buyStepperStyle)(MobileBuyStepper));
