import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Amplify, { Auth } from 'aws-amplify';
import * as AWS from 'aws-sdk';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import moment from "moment";
import React, { Component } from 'react';
import ShortUniqueId from 'short-unique-id';
import ImageUploader from 'react-images-upload';

import AdminPageNewsUpload from './AdminPageNewsUpload';
const styles = theme => ({
    container: {
        paddingTop: "80px",
        "@media (max-width: 600px)": {
            paddingTop: "50px"
        },
    }
})
class AdminPage extends Component {
    state = {
        username: "",
        authorized: true,
        selectedFile: null,
        fileName: null,
        images: [],
        startDate: null,
        endDate: null,
        eventTitle: null,
        color: "rose",
        session: "",
        imageLink: "",
        shoeName: null,
        shoeNameKorean: null,
        selectedShoeFile: null,
        shoeFileName: null,
        SID: null,
        sellerEmail: "email",
        sellerBrand: "Nike",
        sellerSize: "0",
        releaseDate: "",
        releasePrice: 0
    }
    componentWillMount() {

        Amplify.configure({
            Auth: {
                identityPoolId: 'ap-northeast-2:4a2eefa2-87cc-4ddc-849d-f7bd58dcc816',
                region: 'ap-northeast-2',

                userPoolId: 'ap-northeast-2_j3VQjutFK',
                userPoolWebClientId: '1aj6ab83vudcbm4jo75hpo0vrj',
            }
        });

        AWS.config.region = 'ap-northeast-2'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'ap-northeast-2:4a2eefa2-87cc-4ddc-849d-f7bd58dcc816',
        });
    }

    signinHandler = (event) => {


        Auth.signIn(this.state.id, this.state.pw)
            .then(user => {
                this.setState({
                    username: user.username + "관리자님 환영합니다",
                    authorized: true
                })
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    Auth.completeNewPassword(user, this.state.pw)
                        .then(user => {
                        });
                }
            }
            )




    }

    signoutHandler = (event) => {
        Auth.signOut()
            .then(data => {
                console.log(data)
                this.setState({
                    username: null,
                    authorized: false
                })
            }
            )
            .catch(err => console.log(err));
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            fileName: event.target.files[0].name
        })
    }

    fileShoeSelectedHandler = event => {
        this.setState({
            selectedShoeFile: event.target.files[0],
            shoeFileName: event.target.files[0].name
        })
    }



    uploadFileHandlerPC = () => {
        const imageUse = "mainSlider";
        Auth.currentCredentials()
            .then(credentials => {

                const s3 = new AWS.S3({
                    Bucket: 'probe.gg',
                    region: 'ap-northeast-2',
                    credentials: Auth.essentialCredentials(credentials)
                });
                let params = {
                    Bucket: "probe.gg",
                    region: 'ap-northeast-2',
                    Key: "images/" + imageUse + "/" + this.state.fileName,
                    Body: this.state.selectedFile,
                    ACL: "public-read"
                };
                // db 에뭐가있는지 확인 후 이름 수정. 그리고 업로드 + 디비에 업로드
                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                let params2 = {
                    TableName: "MainPageImages"
                }

                db.scan(params2, (err, data) => {
                    if (err) console.log(err);
                    else {

                        let counter = 0;
                        //console.log(data.Items)
                        data.Items.forEach((anObjectMapped, index) => {
                            // console.log(anObjectMapped)
                            switch (anObjectMapped.type) {
                                case imageUse:
                                    counter++
                                    break;
                                default:
                                    break;
                            }

                        }
                        )
                        s3.upload(params, (err, data) => {
                            if (err) {
                                console.log("error in callback");
                                console.log(err);
                            }
                            if (data) {
                                this.setState({
                                    imageLink: data.Location
                                })


                                let params2 = {
                                    TableName: "MainPageImages",
                                    Item: {
                                        link: data.Location,
                                        counter: counter + 1,
                                        type: imageUse
                                    }
                                }

                                db.put(params2, (err, data) => {
                                    if (err) console.log(err);
                                    else console.log(data.Items);
                                })
                            }
                            console.log("success");
                        })
                    }
                })
            });
    }

    uploadFileHandlerMobile = () => {
        const imageUse = "mobileSlider";
        Auth.currentCredentials()
            .then(credentials => {

                const s3 = new AWS.S3({
                    Bucket: 'probe.gg',
                    region: 'ap-northeast-2',
                    credentials: Auth.essentialCredentials(credentials)
                });
                let params = {
                    Bucket: "probe.gg",
                    region: 'ap-northeast-2',
                    Key: "images/" + imageUse + "/" + this.state.fileName,
                    Body: this.state.selectedFile,
                    ACL: "public-read"
                };
                // db 에뭐가있는지 확인 후 이름 수정. 그리고 업로드 + 디비에 업로드
                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                let params2 = {
                    TableName: "MainPageImages"
                }

                db.scan(params2, (err, data) => {
                    if (err) console.log(err);
                    else {

                        let counter = 0;
                        //console.log(data.Items)
                        data.Items.forEach((anObjectMapped, index) => {
                            console.log(anObjectMapped)
                            switch (anObjectMapped.type) {
                                case imageUse:
                                    counter++
                                    break;
                                default:
                                    break;
                            }

                        }
                        )
                        s3.upload(params, (err, data) => {
                            if (err) {
                                console.log("error in callback");
                                console.log(err);
                            }
                            if (data) {
                                this.setState({
                                    imageLink: data.Location
                                })


                                let params2 = {
                                    TableName: "MainPageImages",
                                    Item: {
                                        link: data.Location,
                                        counter: counter + 1,
                                        type: imageUse
                                    }
                                }

                                db.put(params2, (err, data) => {
                                    if (err) console.log(err);
                                    else console.log(data.Items);
                                })
                            }
                            console.log("success");
                        })
                    }
                })
            });
    }

    uploadFileHandlerBG = () => {
        const imageUse = "background";
        Auth.currentCredentials()
            .then(credentials => {

                const s3 = new AWS.S3({
                    Bucket: 'probe.gg',
                    region: 'ap-northeast-2',
                    credentials: Auth.essentialCredentials(credentials)
                });
                let params = {
                    Bucket: "probe.gg",
                    region: 'ap-northeast-2',
                    Key: "images/" + imageUse + "/" + this.state.fileName,
                    Body: this.state.selectedFile,
                    ACL: "public-read"
                };
                // db 에뭐가있는지 확인 후 이름 수정. 그리고 업로드 + 디비에 업로드
                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                let params2 = {
                    TableName: "MainPageImages"
                }

                db.scan(params2, (err, data) => {
                    if (err) console.log(err);
                    else {

                        let counter = 0;
                        //console.log(data.Items)
                        data.Items.forEach((anObjectMapped, index) => {
                            console.log(anObjectMapped)
                            switch (anObjectMapped.type) {
                                case imageUse:
                                    counter++
                                    break;
                                default:
                                    break;
                            }

                        }
                        )
                        s3.upload(params, (err, data) => {
                            if (err) {
                                console.log("error in callback");
                                console.log(err);
                            }
                            if (data) {
                                this.setState({
                                    imageLink: data.Location
                                })


                                let params2 = {
                                    TableName: "MainPageImages",
                                    Item: {
                                        link: data.Location,
                                        counter: counter + 1,
                                        type: imageUse
                                    }
                                }

                                db.put(params2, (err, data) => {
                                    if (err) console.log(err);
                                    else console.log(data.Items);
                                })
                            }
                            console.log("success");
                        })
                    }
                })
            });
    }

    getImageTestHandler = () => {

        Auth.currentCredentials().then(credentials => {
            const db = new DynamoDB.DocumentClient({
                credentials: Auth.essentialCredentials(credentials)
            })
            let params = {
                TableName: "MainPageImages"
            }
            db.scan(params, (err, data) => {
                if (err) console.log(err);
                else {

                    let mainSliderImage = new Map()
                    let mobileSliderImage = new Map()
                    let backgroundImage = new Map()

                    data.Items.forEach((anObjectMapped, index) => {
                        //console.log(anObjectMapped)
                        switch (anObjectMapped.type) {
                            case "mainSlider":
                                mainSliderImage.set(anObjectMapped.counter, anObjectMapped.link)
                                break;
                            case "mobileSlider":
                                mobileSliderImage.set(anObjectMapped.counter, anObjectMapped.link)
                                break;
                            case "background":
                                backgroundImage.set(anObjectMapped.counter, anObjectMapped.link)
                                break;
                            default:
                                break;
                        }

                    })

                    mainSliderImage = new Map([...mainSliderImage.entries()].sort().reverse());
                    mobileSliderImage = new Map([...mobileSliderImage.entries()].sort().reverse());
                    backgroundImage = new Map([...backgroundImage.entries()].sort().reverse());


                    //console.log(mainSliderImage.get(2))
                }
            })



        })
    }

    createReleaseShoeHandler = () => {
        Auth.currentCredentials()
            .then(credentials => {

                const s3 = new AWS.S3({
                    Bucket: 'probe.gg',
                    region: 'ap-northeast-2',
                    credentials: Auth.essentialCredentials(credentials)
                });

                let params = {
                    Bucket: "probe.gg",
                    region: 'ap-northeast-2',
                    Key: "images/shoes/" + this.state.shoeFileName,
                    Body: this.state.selectedShoeFile,
                    ACL: "public-read"
                };

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                let dbScanForExistance = {
                    TableName: "Item",
                    Key: {
                        Model: this.state.shoeName + " || " + this.state.shoeNameKorean
                    }
                }

                db.get(dbScanForExistance, (err, existance) => {
                    if (err) {

                    }
                    if (existance.Item) {
                        alert("Shoe Already Exists")
                    }
                    else {

                        s3.upload(params, (err, data) => {
                            if (err) {
                                console.log("error in callback");
                                console.log(err);
                            }
                            if (data) {
                                // db 에뭐가있는지 확인 후 이름 수정. 그리고 업로드 + 디비에 업로드

                                let paramsShoes = {
                                    TableName: "Item",
                                    Item: {
                                        Brand: this.state.sellerBrand,
                                        LowestPrice: 0,
                                        HighestPrice: 0,
                                        Model: this.state.shoeName + " | " + this.state.shoeNameKorean,
                                        ImageURL: data.Location,
                                        ReleaseDate: this.state.releaseDate,
                                        SizePrice: {},
                                        Graph: {},
                                        Histogram: {},
                                        SoldCount: 0,
                                        StockCount: 0,
                                        SID: this.state.SID,
                                        Search: ((this.state.shoeName).toLowerCase() + " | " + this.state.shoeNameKorean),
                                    }
                                }
                                db.put(paramsShoes, (err, data) => {
                                    if (err) console.log(err);
                                    else console.log(data.Items);
                                })

                                //1. 스캔을 뜬다
                                //2. 날짜를 본다
                                //3. 순서대로 바꾼다 => Model Count
                                //4. ㅅ

                                let params3 = {
                                    TableName: "MostRecent",
                                }

                                db.scan(params3, (err, data2) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    if (data2) {
                                        console.log(data2)

                                        if (data2.Count < 10) {
                                            // just put the shoes in here Most Recent


                                            let params4 = {
                                                TableName: "MostRecent",
                                                Item: {
                                                    ImageURL: data.Location,
                                                    Model: this.state.shoeName,
                                                    ModelCount: data2.Count + 1,
                                                    LowestPrice: 0,
                                                    SoldCount: 0,
                                                    StockCount: 0,
                                                    ReleaseDate: this.state.releaseDate
                                                }
                                            }
                                            db.put(params4, (err, data5) => {
                                                if (err) console.log(err);
                                                else console.log(data5.Items);
                                            })


                                        }
                                        else { // 일시적인코드 나중에는 그냥 추가하면돼지만 현제 상태로는 에전출시 된 신발들이 언제나 업로드될수있음.
                                            // scan Items and sort by Date and then update most recent table after deleting everything from MostRecent Table and updating new 10 shoes
                                            // 이것은 일시적으로 Most Recent Update 에 하겠슴.          
                                        }
                                    }
                                })
                            }
                        })
                    }
                })

            }

            )

    }

    createReleaseShoeHandlerNew = () => {
        Auth.currentCredentials()
            .then(credentials => {

                const s3 = new AWS.S3({
                    Bucket: 'probe.gg',
                    region: 'ap-northeast-2',
                    credentials: Auth.essentialCredentials(credentials)
                });

                let params = {
                    Bucket: "probe.gg",
                    region: 'ap-northeast-2',
                    Key: "images/shoes/" + this.state.shoeFileName,
                    Body: this.state.selectedShoeFile,
                    ACL: "public-read"
                };

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                let dbScanForExistance = {
                    TableName: "Stock",
                    ScanFilter: {
                        Search: {
                            ComparisonOperator: "CONTAINS",
                            AttributeValueList: [

                                (this.state.shoeName.toLowerCase() + " | " + this.state.shoeNameKorean)

                            ]
                        }
                    },
                    // Key: {
                    //     Model: "Shoe"
                    //     //this.state.shoeName + " || " + this.state.shoeNameKorean
                    // }
                }

                db.scan(dbScanForExistance, (err, existance) => {
                    if (err) {

                    }
                    if (existance.Item) {
                        alert("Shoe Already Exists")
                    }
                    else {

                        s3.upload(params, (err, data) => {
                            if (err) {
                                console.log("error in callback");
                                console.log(err);
                            }
                            if (data) {
                                // db 에뭐가있는지 확인 후 이름 수정. 그리고 업로드 + 디비에 업로드

                                let paramsShoes = {
                                    TableName: "Stock",
                                    Item: {
                                        Type: "Shoe",
                                        Brand: this.state.sellerBrand,
                                        LowestPrice: 0,
                                        Model: this.state.shoeName + " | " + this.state.shoeNameKorean,
                                        ImageURL: data.Location,
                                        ReleaseDate: this.state.releaseDate,
                                        SizePrice: {},
                                        Graph: {},
                                        Histogram: {},
                                        SoldCount: 0,
                                        StockCount: 0,
                                        Profit: 0,
                                        SID: (this.state.SID) * 1,
                                        Search: (this.state.shoeName + " | " + this.state.shoeNameKorean).toLowerCase(),
                                        ReleasePrice: this.state.releasePrice
                                    }
                                }
                                db.put(paramsShoes, (err, data) => {
                                    if (err) console.log(err);
                                    else console.log(data.Items);
                                })
                            }
                        })
                    }
                })

            }

            )

    }




    createNewShoeHandler = () => {
        Auth.currentCredentials()
            .then(credentials => {

                // db 에뭐가있는지 확인 후 이름 수정. 그리고 업로드 + 디비에 업로드
                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                let cog = new AWS.CognitoIdentityServiceProvider({
                    credentials: Auth.essentialCredentials(credentials)
                });

                let filter = "email = \"" + this.state.sellerEmail + "\"";
                let req = {
                    "Filter": filter,
                    "UserPoolId": "ap-northeast-2_i5pwx5RCr" // looks like us-east-9_KDFn1cvys
                };


                let checkerParamsForModelExist = {
                    TableName: "Stock",
                    Key: {
                        Type: "Shoe",
                        Model: this.state.shoeName
                    }
                }



                db.get(checkerParamsForModelExist, (err, data) => {
                    if (err) {

                    }
                    if (data.Item) {

                        cog.listUsers(req, (err, dataUser) => {
                            if (err) {
                                console.log(err)
                                alert("USER DOES NOT EXIST CHECK EMAIL")
                            }
                            else {
                                if (dataUser.Users.length === 1) {

                                    const uid = new ShortUniqueId();
                                    let usingUID = uid.randomUUID(20)
                                    let paramsShoes = {
                                        TableName: "Shoes",
                                        Item: {
                                            ProductID: usingUID,
                                            Seller: dataUser.Users[0].Username,
                                            Brand: data.Item.Brand,
                                            SentTime: moment().format("DD-MM-YYYY-HH-mm"),
                                            Model: data.Item.Model,
                                            ImageURL: data.Item.ImageURL,
                                            Size: parseInt(this.state.sellerSize, 10),
                                            OnSale: 1, // pending,
                                            SID: data.Item.SID,
                                            Price: 0
                                        }
                                    }
                                    db.put(paramsShoes, (err, dataUseless) => {
                                        if (err) console.log(err);
                                        else console.log(dataUseless);
                                    })
                                    let userParam = {
                                        TableName: "User",
                                        Key: {
                                            authID: dataUser.Users[0].Username
                                        },
                                        UpdateExpression: "add #selling :selling",
                                        ExpressionAttributeNames: {
                                            '#selling': 'selling'
                                        },
                                        ExpressionAttributeValues: {
                                            ":selling": db.createSet([usingUID])
                                        }

                                    }
                                    db.update(userParam, (err, data) => {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                                }
                                else {
                                    alert("USER DOES NOT EXIST CHECK EMAIL")
                                }

                            }


                        })

                    }
                    else {
                        alert("error or Upload New Shoe Model First!")
                    }
                })
            }

            );
    }


    adminIDHandler = (event) => {
        this.setState({
            id: event.target.value
        })
    }
    adminPWHandler = (event) => {
        this.setState({
            pw: event.target.value
        })
    }
    modelNameHandler = (event) => {
        this.setState({
            shoeName: event.target.value
        })
    }

    modelNameKoreanHandler = (event) => {
        this.setState({
            shoeNameKorean: event.target.value
        })
    }

    sellerEmailHandler = (event) => {
        this.setState({
            sellerEmail: event.target.value
        })
    }

    sellerBrandHandler = (event) => {
        this.setState({
            sellerBrand: event.target.value
        })
    }

    modelSIDHandler = (event) => {
        this.setState({
            SID: event.target.value
        })
    }

    modelReleasePriceHandler = (event) => {
        this.setState({
            releasePrice: event.target.value * 1
        })
    }

    sellerSizeHandler = (event) => {
        this.setState({
            sellerSize: event.target.value
        })
    }

    testHandler = () => {
        Auth.currentCredentials()
            .then(credentials => {

                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                let params = {
                    TableName: "Shoes",
                    //ProjectionExpression: "Model",
                    FilterExpression: "Model=:model and Size=:size and OnSale=:onSale and Price=:price",
                    ExpressionAttributeValues: {
                        ":model": "Nike Air Presto Off White White 2018 Product",
                        ":size": 270,
                        ":onSale": 2,
                        ":price": 1234567
                        // will come as props
                    }
                }

                db.scan(params, (err, data) => {
                    //console.log(data.Items)
                    console.log(data)
                    // 데이타를 받으면 Sent Time 비교 후 잴 낮은 Sent time의 Product ID 를 리턴한다.
                    let thisShoe = null;

                    for (let x = 0; x < data.Items.length; x++) {
                        if (x === 0) {
                            thisShoe = data.Items[x]
                        }
                        else {
                            if (moment(thisShoe.SentTime, "DD-MM-YYYY-HH-mm").diff(moment(data.Items[x].SentTime, "DD-MM-YYYY-HH-mm")) > 0) {
                                thisShoe = data.Items[x]
                            }
                        }

                    }

                    if (thisShoe != null) {
                        let getParam = {
                            TableName: "Shoes",
                            Key: {
                                ProductID: thisShoe.ProductID,
                                Seller: thisShoe.Seller
                            },
                            UpdateExpression: "set OnSale = :b",
                            ExpressionAttributeValues: {
                                ":b": 4,
                            }
                        }

                        db.update(getParam, (err, data) => {
                            if (err) console.log(err);
                            //else console.log(data.Items);
                        })

                        // 결재 코드 실행
                        setTimeout(() => {
                            let getParam2 = {
                                TableName: "Shoes",
                                Key: {
                                    ProductID: thisShoe.ProductID,
                                    Seller: thisShoe.Seller
                                }
                            }
                            db.get(getParam2, (err, data123) => {

                                if (data123) {
                                    if (data123.OnSale !== 0) {

                                        let getParam = {
                                            TableName: "Shoes",
                                            Key: {
                                                ProductID: thisShoe.ProductID,
                                                Seller: thisShoe.Seller
                                            },
                                            UpdateExpression: "set OnSale = :b",
                                            ExpressionAttributeValues: {
                                                ":b": 2,
                                            }
                                        }

                                        db.update(getParam, (err, data12323) => {
                                            if (err) console.log(err);
                                            //else console.log(data.Items);
                                        })

                                    }
                                    else {

                                    }
                                }
                            })


                        }, 600000);
                    }
                })
            })

    }
    releaseDateHandler = (event) => {
        this.setState({
            releaseDate: event.target.value
        })
    }

    calenderStartEventHandler = (event) => {
        this.setState({
            startDate: moment(event.target.value).format("DD-MM-YYYY-HH-mm")
        })
        console.log(this.state.startDate)
    }

    calenderEndEventHandler = (event) => {
        this.setState({
            endDate: moment(event.target.value).format("DD-MM-YYYY-HH-mm")
        })
        console.log(this.state.endDate)
    }

    titleChangeHandler = (event) => {
        this.setState({
            eventTitle: event.target.value
        })
        console.log(this.state.eventTitle)
    }

    colorChangeHandler = (event) => {
        this.setState({
            color: event.target.value
        })
        console.log(this.state.color)
    }

    createEventHandler = (event) => {
        if (this.state.color != null && this.state.endDate != null && this.state.eventTitle != null && this.state.startDate != null) {
            Auth.currentCredentials()
                .then(credentials => {
                    //console.log(credentials)
                    const db = new DynamoDB.DocumentClient({
                        credentials: Auth.essentialCredentials(credentials)
                    });

                    let params2 = {
                        TableName: "Calender",
                        Item: {
                            allDay: false,
                            color: this.state.color,
                            end: this.state.endDate,
                            start: this.state.startDate,
                            title: this.state.eventTitle
                        }
                    }
                    db.put(params2, (err, data) => {
                        if (err) console.log(err);
                        else console.log(data.Items);
                    })

                })
        }
    }



    updateShoeHistogramHandler = (event) => {
        Auth.currentCredentials()
            .then(credentials => {

                // db 에뭐가있는지 확인 후 이름 수정. 그리고 업로드 + 디비에 업로드
                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                })

                let params = {
                    TableName: "Shoes",
                    FilterExpression: "OnSale=:onSale",
                    ExpressionAttributeValues: {
                        ":onSale": 2,
                    }
                }

                db.scan(params, (err, dataShoe) => {
                    if (err) console.log(err);
                    else {
                        console.log(dataShoe)
                        let shoeModelMap = new Map();
                        for (let q = 0; q < dataShoe.Count; q++) {
                            let shoeObject =
                            {
                                Model: dataShoe.Items[q].Model,
                                Graph: dataShoe.Items[q].Price,
                                Histogram: {},
                            };

                            if (shoeModelMap.has(dataShoe.Items[q].Model)) {
                                let k = shoeModelMap.get(shoeObject.Model);
                                k.Graph += dataShoe.Items[q].Price
                                shoeModelMap.set(shoeObject.Model, k)
                            }
                            else {
                                shoeModelMap.set(dataShoe.Items[q].Model, shoeObject);
                            }
                        }


                        let rightNow = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
                        // replace to aws later
                        // rightNow = rightNow.split("-")

                        // if ((rightNow[1]).length === 1) {
                        //     rightNow[1] = '0' + rightNow[1];
                        // }

                        // if ((rightNow[2]).length === 1) {
                        //     rightNow[2] = '0' + (rightNow[2].split(" "))[0];
                        // }
                        // rightNow = rightNow[0] + "-" + rightNow[1] + "-" + (rightNow[2].split(" "))[0];
                        // replace to aws later
                        rightNow = rightNow.split(".")
                        rightNow[1] = rightNow[1].trimLeft()
                        rightNow[2] = rightNow[2].trimLeft()
                        if ((rightNow[1]).length === 1) {
                            rightNow[1] = '0' + rightNow[1];
                        }

                        if ((rightNow[2]).length === 1) {
                            rightNow[2] = '0' + (rightNow[2]);
                        }
                        rightNow = rightNow[0] + "-" + rightNow[1] + "-" + (rightNow[2]);
                        // date ended
                        console.log(rightNow)
                        //rightNow = "2018-09-19"
                        shoeModelMap.forEach(key => {
                            console.log(key)
                            let params3 = {
                                TableName: "Item",
                                Key: {
                                    Model: key.Model
                                },
                                UpdateExpression: 'set #data.#graph = :data',
                                ExpressionAttributeNames: {
                                    "#data": "Graph",
                                    "#graph": rightNow
                                },
                                ExpressionAttributeValues: {
                                    ":data": key.Graph
                                },
                                ReturnValues: "ALL_NEW"
                            }
                            db.update(params3, (err, data) => {
                                if (err) console.log(err);
                                else {
                                    console.log("succes")
                                }
                            })
                        })
                        // console.log(shoeModelMap)
                    }
                })

            })
    }

    componentDidMount() {
        this.getRanking()
    }

    getRanking() {
        console.log("Hellko")
        Auth.currentCredentials()
            .then(credentials => {
                //console.log(credentials)
                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                });

                let param = {
                    TableName: "Etc",
                    Key: {
                        Contents: "PopularSearch"
                    }
                }

                db.get(param, (err, data) => {
                    if (err) console.log(err);
                    if (data) {
                        console.log(data)
                    }
                })


            })
    }

    resetDaily() {
        let searchType = "DailySearch"
        Auth.currentCredentials()
            .then(credentials => {
                //console.log(credentials)
                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                });

                let param = {
                    TableName: "Etc",
                    Key: {
                        Contents: searchType
                    }
                }
                //cron(0 15 L * ? *)
                db.get(param, (err, data) => {
                    if (err) console.log(err);
                    if (data) {
                        let shoes = []
                        for (let key in data.Item.Ranking) {
                            shoes.push([key, data.Item.Ranking[key]]);
                        }
                        shoes.sort((a, b) => {
                            return -(a[1] - b[1]);
                        })
                        let savedData = []
                        for (let index = 0; index < 5; index++) {
                            savedData.push([shoes[index][0], 5 - index])
                        }

                        Auth.currentCredentials()
                            .then(credentials => {
                                //console.log(credentials)
                                const db = new DynamoDB.DocumentClient({
                                    credentials: Auth.essentialCredentials(credentials)
                                });
                                let params = {
                                    TableName: "Etc",
                                    Item: {
                                        "Contents": searchType,
                                        "Ranking": {
                                            [savedData[0][0]]: savedData[0][1],
                                            [savedData[1][0]]: savedData[1][1],
                                            [savedData[2][0]]: savedData[2][1],
                                            [savedData[3][0]]: savedData[3][1],
                                            [savedData[4][0]]: savedData[4][1]
                                        }
                                    }
                                }
                                db.put(params, (err, data) => {
                                    console.log(err)
                                    console.log(data)
                                })
                            })
                    }
                })
            })
    }

    asdf() {

        // var params = {
        //     TableName: "MyTable",
        //     Item: {
        //         "teamName": "Team Awesome",
        //         "members": [
        //             {
        //                 "email": "person-1@example.com",
        //                 "name": "Bob"
        //             },
        //             {
        //                 "email": "person-2@example.com",
        //                 "name": "Alice"
        //             }
        //          ]
        //     } 
        // };

        // DynamoDB.put(params, function (err) {
        //      if (err) {
        //          return throw err;
        //      }
        Auth.currentCredentials()
            .then(credentials => {
                //console.log(credentials)
                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)
                });
                let params = {
                    TableName: "Etc",
                    Item: {
                        "Contents": "DailySearch",
                        "Ranking": {
                            TestShoe: 1,
                            TestShoe3: 5
                        }
                    }
                }
                db.put(params, (err, data) => {
                    console.log(err)
                    console.log(data)
                })
            })
    }


    // testHandlerSellShoes = (event) => {
    //     Auth.currentCredentials()
    //         .then(credentials => {
    //             const db = new DynamoDB.DocumentClient({
    //                 credentials: Auth.essentialCredentials(credentials)
    //             })

    //             let params = {
    //                 TableName: "Shoes",

    //                 FilterExpression: "OnSale=:onSale and Size=:Size and SID=:SID and Price=:Price",
    //                 ExpressionAttributeValues: {
    //                     ":SID": "ABCDEF123",//shoeInfo[1],
    //                     ":onSale": 2,
    //                     ":Size": 290,//parseInt(shoeInfo[3]),
    //                     ":Price": 48//result.amount
    //                 }
    //             }

    //             db.scan(params, (err, data) => {
    //                 if (err) console.log(err)//callback(err, null);
    //                 else {
    //                     console.log(data)
    //                     if (data.Items.length === 0) {
    //                         console.log("환불처리")
    //                         // 환불처리
    //                     }
    //                     else { // 재일 최근에 보낸사람 상품 찾기
    //                         data.Items.sort((a, b) => {

    //                             let dayOne = a.SentTime.split("-");
    //                             let dayTwo = b.SentTime.split("-");
    //                             let timeOne = new Date(dayOne[2], dayOne[1], dayOne[0], dayOne[3], dayOne[4])
    //                             let timeTwo = new Date(dayTwo[2], dayTwo[1], dayTwo[0], dayTwo[3], dayTwo[4])
    //                             if (timeOne < timeTwo)
    //                                 return -1;
    //                             if (timeOne > timeTwo)
    //                                 return 1;
    //                             return 0;
    //                         });
    //                         console.log(data.Items[0])

    //                         let checkerParamsForUpdate = {
    //                             TableName: "Shoes",
    //                             Key: {
    //                                 ProductID: data.Items[0].ProductID,
    //                                 Seller: data.Items[0].Seller
    //                             },
    //                             UpdateExpression: "set OnSale = :b",
    //                             ExpressionAttributeValues: {
    //                                 ":b": 3,
    //                             }
    //                         }

    //                         db.update(checkerParamsForUpdate, (err, data) => {
    //                             if (err) {
    //                                 console.log("판매오류")
    //                                 console.log(err)//판매실패
    //                             }
    //                             else {
    //                                 console.log(data)
    //                                 console.log("판매완료")
    //                                 let userParam = {
    //                                     TableName: "User",
    //                                     Key: {
    //                                         authID: user
    //                                     },
    //                                     UpdateExpression: "add #buying :buying",
    //                                     ExpressionAttributeNames: {
    //                                         '#buying': 'buying'
    //                                     },
    //                                     ExpressionAttributeValues: {
    //                                         ":buying": db.createSet([data.Items[0].ProductID])
    //                                     }

    //                                 }
    //                                 db.update(userParam, (err, data) => {
    //                                     if (err) {
    //                                         console.log(err)
    //                                     }
    //                                 })
    //                             }
    //                         })

    //                     }
    //                 }

    //             })
    //         })
    // }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                Admin Log in Section
                < br />
                <TextField
                    id="datetime-local"
                    label="ID"
                    type="text"
                    onChange={this.adminIDHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <TextField
                    id="datetime-local"
                    label="PW"
                    type="password"
                    onChange={this.adminPWHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <h1>{this.state.username}</h1>
                {this.state.imageLink}
                < Button onClick={this.signinHandler} > 로그인</Button >
                <Button onClick={this.signoutHandler}>로그아웃</Button>
                <br />
                Upload Images Section
                < br />
                <input type="file" onChange={this.fileSelectedHandler} />
                <br />
                <Button onClick={this.uploadFileHandlerPC}>upload pc slider</Button>
                <br />
                <Button onClick={this.uploadFileHandlerMobile}>upload mobile slider</Button>
                <br />
                <Button onClick={this.uploadFileHandlerBG}>upload background iamge</Button>
                <br />
                <Button onClick={this.getImageTestHandler}>Try Get Image</Button>
                <br />

                <TextField
                    label="Model명"
                    type="text"
                    onChange={this.modelNameHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="한글 모델명"
                    type="text"
                    onChange={this.modelNameKoreanHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />


                <TextField
                    label="Release Date (YYYY-MM-DD Format)"
                    type="text"
                    onChange={this.releaseDateHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <TextField
                    label="브랜드(nike/adidas/other"
                    type="text"
                    onChange={this.sellerBrandHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="SID 9 글자"
                    type="text"
                    onChange={this.modelSIDHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="출고가"
                    type="text"
                    onChange={this.modelReleasePriceHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <br />
                < input type="file" onChange={this.fileShoeSelectedHandler} />
                <br />
                <Button onClick={this.createReleaseShoeHandler}>신상신발추가</Button>

                <Button onClick={this.createReleaseShoeHandlerNew}>신상신발추가New</Button>
                <br />





                <TextField
                    label="Model명"
                    type="text"
                    onChange={this.modelNameHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <TextField
                    id="datetime-local"
                    label="판매자이메일"
                    type="text"
                    onChange={this.sellerEmailHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                /><br />
                {/* <TextField
                    id="datetime-local"
                    label="브랜드"
                    type="text"
                    onChange={this.sellerBrandHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                /><br /> */}
                <TextField
                    id="datetime-local"
                    label="사이즈"
                    type="text"
                    onChange={this.sellerSizeHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                /><br />
                {/* 신발이미지
                < input type="file" onChange={this.fileShoeSelectedHandler} />
                <br /> */}
                <Button onClick={this.createNewShoeHandler}>유저신발추가</Button>
                <br />



                <TextField
                    id="datetime-local"
                    label="Start Date"
                    type="datetime-local"
                    defaultValue="2017-07-24T10:30"
                    onChange={this.calenderStartEventHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <TextField
                    id="datetime-local"
                    label="End Date"
                    type="datetime-local"
                    defaultValue="2018-07-24T10:30"
                    onChange={this.calenderEndEventHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                Event Name
                <br />
                <Input id="name-simple" value={this.state.eventTitle} onChange={this.titleChangeHandler} />
                <br />
                color: azure/rose/orange/red/green/grey
                <br />
                <Input id="name-simple" value={this.state.color} onChange={this.colorChangeHandler} />
                <br />
                <Button onClick={this.createEventHandler}>Create Event</Button>
                <br />
                <Button onClick={this.updateShoeHistogramHandler}>히스토그램 업데이트</Button>
                <br />
                Ranking:
                <br />
                <Button onClick={this.resetDaily}>ResetDaily Shoe Search Counter</Button>
                <br />

                {/* <br /><br /><br /><br /><br /><br />
                <Button onClick={this.testHandlerSellShoes}>Test Get Data From IAMPORT</Button>
                <br /> */}

                <AdminPageNewsUpload />
            </div >
        );
    }
};

export default withStyles(styles)(AdminPage);
