import React from "react";
import recapStyle from "assets/jss/material-kit-react/views/landingPageSections/recap.jsx";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import { withStyles } from "@material-ui/core/styles";

class Recap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
      month: null,
      day: null,
      verifiedHover: false,
      notVerifiedHover: false,
    };
  }

  verifiedEnter = () => {
    this.setState({
      verifiedHover: true
    })
  }

  verifiedLeave = () => {
    this.setState({
      verifiedHover: false
    })
  }

  notVerifiedEnter = () => {
    this.setState({
      notVerifiedHover: true
    })
  }

  notVerifiedLeave = () => {
    this.setState({
      notVerifiedHover: false
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.greeting}>
          <div>{this.props.data.name}님, 환영합니다</div>
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.chip}>개인 정보</div>
          <div className={classes.flexContainer}>
            <div>주소</div>
            <div>{this.props.data.address}</div>
          </div>
          <div className={classes.flexContainer}>
            <div>생년월일</div>
            <div>{this.props.data.birthdate}</div>
          </div>
          <div className={classes.flexContainer}>
            <div>이메일</div>
            <div className={classes.emailVerified}>
              {this.props.data.email}
              {this.props.data.email_verified ? (
                <div className={classes.verified}>
                  <CheckCircleOutline onMouseEnter={this.verifiedEnter} onMouseLeave={this.verifiedLeave} />
                  {this.state.verifiedHover ? <div className={classes.emailHover}>인증 완료된 이메일 입니다!</div> : null}
                </div>
              ) : (
                <div className={classes.notVerified}>
                  <ErrorOutline onMouseEnter={this.notVerifiedEnter} onMouseLeave={this.notVerifiedLeave} />
                  {this.state.notVerifiedHover ? <div className={classes.emailHover}>아직 인증되지 않은 이메일 입니다</div> : null}
                </div>
              )}
            </div>
          </div>
          <div className={classes.flexContainer}>
            <div>핸드폰 번호</div>
            <div className={classes.phoneVerified}>
              {this.props.data.phone_number}
              {this.props.data.phone_number_verified ? (
                <div className={classes.verified}>
                  <CheckCircleOutline onMouseEnter={this.verifiedEnter} onMouseLeave={this.verifiedLeave} />
                  {this.state.verifiedHover ? <div className={classes.phoneHover}>인증 완료된 번호 입니다!</div> : null}
                </div>
              ) : (
                <div className={classes.notVerified}>
                  <ErrorOutline onMouseEnter={this.notVerifiedEnter} onMouseLeave={this.notVerifiedLeave} />
                  {this.state.notVerifiedHover ? <div className={classes.phoneHover}>아직 인증되지 않은 번호 입니다</div> : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(recapStyle)(Recap);
