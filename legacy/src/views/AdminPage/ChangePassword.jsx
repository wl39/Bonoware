
import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Auth } from 'aws-amplify';
import DynamoDB from 'aws-sdk/clients/dynamodb';

import * as AWS from 'aws-sdk';

import ShortUniqueId from 'short-unique-id';
import axios from 'axios'
class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            password2: "",
            current_password: ""
        };
    }

    passwordHandler3 = event => {
        this.setState({
            current_password: event.target.value
        })
    }

    passwordHandler = event => {
        this.setState({
            password: event.target.value
        })
    }

    passwordHandler2 = event => {
        this.setState({
            password2: event.target.value
        })
    }

    zzzzz = event => {
        axios.post("https://api.probe.gg/protected/changePassword", {
            password: this.state.password,
            password2: this.state.password2,
            current_password: this.state.current_password
        }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'https://probe.gg',
                },
            }).then(response => {
                console.log(response)
                alert("Perfect")
            }).catch(err => {
                console.log(err)
                alert(err)
            })
    }

    render() {
        return (
            <div>

                <br></br>
                <TextField
                    label="current password"
                    type="text"
                    onChange={this.passwordHandler3}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <TextField
                    label="new password"
                    type="text"
                    onChange={this.passwordHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <TextField
                    label="new password 확인"
                    type="text"
                    onChange={this.passwordHandler2}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />

                <Button onClick={this.zzzzz}>changePassword</Button>

            </div>
        );
    }
}

export default ChangePassword;
