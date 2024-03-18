import React from "react";
import { withStyles } from "@material-ui/core/styles";

import profilePageStyle from "assets/jss/material-kit-react/views/landingPageSections/customProfile.jsx";

import { Button, IconButton, InputBase } from "@material-ui/core";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";

import EditPriceModal from "./SellingModal/EditPriceModal";

import axios from "axios";
import SoldModal from "./SellingModal/SoldModal";

let countDown;

class Selling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        selling: [],
        sold: []
      },
      shoeData: [],
      pageArray: [],
      currentPage: 1,
      maxPage: 1,
      selling: this.props.text,
      Model: 0,
      Price: 0,
      SentTime: 0,
      size: 0,
      profit: 0,
      newPrice: 0,
      modalOpen: false,
      soldModalOpen: false,
      soldSid: "",
      shoeToChange: null
    };
  }

  modalHandler = (bool, shoeData) => {
    if (this.state.newPrice === 0 || this.state.newPrice === "0") {
      alert("가격을 입력해주세요.");
    } else {
      this.setState({
        modalOpen: bool,
        shoeToChange: shoeData
      });
    }
  };

  componentWillMount() {
    axios
      .get("https://api.probe.gg/protected/user_selling", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg"
        }
      })
      .then(res => {
        this.setState({
          shoeData: res.data.data
        });
        let count = 1;

        count += parseInt(res.data.count / 5, 10);

        if (res.data.count % 5 === 0) {
          count--;
        }

        this.pageCounterHandler(count, 1);
        this.renderHelper(res.data.data);
      });
  }

  pageCounterHandler = (count, currentPage) => {
    const { classes } = this.props;

    let pageArray = [];
    for (let page = 0; page < count; page += 1) {
      pageArray = [
        ...pageArray,
        <div
          key={page}
          onClick={() => this.movePageHandler(count, page + 1)}
          className={
            currentPage === page + 1
              ? classes.activedPage
              : classes.clickablePage
          }
        >
          {page + 1}
        </div>
      ];
    }

    this.setState({
      pageArray: [...pageArray],
      currentPage: currentPage,
      maxPage: count
    });
  };

  movePageHandler = (count, currentPage) => {
    axios
      .get(
        "https://api.probe.gg/protected/user_selling_page?skip=" +
          (currentPage - 1),
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://probe.gg"
          }
        }
      )
      .then(res => {
        this.setState({
          shoeData: res.data.data
        });

        this.pageCounterHandler(count, currentPage);
        this.renderHelper(res.data.data);
      });
  };

  nextPageHandler = count => {
    //get info in here by axios
    axios
      .get(
        "https://api.probe.gg/protected/user_selling_page?skip=" +
          this.state.currentPage,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://probe.gg"
          }
        }
      )
      .then(res => {
        this.setState({
          shoeData: res.data.data
        });

        this.pageCounterHandler(count, this.state.currentPage + 1);
        this.renderHelper(res.data.data);
      });
  };

  prevPageHandler = count => {
    //get info in here by axios
    axios
      .get(
        "https://api.probe.gg/protected/user_selling_page?skip=" +
          (this.state.currentPage - 2),
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://probe.gg"
          }
        }
      )
      .then(res => {
        this.setState({
          shoeData: res.data.data
        });

        this.pageCounterHandler(count, this.state.currentPage - 1);
        this.renderHelper(res.data.data);
      });
  };

  editPriceHandler = id => {
    this.renderHelper(this.state.shoeData, id);
  };

  updatePriceHandler = (id, price, onSale) => {
    //Send post request in here
    if (this.state.newPrice !== 0) {
      let newShoeData = [...this.state.shoeData];
      let newPrice = this.state.newPrice * 1;

      if (this.state.newPrice.includes(",")) {
        newPrice = this.state.newPrice.replace(/,/g, "") * 1;
      }

      newShoeData.forEach(value => {
        if (value._id === id) {
          value.price = this.state.newPrice ? this.state.newPrice : price;
        }
      });

      this.setState({
        shoeData: [...newShoeData]
      });

      let update = onSale === 0 ? "changePrice" : "initializePrice";

      axios
        .post(
          "https://api.probe.gg/protected/" + update,
          {
            shoe: id,
            price: newPrice
          },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "https://probe.gg"
            }
          }
        )
        .then(response => {
          if (response.data) {
            if (response.data.error) {
              if (Number.isInteger(response.data.error)) {
                let buttonToDisabled = document.getElementById(id + "_button");

                let count = Math.floor((60000 - response.data.error) / 1000); // 6000 -
                buttonToDisabled.innerHTML = count;

                buttonToDisabled.disabled = true;
                let deadline = count;

                countDown = setInterval(() => {
                  let priceDiv = document.getElementById(id + "_price");
                  priceDiv.innerHTML = "₩" + price.toLocaleString();

                  deadline -= 1;

                  buttonToDisabled.innerHTML = deadline;

                  if (deadline < 0) {
                    this.setState({
                      newPrice: price
                    });
                    clearInterval(countDown);

                    countDown = false;

                    buttonToDisabled.disabled = false;
                    buttonToDisabled.innerHTML = "가격수정";
                  }
                }, 1000);
              }
            } else {
              let buttonToDisabled = document.getElementById(id + "_button");

              let count = 60;
              buttonToDisabled.innerHTML = count;

              buttonToDisabled.disabled = true;
              let deadline = count;

              countDown = setInterval(() => {
                // let priceDiv = document.getElementById(id + "_lowestPrice");
                // priceDiv.innerHTML = "₩" + price.toLocaleString();

                deadline -= 1;

                buttonToDisabled.innerHTML = deadline;

                if (deadline < 0) {
                  clearInterval(countDown);

                  countDown = false;

                  buttonToDisabled.disabled = false;
                  buttonToDisabled.innerHTML = "가격수정";
                }
              }, 1000);
            }
          }
          let onSuccessNewShoeData = [...newShoeData];

          onSuccessNewShoeData.forEach(value => {
            if (value._id === id && value.onSale === 1) {
              value.onSale = 0;
            }
          });

          this.setState({
            shoeData: onSuccessNewShoeData,
            modalOpen: false
          });

          this.renderHelper(onSuccessNewShoeData);
        })
        .catch(err => {
          this.renderHelper(newShoeData);
          alert(err);
        });
    } else if (this.state.newPrice <= 0) {
      alert("가격을 입력해주세요.");
    } else {
      alert("숫자를 입력해주세요.");
    }
  };

  componentWillUnmount() {
    if (countDown) {
      clearInterval(countDown);
    }
  }

  newPriceHandler = (event, price) => {
    let nf = new Intl.NumberFormat();

    if (Number.isInteger(event.target.value * 1)) {
      event.target.value = nf.format(event.target.value * 1);

      this.setState({
        newPrice: event.target.value
      });
    } else if (event.target.value.includes(",")) {
      let newPrice = event.target.value.replace(/,/g, "") * 1;
      event.target.value = nf.format(newPrice);

      this.setState({
        newPrice: event.target.value
      });
    } else {
      event.target.value = "";

      alert("숫자를 입력해주세요.");

      this.setState({
        newPrice: price ? price : 0
      });
    }
  };

  addTextField = shoeData => {
    const { classes } = this.props;
    if (shoeData.onSale === 1) {
      return (
        <Button
          onClick={() => this.editPriceHandler(shoeData._id)}
          className={classes.updateButton}
        >
          가격설정
        </Button>
        // </div>
      );
    } else if (shoeData.onSale === 0) {
      return (
        <Button
          onClick={() => this.editPriceHandler(shoeData._id)}
          className={classes.updateButton}
        >
          가격수정
        </Button>
        // </div>
      );
    } else {
      return null;
    }
  };

  renderHelper = (shoeData, editPrice) => {
    const { classes } = this.props;

    let sellingData = [];
    let soldData = [];
    shoeData.forEach(shoeData => {
      let sentTime = new Date(shoeData.sentTime);
      let mm = sentTime.getMonth() + 1;
      let dd = sentTime.getDate();
      let sentTimeDetail =
        sentTime.getHours() +
        ":" +
        sentTime.getMinutes() +
        ":" +
        sentTime.getSeconds();

      sentTime =
        sentTime.getFullYear() +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        (dd > 9 ? "" : "0") +
        dd;

      let item = (
        <div
          id={shoeData._id}
          key={shoeData._id}
          className={classes.shoeContainer}
        >
          <div className={classes.modelContainer}>
            <img
              src={shoeData.shoe[0].image[0]}
              className={classes.image}
              alt={shoeData._id}
            />
            <div className={classes.shoeModelContainer}>
              <div className={classes.brand}>{shoeData.shoe[0].brand}</div>
              <div className={classes.model}>
                {shoeData.shoe[0].name.split("|")[1]}
              </div>
            </div>
          </div>
          <div className={classes.details}>
            <div className={classes.detailHidden}>{shoeData.size}</div>
            {shoeData._id === editPrice ? (
              <div className={classes.price}>
                <InputBase
                  // onKeyDown={this.enterToUpdate}
                  onChange={event =>
                    this.newPriceHandler(event, shoeData.price)
                  }
                  placeholder={"₩" + shoeData.price.toLocaleString()}
                  classes={{
                    root:
                      this.state.nameState === "success"
                        ? classes.rootSuccess
                        : classes.root,
                    error: classes.error,
                    focused:
                      this.state.nameState === "success"
                        ? classes.focusedSuccess
                        : classes.priceFocused,
                    input: classes.priceInput
                  }}
                />
                <Button
                  disabled={false}
                  className={classes.updateButton}
                  id={shoeData._id + "_button"}
                  onClick={() => this.modalHandler(true, shoeData)}
                  classes={{
                    disabled: classes.updateDisbledButton
                  }}
                >
                  수정하기
                </Button>
              </div>
            ) : (
              <div className={classes.price}>
                <div
                  id={shoeData._id + "_price"}
                  style={
                    shoeData.price
                      ? { height: "32px", lineHeight: "32px" }
                      : { height: "0px" }
                  }
                >
                  {shoeData.price
                    ? "₩" + shoeData.price.toLocaleString()
                    : null}
                </div>
                {this.addTextField(shoeData)}
              </div>
            )}
            <div className={classes.profit} id={shoeData._id + "_lowestPrice"}>
              {shoeData.lowestPrice
                ? "₩" + shoeData.lowestPrice.toLocaleString()
                : "미정"}
            </div>
            <div className={classes.detailHidden}>
              <div className={classes.sentTime}>
                <div className={classes.timeLeft}>{sentTime}</div>
                <div className={classes.timeRight}>{sentTimeDetail}</div>
              </div>
              {/* <div className={classes.pid}>
                <div>제품번호</div>
                <div>{shoeData.ProductID}</div>
              </div> */}
            </div>
          </div>
        </div>
      );

      if (shoeData.onSale === 1) {
        sellingData = [...sellingData, item];
      }

      if (shoeData.onSale === 2) {
        item = (
          <Button
            className={classes.soldShoeButton}
            onClick={() => this.soldModalHandler(true, shoeData._id)}
            key={shoeData._id}
          >
            {item}
          </Button>
        );
        soldData = [...soldData, item];
      }

      if (shoeData.onSale === 0) {
        sellingData = [...sellingData, item];
      }
    });

    this.setState({
      data: {
        selling: sellingData,
        sold: soldData
      }
    });
  };

  soldModalHandler = (bool, sid) => {
    this.setState({
      soldModalOpen: bool,
      soldSid: sid
    });
  };

  ascendingOrderHandler = name => {
    if (this.state[name] === 1) {
      this.descendingOrderHandler(name);
    } else {
      let shoeData = this.state.shoeData;

      shoeData.sort((a, b) => (a[name] > b[name] ? 1 : -1));

      this.setState({
        Model: 0,
        Price: 0,
        SentTime: 0,
        profit: 0,
        size: 0,
        [name]: 1
      });

      this.renderHelper(shoeData);
    }
  };

  descendingOrderHandler = name => {
    if (this.state[name] === 2) {
      this.ascendingOrderHandler(name);
    } else {
      let shoeData = this.state.shoeData;

      shoeData.sort((a, b) => (a[name] < b[name] ? 1 : -1));

      this.setState({
        Model: 0,
        Price: 0,
        SentTime: 0,
        profit: 0,
        size: 0,
        [name]: 2
      });

      this.renderHelper(shoeData);
    }
  };

  tableNameHandler = name => {
    if (name === "selling") {
      if (!this.state.selling) {
        axios
          .get("https://api.probe.gg/protected/user_selling", {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "https://probe.gg"
            }
          })
          .then(res => {
            this.setState({
              shoeData: res.data.data,
              selling: true,
              Model: 1,
              Price: 0,
              SentTime: 0,
              profit: 0
            });
            this.renderHelper(res.data.data);
          });
      }
    } else {
      if (this.state.selling) {
        axios
          .get("https://api.probe.gg/protected/user_selling_complete", {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "https://probe.gg"
            }
          })
          .then(res => {
            this.setState({
              shoeData: res.data.data,
              selling: false,
              Model: 1,
              Price: 0,
              SentTime: 0,
              profit: 0
            });

            this.renderHelper(res.data.data);
          });
      }
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.selling}>
        <div className={classes.pageName}>SELLING</div>
        <div className={classes.table}>
          <div className={classes.tableName}>
            {this.props.text ? (
              <Button
                onClick={() => this.tableNameHandler("selling")}
                className={
                  this.state.selling ? classes.nameSelling : classes.nameSold
                }
              >
                판매중
              </Button>
            ) : null}

            {this.props.text ? (
              <div
                style={{
                  borderRight: "1px solid black",
                  height: "20px",
                  margin: "auto 0px"
                }}
              />
            ) : null}

            <Button
              onClick={() => this.tableNameHandler("bought")}
              className={
                this.state.selling ? classes.nameSold : classes.nameSelling
              }
            >
              판매완료
            </Button>
          </div>
          <div className={classes.tableHeader}>
            <div className={classes.headerContainer}>
              <div className={classes.headerName}>제품명</div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.Model === 0 || this.state.Model === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("Model")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.Model === 1
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.Model === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("Model")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.Model === 2
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
            <div className={classes.headerContainerHidden}>
              <div className={classes.headerName}>사이즈</div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.size === 0 || this.state.size === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("size")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.size === 1
                        ? classes.arrowsActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.size === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("size")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.size === 2
                        ? classes.arrowsActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
            <div className={classes.headerContainer}>
              <div className={classes.headerName}>판매 가격</div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.Price === 0 || this.state.Price === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("Price")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.Price === 1
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.Price === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("Price")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.Price === 2
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
            <div className={classes.headerContainerMobileHidden}>
              <div className={classes.headerName}>
                {this.state.selling ? "최저가" : "수익률"}
              </div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.profit === 0 || this.state.profit === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("profit")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.profit === 1
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.profit === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("profit")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.profit === 2
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
            <div
              className={classes.headerContainerHidden}
              style={{ borderRight: "0px" }}
            >
              <div className={classes.headerName}>
                {this.state.selling ? "등록 날짜" : "판매 날짜"}
              </div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.SentTime === 0 || this.state.SentTime === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("SentTime")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.SentTime === 1
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.SentTime === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("SentTime")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.SentTime === 2
                        ? classes.arrowsSellingActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
          </div>
          <EditPriceModal
            open={this.state.modalOpen}
            modalHandler={this.modalHandler}
            newPrice={this.state.newPrice}
            updatePriceHandler={this.updatePriceHandler}
            shoeData={this.state.shoeToChange}
          />
          <SoldModal
            open={this.state.soldModalOpen}
            modalHandler={this.soldModalHandler}
            sid={this.state.soldSid}
          />
          {this.state.selling ? (
            <div className={classes.sellingDummyContainer}>
              {this.state.data.selling.length ? (
                this.state.data.selling
              ) : (
                <div style={{ margin: "20px", textAlign: "center" }}>
                  판매중인 물품이 없습니다.
                </div>
              )}
            </div>
          ) : (
            <div className={classes.sellingDummyContainer}>
              {this.state.data.sold.length ? (
                this.state.data.sold
              ) : (
                <div style={{ margin: "20px", textAlign: "center" }}>
                  "판매중인 물품이 없습니다.
                </div>
              )}
            </div>
          )}
          <div className={classes.pageHandlerContainer}>
            <IconButton
              className={classes.pageButton}
              disabled={this.state.currentPage === 1}
              onClick={() => this.prevPageHandler(this.state.pageArray.length)}
            >
              <ChevronLeft />
            </IconButton>
            {this.state.pageArray}
            <IconButton
              className={classes.pageButton}
              disabled={this.state.currentPage === this.state.maxPage}
              onClick={() => this.nextPageHandler(this.state.pageArray.length)}
            >
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(Selling);
