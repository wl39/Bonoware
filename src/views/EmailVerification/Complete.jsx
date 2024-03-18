import React from "react";
import { withStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import paymentsComplete from "assets/jss/material-kit-react/views/landingPageSections/paymentsComplete.jsx";
import queryString from 'query-string';

class Complete extends React.Component {
    componentDidMount() {
        let params = queryString.parse(this.props.location.search)
        console.log(params)
        fetch('https://cognito-idp.ap-northeast-2.amazonaws.com', {
            method: 'POST',
            headers: {
                'x-amz-target': "AWSCognitoIdentityProviderService.ConfirmSignUp",
                'Content-Type': 'application/x-amz-json-1.1',
            },
            body: JSON.stringify({
                "ClientId": params.clientId,
                "ConfirmationCode": params.code,
                "Username": params.username
            })
        })
    }
    render() {
        const { classes } = this.props;
        // console.log(this.props)
        // if (!this.props.location.state) {
        //   return <Redirect push to="/" />;
        // }

        return (
            <div className={classes.container}>
                이메일 인증 성공하셨습니당
             </div>
        );
    }
}

export default withStyles(paymentsComplete)(Complete);
