import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";
import { Auth } from "aws-amplify";
import DynamoDB from "aws-sdk/clients/dynamodb";
import CustomCheckText from "components/CustomCheckText/CustomCheckText.jsx";
import React from "react";
import axios from "axios";
let sizeArray = [];

class SizePanel extends React.Component {
  componentWillMount() {
    sizeArray = [];
  }

  checked = size => {
    let sortOption =
      this.props.mostPopular || this.props.mostRecent || this.props.lowestPrice;
    const range = this.props.getRange();
    sizeArray = [...sizeArray, size];

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
        (sortOption ? "&" + this.props.sortOption : "")
    }).then(value => {
      range[0] = parseInt(range[0], 10);
      range[1] = parseInt(range[1], 10);
      this.props.applySize(value.data, sizeArray, range);
    });
  };

  unchecked = size => {
    const range = this.props.getRange();
    let index = sizeArray.indexOf(size);
    let sizeStr = "size=";
    sizeArray.splice(index, 1);

    if (sizeArray.length) {
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
          parseInt(range[1], 10)
      }).then(value => {
        range[0] = parseInt(range[0], 10);
        range[1] = parseInt(range[1], 10);
        this.props.applySize(value.data, sizeArray, range);
      });
    } else {
      axios({
        method: "get",
        url:
          "https://api.probe.gg/open/search_option?&skip=0&price=" +
          parseInt(range[0], 10) +
          "," +
          parseInt(range[1], 10)
      }).then(value => {
        range[0] = parseInt(range[0], 10);
        range[1] = parseInt(range[1], 10);
        this.props.applySize(value.data, sizeArray, range);
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.panel}>
        <div className={classes.panelHeader}>Sizes</div>
        <Grid container className={classes.shoeSizeContainer}>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={220}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={225}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={230}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={235}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={240}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={245}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={250}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={255}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={260}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={265}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={270}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={275}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={280}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={285}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={290}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={295}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={300}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={305}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={310}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={315}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={320}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={325}
            />
          </Grid>
          <Grid xs={3} className={classes.containerItem}>
            <CustomCheckText
              checked={this.checked}
              unchecked={this.unchecked}
              name={330}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(propageStyle)(SizePanel);
