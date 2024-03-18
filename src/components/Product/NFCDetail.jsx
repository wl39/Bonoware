import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import NewReleases from "@material-ui/icons/NewReleases";
import Close from "@material-ui/icons/Close";

import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";
import Details from "components/Product/Details";
import ModalBuy from "components/Modal/ModalBuy.jsx";
import ProductCommentsPanel from "components/Product/ProductCommentsPanel.jsx";
import RelatedSection from "../../views/MainPage/Sections/RelatedSection"

import ReactApexChart from "react-apexcharts";

import axios from "axios";

import moment from "moment";

const MIN_SIZE = 220;
const MAX_SIZE = 320;

class NFCDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: [],
      new: false,
      temp: false,
      sizeOpen: false,
      add: false,
      unreleased: false,
      disable: false,
      shoeName: "",
      date: "",
      candleStickOptions: {
        tooltip: {
          enabled: true,
          custom: function ({ seriesIndex, dataPointIndex, w }) {
            const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
            const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
            const a = ((o + c) / 2).toFixed(2);
            return (
              '<div class="apexcharts-tooltip-candlestick">' +
              '<div>당일 최고가: <span class="value">' +
              o +
              "</span></div>" +
              '<div>당일 최저가: <span class="value">' +
              c +
              "</span></div>" +
              '<div>당일 거래 평균가: <span class="value">' +
              a +
              "</span></div>" +
              "</div>"
            );
          }
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          defaultLocale: "ko",
          locales: [
            {
              name: "ko",
              options: {
                months: [
                  "1월",
                  "2월",
                  "3월",
                  "4월",
                  "5월",
                  "6월",
                  "7월",
                  "8월",
                  "9월",
                  "10월",
                  "11월",
                  "12월"
                ],
                shortMonths: [
                  "1월",
                  "2월",
                  "3월",
                  "4월",
                  "5월",
                  "6월",
                  "7월",
                  "8월",
                  "9월",
                  "10월",
                  "11월",
                  "12월"
                ],
                days: [
                  "일요일",
                  "월요일",
                  "화요일",
                  "수요일",
                  "목요일",
                  "금요일",
                  "토요일"
                ],
                shortDays: ["일", "월", "화", "수", "목", "금", "토"],
                toolbar: {
                  exportToSVG: "SVG 다운로드",
                  exportToPNG: "PNG 다운로드",
                  menu: "메뉴",
                  selection: "선택",
                  selectionZoom: "선택영역 확대",
                  zoomIn: "확대",
                  zoomOut: "축소",
                  pan: "패닝",
                  reset: "원래대로"
                }
              }
            }
          ]
        }
      },
      candleStickSeries: [
        {
          data: [
            {
              x: new Date(1538778600000),
              y: [6629.81, 6629.81, 6633.33, 6633.33]
            },
            {
              x: new Date(1538780400000),
              y: [6632.01, 6632.01, 6630.11, 6630.11]
            },
            {
              x: new Date(1538782200000),
              y: [6630.71, 6630.71, 6635.65, 6635.65]
            },
            {
              x: new Date(1538784000000),
              y: [6635.65, 6635.65, 6638.24, 6638.24]
            },
            {
              x: new Date(1538785800000),
              y: [6638.24, 6638.24, 6624.47, 6624.47]
            },
            {
              x: new Date(1538787600000),
              y: [6624.53, 6624.53, 6624.31, 6624.31]
            },
            {
              x: new Date(1538789400000),
              y: [6624.61, 6624.61, 6626.02, 6626.02]
            },
            {
              x: new Date(1538791200000),
              y: [6627, 6627, 6603.02, 6603.02]
            },
            {
              x: new Date(1538793000000),
              y: [6605, 6605, 6604.01, 6604.01]
            },
            {
              x: new Date(1538794800000),
              y: [6604.5, 6604.5, 6608.02, 6608.02]
            },
            {
              x: new Date(1538796600000),
              y: [6608.02, 6608.02, 6608.91, 6608.91]
            },
            {
              x: new Date(1538798400000),
              y: [6608.91, 6608.91, 6612, 6612]
            },
            {
              x: new Date(1538800200000),
              y: [6612, 6612, 6612, 6612]
            },
            {
              x: new Date(1538802000000),
              y: [6612, 6612, 6622.95, 6622.95]
            },
            {
              x: new Date(1538803800000),
              y: [6623.91, 6623.91, 6615.67, 6615.67]
            },
            {
              x: new Date(1538805600000),
              y: [6618.69, 6618.69, 6610.4, 6610.4]
            },
            {
              x: new Date(1538807400000),
              y: [6611, 6611, 6614.9, 6614.9]
            },
            {
              x: new Date(1538809200000),
              y: [6614.9, 6614.9, 6623.45, 6623.45]
            },
            {
              x: new Date(1538811000000),
              y: [6623.48, 6623.48, 6620.35, 6620.35]
            },
            {
              x: new Date(1538812800000),
              y: [6619.43, 6619.43, 6615.53, 6615.53]
            },
            {
              x: new Date(1538814600000),
              y: [6615.53, 6615.53, 6615.19, 6615.19]
            },
            {
              x: new Date(1538816400000),
              y: [6615.19, 6615.19, 6620, 6620]
            },
            {
              x: new Date(1538818200000),
              y: [6619.54, 6619.54, 6620, 6620]
            },
            {
              x: new Date(1538820000000),
              y: [6620.33, 6620.33, 6624.61, 6624.61]
            },
            {
              x: new Date(1538821800000),
              y: [6625.95, 6625.95, 6617.58, 6617.58]
            },
            {
              x: new Date(1538823600000),
              y: [6619, 6619, 6598.86, 6598.86]
            },
            {
              x: new Date(1538825400000),
              y: [6598.86, 6598.86, 6587.16, 6587.16]
            },
            {
              x: new Date(1538827200000),
              y: [6588.86, 6588.86, 6593.4, 6593.4]
            },
            {
              x: new Date(1538829000000),
              y: [6593.99, 6593.99, 6587.81, 6587.81]
            },
            {
              x: new Date(1538830800000),
              y: [6587.81, 6587.81, 6578, 6578]
            },
            {
              x: new Date(1538832600000),
              y: [6578.35, 6578.35, 6579, 6579]
            },
            {
              x: new Date(1538834400000),
              y: [6579.38, 6579.38, 6575.96, 6575.96]
            },
            {
              x: new Date(1538836200000),
              y: [6575.96, 6575.96, 6588.92, 6588.92]
            },
            {
              x: new Date(1538838000000),
              y: [6588.92, 6588.92, 6589.22, 6589.22]
            },
            {
              x: new Date(1538839800000),
              y: [6589.3, 6589.3, 6596.08, 6596.08]
            },
            {
              x: new Date(1538841600000),
              y: [6597.5, 6597.5, 6596.25, 6596.25]
            },
            {
              x: new Date(1538843400000),
              y: [6598.03, 6598.03, 6595.97, 6595.97]
            },
            {
              x: new Date(1538845200000),
              y: [6595.97, 6595.97, 6602, 6602]
            },
            {
              x: new Date(1538847000000),
              y: [6602, 6602, 6599.95, 6599.95]
            },
            {
              x: new Date(1538848800000),
              y: [6600.63, 6600.63, 6591.02, 6591.02]
            },
            {
              x: new Date(1538850600000),
              y: [6591.02, 6591.02, 6591, 6591]
            },
            {
              x: new Date(1538852400000),
              y: [6591, 6591, 6592, 6592]
            },
            {
              x: new Date(1538854200000),
              y: [6593.13, 6593.13, 6593.34, 6593.34]
            },
            {
              x: new Date(1538856000000),
              y: [6593.34, 6593.34, 6593.86, 6593.86]
            },
            {
              x: new Date(1538857800000),
              y: [6593.86, 6593.86, 6600.01, 6600.01]
            },
            {
              x: new Date(1538859600000),
              y: [6601.81, 6601.81, 6596.25, 6596.25]
            },
            {
              x: new Date(1538861400000),
              y: [6596.25, 6596.25, 6602.99, 6602.99]
            },
            {
              x: new Date(1538863200000),
              y: [6602.99, 6602.99, 6587.81, 6587.81]
            },
            {
              x: new Date(1538865000000),
              y: [6587.81, 6587.81, 6591.96, 6591.96]
            },
            {
              x: new Date(1538866800000),
              y: [6591.97, 6591.97, 6588.39, 6588.39]
            },
            {
              x: new Date(1538868600000),
              y: [6587.6, 6587.6, 6594.27, 6594.27]
            },
            {
              x: new Date(1538870400000),
              y: [6596.44, 6596.44, 6596.55, 6596.55]
            },
            {
              x: new Date(1538872200000),
              y: [6598.91, 6598.91, 6600.02, 6600.02]
            },
            {
              x: new Date(1538874000000),
              y: [6600.55, 6600.55, 6593.01, 6593.01]
            },
            {
              x: new Date(1538875800000),
              y: [6593.15, 6593.15, 6603.06, 6603.06]
            },
            {
              x: new Date(1538877600000),
              y: [6603.07, 6603.07, 6603.89, 6603.89]
            },
            {
              x: new Date(1538879400000),
              y: [6604.44, 6604.44, 6603.5, 6603.5]
            },
            {
              x: new Date(1538881200000),
              y: [6603.5, 6603.5, 6603.86, 6603.86]
            },
            {
              x: new Date(1538883000000),
              y: [6603.85, 6603.85, 6604.07, 6604.07]
            },
            {
              x: new Date(1538884800000),
              y: [6604.98, 6604.98, 6606, 6606]
            }
          ]
        }
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.model !== nextProps.model) {
      let date = new Date(nextProps.releaseDate);

      const newDate = moment(date, "DD-MM-YYYY-HH-mm");

      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      date =
        date.getFullYear() +
        "." +
        (mm > 9 ? "" : "0") +
        mm +
        "." +
        (dd > 9 ? "" : "0") +
        dd;

      const today = moment();

      this.setState({
        shoeName: nextProps.model,
        date: date.toString(),
        sizeOpen: false
      });

      let diff = today.diff(newDate, "month");

      if (diff === 0) {
        this.setState({
          new: true
        });
      } else if (diff < 0) {
        this.setState({
          unreleased: true
        });
      } else {
        this.setState({
          new: false
        });
      }

      if (!nextProps.lowest) {
        this.setState({
          disable: true
        });
      } else {
        this.setState({
          disable: false
        });
      }
    }
  }

  tempHandler = open => {
    this.setState({
      temp: open
    });
  };

  componentWillMount() {
    let date = new Date(this.props.releaseDate);

    const newDate = moment(date, "DD-MM-YYYY-HH-mm");

    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    date =
      date.getFullYear() +
      "." +
      (mm > 9 ? "" : "0") +
      mm +
      "." +
      (dd > 9 ? "" : "0") +
      dd;

    const today = moment();

    this.setState({
      shoeName: this.props.model,
      date: date.toString()
    });

    let diff = today.diff(newDate, "month");
    if (diff === 0) {
      this.setState({
        new: true
      });
    } else if (diff < 0) {
      this.setState({
        unreleased: true
      });
    } else {
      this.setState({
        new: false
      });
    }

    if (!this.props.lowest) {
      this.setState({
        disable: true
      });
    }
  }

  sizePanelHandler = () => {
    axios({
      method: "get",
      url: "https://api.probe.gg/open/shoeSizePrice?shoe=" + this.props.sid
    }).then(value => {
      const { classes } = this.props;

      let sizePrice = {};
      let available = [];
      let soldOut = [];

      value.data.forEach(value => {
        sizePrice[value._id] = value.lowestPrice;
      });

      for (let sizeNum = MIN_SIZE; sizeNum <= MAX_SIZE; sizeNum += 5) {
        if (sizePrice[sizeNum]) {
          available = [
            ...available,
            <ModalBuy
              tempHandler={this.tempHandler}
              key={sizeNum}
              size={sizeNum}
              price={sizePrice[sizeNum].toLocaleString()}
              model={this.props.model}
              sid={this.props.sid}
            />
          ];
        } else {
          soldOut = [
            ...soldOut,
            <div className={classes.singleSizeContainer} key={sizeNum}>
              <div>{sizeNum}</div>
              <div> 품절</div>
            </div>
          ];
        }
      }

      this.setState({
        size: [...available, ...soldOut],
        sizeOpen: !this.state.sizeOpen
      });
    });
  };

  sizePanelClose = () => {
    if (!this.state.temp) {
      this.setState({
        sizeOpen: false
      });
    }
  };

  addShoppingCart = () => {
    this.setState({
      add: !this.state.add
    });
  };

  render() {
    const { classes } = this.props;
    const english = this.props.model.split("|")[0];
    const korean = this.props.model.split("|")[1];

    return (
      <div
        style={{ flexDirection: "column" }}
        className={classes.detailPageConatiner}
      >
        <div
          className={
            this.state.sizeOpen
              ? classes.shoeContainerActive
              : classes.shoeContainer
          }
        >
          <div className={classes.containerLeft}>
            <div className={classes.optionModel}>
              <div className={classes.optionModelEnglish}>{english}</div>

              <div className={classes.optionModelKorean}>{korean}</div>
            </div>
            {this.state.new ? (
              <Tooltip
                id="tooltip-right"
                title="출시된 지 한 달 이내의 제품입니다."
                placement="bottom-end"
              >
                <IconButton className={classes.newReleasesButton}>
                  <NewReleases className={classes.icon} />
                </IconButton>
              </Tooltip>
            ) : null}
            <Details date={this.state.date} products={this.props} />
          </div>
          <div className={classes.imageContainer}>
            <div className={classes.withImage}>
              <div className={classes.imageWrapper}>
                <img
                  src={this.props.image}
                  alt={this.props.model}
                  className={classes.image}
                />
              </div>
            </div>
            <div className={classes.imageList}>Slider</div>
          </div>
        </div>

        <div
          className={
            this.state.sizeOpen ? classes.optionsActive : classes.options
          }
        >
          <Button
            disabled={true}
            classes={{
              disabled: classes.buttonDisabled
            }}
            className={classes.lowestButton}
          >
            {
              "구매가 ₩" + this.props.price.toLocaleString()
            }
          </Button>

        </div>

        <div className={classes.description}>
          <div className={classes.recentSold}>신발 거래 내역</div>
          <div className={classes.recentSold}>
            <ReactApexChart
              options={this.state.candleStickOptions}
              series={this.state.candleStickSeries}
              type="candlestick"
              width="100%"
            />
          </div>
        </div>
        <ProductCommentsPanel id={this.props.sid} shoe={true} />
      </div>
    );
  }
}

export default withStyles(propageStyle)(NFCDetail);
