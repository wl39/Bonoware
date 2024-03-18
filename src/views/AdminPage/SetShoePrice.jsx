
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
            title: "",
            writer: ""
        };
    }



    newTitleHandler = event => {
        this.setState({
            title: event.target.value
        })
    }


    newWriterHandler = event => {
        this.setState({
            writer: event.target.value
        })
    }

    zzzzz = event => {
        axios.post("https://api.probe.gg/protected/initializePrice", {
            price: this.state.title * 1,
            shoe: this.state.writer,
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
        axios.post("https://api.probe.gg/protected/changePrice", {
            price: this.state.title * 1,
            shoe: this.state.writer,
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
                    onChange={this.newWriterHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <TextField
                    label="Shoe Price"
                    type="text"
                    onChange={this.newTitleHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />

                <Button onClick={this.zzzzz}>init shoe price</Button>
                <Button onClick={this.zzzzzz}>change shoe price</Button>


            </div>
        );
    }
}

export default SetShoePrice;
