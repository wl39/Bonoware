import React from "react";
import resetModal from "assets/jss/material-kit-react/views/landingPageSections/resetModal.jsx";

import { withStyles } from "@material-ui/core/styles";
import { Modal, Fade, FormControl, InputBase, Button } from "@material-ui/core";
import * as actions from "store/actions/actions";
import axios from "axios";
let script;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    opacity: "1",
    paddingTop: "30px"
  };
}

class AddressModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      postCode: "",
      address: "",
      detail: ""
    };
  }

  componentDidMount() {
    script = document.createElement("script");

    script.src =
      "https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false";
    document.body.appendChild(script);
  }

  openHandler = () => {
    window.daum.postcode.load(() => {
      const Postcode = new window.daum.Postcode({
        oncomplete: data => {
          this.setState({
            postCode: data.zonecode,
            address: data.address
          });
          // this.updatePostCode(data.zonecode);
          // this.updateAddress(data.address);
        }
      });

      Postcode.open(Postcode.wrap, {
        q: Postcode.defaultQuery,
        autoClose: Postcode.autoClose
      });
    });
  };

  change = event => {
    this.setState({
      detail: event.target.value
    });
  };

  updatePostCode = postcode => {
    this.setState({
      postCode: postcode
    });
  };

  updateAddress = address => {
    this.setState({
      address: address
    });
  };

  handleOpen = () => {
    this.props.modalHandler(true);
  };

  handleClose = () => {
    this.props.modalHandler(false);
  };

  enterToAdd = event => {
    if (event.key === "Enter") {
      this.addHandler();
    }
  };

  addHandler = () => {
    axios
      .post(
        "https://api.probe.gg/protected/changeProfile_address",
        {
          address: this.state.address + " " + this.state.detail
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://probe.gg"
          }
        }
      )
      .then(response => {
        alert("변경되었습니다.");
        this.props.addressHandler(this.state.address + " " + this.state.detail);
        this.handleClose();
      })
      .catch(err => {
        alert(err);
      });
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
            <div className={classes.addressInputContainer}>
              <div className={classes.inputContainer}>
                <div className={classes.inputLabel}>주소</div>
                <FormControl className={classes.addressInputWrapper}>
                  <InputBase
                    fullWidth
                    disabled={true}
                    placeholder="우편번호"
                    error={this.state.postCodeState === "error"}
                    value={this.state.postCode}
                    classes={{
                      root: classes.rootDisabled,

                      error: classes.error
                    }}
                  />
                  <InputBase
                    fullWidth
                    error={this.state.postCodeState === "error"}
                    placeholder="기본 주소"
                    disabled={true}
                    value={this.state.address}
                    classes={{
                      root: classes.rootDisabled,

                      error: classes.error
                    }}
                  />
                  <InputBase
                    fullWidth
                    error={this.state.addressState === "error"}
                    placeholder="상세 주소"
                    onChange={event => this.change(event)}
                    onKeyDown={this.enterToAdd}
                    classes={{
                      root:
                        this.state.addressState === "success"
                          ? classes.rootSuccess
                          : classes.root,
                      error: classes.error,
                      focused:
                        this.state.addressState === "success"
                          ? classes.focusedSuccess
                          : classes.focused
                    }}
                  />
                </FormControl>
              </div>
              <Button
                className={classes.addressSearchButton}
                onClick={this.openHandler}
              >
                주소 검색
              </Button>
              <Button
                className={classes.addressAddButton}
                onClick={this.addHandler}
              >
                변경하기
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    ) : null;
  }
}

export default withStyles(resetModal)(AddressModal);
