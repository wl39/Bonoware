import React from "react";
// import releaseDatePanelModal from "assets/jss/material-kit-react/views/landingPageSections/releaseDatePanelModal.jsx";

import { withStyles } from "@material-ui/core/styles";

class ReleaseDatePanelModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    const { classes } = this.props;
    return <div className={classes.paper}></div>;
  }
}
// releaseDatePanelModal
export default withStyles(null)(ReleaseDatePanelModal);
