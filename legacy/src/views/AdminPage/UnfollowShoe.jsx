
import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Auth } from 'aws-amplify';
import DynamoDB from 'aws-sdk/clients/dynamodb';

import * as AWS from 'aws-sdk';

import ShortUniqueId from 'short-unique-id';
import axios from 'axios'
class SetShoePrice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shoe: ""
        };
    }


    shoeName = event => {
        this.setState({
            shoe: event.target.value
        })
    }

    zzzzz = event => {
        axios.post("https://api.probe.gg/protected/follow", {
            shoe: this.state.shoe,
        }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'https://probe.gg',
                },
            }).then(response => {
                console.log(response)
                alert("Perfect")
            }).catch(err => {
                alert(err)
            })
    }

    zzzzzz = event => {
        axios.post("https://api.probe.gg/protected/unfollow", {
            shoe: this.state.shoe,
        }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'https://probe.gg',
                },
            }).then(response => {
                console.log(response)
                alert("Perfect")
            }).catch(err => {
                alert(err)
            })
    }


    render() {
        return (
            <div>

                <br></br>
                <TextField
                    label="Shoe ID"
                    type="text"
                    onChange={this.shoeName}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />

                <Button onClick={this.zzzzz}>follow</Button>
                <Button onClick={this.zzzzzz}>unfollow</Button>


            </div>
        );
    }
}

export default SetShoePrice;
