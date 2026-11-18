import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Selling from "views/Profile/Selling.jsx";

import ReactApexChart from "react-apexcharts";

import portfolioPage from "assets/jss/material-kit-react/views/landingPageSections/portfolioPage.jsx";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histogramContents: null,
      countsOptions: {
        title: {
          text: "판매한 신발갯수",
          align: "center"
        },
        chart: {
          events: {
            dataPointSelection: function(chart, w, e) {}
          },
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "12px"
            }
          },
          seriesName: "갯수"
        }
      },
      countsSeries: [],
      profitOptions: {
        title: {
          text: "신발 판매 수익",
          align: "center"
        },
        chart: {
          events: {
            dataPointSelection: function(chart, w, e) {}
          },
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "12px"
            }
          },
          seriesName: "갯수"
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function(val) {
              return val + "%";
            }
          }
        }
      },
      profitSeries: [],
      data: []
    };
  }

  componentWillMount() {
    // Get data from here
    let countsOptions = JSON.parse(JSON.stringify(this.state.countsOptions));
    let profitOptions = JSON.parse(JSON.stringify(this.state.profitOptions));

    countsOptions.xaxis = {
      categories: [
        "Air Jordan",
        "Air Max",
        "Yeezy",
        "Iniki",
        "Air Force",
        "Off-white",
        "NMD",
        "Other"
      ]
    };

    profitOptions.xaxis = {
      categories: [
        "Air Jordan",
        "Air Max",
        "Yeezy",
        "Iniki",
        "Air Force",
        "Off-white",
        "NMD",
        "Other"
      ]
    };

    profitOptions.yaxis.labels.formatter = value => {
      return "₩ " + value;
    };

    this.setState({
      countsOptions: countsOptions,
      countsSeries: [
        {
          name: "판매량",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      profitOptions: profitOptions,
      profitSeries: [
        {
          name: "판매 금액",
          data: [21000, 220000, 100000, 28000, 1600, 3140, 10300, 3000]
        }
      ],
      data: [
        "Air Jordan",
        "Air Max",
        "Yeezy",
        "Iniki",
        "Air Force",
        "Off-white",
        "NMD",
        "Other"
      ]
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.greeting}>
          회원님이 판매한 신발 물량과 수익을 볼 수 있는 공간입니다.
        </div>
        {/*Greeting ment*/}
        <div className={classes.mobile}>
          모바일은 그래프 확인이 어려울 수 있습니다.
        </div>
        <div className={classes.histogramsContainer}>
          <div className={classes.histogramContainer}>
            <ReactApexChart
              options={this.state.countsOptions}
              series={this.state.countsSeries}
              type="bar"
              width="100%"
            />
          </div>
          {/**Shoe counts Histogram */}
          <div className={classes.histogramContainer}>
            <div>
              <ReactApexChart
                options={this.state.profitOptions}
                series={this.state.profitSeries}
                type="bar"
                width="100%"
              />
            </div>
          </div>
          {/**Shoe profit Histogram */}
        </div>
        {this.state.histogramContents ? this.state.histogramContents : null}
        {/**Diagram container */}
        <Selling shoeData={this.props.shoeData} text={false} />
      </div>
    );
  }
}

export default withStyles(portfolioPage)(Portfolio);
