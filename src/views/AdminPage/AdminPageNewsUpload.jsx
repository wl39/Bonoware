
import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Auth } from 'aws-amplify';
import DynamoDB from 'aws-sdk/clients/dynamodb';

import * as AWS from 'aws-sdk';

import ShortUniqueId from 'short-unique-id';

class AdminPageNewsUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            title: "",
            body: "",
            writer: ""
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: picture,
        });
    }

    newTitleHandler = event => {
        this.setState({
            title: event.target.value
        })
    }

    newBodyHandler = event => {
        this.setState({
            body: event.target.value
        })
    }

    newWriterHandler = event => {
        this.setState({
            writer: event.target.value
        })
    }

    createNewsHandler = event => {
        const formData = new FormData()
        this.state.pictures.forEach((file, i) => {
            formData.append(i, file)
        });
        formData.append("title", this.state.title)
        formData.append("body", this.state.body)
        formData.append("writer", this.state.writer)

        fetch("https://api.probe.gg/admin/createNews", {
            method: "POST",
            body: formData
        }).then(function (res) {
            if (res.ok) {
                alert("Perfect! ");
            } else {
                alert("Oops! ");
            }
        }, function (e) {
            alert("Error submitting form!");
        });
    }


    render() {
        return (
            <div>
                <ImageUploader
                    withIcon={true}
                    withPreview
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                    maxFileSize={5242880}
                />
                <br />


                <TextField
                    label="뉴스 작성자명"
                    type="text"
                    onChange={this.newWriterHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <TextField
                    label="뉴스 제목"
                    type="text"
                    onChange={this.newTitleHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />

                <TextField
                    onChange={this.newBodyHandler}
                    style={{ width: "100%" }}
                    id="standard-textarea"
                    label="내용"
                    placeholder="내용을 입력해주세요!"
                    multiline
                    margin="normal"
                />
                <br />

                <Button onClick={this.createNewsHandler}>뉴스 추가하기</Button>



            </div>
        );
    }
}

export default AdminPageNewsUpload;
