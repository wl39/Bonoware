import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.jsx";

import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
class Wizard extends React.Component {
  constructor(props) {
    super(props);
    var width;
    if (this.props.steps.length === 1) {
      width = "100%";
    } else {
      if (window.innerWidth < 600) {
        if (this.props.steps.length !== 3) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      } else {
        if (this.props.steps.length === 2) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      }
    }
    this.state = {
      currentStep: 0,
      color: this.props.color,
      registerClicked: false,
      nextButton: this.props.steps.length > 1 ? true : false,
      previousButton: false,
      finishButton: this.props.steps.length === 1 ? true : false,
      width: width,
      movingTabStyle: {
        transition: "transform 0s"
      },
      allStates: {}
    };
    this.navigationStepChange = this.navigationStepChange.bind(this);
    this.refreshAnimation = this.refreshAnimation.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
  }
  componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener("resize", this.updateWidth);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }
  updateWidth() {
    this.refreshAnimation(this.state.currentStep);
  }
  navigationStepChange(key) {
    if (this.props.steps) {
      var validationState = true;
      if (key > this.state.currentStep) {
        for (var i = this.state.currentStep; i < key; i++) {
          if (this[this.props.steps[i].stepId].sendState !== undefined) {
            this.setState({
              allStates: [
                ...this.state.allStates,
                {
                  [this.props.steps[i].stepId]: this[
                    this.props.steps[i].stepId
                  ].sendState()
                }
              ]
            });
          }
          if (
            this[this.props.steps[i].stepId].isValidated !== undefined &&
            this[this.props.steps[i].stepId].isValidated() === false
          ) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        this.setState({
          currentStep: key,
          nextButton: this.props.steps.length > key + 1 ? true : false,
          previousButton: key > 0 ? true : false,
          finishButton: this.props.steps.length === key + 1 ? true : false
        });
        this.refreshAnimation(key);
      }
    }
  }
  nextButtonClick() {
    if (
      (this.props.validate && // herezsdfzsdf
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined)) ||
      this.props.validate === undefined
    ) {
      if (
        this[this.props.steps[this.state.currentStep].stepId].sendState !==
        undefined
      ) {
        this.setState({
          allStates: [
            ...this.state.allStates,
            {
              [this.props.steps[this.state.currentStep].stepId]: this[
                this.props.steps[this.state.currentStep].stepId
              ].sendState()
            }
          ]
        });
      }
      var key = this.state.currentStep + 1;
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);
    }
  }
  previousButtonClick() {
    if (
      this[this.props.steps[this.state.currentStep].stepId].sendState !==
      undefined
    ) {
      this.setState({
        allStates: [
          ...this.state.allStates,
          {
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState()
          }
        ]
      });
    }
    var key = this.state.currentStep - 1;
    if (key >= 0) {
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);
    }
  }
  finishButtonClick() {
    if (
      this.props.validate &&
      ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
        undefined &&
        this[this.props.steps[this.state.currentStep].stepId].isValidated()) ||
        this[this.props.steps[this.state.currentStep].stepId].isValidated ===
          undefined) &&
      this.props.finishButtonClick !== undefined
    ) {
      this.props.finishButtonClick();
    }

    const variables = this.state.allStates;

    let items = {
      name: "",
      password: "",
      password2: "",
      email: "",
      address: "",
      birthday: "",
      phoneNumber: "",
      nick_name: ""
    };

    //console.log(variables)

    for (let x = 0; x < variables.length; x++) {
      if (variables[x].account) {
        items.email = variables[x].account.email;
        items.name = variables[x].account.name;
        items.password = variables[x].account.password;
        items.password2 = variables[x].account.passwordCheck;
      }
      if (variables[x].user) {
        items.address = variables[x].user.address;
        items.birthday = variables[x].user.birthday;
        items.phoneNumber = variables[x].user.usingPhoneNumber;
        items.nick_name = variables[x].user.nickname;
      }
    }
    console.log(items.nick_name);
    axios
      .post(
        "https://api.probe.gg/auth/register",
        {
          // name pssword password2 address phone birthday
          email: items.email,
          nick_name: items.nick_name,
          password: items.password,
          password2: items.password2,
          phone: items.phoneNumber,
          address: items.address,
          birthday: items.birthday,
          name: items.name
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
        if (response.data.errors) {
          alert("에러 이미 사용중인 닉네임이거나 이메일입니다");
        } else {
          alert("Perfect");
          this.setState({
            registerClicked: true
          });
        }
      })
      .catch(err => {
        alert(err);
      });

    // Auth.signUp({
    //   username: items.email,
    //   password: items.password,
    //   attributes: {
    //     email: items.email,          // optional
    //     phone_number: items.phoneNumber,   // optional - E.164 number convention
    //     address: items.address,
    //     birthdate: items.birthday,
    //     name: items.name
    //     // other custom attributes
    //   },
    //   validationData: []  //optional
    // })
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
  }

  refreshAnimation(index) {
    try {
      var total = this.props.steps.length;
      var li_width = 100 / total;
      var total_steps = this.props.steps.length;
      var move_distance =
        this.refs.wizard.children[0].offsetWidth / total_steps;
      var index_temp = index;
      var vertical_level = 0;

      var mobile_device = window.innerWidth < 600 && total > 3;

      if (mobile_device) {
        move_distance = this.refs.wizard.children[0].offsetWidth / 2;
        index_temp = index % 2;
        li_width = 50;
      }

      this.setState({ width: li_width + "%" });

      var step_width = move_distance;
      move_distance = move_distance * index_temp;

      var current = index + 1;

      if (current === 1 || (mobile_device === true && index % 2 === 0)) {
        move_distance -= 8;
      } else if (
        current === total_steps ||
        (mobile_device === true && index % 2 === 1)
      ) {
        move_distance += 8;
      }

      if (mobile_device) {
        vertical_level = parseInt(index / 2, 10);
        vertical_level = vertical_level * 38;
      }
      var movingTabStyle = {
        width: step_width,
        transform:
          "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
        transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
      };
      this.setState({ movingTabStyle: movingTabStyle });
    } catch (err) {}
  }
  render() {
    const { classes, title, subtitle, steps } = this.props;
    const didUserPressRegister = () => {
      if (!this.state.registerClicked) {
        return (
          <div className={classes.wizardContainer} ref="wizard">
            <div className={classes.wizardIndexLeft}>
              {this.state.currentStep + 1}
            </div>
            <div className={classes.wizardIndexRight}>4</div>
            <Card className={classes.card}>
              <div className={classes.wizardHeader}>
                <h3 className={classes.title}>{title}</h3>
              </div>
              <div className={classes.wizardNavigation}>
                {/* <ul className={classes.nav}>
                  {console.log(steps[this.state.currentStep])}
                  {console.log(this.state.currentStep)}
                  {steps.map((prop, key) => {
                    return (
                      <li
                        className={classes.steps}
                        key={key}
                        style={{ width: this.state.width }}
                      >
                        <a
                          className={classes.stepsAnchor}
                          onClick={() => this.navigationStepChange(key)}
                        >
                          {prop.stepName}
                        </a>
                      </li>
                    );
                  })}
                </ul> */}
                <div className={classes.subtitle}>
                  {steps[this.state.currentStep].stepName}
                </div>
              </div>
              <div className={classes.content}>
                {steps.map((prop, key) => {
                  const stepContentClasses = cx({
                    [classes.stepContentActive]: this.state.currentStep === key,
                    [classes.stepContent]: this.state.currentStep !== key
                  });
                  return (
                    <div className={stepContentClasses} key={key}>
                      <prop.stepComponent
                        innerRef={node => (this[prop.stepId] = node)}
                        allStates={this.state.allStates}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={classes.footer}>
                <div className={classes.up}>
                  {this.state.nextButton ? (
                    <Button
                      className={classes.next}
                      onClick={() => this.nextButtonClick()}
                    >
                      {this.props.nextButtonText}
                    </Button>
                  ) : null}
                  {this.state.finishButton ? (
                    // <Link to="/">
                    <Button
                      className={classes.next}
                      onClick={() => this.finishButtonClick()}
                    >
                      {this.props.finishButtonText}
                    </Button>
                  ) : // </Link>
                  null}
                </div>
                <div className={classes.down}>
                  {this.state.previousButton ? (
                    <Button
                      className={classes.prev}
                      onClick={() => this.previousButtonClick()}
                    >
                      {this.props.previousButtonText}
                    </Button>
                  ) : null}
                </div>
                <div className={classes.clearfix} />
              </div>
            </Card>
          </div>
        );
      } else {
        return (
          <div ref="wizardSuccess">
            <Card className={classes.card} style={{ minHeight: "0px" }}>
              <div
                className={classes.wizardHeader}
                style={{ paddingBottom: "20px" }}
              >
                <h3 className={classes.title}>회원가입 성공!</h3>
                <h5 className={classes.subtitle}>
                  프로브의 회원이 되신것을 진심으로 축하드립니다
                </h5>

                <h5 className={classes.subtitle}>
                  이메일 인증후 로그인 부탁드립니다
                </h5>
                <div style={{ paddingTop: "20px" }}>
                  <Link to="/">
                    <Button color="rose" className={this.finishButtonClasses}>
                      홈페이지로 이동
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        );
      }
    };

    return <div>{didUserPressRegister()}</div>;
  }
}

Wizard.defaultProps = {
  color: "rose",
  title: "Here should go your title",
  subtitle: "",
  previousButtonText: "이전",
  previousButtonClasses: "",
  nextButtonClasses: "",
  nextButtonText: "다음",
  finishButtonClasses: "",
  finishButtonText: "가입하기"
};

Wizard.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.func.isRequired,
      stepId: PropTypes.string.isRequired
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  finishButtonClick: PropTypes.func,
  validate: PropTypes.bool
};

export default withStyles(wizardStyle)(Wizard);
