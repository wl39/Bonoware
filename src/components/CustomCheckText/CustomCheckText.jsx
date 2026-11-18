import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import CustomCheckTextStyle from "assets/jss/material-kit-react/components/CustomCheckTextStyle";

class CustomCheckText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  clicked = () => {
    this.setState(
      {
        checked: !this.state.checked
      },
      () => {
        this.state.checked
          ? this.props.checked(this.props.name)
          : this.props.unchecked(this.props.name);
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        className={this.state.checked ? classes.checked : classes.unchecked}
        onClick={this.clicked}
      >
        {this.props.name}
      </div>
    );
  }
}

export default withStyles(CustomCheckTextStyle)(CustomCheckText);
