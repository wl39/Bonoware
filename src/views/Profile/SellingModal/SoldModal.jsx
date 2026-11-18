import React from "react";
import soldModal from "assets/jss/material-kit-react/views/landingPageSections/soldModal.jsx";

import { withStyles } from "@material-ui/core/styles";
import { Modal, Fade, FormControl, InputBase, Button } from "@material-ui/core";
// import * as actions from "store/actions/actions";

// import axios from "axios";

function getModalStyle() {
  return {
    opacity: "1",
    display: "flex",
    flexDirection: "column",
    paddingTop: "30px"
  };
}

class SoldModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      postCode: "",
      address: "",
      detail: ""
    };
  }

  componentDidMount() {}

  handleOpen = () => {
    this.props.modalHandler(true, "");
  };

  handleClose = () => {
    this.props.modalHandler(false, "");
  };

  render() {
    const { classes } = this.props;

    return this.props.open ? (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.handleClose}
      >
        <Fade in={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            {this.props.sid}
          </div>
        </Fade>
      </Modal>
    ) : null;
  }
}

export default withStyles(soldModal)(SoldModal);
