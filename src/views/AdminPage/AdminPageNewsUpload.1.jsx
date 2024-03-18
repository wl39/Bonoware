
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
        this.state = { pictures: [], title: "", body: "" };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {

        this.setState({
            pictures: picture,
        });
    }

    titleHandler = (event) => {
        console.log(event.target.value)
        this.setState({
            title: event.target.value
        })
    }

    bodyHandler = (event) => {
        console.log(event.target.value)
        this.setState({
            body: event.target.value
        })
    }
    uploadHandler2 = (event) => {
        console.log(this.state.pictures)
        let a = new Map();
        for (let x = 0; x < this.state.pictures.length; x++) {
            a.set(x, "images/news/" + 6 + "/" + this.state.pictures[x].name)
        }
        console.log(a)
    }

    uploadHandler = (event) => {
        if (this.state.pictures.length !== 0 && this.state.title !== "" && this.state.body !== "") {


            Auth.currentCredentials()
                .then(credentials => {
                    const db = new DynamoDB.DocumentClient({
                        credentials: Auth.essentialCredentials(credentials)
                    })

                    // let updateParam = {
                    //     TableName: "Etc",
                    //     Key: {
                    //         Contents: "NewsMaxIssueNum"
                    //     },
                    //     UpdateExpression: "add #MaxIssueNum :MaxIssueNum",
                    //     ExpressionAttributeNames: {
                    //         '#MaxIssueNum': 'MaxIssueNum'
                    //     },
                    //     ExpressionAttributeValues: {
                    //         ":MaxIssueNum": 1
                    //     },
                    //     ReturnValues: "ALL_NEW"
                    // }


                    var updateParam = {
                        TableName: "ShoeNews",
                        KeyConditionExpression: "#News = :News",
                        ExpressionAttributeNames: {
                            "#News": "News"
                        },
                        ExpressionAttributeValues: {
                            ":News": "ShoeNews"
                        },
                        ScanIndexForward: false,
                        Limit: 1
                    };

                    db.query(updateParam, (err, data) => {
                        if (err) console.log(err);
                        else {
                            //console.log(data.Attributes.MaxIssueNum)


                            const s3 = new AWS.S3({
                                Bucket: 'probe.gg',
                                region: 'ap-northeast-2',
                                credentials: Auth.essentialCredentials(credentials)
                            });


                            this.state.pictures.forEach(key => {
                                let params = {
                                    Bucket: "probe.gg",
                                    region: 'ap-northeast-2',
                                    Key: "images/news/" + (data.Items[0].IssueNum + 1) + "/" + key.name,
                                    Body: key,
                                    ACL: "public-read"
                                };
                                s3.upload(params, (err, data) => {
                                    if (err) console.log(err)
                                    else console.log(data)
                                })

                            })
                            let a = {};

                            for (let x = 0; x < this.state.pictures.length; x++) {
                                a[x] = "https://s3.ap-northeast-2.amazonaws.com/probe.gg/images/news/" + (data.Items[0].IssueNum + 1) + "/" + this.state.pictures[x].name
                            }
                            var d = new Date(),
                                month = '' + (d.getMonth() + 1),
                                day = '' + d.getDate(),
                                year = d.getFullYear();

                            if (month.length < 2) month = '0' + month;
                            if (day.length < 2) day = '0' + day;


                            let paramsUpdateShoeNews = {
                                TableName: "ShoeNews",
                                Item: {
                                    News: "ShoeNews",
                                    IssueNum: data.Items[0].IssueNum + 1,
                                    DatePublished: [year, month, day].join('-'),
                                    Contents: this.state.body,
                                    Image: a,
                                    NewsTitle: this.state.title,
                                    ViewCount: 0
                                }
                            }
                            db.put(paramsUpdateShoeNews, (err, data) => {
                                if (err) console.log(err);
                                else console.log(data.Items);
                            })
                            //https://s3.ap-northeast-2.amazonaws.com/probe.gg/images/news/6/cgd-nike-air-footscape-1.jpg
                        }
                    })
                }
                )
        }
        else {
            alert("아니 시브어얼 이미지랑 제목 내용 추가하시라구요!")
        }

    }


    checkCommentHandler = (event) => {
        Auth.currentCredentials()
            .then(credentials => {

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })


                var params = {
                    TableName: "Comments",
                    KeyConditionExpression: "#Name = :Name",
                    ExpressionAttributeNames: {
                        "#Name": "Name"
                    },
                    ExpressionAttributeValues: {
                        ":Name": "FirstNews"
                    },
                    ScanIndexForward: true
                };

                db.query(params, (err, data) => {
                    if (err) console.log(err);
                    else {
                        console.log(data)
                    }
                })
            })
    }

    addCommentHandler = (event) => {
        let name = "Air Force 1 Low Off-White Black White | 에어포스1 로우 오프화이트 블랙 화이트"
        Auth.currentCredentials()
            .then(credentials => {

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })


                var params = {
                    TableName: "Comments",
                    KeyConditionExpression: "#Name = :Name",
                    ExpressionAttributeNames: {
                        "#Name": "Name"
                    },
                    ExpressionAttributeValues: {
                        ":Name": name
                    },
                    ScanIndexForward: false,
                    Limit: 1
                };

                db.query(params, (err, data) => {
                    if (err) console.log(err);
                    else {

                        console.log(data.Count)
                        let CommentCounter = 0
                        if (data.Count !== 0) {
                            CommentCounter = data.Items[0].CommentNum
                        }
                        let putParam = {
                            TableName: "Comments",
                            Item: {
                                Name: name,
                                CommentNum: CommentCounter + 1,
                                Writer: "Josh Cho",
                                Comment: "와 대박이네요",
                                Date: "2019-01-05, 2시25분10초",
                                UID: "FFFFFFFFFFFFF",
                            }
                        }
                        console.log("here")
                        let counter = 0;
                        const pushData = () => {
                            db.put(putParam, (err, successData) => {
                                if (err) {
                                    if (counter == 10) {
                                        console.log("Server Too Busy")
                                    }
                                    else {
                                        console.log(err)
                                        putParam.Item.CommentNum += 1;
                                        pushData()
                                        counter++;
                                    }
                                }
                                else {
                                    console.log(successData);
                                }
                            })
                        }
                        pushData()
                    }
                })
            })
    }

    CheapestOrder = () => {
        Auth.currentCredentials()
            .then(credentials => {

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })


                var params2 = {
                    TableName: "Stock",
                    IndexName: 'Type-LowestPrice-index',
                    KeyConditionExpression: "#ScanType = :Shoe",
                    ExpressionAttributeNames: {
                        "#ScanType": "Type"
                    },
                    ExpressionAttributeValues: {
                        ":Shoe": "Shoe",

                    },
                    //ScanIndexForward: false,
                };

                db.query(params2, (err, data) => {
                    if (err) console.log(err);
                    else {
                        console.log(data)
                    }
                })
            })
    }

    NewestOrder = () => {
        Auth.currentCredentials()
            .then(credentials => {

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })



                var params2 = {
                    TableName: "Stock",
                    KeyConditionExpression: "#ScanType = :Shoe",
                    ExpressionAttributeNames: {
                        "#ScanType": "Type"
                    },
                    ExpressionAttributeValues: {
                        ":Shoe": "Shoe",

                    },
                    ScanIndexForward: false,
                };

                db.query(params2, (err, data) => {
                    if (err) console.log(err);
                    else {
                        console.log(data)
                    }
                })
            })

    }

    PopularSold = () => {
        Auth.currentCredentials()
            .then(credentials => {

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                var params2 = {
                    TableName: "Stock",
                    IndexName: 'Type-SoldCount-index',
                    KeyConditionExpression: "#ScanType = :Shoe",
                    ExpressionAttributeNames: {
                        "#ScanType": "Type"
                    },
                    ExpressionAttributeValues: {
                        ":Shoe": "Shoe",

                    },
                    ScanIndexForward: false,
                };

                db.query(params2, (err, data) => {
                    if (err) console.log(err);
                    else {
                        console.log(data)
                    }
                })
            })

    }

    ReleaseDate = () => {
        Auth.currentCredentials()
            .then(credentials => {

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                var params2 = {
                    TableName: "Stock",
                    IndexName: 'Type-ReleaseDate-index',
                    KeyConditionExpression: "#ScanType = :Shoe",
                    ExpressionAttributeNames: {
                        "#ScanType": "Type"
                    },
                    ExpressionAttributeValues: {
                        ":Shoe": "Shoe",

                    },
                    ScanIndexForward: false,
                };

                db.query(params2, (err, data) => {
                    if (err) console.log(err);
                    else {
                        console.log(data)
                    }
                })
            })

    }

    MostProfit = () => {
        Auth.currentCredentials()
            .then(credentials => {

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                var params2 = {
                    TableName: "Stock",
                    IndexName: 'Type-Profit-index',
                    KeyConditionExpression: "#ScanType = :Shoe",
                    ExpressionAttributeNames: {
                        "#ScanType": "Type"
                    },
                    ExpressionAttributeValues: {
                        ":Shoe": "Shoe",

                    },
                    ScanIndexForward: false,
                };

                db.query(params2, (err, data) => {
                    if (err) console.log(err);
                    else {
                        console.log(data)
                    }
                })
            })

    }

    test2 = () => {
        // Auth.currentCredentials()
        //     .then(credentials => {

        //         const db = new DynamoDB.DocumentClient({
        //             credentials: Auth.essentialCredentials(credentials)
        //         })

        //         let putparam = {
        //             TableName: "Shoes",
        //             IndexName: 'Model-Size-index',
        //             KeyConditionExpression: "Model = :Model and Size = :Size",
        //             ExpressionAttributeValues: {
        //                 ":Model": "Air Fear Of God 1 SA Light Bone Black | 에어 피어 오브 갓 1 SA 라이트 본 블랙",
        //                 ":Size": 260
        //             },
        //         }

        //         db.query(putparam, (err, data) => {
        //             if (err) console.log(err);
        //             else {
        //                 console.log(data)
        //             }
        //         })
        //     })

        Auth.currentCredentials()
            .then(credentials => {

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                let putparam = {
                    TableName: "Shoes",
                    IndexName: 'Model-OnSale-index',
                    KeyConditionExpression: "Model = :Model and OnSale = :OnSale",
                    ExpressionAttributeValues: {
                        ":Model": "Air Fear Of God 1 SA Light Bone Black | 에어 피어 오브 갓 1 SA 라이트 본 블랙",
                        ":OnSale": 2,
                    }
                }

                db.query(putparam, (err, data) => {
                    if (err) console.log(err);
                    else {
                        console.log(data)
                    }
                })
            })
    }



    render() {
        return (
            <div>
                뉴스 만들기
                <ImageUploader
                    withIcon={true}
                    withPreview
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                <TextField
                    onChange={this.titleHandler}
                    style={{ width: "100%" }}
                    id="standard-textarea"
                    label="재목"
                    placeholder="재목을 입력해주세요!"
                    margin="normal"
                />

                <TextField
                    onChange={this.bodyHandler}
                    style={{ width: "100%" }}
                    id="standard-textarea"
                    label="내용"
                    placeholder="내용을 입력해주세요!"
                    multiline
                    margin="normal"
                />
                <Button onClick={this.uploadHandler}>뉴스 업로드 버튼</Button>
                <Button onClick={this.uploadHandler2}>이미지 확인 버튼</Button>
                <br />

                <Button onClick={this.checkCommentHandler}>Test Get Data From Table</Button>
                <br />
                <Button onClick={this.addCommentHandler}>Add Comment</Button>
                <br />
                <Button onClick={this.CheapestOrder}>CheapestOrder Button</Button>
                <Button onClick={this.NewestOrder}>NewestOrder Button</Button>
                <Button onClick={this.PopularSold}>PopularSold Button</Button>
                <Button onClick={this.ReleaseDate}>ReleaseDate Button</Button>
                <Button onClick={this.MostProfit}>MostProfit Button</Button>
                <Button onClick={this.test2}>상품 제고 상세 보기 버튼</Button>
                <br />
            </div>
        );
    }
}

export default AdminPageNewsUpload;
