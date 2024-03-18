import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
// react component for creating beautiful carousel
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import adidas from "assets/img/brand/adidas.png";
// core components
import nike from "assets/img/brand/nike.png";
import others from "assets/img/brand/others.png";
import graphSectionStyle from "assets/jss/material-kit-react/components/graphSectionStyle";
import React from "react";
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Carousel from "react-slick";





class GraphSection extends React.Component {

  state = {
    nikeGraph: null,
    adidasGraph: null,
    othersGraph: null
  }


  options = (color, STEPSIZE, MIN, MAX) => {
    return (
      {
        type: 'line',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            right: 20,
            left: 20,
          }
        },
        legend: {
          display: false
        },
        elements: {
          line: {
            fill: true
          }
        },
        gridLines: {

        },
        scales: {
          zeroLineWidth: 0,
          xAxes: [
            {
              display: false,
              zeroLineWidth: 0,
            }

          ],
          yAxes: [
            {
              zeroLineWidth: 0,
              display: true,
              gridLines: {
                display: true,
                drawTicks: false,
                drawBorder: false,
              },
              ticks: {
                display: false, //this will remove only the label,
                //beginAtZero: false,
                zeroLineWidth: 0,
                //showLines: true,
                // steps: 
                //suggestedMin,
                stepSize: STEPSIZE,
                //suggestedMin: -9999999,
                min: MIN,
                max: MAX,
                //beginAtZero: false,
                // maxTicksLimit: 6,
              }
            },
          ]
        },
        hover: {
          mode: 'index',
          intersect: false
        },
        tooltips: {
          position: 'average',
          //caretSize: 20,
          mode: 'index',
          intersect: false,
          axis: "x",
          // mode: 'label',
          callbacks: {
            label: function (tooltipItem, data) {
              let value = (tooltipItem.yLabel)
              return "₩" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          },
          displayColors: false,
          footerFontFamily: "\"Noto Sans\", \"Noto Sans CJK KR\", sans-serif",
          bodyFontSize: 12,
          titleFontSize: 12,
          bodyFontColor: color,
          bodyFontStyle: "bold",
          //yAlign: 'top',
        },
      }
    )
  }

  valueInitializer(graphObject) {
    let shoe = {};
    shoe.Dates = [];
    shoe.Values = [];
    shoe.Dates.push(Object.keys(graphObject)[0]);
    shoe.Values.push(Object.values(graphObject)[0]);

    let key;
    shoe.Max = shoe.Values[0]; shoe.Min = shoe.Max;

    for (key in graphObject) {
      if (graphObject[key] > shoe.Max) {
        shoe.Max = graphObject[key]
      }
      if (graphObject[key] < shoe.Min) {
        shoe.Min = graphObject[key]
      }

      if (key === shoe.Dates[0]) {

      }
      else {
        let k = null;
        for (let z = shoe.Dates.length; z > 0; z--) {
          if (shoe.Dates[z - 1] >= key) {
            k = z - 1;
          }
        }
        if (k || k === 0) {
          shoe.Dates.splice(k, 0, key)
          shoe.Values.splice(k, 0, graphObject[key])
        }
        else {
          shoe.Dates.push(key)
          shoe.Values.push(graphObject[key])
        }
      }
    }
    shoe.Step = (shoe.Max - shoe.Min) / 5;
    shoe.Min = shoe.Min - shoe.Max / 2;
    shoe.Max = shoe.Max * 1.3;

    shoe.shoeDataSet = {
      labels: shoe.Dates,
      datasets: [
        {
          lineTension: 0.1,
          backgroundColor: 'rgba(255,100,100,0.4)',
          borderColor: 'rgba(255,100,100,1)',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(255,100,100,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(255,100,100,1)',
          pointHoverBorderColor: 'rgba(255,100,100,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: shoe.Values
        }
      ]
    };

    shoe.shoeOptionColor = "red"
    if (shoe.Values[shoe.Values.length - 2] <= shoe.Values[shoe.Values.length - 1]) {
      shoe.shoeDataSet.datasets[0] = {
        ...shoe.shoeDataSet.datasets[0],
        pointHoverBackgroundColor: 'rgba(0,200,0,1)',
        pointHoverBorderColor: 'rgba(0,200,0,1)',
        pointBorderColor: 'rgba(0,200,0,1)',
        backgroundColor: 'rgba(0,200,0,0.4)',
        borderColor: 'rgba(0,200,0,1)',
      }
      shoe.shoeOptionColor = "green"
    }

    return shoe;
  }

  renderHelper(nikeGraph, adidasGraph, othersGraph) {
    let nike = this.valueInitializer(nikeGraph)
    let adidas = this.valueInitializer(adidasGraph);
    let others = this.valueInitializer(othersGraph)
    this.setState({
      nikeGraph: (
        <Line data={nike.shoeDataSet}
          options={this.options(nike.shoeOptionColor, nike.Step, nike.Min, nike.Max)} />),
      adidasGraph: (
        <Line data={adidas.shoeDataSet}
          options={this.options(adidas.shoeOptionColor, adidas.Step, adidas.Min, adidas.Max)} />),
      othersGraph: (
        <Line data={others.shoeDataSet}
          options={this.options(others.shoeOptionColor, others.Step, others.Min, others.Max)} />)
    })
  }

  componentWillMount() {
    //console.log(this.props.nikeGraph)
    this.renderHelper(this.props.nikeGraph, this.props.adidasGraph, this.props.othersGraph)
  };

  componentWillReceiveProps(nextProps) {
    this.renderHelper(nextProps.nikeGraph, nextProps.adidasGraph, nextProps.othersGraph)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.nikeGraphDate != nextState.nikeGraphDate;
  // }

  render() {
    const { classes } = this.props;

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      swipeToSlide: true,
      slidesToScroll: 1,
      autoplay: false,
      arrows: false,
      adaptiveHeight: false,
      initialSlide: 0,
      slidesPerRow: 1,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            initialSlide: 0,
            dots: true,
            autoplay: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            arrows: false,
            slidesToScroll: 1,
            dots: true,
            initialSlide: 0,
            autoplay: true
          }
        }
      ]
    };

    return (
      <div style={{ paddingTop: "5px" }}>
        <Carousel {...settings}>
          <div className={classes.container2} >
            <Paper className={classes.paper}>

              <Button
                className={classes.refreshButton}
              >
                <div>NIKE</div>
                <img src={nike} className={classes.refreshIcon} alt= "Nike"/>
              </Button>
              <div style={{ maxHeight: "84px" }}>
                {this.state.nikeGraph}
              </div>

            </Paper>
          </div>
          <div className={classes.container2}>
            <Paper className={classes.paper}>


              <Button
                className={classes.refreshButton}
              >
                <div>ADIDAS  </div>
                <img src={adidas} className={classes.refreshIcon} alt= "Adidas"/>
              </Button>
              <div style={{ maxHeight: "84px" }}>
                {this.state.adidasGraph}
              </div>
            </Paper>
          </div>
          <div className={classes.container2}>
            <Paper className={classes.paper}>
              <Button
                className={classes.refreshButton}
              >
                <div>Others</div>
                <img src={others} className={classes.refreshIcon} alt= "Others"/>
              </Button>

              <div style={{ maxHeight: "84px" }}>
                {this.state.othersGraph}
              </div>
            </Paper>
          </div>
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nikeGraph: state.nikeGraph,
    adidasGraph: state.adidasGraph,
    othersGraph: state.othersGraph
  };
};

export default connect(mapStateToProps, null)(withStyles(graphSectionStyle)(GraphSection));