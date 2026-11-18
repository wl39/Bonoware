import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Settings from "@material-ui/icons/Settings";
import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";
import Histogram from "components/Histogram/Histogram.jsx";
import Product from "components/Product/Product.jsx";
import SizePanel from "components/SizePanel/SizePanel.jsx";
import React from "react";
import Nouislider from "react-nouislider";
import ReleaseYearPanel from "../ReleaseYearPanel/ReleaseYearPanel";

import axios from "axios";

const compare = (data1, data2) => {
  return data1.price - data2.price;
};

let histogram = [];
let sizeArray = [];
class ProductSearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nike: true,
      airJordan: false,
      adidas: false,
      yeezy: false,
      other: false,
      panel: null,
      applied: [],
      priceRange: [100, 700],
      minPrice: 100000,
      maxPrice: 10000000,
      histogram: [],
      mostPopular: false,
      mostRecent: false,
      lowestPrice: false,
      sortOption: ""
    };
    this.NoUiSlider = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sortOption !== nextProps.sortOption) {
      if (nextProps.sortOption) {
        this.setState(
          {
            mostPopular: false,
            mostRecent: false,
            lowestPrice: false,
            [nextProps.sortOption]: true,
            sortOption: nextProps.sortOption
          },
          () => {
            if (window.innerWidth < 960) {
              this.applyRangeM();
            } else {
              this.applyRange();
            }
          }
        );
      }
    }

    if (this.props.histogram !== nextProps.histogram) {
      let sorted = [...nextProps.histogram];
      sorted.sort(compare);
      if (sorted.length === nextProps.num) {
        this.setState({
          priceRange: [0, (sorted[sorted.length - 1].price * 1 + 1) * 50000],
          minPrice: 0,
          maxPrice: parseInt(
            (sorted[sorted.length - 1].price * 1 + 1) * 50000,
            10
          )
        });
        sorted.forEach(value => {
          histogram[value.price] = {
            frequency: parseInt(value.count, 10),
            lowestFrequency: parseInt(value.lowest, 10)
          };
        });
      }
      this.setState({
        histogram: histogram
      });
    }
  }

  brandSearchHandler = value => {
    this.setState({
      nike: false,
      airJordan: false,
      adidas: false,
      yeezy: false,
      other: false,
      [value]: true
    });
    this.props.brandHandler(value);
  };

  onChangeSlide = () => {
    if (this.refs.NoUiSlider) {
      let newArray = this.refs.NoUiSlider.slider.get();
      newArray[0] = Number(newArray[0].slice(0, 7));
      newArray[1] = Number(newArray[1].slice(0, 7));
      // let currencyLow = this.refs.priceLow.dataset.currency;
      // let currencyHigh = this.refs.priceLow.dataset.currency;
      this.refs.priceLow.innerHTML = newArray[0];
      this.refs.priceHigh.innerHTML = newArray[1];
    }
  };

  onChangeSlideM = () => {
    if (this.refs.NoUiSliderM) {
      let newArray = this.refs.NoUiSliderM.slider.get();
      newArray[0] = Number(newArray[0].slice(0, 7));
      newArray[1] = Number(newArray[1].slice(0, 7));
      // let currencyLow = this.refs.priceLow.dataset.currency;
      // let currencyHigh = this.refs.priceLow.dataset.currency;
      this.refs.priceLowM.innerHTML = newArray[0];
      this.refs.priceHighM.innerHTML = newArray[1];
    }
  };

  openDropDown = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  applyRange = () => {
    let rangeResults = [];
    let sortOption =
      this.state.mostPopular || this.state.mostRecent || this.state.lowestPrice;
    const range = this.refs.NoUiSlider.slider.get();
    this.setState({
      priceRange: [parseInt(range[0], 10), parseInt(range[1], 10)]
    });

    let more = false;

    if (!sizeArray.length) {
      axios({
        method: "get",
        url:
          "https://api.probe.gg/open/search_option?&skip=0&price=" +
          parseInt(range[0], 10) +
          "," +
          parseInt(range[1], 10) +
          (sortOption ? "&" + this.state.sortOption : "")
      }).then(value => {
        value.data.forEach((value, index) => {
          if (index >= 12) {
            more = true;
          } else {
            rangeResults = [
              ...rangeResults,
              <Product
                key={value._id}
                model={value.data[0] ? value.data[0].name : value.data.name}
                image={
                  value.data[0] ? value.data[0].image[0] : value.data.image[0]
                }
                brand={value.data[0] ? value.data[0].brand : value.data.brand}
                price={value.lowestPrice}
                grid={this.props.grid}
              />
            ];
          }
        });
        this.props.applied(
          rangeResults,
          range,
          null,
          more,
          this.state.sortOption
        );
      });
    } else {
      let sizeStr = "size=";

      sizeArray.forEach(value => {
        sizeStr += value + ",";
      });

      axios({
        method: "get",
        url:
          "https://api.probe.gg/open/search_option?" +
          sizeStr +
          "&skip=0&price=" +
          parseInt(range[0], 10) +
          "," +
          parseInt(range[1], 10) +
          (sortOption ? "&" + this.state.sortOption : "")
      }).then(value => {
        value.data.forEach((value, index) => {
          if (index >= 12) {
            more = true;
          } else {
            rangeResults = [
              ...rangeResults,
              <Product
                key={value._id}
                model={value.data[0] ? value.data[0].name : value.data.name}
                image={
                  value.data[0] ? value.data[0].image[0] : value.data.image[0]
                }
                brand={value.data[0] ? value.data[0].brand : value.data.brand}
                price={value.lowestPrice}
                grid={this.props.grid}
              />
            ];
          }
        });
        this.props.applied(
          rangeResults,
          range,
          sizeArray,
          more,
          this.state.sortOption
        );
      });
    }
  };

  applySize = (data, size, range) => {
    sizeArray = [...size];

    let more = false;
    let rangeResults = [];

    range = [parseInt(range[0], 10), parseInt(range[1], 10)];
    this.setState({
      priceRange: range
    });

    data.forEach((value, index) => {
      if (index >= 12) {
        more = true;
      } else {
        rangeResults = [
          ...rangeResults,
          <Product
            key={index}
            model={value.data[0] ? value.data[0].name : value.data.name}
            image={value.data[0] ? value.data[0].image[0] : value.data.image[0]}
            brand={value.data[0] ? value.data[0].brand : value.data.brand}
            price={value.lowestPrice}
            grid={this.props.grid}
          />
        ];
      }
    });
    this.props.applied(rangeResults, range, size, more, this.state.sortOption);
  };

  getRange = () => {
    return this.refs.NoUiSlider.slider.get();
  };
  getRangeM = () => {
    return this.refs.NoUiSliderM.slider.get();
  };

  applyRangeM = () => {
    let more = false;
    let rangeResults = [];
    let sortOption =
      this.state.mostPopular || this.state.mostRecent || this.state.lowestPrice;

    const range = this.refs.NoUiSliderM.slider.get();

    this.setState({
      priceRange: [parseInt(range[0], 10), parseInt(range[1], 10)]
    });

    if (!sizeArray.length) {
      axios({
        method: "get",
        url:
          "https://api.probe.gg/open/search_option?&skip=0&price=" +
          parseInt(range[0], 10) +
          "," +
          parseInt(range[1], 10) +
          (sortOption ? "&" + this.state.sortOption : "")
      }).then(value => {
        value.data.forEach((value, index) => {
          if (index >= 12) {
            more = true;
          } else {
            rangeResults = [
              ...rangeResults,
              <Product
                key={value._id}
                model={value.data[0] ? value.data[0].name : value.data.name}
                image={
                  value.data[0] ? value.data[0].image[0] : value.data.image[0]
                }
                brand={value.data[0] ? value.data[0].brand : value.data.brand}
                price={value.lowestPrice}
                grid={this.props.grid}
              />
            ];
          }
        });
        this.props.applied(
          rangeResults,
          range,
          null,
          more,
          this.state.sortOption
        );
      });
    } else {
      let sizeStr = "size=";

      sizeArray.forEach(value => {
        sizeStr += value + ",";
      });

      axios({
        method: "get",
        url:
          "https://api.probe.gg/open/search_option?" +
          sizeStr +
          "&skip=0&price=" +
          parseInt(range[0], 10) +
          "," +
          parseInt(range[1], 10) +
          (sortOption ? "&" + this.state.sortOption : "")
      }).then(value => {
        value.data.forEach((value, index) => {
          if (index >= 12) {
            more = true;
          } else {
            rangeResults = [
              ...rangeResults,
              <Product
                key={value._id}
                model={value.data[0] ? value.data[0].name : value.data.name}
                image={
                  value.data[0] ? value.data[0].image[0] : value.data.image[0]
                }
                brand={value.data[0] ? value.data[0].brand : value.data.brand}
                price={value.lowestPrice}
                grid={this.props.grid}
              />
            ];
          }
        });
        this.props.applied(
          rangeResults,
          range,
          sizeArray,
          more,
          this.state.sortOption
        );
      });
    }
  };

  // setSort = name => event => {
  //   this.setState(
  //     {
  //       mostPopular: false,
  //       mostRecent: false,
  //       lowestPrice: false,
  //       [name]: event.target.checked,
  //       sortOption: name
  //     },
  //     () => {
  //       this.applyRange();
  //     }
  //   );
  // };

  // setSortM = name => event => {
  //   this.setState(
  //     {
  //       mostPopular: false,
  //       mostRecent: false,
  //       lowestPrice: false,
  //       [name]: event.target.checked,
  //       sortOption: name
  //     },
  //     () => {
  //       this.applyRangeM();
  //     }
  //   );
  // };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.slider}>
        {/* <button onClick={this.test}>asas</button> */}
        <Hidden smDown>
          <div>
            <div className={classes.brandSearchContainer}>
              <div
                className={
                  this.state.nike
                    ? classes.brandSearchValueActive
                    : classes.brandSearchValue
                }
                onClick={() => this.brandSearchHandler("nike")}
              >
                Nike
              </div>
              <div
                className={
                  this.state.airJordan
                    ? classes.brandSearchValueActive
                    : classes.brandSearchValue
                }
                onClick={() => this.brandSearchHandler("airJordan")}
              >
                Air Jordan
              </div>
              <div
                className={
                  this.state.adidas
                    ? classes.brandSearchValueActive
                    : classes.brandSearchValue
                }
                onClick={() => this.brandSearchHandler("adidas")}
              >
                Adidas
              </div>
              <div
                className={
                  this.state.yeezy
                    ? classes.brandSearchValueActive
                    : classes.brandSearchValue
                }
                onClick={() => this.brandSearchHandler("yeezy")}
              >
                Yeezy
              </div>
              <div
                className={
                  this.state.other
                    ? classes.brandSearchValueActive
                    : classes.brandSearchValue
                }
                onClick={() => this.brandSearchHandler("other")}
              >
                Other Brands
              </div>
            </div>
          </div>
          <div className={classes.panel}>
            <div className={classes.panelHeader}>Prices</div>
            <div className={classes.priceRange}>
              <span ref="priceLow">{this.state.minPrice}</span>
              <span ref="priceHigh">{this.state.maxPrice}</span>
            </div>
            <Histogram histogram={this.state.histogram} />
            <div className={"slider slider-grey"}>
              <Nouislider
                start={this.state.priceRange}
                connect={true}
                range={{ min: this.state.minPrice, max: this.state.maxPrice }}
                onUpdate={this.onChangeSlide}
                onChange={this.applyRange}
                ref="NoUiSlider"
              />
            </div>
          </div>
          <SizePanel
            getRange={this.getRange}
            applySize={this.applySize}
            mostPopular={this.state.mostPopular}
            mostRecent={this.state.mostRecent}
            lowestPrice={this.state.lowestPrice}
            sortOption={this.state.sortOption}
          />
          <ReleaseYearPanel />
        </Hidden>
        <Hidden mdUp>
          <Tooltip id="tooltip-top" title="상세 검색" placement="top">
            <IconButton onClick={this.openDropDown}>
              <Settings className={classes.settingButton} />
            </IconButton>
          </Tooltip>
          <Grow in={this.state.open}>
            <div
              className={
                this.state.open
                  ? classes.dropdownContainer
                  : classes.dropdownContainerClose
              }
            >
              <div className={classes.panel}>
                <div className={classes.panelHeader}>Prices</div>
                <div className={classes.dropdownPriceRange}>
                  <span ref="priceLowM">{this.state.minPrice}</span>
                  <span ref="priceHighM">{this.state.maxPrice}</span>
                </div>
                <div className={classes.dropdownSlider}>
                  <Histogram histogram={this.state.histogram} />
                  <Nouislider
                    start={this.state.priceRange}
                    connect={true}
                    range={{
                      min: this.state.minPrice,
                      max: this.state.maxPrice
                    }}
                    onUpdate={this.onChangeSlideM}
                    onChange={this.applyRangeM}
                    ref="NoUiSliderM"
                  />
                </div>
              </div>
              <SizePanel
                getRange={this.getRangeM}
                applySize={this.applySize}
                mostPopular={this.state.mostPopular}
                mostRecent={this.state.mostRecent}
                lowestPrice={this.state.lowestPrice}
                sortOption={this.state.sortOption}
              />
              <ReleaseYearPanel />
            </div>
          </Grow>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(propageStyle)(ProductSearchPanel);
