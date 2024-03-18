import React from "react";
import onClickOutside from "react-onclickoutside";
import axios from "axios";

class ClickOutSideInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailState: "",
      doesUserExist: "",
      saveEmailState: "",
      errorColor: "error"
    };
  }

  handleClickOutside = evt => {
    if (
      this.state.emailState === "success" &&
      this.state.saveEmailState !== this.state.email
    ) {
      axios
        .post(
          "https://api.probe.gg/open/checkEmailInUse",
          {
            email: this.state.email
          },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "https://probe.gg"
            }
          }
        )
        .then(response => {
          if (response.data.error) {
            this.setState({
              doesUserExist: "사용중인 이메일입니다. 다른이메일을 선택해주세요",
              saveEmailState: this.state.email
            });
            this.props.changeToError("error");
          } else if (response.data.success) {
            this.setState({
              doesUserExist: "사용가능한 이메일입니다",
              saveEmailState: this.state.email
            });
          }
        })
        .catch(err => {
          this.setState({
            doesUserExist: "인터넷이 불안정합니다. 다시 시도해주세요.",
            saveEmailState: this.state.email
          });
          this.props.changeToError("error");
        });
    }
  };

  changeToError() {
    this.props.changeToError(this.state.errorColor);
  }

  render() {
    props => props.children;

    (this.state.email = this.props.email),
      (this.state.emailState = this.props.emailState);

    //console.log(this.props.changeToError)
    this.changeToError.bind(this);

    return (
      <div>
        {this.props.children}
        <div style={{ textAlign: "center" }}>{this.state.doesUserExist}</div>
      </div>
    );
  }
}

export default onClickOutside(ClickOutSideInput);
