import React from "react";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import sellPage from "assets/jss/material-kit-react/views/landingPageSections/sellPage.jsx";
import { Button, Checkbox } from "@material-ui/core";
import Step0 from "../../views/Forms/WizardSteps/Step0.jsx";

class SellPage extends React.Component {
  state = {
    checked: false
  };

  changeHandler = () => event => {
    this.setState({ checked: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.indexLeft}>1</div>
        <div className={classes.indexRight}>2</div>
        <div className={classes.card}>
          <div className={classes.title}>SELL</div>
          <div className={classes.subtitle}>이용약관</div>
          <div className={classes.contents}>
            <Step0
              checked={this.state.checked}
              sell={true}
              changeHandler={() => this.changeHandler()}
            />
          </div>
        </div>
        {this.state.checked ? (
          <Link
            to={{
              pathname: "/sell/details",
              state: {
                checked: this.state.checked
              }
            }}
          >
            <Button className={classes.next}>다음</Button>
          </Link>
        ) : (
          <Button
            className={classes.next}
            classes={{ disabled: classes.disabled }}
            disabled={true}
          >
            다음
          </Button>
        )}
      </div>
    );
  }
}

export default withStyles(sellPage)(SellPage);
