import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

// import dashboardRoutes from "routes/dashboard.jsx";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";


import Button from 'components/CustomButtons/Button.jsx';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import * as actions from "store/actions/actions";
import { TextField } from "@material-ui/core";
import Iamport from 'iamport';
import * as AWS from 'aws-sdk';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import Amplify, { Auth } from 'aws-amplify';

class TestPage2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            name: "",
            authID: null,
        };
    }


    testHandler = (event) => {
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
                        let putParam = {
                            TableName: "Comments",
                            Item: {
                                Name: name,
                                CommentNum: data.Items[0].CommentNum,
                                Writer: "Josh Cho",
                                Comment: "와 대박이네요"
                            }
                        }
                        console.log("here")
                        const pushData = () => {
                            db.put(putParam, (err, successData) => {
                                if (err) {
                                    console.log(err)
                                    putParam.Item.CommentNum += 1;
                                    pushData()
                                }
                                else {
                                    console.log(successData);
                                }
                            })
                        }
                    }
                })
            })
    }

    render() {
        const { classes, ...rest } = this.props;
        return (
            <div className={classes.container}>
                <br /><br /><br /><br /><br /><br />
                <Button onClick={this.testHandler}>Test Get Data From Table</Button>
                <br />
                <Button onClick={this.addCommentHandler}>Add Comment</Button>
                <br />
            </div>
        );
    }
}



TestPage2.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
    return {
        authID: state.authID,
        attr: state.attr
    };
};
export default connect(mapStateToProps, null)(withStyles(appStyle)(TestPage2));
