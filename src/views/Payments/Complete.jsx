import React from "react";
import { withStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import paymentsComplete from "assets/jss/material-kit-react/views/landingPageSections/paymentsComplete.jsx";
class Complete extends React.Component {
  render() {
    const { classes } = this.props;
    console.log(this.props);
    if (!this.props.location.state) {
      return <Redirect push to="/" />;
    }

    return (
      <div className={classes.container}>
        결제가 완료되었습니다
        <div>{this.props.location.state.msg}</div>
      </div>
    );
  }
}

export default withStyles(paymentsComplete)(Complete);
