import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { Checkbox } from "@material-ui/core";
import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";

class ReleaseYearPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      2001: false,
      2002: false,
      2003: false,
      2004: false,
      2005: false,
      2006: false,
      2007: false,
      2008: false,
      2009: false,
      2010: false,
      2011: false,
      2012: false,
      2013: false,
      2014: false,
      2015: false,
      2016: false,
      2017: false,
      2018: false,
      2019: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.panel}>
        <div className={classes.panelHeader}>Release Years</div>
        <div className={classes.boxesContainer}>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2001")}
              classes={{ root: classes.root }}
              color="default"
              value="2001"
            />
            <div
              className={
                this.state[2001]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2001
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2002")}
              classes={{ root: classes.root }}
              color="default"
              value="2002"
            />
            <div
              className={
                this.state[2002]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2002
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2003")}
              classes={{ root: classes.root }}
              color="default"
              value="2003"
            />
            <div
              className={
                this.state[2003]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2003
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2004")}
              classes={{ root: classes.root }}
              color="default"
              value="2004"
            />
            <div
              className={
                this.state[2004]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2004
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2005")}
              classes={{ root: classes.root }}
              color="default"
              value="2005"
            />
            <div
              className={
                this.state[2005]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2005
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2006")}
              classes={{ root: classes.root }}
              color="default"
              value="2006"
            />
            <div
              className={
                this.state[2006]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2006
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2007")}
              classes={{ root: classes.root }}
              color="default"
              value="2007"
            />
            <div
              className={
                this.state[2007]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2007
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2008")}
              classes={{ root: classes.root }}
              color="default"
              value="2008"
            />
            <div
              className={
                this.state[2008]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2008
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2009")}
              classes={{ root: classes.root }}
              color="default"
              value="2009"
            />
            <div
              className={
                this.state[2009]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2009
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2010")}
              classes={{ root: classes.root }}
              color="default"
              value="2010"
            />
            <div
              className={
                this.state[2010]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2010
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2011")}
              classes={{ root: classes.root }}
              color="default"
              value="2011"
            />
            <div
              className={
                this.state[2011]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2011
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2012")}
              classes={{ root: classes.root }}
              color="default"
              value="2012"
            />
            <div
              className={
                this.state[2012]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2012
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2013")}
              classes={{ root: classes.root }}
              color="default"
              value="2013"
            />
            <div
              className={
                this.state[2013]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2013
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2014")}
              classes={{ root: classes.root }}
              color="default"
              value="2014"
            />
            <div
              className={
                this.state[2014]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2014
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2015")}
              classes={{ root: classes.root }}
              color="default"
              value="2015"
            />
            <div
              className={
                this.state[2015]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2015
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2016")}
              classes={{ root: classes.root }}
              color="default"
              value="2016"
            />
            <div
              className={
                this.state[2016]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2016
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2017")}
              classes={{ root: classes.root }}
              color="default"
              value="2017"
            />
            <div
              className={
                this.state[2017]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2017
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2018")}
              classes={{ root: classes.root }}
              color="default"
              value="2018"
            />
            <div
              className={
                this.state[2018]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2018
            </div>
          </div>
          <div className={classes.checkboxContainer}>
            <Checkbox
              onChange={this.handleChange("2019")}
              classes={{ root: classes.root }}
              color="default"
              value="2019"
            />
            <div
              className={
                this.state[2019]
                  ? classes.checkboxValueChecked
                  : classes.checkboxValue
              }
            >
              2019
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(propageStyle)(ReleaseYearPanel);
