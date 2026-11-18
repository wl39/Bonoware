import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import React from "react";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  iconButton: {
    padding: "0px",
    "&:hover": {
      color: "black !important"
    }
  },
  label: {
    "&:hover": {
      borderColor: "black !important"
    }
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      desgin: false,
      code: false,
      develop: false
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  isValidated() {
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h4 className={classes.infoText}>무엇을 하러 오셨나요?</h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={6}>
                <div className={classes.choiche}>
                  <Checkbox
                    className={classes.iconButton}
                    tabIndex={-1}
                    onClick={this.handleChange("desgin")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-pencil-alt " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-pencil-alt " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                      label: classes.label
                    }}
                  />
                  <h5>판매</h5>
                </div>
              </GridItem>

              <GridItem xs={12} sm={6}>
                <div className={classes.choiche}>
                  <Checkbox
                    className={classes.iconButton}
                    tabIndex={-1}
                    onClick={this.handleChange("develop")}
                    checkedIcon={
                      <i
                        className={"fas fa-laptop " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fas fa-laptop " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                      label: classes.label
                    }}
                  />
                  <h5>구매</h5>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(style)(Step3);
