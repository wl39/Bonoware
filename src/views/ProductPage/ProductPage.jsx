import withStyles from "@material-ui/core/styles/withStyles";
import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";
import { Auth } from "aws-amplify";
import DynamoDB from "aws-sdk/clients/dynamodb";
import Product from "components/Product/Product.jsx";
import ProductSearchPanel from "components/Product/ProductSearchPanel.jsx";

import { ClickAwayListener, Button } from "@material-ui/core";
import { KeyboardArrowDown, ViewModule, ViewStream } from "@material-ui/icons";

import axios from "axios";

import React from "react";
// import Button from 'components/CustomButtons/Button.jsx';

let count = 0;

let searching = false;

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "nike",
      products: [],
      histogram: [],
      skip: 1,
      next: true,
      searchOptions: false,
      rangeStr: "",
      sizeStr: "",
      sortOption: "",
      open: false,
      filter: "정렬 방식",
      grid: true
    };
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleClickAway = () => {
    this.setState({
      open: false
    });
  };

  viewOptionHandler = grid => {
    if (this.state.grid !== grid) {
      let newProduct = [];

      this.state.products.forEach(value => {
        newProduct = [
          ...newProduct,
          <Product
            key={value.key}
            model={value.props.model}
            image={value.props.image}
            brand={value.props.brand}
            price={value.props.price}
            id={value.props.id}
            grid={grid}
          />
        ];
      });

      this.setState({
        products: newProduct,
        grid: grid
      });
    }
  };

  filterHandler = option => {
    if (!option) {
      return;
    }

    let brand = option.brand ? option.brand : "nike";

    switch (option.filter) {
      case "whatshot":
        this.setState({
          filter: "인기순",
          sortOption: "mostPopular",
          brand: brand
        });
        break;
      case "new_releases":
        this.setState({
          filter: "최신순",
          sortOption: "mostRecent",
          brand: brand
        });
        break;
      case "trending_down":
        this.setState({
          filter: "가격순",
          sortOption: "lowestPrice",
          brand: brand
        });
        break;
      default:
        this.setState({
          filter: "정렬 방식",
          brand: brand
        });
        break;
    }
  };

  componentWillReceiveProps(nextProps) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    this.filterHandler(nextProps.location.state);
  }

  componentWillMount() {
    this.filterHandler(this.props.location.state);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    window.addEventListener("scroll", this.scrollToSearch);

    axios({
      method: "get",
      url: "https://api.probe.gg/open/products?skip=0"
    }).then(value => {
      let data = value.data;
      let next = false;
      let products = [];

      data.forEach((value, index) => {
        if (index >= 12) {
          next = true;
        } else {
          products = [
            ...products,
            <Product
              key={value._id}
              model={value.name}
              image={value.image[0]}
              brand={value.brand}
              price={value.lowestPrice}
              id={value._id}
              grid={this.state.grid}
            />
          ];
        }
      });
      this.setState({
        next: next,
        products: products,
        skip: 1
      });
    });

    Auth.currentCredentials().then(credentials => {
      Auth.currentCredentials().then(credentials => {
        let db = new DynamoDB.DocumentClient({
          credentials: Auth.essentialCredentials(credentials)
        });

        let param = {
          TableName: "Histogram"
        };

        db.scan(param, (err, data) => {
          if (data) {
            count = data.Count;
            data.Items.forEach(value => {
              this.setState(prevState => ({
                histogram: [
                  ...prevState.histogram,
                  {
                    price: value.Price,
                    count: value.Count,
                    lowest: value.Lowest
                  }
                ]
              }));
            });
          } else {
            console.log(err);
          }
        });
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollToSearch);
    searching = false;
  }

  applied = (value, range, sizeArray, more, sortOption) => {
    let r1 = parseInt(range[0], 10);
    let r2 = parseInt(range[1], 10);

    let sizeStr = "";

    if (sizeArray) {
      sizeStr = "&size=";
      sizeArray.forEach(value => {
        sizeStr += value + ",";
      });
    }

    this.setState({
      products: value,
      rangeStr: "&price=" + r1 + "," + r2,
      sizeStr: sizeStr,
      next: more,
      searchOptions: true,
      skip: more ? 1 : 0,
      sortOption: sortOption
    });
  };

  brandHandler = brand => {
    this.setState({
      brand: brand
    });
  };

  scrollToSearch = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!searching) {
        this.viewMoreShoes();
      }
    }
  };

  viewMoreShoes = () => {
    searching = true;

    if (this.state.skip) {
      axios({
        method: "get",
        url:
          "https://api.probe.gg/open/" +
          (this.state.searchOptions
            ? "search_option?" +
              this.state.sizeStr +
              this.state.rangeStr +
              "&skip=" +
              this.state.skip +
              "&" +
              this.state.sortOption
            : "products?skip=" + this.state.skip)
      }).then(value => {
        let data = value.data;
        let next = false;
        let products = [];

        if (!data.length) {
          this.setState({
            skip: 0
          });
        }

        if (this.state.skip) {
          data.forEach((value, index) => {
            if (index >= 12) {
              next = true;
            } else {
              if (this.state.searchOptions) {
                products = [
                  ...products,
                  <Product
                    key={value._id}
                    model={value.data[0] ? value.data[0].name : value.data.name}
                    image={
                      value.data[0]
                        ? value.data[0].image[0]
                        : value.data.image[0]
                    }
                    brand={
                      value.data[0] ? value.data[0].brand : value.data.brand
                    }
                    price={value.lowestPrice}
                    grid={this.state.grid}
                  />
                ];
              } else {
                products = [
                  ...products,
                  <Product
                    key={value._id}
                    model={value.name}
                    image={value.image[0]}
                    brand={value.brand}
                    price={value.lowestPrice}
                    id={value._id}
                    grid={this.state.grid}
                  />
                ];
              }
            }
          });
          this.setState({
            next: next,
            products: [...this.state.products, ...products],
            skip: this.state.skip + 1
          });

          next ? (searching = false) : (searching = true);
        }
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.pageHeaderContainer}>
          <div className={classes.pageHeaderLeft}>
            <div className={classes.descriptionContainer}>
              <div className={classes.type}>{this.state.brand}</div>
              <div className={classes.headerDescription}>Description</div>
            </div>
          </div>
          <div className={classes.pageHeaderRight} />
        </div>
        <div className={classes.container}>
          <ProductSearchPanel
            histogram={this.state.histogram}
            applied={this.applied}
            num={count}
            brandHandler={this.brandHandler}
            sortOption={this.state.sortOption}
            grid={this.state.grid}
          />
          <div className={classes.productContainer}>
            <div className={classes.productFilter}>
              <ClickAwayListener onClickAway={this.handleClickAway}>
                <div
                  className={classes.filterOptionContainer}
                  onClick={this.handleClick}
                >
                  <div
                    className={
                      this.state.open
                        ? classes.filterActive
                        : classes.filterDeactive
                    }
                  >
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.filterHandler({ filter: "whatshot" })}
                    >
                      <div className={classes.filterOptionTitle}>인기순</div>
                      <div className={classes.filterOptionDescription}>
                        최근 한달간 가장 많이 판매된 제품 순서대로 나열합니다.
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() =>
                        this.filterHandler({ filter: "new_releases" })
                      }
                    >
                      <div className={classes.filterOptionTitle}>최신순</div>
                      <div className={classes.filterOptionDescription}>
                        가장 최근에 발매된 제품 순서대로 나열합니다.
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() =>
                        this.filterHandler({ filter: "trending_down" })
                      }
                    >
                      <div className={classes.filterOptionTitle}>가격순</div>
                      <div className={classes.filterOptionDescription}>
                        가장 저렴한 제품 순서대로 나열합니다.
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      this.state.filter === "정렬 방식"
                        ? classes.filterOption
                        : classes.filterOptionSelected
                    }
                  >
                    {this.state.filter}
                  </div>
                  <KeyboardArrowDown className={classes.filterIcon} />
                </div>
              </ClickAwayListener>

              <ViewModule
                className={
                  this.state.grid
                    ? classes.filterViewIconActive
                    : classes.filterViewIconUnactive
                }
                onClick={() => this.viewOptionHandler(true)}
              />
              <ViewStream
                className={
                  this.state.grid
                    ? classes.filterViewIconUnactive
                    : classes.filterViewIconActive
                }
                onClick={() => this.viewOptionHandler(false)}
              />
            </div>
            {this.state.grid ? null : (
              <div className={classes.listHeader}>
                <div className={classes.shoeName}>제품명</div>
                <div className={classes.headerPriceContainer}>
                  <div className={classes.headerLastSale}>최근 판매가</div>
                  <div className={classes.headerLowestPrice}>최저가</div>
                </div>
              </div>
            )}
            {this.state.products.length ? (
              this.state.products
            ) : (
              <div className={classes.noResults}>검색 결과가 없습니다.</div>
            )}
            {this.state.next ? (
              <Button
                className={
                  this.state.grid ? classes.moreButton : classes.moreButtonList
                }
                onClick={this.viewMoreShoes}
              >
                물품 더 보기
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(propageStyle)(ProductPage);
