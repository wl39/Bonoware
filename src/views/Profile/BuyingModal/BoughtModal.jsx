import React from "react";
import boughtModal from "assets/jss/material-kit-react/views/landingPageSections/boughtModal.jsx";

import { withStyles } from "@material-ui/core/styles";
import { Modal, Fade, FormControl, InputBase, Button } from "@material-ui/core";
// import * as actions from "store/actions/actions";

// import axios from "axios";

function getModalStyle() {
  return {
    opacity: "1",
    display: "flex",
    flexDirection: "column"
  };
}

class BoughtModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderDate: "",
      orderNum: "",
      cardName: "",
      cardNum: "",
      payMethod: "",
      discount: 0,
      point: 0,
      shoePrice: 0,
      paid: 0,
      product: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    let shoeData = {};
    if (nextProps.shoeData) {
      shoeData = JSON.parse(nextProps.shoeData.paymentData);
      console.log(nextProps.shoeData);
      console.log(shoeData);
      this.setState({
        orderDate: shoeData.p_at.replace(/-/g, "."),
        orderNum: shoeData.tid,
        cardName: shoeData.card_name,
        cardNum: shoeData.card_no,
        payMethod: shoeData.pm,
        paid: shoeData.p,
        shoePrice: nextProps.shoeData.price,
        product: nextProps.shoeData.shoe[0]
      });
    }
  }

  handleOpen = () => {
    this.props.modalHandler(true, null);
  };

  handleClose = () => {
    this.props.modalHandler(false, null);
  };

  render() {
    const { classes } = this.props;

    return this.props.open ? (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.handleClose}
      >
        <Fade in={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <div className={classes.recpitContainer}>
              <div className={classes.orderContainer}>
                <div className={classes.order}>
                  <div className={classes.orderHeader}>주문일자</div>
                  <div className={classes.orderDate}>
                    {this.state.orderDate}
                  </div>
                </div>
                <div className={classes.divider} />
                <div className={classes.order}>
                  <div className={classes.orderHeader}>주문번호</div>
                  <div className={classes.orderDate}>{this.state.orderNum}</div>
                </div>
              </div>
              <Button
                className={classes.recpitButton}
                classes={{ label: classes.buttonLabel }}
              >
                영수증{"\n"}발급내역
              </Button>
            </div>
            <div className={classes.orderProductTable}>
              <div className={classes.orderDetailColumn}>
                <div className={classes.orderDetailHeader}>상품정보</div>
                <div className={classes.orderDetailHeaderHidden}>상품금액</div>
                <div className={classes.orderDetailHeaderHidden}>배송비</div>
                <div className={classes.orderDetailHeaderHidden}>진행상태</div>
              </div>
              <div className={classes.orderProductContainer}>
                <div className={classes.productImgWrapper}>
                  <img
                    src={this.state.product.image[0]}
                    alt={this.state.product.name}
                    className={classes.image}
                  />
                  <div className={classes.productModelWrapper}>
                    <div className={classes.brand}>
                      {this.state.product.brand}
                    </div>
                    <div className={classes.modelKR}>
                      {this.state.product.name.split("|")[1]}
                    </div>
                  </div>
                </div>
                <div className={classes.shoePrice}>
                  {"₩ " + this.state.shoePrice.toLocaleString()}
                </div>
                <div className={classes.deliveryFee}></div>
                <div className={classes.progStatus}></div>
              </div>
            </div>
            <div className={classes.personalDetail}>
              <div>
                <div className={classes.personalDetailHeader}>결제금액정보</div>
                <div className={classes.personalDetailContainer}>
                  <div className={classes.detailContainer}>
                    <div className={classes.detailHeader}>상품금액</div>
                    <div className={classes.detailValue}>
                      {"₩ " + this.state.shoePrice.toLocaleString()}
                    </div>
                  </div>
                  <div className={classes.detailContainer}>
                    <div className={classes.detailHeader}>할인금액</div>
                    <div className={classes.detailValue}>
                      {"₩ " + this.state.discount.toLocaleString()}
                    </div>
                  </div>
                  <div className={classes.detailContainer}>
                    <div className={classes.detailHeader}>포인트 결제액</div>
                    <div className={classes.detailValue}>
                      {this.state.point.toLocaleString()}
                    </div>
                  </div>
                  <div className={classes.detailContainer}>
                    <div className={classes.detailHeader}>결제방법</div>
                    <div className={classes.detailValue}>
                      <div className={classes.payMethod}>
                        {this.state.payMethod}
                      </div>
                      <div>
                        {this.state.cardName + " " + this.state.cardNum}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.paidBox}>
                  <div className={classes.paidHeader}>결제금액</div>
                  <div className={classes.paidDetail}>
                    {"₩ " + this.state.paid.toLocaleString()}
                  </div>
                </div>
              </div>
              <div>
                <div className={classes.personalDetailHeader}>배송지정보</div>
                <div className={classes.personalDetailContainer}>
                  <div className={classes.detailContainer}>
                    <div className={classes.detailHeader}>수령인</div>
                    <div></div>
                  </div>
                  <div className={classes.detailContainer}>
                    <div className={classes.detailHeader}>연락처</div>
                    <div></div>
                  </div>
                  <div className={classes.detailContainer}>
                    <div className={classes.detailHeader}>배송지</div>
                    <div></div>
                  </div>
                  <div className={classes.detailContainer}>
                    <div className={classes.detailHeader}>배송메모</div>
                    <div></div>
                  </div>
                </div>
                <div className={classes.orderInfoBox}>
                  <div className={classes.detailHeader}>주문자 정보</div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    ) : null;
  }
}

export default withStyles(boughtModal)(BoughtModal);
