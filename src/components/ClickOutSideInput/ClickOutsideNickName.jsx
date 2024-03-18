import React from "react";
import onClickOutside from "react-onclickoutside";
import axios from "axios";

class ClickOutsideNickName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      nicknameState: "",
      doesUserExist: "",
      saveNicknameState: "",
      errorColor: "error"
    };
  }

  handleClickOutside = evt => {
    if (
      this.state.nicknameState === "success" &&
      this.state.saveNicknameState !== this.state.nickname
    ) {
      axios
        .post(
          "https://api.probe.gg/open/checkNickNameInUse",
          {
            nick_name: this.state.nickname
          },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "https://probe.gg"
            }
          }
        )
        .then(response => {
          console.log(response);
          if (response.data.error) {
            this.setState({
              doesUserExist: "사용중인 닉네임입니다. 다른닉네임을 선택해주세요",
              saveEmailState: this.state.nickname
            });
            this.props.changeToError("error");
          } else if (response.data.success) {
            this.setState({
              doesUserExist: "사용가능한 닉네임입니다",
              saveNicknameState: this.state.nickname
            });
          }
        })
        .catch(err => {
          this.setState({
            doesUserExist: "인터넷이 불안정합니다. 다시 시도해주세요.",
            saveNicknameState: this.state.nickname
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

    (this.state.nickname = this.props.nickname),
      (this.state.nicknameState = this.props.nicknameState);

    //console.log(this.props.changeToError)
    this.changeToError.bind(this);

    return (
      <div>
        {this.props.children}
        <div>{this.state.doesUserExist}</div>
      </div>
    );
  }
}

export default onClickOutside(ClickOutsideNickName);
