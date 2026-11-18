import React from "react";
import resetModal from "assets/jss/material-kit-react/views/landingPageSections/resetModal.jsx";

import { withStyles } from "@material-ui/core/styles";
import { Modal, Fade } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    opacity: "1"
  };
}

class ResetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleOpen = () => {
    this.props.modalHandler(true);
  };

  handleClose = () => {
    this.props.modalHandler(false);
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
            <div>{this.props.email} 로 메일을 보냈습니다.</div>
            <div>이메일 확인 후, 비밀번호를 재설정 해주시길 바랍니다.</div>
          </div>
        </Fade>
      </Modal>
    ) : null;
  }
}

export default withStyles(resetModal)(ResetModal);
