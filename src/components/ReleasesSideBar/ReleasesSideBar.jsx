import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import releasesSideBarStyle from "assets/jss/material-kit-react/components/releasesSideBarStyle";
import { Checkbox } from "@material-ui/core";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const ExpansionPanel = withStyles({
  root: {
    border: "0px",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      background: "rgba(255, 255, 255, 0.875)",
      margin: "auto",
      borderBottomRightRadius: "5px",
      borderBottomLeftRadius: "5px"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    padding: "0px 0px",
    height: "32px",
    minHeight: "32px",
    margin: "10px 0px",
    "@media (max-width: 768px)": {
      lineHeight: "21px"
    },
    "&$expanded": {
      minHeight: "32px",
      height: "32px",
      marginTop: "10px",
      "@media (max-width: 768px)": {
        marginTop: "20px"
      }
    }
  },
  content: {
    margin: "10px 0px",
    height: "32px",
    "&$expanded": {
      margin: "10px 0px"
    }
  },
  expanded: {
    margin: "10px 0px"
  }
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles({
  root: {
    padding: "0px"
  }
})(MuiExpansionPanelDetails);

class ReleasesSideBar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.sidebar}>
        <div className={classes.newPrevContainer}>
          <div className={classes.newPrevCheckBox}>
            <div className={classes.newCheckBoxType}>출시 예정</div>
            <Checkbox
              className={classes.otherCheckBox}
              onChange={this.props.newPrevChange}
              checked={this.props.new}
              color="default"
              value="new"
            />
          </div>
          <div className={classes.newPrevCheckBox}>
            <div className={classes.prevCheckBoxType}>이전 출시</div>
            <Checkbox
              className={classes.otherCheckBox}
              onChange={this.props.newPrevChange}
              checked={this.props.prev}
              color="default"
              value="prev"
            />
          </div>
        </div>
        <div className={classes.mobile}>
          <ExpansionPanel className={classes.checkBoxType}>
            <ExpansionPanelSummary>
              <div className={classes.brandName}>ADIDAS</div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.drawerContainer}>
                <div className={classes.checkBoxContainer}>
                  <Checkbox
                    className={classes.checkBox}
                    onChange={this.props.handleChange("yeezy")}
                    checked={this.props.yeezy}
                    color="default"
                    value="yeezy"
                  />
                  <div className={classes.checkBoxName}>Yeezy</div>
                </div>
                <div className={classes.checkBoxContainer}>
                  <Checkbox
                    className={classes.checkBox}
                    onChange={this.props.handleChange("ultraBoost")}
                    checked={this.props.ultraBoost}
                    color="default"
                    value="ultraBoost"
                  />
                  <div className={classes.checkBoxName}>Ultra Boost</div>
                </div>
                <div className={classes.checkBoxContainer}>
                  <Checkbox
                    className={classes.checkBox}
                    onChange={this.props.handleChange("nmd")}
                    checked={this.props.nmd}
                    color="default"
                    value="nmd"
                  />
                  <div className={classes.checkBoxName}>NMD</div>
                </div>
                <div className={classes.checkBoxContainer}>
                  <Checkbox
                    className={classes.checkBox}
                    onChange={this.props.handleChange("iniki")}
                    checked={this.props.iniki}
                    color="default"
                    value="iniki"
                  />
                  <div className={classes.checkBoxName}>Iniki</div>
                </div>
                <div className={classes.lastCheckBoxContainer}>
                  <Checkbox
                    className={classes.checkBox}
                    onChange={this.props.handleChange("aOther")}
                    checked={this.props.aOther}
                    color="default"
                    value="aOther"
                  />
                  <div className={classes.checkBoxName}>Other</div>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel className={classes.checkBoxType}>
            <ExpansionPanelSummary>
              <div className={classes.brandName}>Nike</div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.drawerContainer}>
                <div className={classes.checkBoxContainer}>
                  <Checkbox
                    className={classes.checkBox}
                    onChange={this.props.handleChange("airJordan")}
                    checked={this.props.airJordan}
                    color="default"
                    value="airJordan"
                  />
                  <div className={classes.checkBoxName}>Air Jordan</div>
                </div>
                <div className={classes.checkBoxContainer}>
                  <Checkbox
                    className={classes.checkBox}
                    onChange={this.props.handleChange("airForce")}
                    checked={this.props.airForce}
                    color="default"
                    value="airForce"
                  />
                  <div className={classes.checkBoxName}>Air Force</div>
                </div>
                <div className={classes.checkBoxContainer}>
                  <Checkbox
                    className={classes.checkBox}
                    onChange={this.props.handleChange("airMax")}
                    checked={this.props.airMax}
                    color="default"
                    value="airMax"
                  />
                  <div className={classes.checkBoxName}>Air Max</div>
                </div>
                <div className={classes.lastCheckBoxContainer}>
                  <Checkbox
                    className={classes.checkBox}
                    onChange={this.props.handleChange("nOther")}
                    checked={this.props.nOther}
                    color="default"
                    value="nOther"
                  />
                  <div className={classes.checkBoxName}>Other</div>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <div className={classes.otherContainer}>
            <div className={classes.otherText}>Other</div>
            <Checkbox
              className={classes.otherCheckBox}
              onChange={this.props.handleChange("other")}
              checked={this.props.other}
              color="default"
              value="other"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(releasesSideBarStyle)(ReleasesSideBar);
