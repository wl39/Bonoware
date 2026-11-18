import React from "react";
import editPriceModal from "assets/jss/material-kit-react/views/landingPageSections/editPriceModal.jsx";

import { withStyles } from "@material-ui/core/styles";
import { Modal, Fade, Button } from "@material-ui/core";

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
    paddingTop: "30px",
    height: "360px"
  };
}

class EditPriceModal extends React.Component {
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
            <div className={classes.modalHeader}>변경 전 안내사항</div>
            <div className={classes.detailText}>
              한번 변경한 가격은 1분동안 변경하지 못합니다.
            </div>
            <div className={classes.detailText}>
              변경된 가격에 대한 금전적 손해 또는 배상은 Probe가 책임지지
              않습니다.
            </div>
            <div className={classes.priceToChange}>
              <div className={classes.priceToChangeHeader}>변경희망 가격</div>
              <div>{"₩" + this.props.newPrice.toLocaleString()}</div>
            </div>
            <div className={classes.detailText}>
              변경을 희망하시면 변경하기 버튼을 눌러주세요.
            </div>
            <Button
              className={classes.editPriceButton}
              onClick={() =>
                this.props.updatePriceHandler(
                  this.props.shoeData._id,
                  this.props.shoeData.price,
                  this.props.shoeData.onSale
                )
              }
            >
              변경하기
            </Button>
          </div>
        </Fade>
      </Modal>
    ) : null;
  }
}

export default withStyles(editPriceModal)(EditPriceModal);
