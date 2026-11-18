import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import * as AWS from 'aws-sdk'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import axios from 'hoc/axios-connect/axios-connect';
import TextField from '@material-ui/core/TextField';
import moment from "moment";
import 'moment/locale/ko';
import Input from '@material-ui/core/Input';
import Amplify, { Analytics, Auth, API } from 'aws-amplify';

global.fetch = require('node-fetch');



class LoginOut extends Component {
    state = {
        authenticated: null
    }
    signinHandler = (event) => {
        Auth.signIn("HELLOWORLD", "PASSwordHi1@")
            .then(user => {
                this.setState({
                    authenticated: user.username
                })
            })
            .catch(err => alert(err.message));

        let session = Auth.currentSession();
    }

    signoutHandler = (event) => {
        this.setState({
            authenticated: null
        })
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    checkUserHandler = (event) => {
        console.log(Auth.currentAuthenticatedUser())
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
            .then(
                (data) => {
                    this.setState({
                        authenticated: data.username
                    })
                }
            )
    }

    componentDidMount() {
        if (this.state.authenticated === null) {

        }
    }

    render() {

        const checker = () => {
            if (this.state.authenticated === null) {
                return <Button onClick={this.signinHandler}>TEST Login</Button>
            }
            else {
                return <Button onClick={this.signoutHandler}>TEST signout</Button>
            }
        }

        return (
            <div>
                <br />
                HERE
                {checker()}
                <br />
                <Button onClick={this.checkUserHandler}>TEST USER</Button>
                <br />
                {this.state.authenticated}
                <br />
            </div>
        );
    }
};

export default LoginOut;
