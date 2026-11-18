import { withStyles } from "@material-ui/core/styles";
import profilePageStyle from "assets/jss/material-kit-react/views/landingPageSections/customProfile.jsx";
import axios from "axios";
import React from "react";
import { Button, IconButton } from "@material-ui/core";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";

import BoughtModal from "./BuyingModal/BoughtModal";

class Buying extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoeData: [],
      data: { buying: [], bought: [] },
      pageArray: [],
      currentPage: 1,
      maxPage: 2,
      buying: true,
      name: 0,
      size: 0,
      price: 0,
      date: 0,
      profit: 0,
      buyingModalOpen: false,
      buyingShoeData: null
    };
  }

  componentWillMount() {
    axios
      .get("https://api.probe.gg/protected/user_buying", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg"
        }
      })
      .then(res => {
        this.setState({
          shoeData: res.data.data
        });
        console.log(res.data.count);
        this.pageCounterHandler(2, res.data.count);
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
      currentPage: currentPage
    });
  };

  movePageHandler = (count, currentPage) => {
    //get info in here by axios

    this.pageCounterHandler(count, currentPage);
  };

  nextPageHandler = count => {
    //get info in here by axios
    this.pageCounterHandler(count, this.state.currentPage + 1);
  };

  prevPageHandler = count => {
    //get info in here by axios

    this.pageCounterHandler(count, this.state.currentPage - 1);
  };

  renderHelper = shoeData => {
    const { classes } = this.props;

    let buyingData = [];

    shoeData.forEach(shoeData => {
      let sentTime = new Date(shoeData.time);
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
        <Button
          className={classes.soldShoeButton}
          key={shoeData._id}
          onClick={() => this.buyingModalHandler(true, shoeData)}
        >
          <div id={shoeData._id} className={classes.shoeContainer}>
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

              <div className={classes.price}>{shoeData.price}</div>
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
              <div className={classes.profit}>35%</div>
            </div>
          </div>
        </Button>
      );
      buyingData = [...buyingData, item];
    });

    this.setState({
      data: {
        buying: buyingData
      }
    });
  };

  buyingModalHandler = (bool, sid) => {
    this.setState({
      buyingModalOpen: bool,
      buyingShoeData: sid
    });
  };

  ascendingOrderHandler = name => {
    if (this.state[name] === 1) {
      this.descendingOrderHandler(name);
    } else {
      let shoeData = this.state.shoeData;

      shoeData.sort((a, b) => (a[name] > b[name] ? 1 : -1));

      this.setState({
        name: 0,
        price: 0,
        date: 0,
        profit: 0,
        size: 0,
        [name]: 1
      });

      // this.renderHelper(shoeData);
    }
  };

  descendingOrderHandler = name => {
    if (this.state[name] === 2) {
      this.ascendingOrderHandler(name);
    } else {
      let shoeData = this.state.shoeData;

      shoeData.sort((a, b) => (a[name] < b[name] ? 1 : -1));

      this.setState({
        name: 0,
        price: 0,
        date: 0,
        profit: 0,
        size: 0,
        [name]: 2
      });

      // this.renderHelper(shoeData);
    }
  };

  tableNameHandler = name => {
    name === "buying"
      ? this.setState({
          buying: true,
          name: 1,
          price: 0,
          date: 0,
          size: 0,
          profit: 0
        })
      : this.setState({
          buying: false,
          name: 1,
          price: 0,
          date: 0,
          size: 0,
          profit: 0
        });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.buying}>
        <div className={classes.pageName}>BUYING</div>
        <div className={classes.table}>
          <div className={classes.tableName}>
            <Button
              // onClick={() => this.tableNameHandler("buying")}
              className={
                this.state.buying ? classes.nameSelling : classes.nameSold
              }
            >
              구매중
            </Button>
            {/* <div
              style={{
                borderRight: "1px solid black",
                height: "20px",
                margin: "auto 0px"
              }}
            /> */}
            {/* <Button
              onClick={() => this.tableNameHandler("bought")}
              className={
                this.state.buying ? classes.nameSold : classes.nameSelling
              }
            >
              구매내역
            </Button> */}
          </div>
          <div className={classes.tableHeader}>
            <div className={classes.headerContainer}>
              <div className={classes.headerName}>제품명</div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.name === 0 || this.state.name === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("name")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.name === 1
                        ? classes.arrowsActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.name === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("name")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.name === 2
                        ? classes.arrowsActivated
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
              <div className={classes.headerName}>가격</div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.price === 0 || this.state.price === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("price")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.price === 1
                        ? classes.arrowsActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.price === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("price")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.price === 2
                        ? classes.arrowsActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
            <div className={classes.headerContainerHidden}>
              <div className={classes.headerName}>구매 날짜</div>
              <div className={classes.arrowsContainer}>
                <IconButton
                  className={
                    this.state.date === 0 || this.state.date === 2
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.ascendingOrderHandler("date")}
                >
                  <KeyboardArrowUp
                    className={
                      this.state.date === 1
                        ? classes.arrowsActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
                <IconButton
                  className={
                    this.state.date === 1
                      ? classes.arrowsDefault
                      : classes.arrowsButton
                  }
                  onClick={() => this.descendingOrderHandler("date")}
                >
                  <KeyboardArrowDown
                    className={
                      this.state.date === 2
                        ? classes.arrowsActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
            <div
              className={classes.headerContainerMobileHidden}
              style={{ borderRight: "0px" }}
            >
              <div className={classes.headerName}>구매상태</div>
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
                        ? classes.arrowsActivated
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
                        ? classes.arrowsActivated
                        : classes.arrows
                    }
                  />
                </IconButton>
              </div>
            </div>
          </div>
          <BoughtModal
            open={this.state.buyingModalOpen}
            modalHandler={this.buyingModalHandler}
            shoeData={this.state.buyingShoeData}
          />
          <div className={classes.sellingDummyContainer}>
            {this.state.data.buying.length ? (
              this.state.data.buying
            ) : (
              <div style={{ margin: "20px", textAlign: "center" }}>
                구매중인 물품이 없습니다.
              </div>
            )}
          </div>
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

export default withStyles(profilePageStyle)(Buying);
