import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";

import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

class CustomWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      registerClicked: false,
      nextButton: this.props.steps.length > 1 ? true : false,
      previousButton: false,
      finishButton: this.props.steps.length === 1 ? true : false,
      allStates: {}
    };
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
  }

  render() {
    const { classes, title, subtitle, color, steps } = this.props;
    const didUserPressRegister = () => {
      if (!this.state.registerClicked) {
        return (
          <div className={classes.wizardContainer} ref="wizard">
            <Card className={classes.card}>
              <div className={classes.wizardHeader}>
                <h3 className={classes.title}>{title}</h3>
                <h5 className={classes.subtitle}>{subtitle}</h5>
              </div>
              <div className={classes.wizardNavigation}>
                {/* <div className={classes.nav}>
                    {steps[this.state.currentStep].stepName}
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
                </div> */}
                <div
                  className={classes.movingTab + " " + classes[color]}
                  style={this.state.movingTabStyle}
                >
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
                <div className={classes.left}>
                  {this.state.previousButton ? (
                    <Button
                      className={this.props.previousButtonClasses}
                      onClick={() => this.previousButtonClick()}
                    >
                      {this.props.previousButtonText}
                    </Button>
                  ) : null}
                </div>
                <div className={classes.right}>
                  {this.state.nextButton ? (
                    <Button
                      color="rose"
                      className={this.props.nextButtonClasses}
                      onClick={() => this.nextButtonClick()}
                    >
                      {this.props.nextButtonText}
                    </Button>
                  ) : null}
                  {this.state.finishButton ? (
                    // <Link to="/">
                    <Button
                      color="rose"
                      className={this.props.nextButtonClasses}
                      onClick={() => this.finishButtonClick()}
                    >
                      {this.props.finishButtonText}
                    </Button>
                  ) : // </Link>
                    null}
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
