import React from "react";
import resetModal from "assets/jss/material-kit-react/views/landingPageSections/resetModal.jsx";

import { withStyles } from "@material-ui/core/styles";
import { Modal, Fade, InputBase, Button } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    opacity: "1",
    display: "flex",
    flexDirection: "column",
    paddingTop: "70px",
    paddingRight: "40px",
    height: "360px"
  };
}

class AccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      accountNum: ""
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
            <div className={classes.nameInputContainer}>
              <div className={classes.accountInputLabel}>이름</div>
              <InputBase
                fullWidth
                value={this.state.name}
                classes={{
                  root: classes.root,
                  error: classes.error,
                  focused: classes.focused
                }}
              />
            </div>
            <div className={classes.nameInputContainer}>
              <div className={classes.accountInputLabel}>계좌 번호</div>
              <InputBase
                fullWidth
                value={this.state.accountNum}
                classes={{
                  root: classes.root,
                  error: classes.error,
                  focused: classes.focused
                }}
              />
            </div>
            <Button className={classes.accountAddButton}>변경하기</Button>
          </div>
        </Fade>
      </Modal>
    ) : null;
  }
}

export default withStyles(resetModal)(AccountModal);
