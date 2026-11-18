import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";

let histogram = [];
class Histogram extends React.Component {
  componentWillReceiveProps() {
    // histogram = [];
    if (histogram.length === 0) {
      // console.log(histogram.length);
      for (let i = 0; i < this.props.histogram.length; i++) {
        if (this.props.histogram[i]) {
          let px = this.props.histogram[i].frequency * 10;
          let lpx = this.props.histogram[i].lowestFrequency * 10;

          histogram = [
            ...histogram,
            <div
            key={i}
              style={{
                width: "2%"
              }}
            >
              <div
                style={{
                  height: px + "px",
                  width: "100%",
                  background: "#c8c8c8"
                }}
              />
              <div
                style={{
                  height: lpx + "px",
                  width: "100%",
                  backgroundImage: "linear-gradient(#c8c8c8, #939393)"
                }}
              />
            </div>
          ];
        } else {
          histogram = [
            ...histogram,
            <div
              key={i}
              style={{
                height: "0px",
                width: "2%",
                background: "#c8c8c8"
              }}
            />
          ];
        }
      }
      this.setState({
        histogram: histogram
      })
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline"
        }}
      >
        {histogram}
      </div>
    );
  }
}

export default withStyles(null)(Histogram);
