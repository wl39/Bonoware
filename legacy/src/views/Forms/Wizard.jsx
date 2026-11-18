import React from "react";

// core components
import Wizard from "components/Wizard/Wizard.jsx";

import Step0 from "./WizardSteps/Step0.jsx";
import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    paddingTop: "80px",
    "@media (max-width: 599px)": {
      paddingTop: "40px"
    }
  }
});

class WizardView extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {/* <div>0</div> */}
        <Wizard
          validate
          steps={[
            { stepName: "약관동의", stepComponent: Step0, stepId: "terms" },
            {
              stepName: "계정정보",
              stepComponent: Step1,
              stepId: "account"
            },
            { stepName: "회원정보", stepComponent: Step2, stepId: "user" },
            { stepName: "회원가입", stepComponent: Step3, stepId: "signup" }
          ]}
          title="JOIN"
        />
        {/* <div>1</div> */}
      </div>
    );
  }
}

export default withStyles(styles)(WizardView);
