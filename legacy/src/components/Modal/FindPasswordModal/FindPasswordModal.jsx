import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPageTest.jsx";
import Undo from "@material-ui/icons/Undo";

import { FormControl, InputBase, Button, IconButton } from "@material-ui/core";

class FindPasswordModal extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  render() {
    const { classes } = this.props;
    return this.props.open ? (
      <Modal
        open={this.props.open}
        onClose={() => this.props.modalHandler(false)}
      >
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
          className={classes.paper}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="undo"
            aria-label="Undo"
            color="inherit"
            onClick={() => this.props.modalHandler(false)}
          >
            <Undo style={{ fontSize: "40px", color: "white" }} />
          </IconButton>
          <div
            style={{ height: "110px" }}
            className={classes.inputContainerWrapper}
          >
            <div className={classes.inputContainer}>
              <div className={classes.inputHeader}>이메일</div>
              <FormControl className={classes.inputArea}>
                <InputBase
                  onChange={this.idHandler}
                  fullWidth
                  classes={{
                    root: classes.root,
                    focused: classes.focused
                  }}
                  type="text"
                  name="username"
                  autoComplete="username"
                />
              </FormControl>
            </div>
            <div className={classes.inputContainer}>
              <div className={classes.inputHeader}>핸드폰 번호</div>
              <FormControl className={classes.inputArea}>
                <InputBase
                  onKeyDown={this.login}
                  onChange={this.pwHandler}
                  fullWidth
                  type="text"
                  classes={{
                    root: classes.root,
                    focused: classes.focused
                  }}
                />
              </FormControl>
            </div>
          </div>
          <div className={classes.cardFooter}>
            <Button
              className={classes.loginButton}
              onClick={this.props.onLoginClicked}
              classes={{
                label: classes.loginButtonLabel
              }}
            >
              비밀번호 재설정 주소 보내기
            </Button>
          </div>
        </div>
      </Modal>
    ) : null;
  }
}

export default withStyles(loginPageStyle)(FindPasswordModal);
