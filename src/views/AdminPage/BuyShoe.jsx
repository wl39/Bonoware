import React, { Component } from "react";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Auth } from "aws-amplify";
import DynamoDB from "aws-sdk/clients/dynamodb";

import * as AWS from "aws-sdk";

import ShortUniqueId from "short-unique-id";
import axios from "axios";

import BootPay from "bootpay-js";

class BuyShoe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoeName: "",
      shoeSize: "",
      shoePrice: 2500,
      point: 0,
      address: "주소주소주소주소주소",
      postCode: "00157",
      totalPrice: 0
    };
  }

  componentDidMount() {}

  shoeName = event => {
    this.setState({
      shoeName: event.target.value
    });
  };
  shoeSize = event => {
    this.setState({
      shoeSize: event.target.value
    });
  };
  shoePrice = event => {
    this.setState({
      shoePrice: event.target.value
    });
  };
  postCode = event => {
    this.setState({
      postCode: event.target.value
    });
  };

  zzzzz = event => {
    axios
      .post(
        "https://api.probe.gg/protected/buy",
        {
          shoe: this.state.shoeName,
          shoeSize: this.state.shoeSize * 1,
          shoePrice: this.state.shoePrice * 1,
          point: 0,
          coupon: [],
          shippingPrice: 2500,
          address: this.state.address,
          postCode: this.state.postCode,
          totalPrice: this.state.shoePrice * 1 + 2500 * 1 + this.state.point * 1
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://probe.gg"
          }
        }
      )
      .then(response => {
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
            order_id: response.data.merchant_id, //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.,
            extra: {
              quota: "[1,2,3]"
            }
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
              console.log(response.data.price);
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

  render() {
    return (
      <div>
        <br />
        <TextField
          label="Shoe ID"
          type="text"
          onChange={this.shoeName}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField
          label="Shoe Size"
          type="text"
          onChange={this.shoeSize}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <TextField
          label="Shoe Price"
          type="text"
          onChange={this.shoePrice}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label="post Code"
          type="text"
          onChange={this.postCode}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />

        <Button onClick={this.zzzzz}>Buy Shoe</Button>
      </div>
    );
  }
}

export default BuyShoe;
