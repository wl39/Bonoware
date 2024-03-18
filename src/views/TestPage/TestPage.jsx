import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { Auth } from "aws-amplify";
import DynamoDB from "aws-sdk/clients/dynamodb";
import moment from "moment";
import "moment/locale/ko";
import React, { Component } from "react";
import LoginOut from "views/TestPage/LoginOut.jsx";
class TestPage extends Component {
  state = {
    selectedFile: null,
    fileName: null,
    images: [],
    startDate: null,
    endDate: null,
    eventTitle: null,
    color: "rose",
    authorized: false,
    username: null
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      fileName: event.target.files[0].name
    });
  };

  calenderStartEventHandler = event => {
    this.setState({
      startDate: moment(event.target.value).format("DD-MM-YYYY-HH-mm")
    });
    console.log(this.state.startDate);
  };

  calenderEndEventHandler = event => {
    this.setState({
      endDate: moment(event.target.value).format("DD-MM-YYYY-HH-mm")
    });
    console.log(this.state.endDate);
  };

  titleChangeHandler = event => {
    this.setState({
      eventTitle: event.target.value
    });
    console.log(this.state.eventTitle);
  };

  colorChangeHandler = event => {
    this.setState({
      color: event.target.value
    });
    console.log(this.state.color);
  };

  createEventHandler = event => {
    if (
      this.state.color != null &&
      this.state.endDate != null &&
      this.state.eventTitle != null &&
      this.state.startDate != null
    ) {
      Auth.currentCredentials().then(credentials => {
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
        };
        db.put(params2, (err, data) => {
          if (err) console.log(err);
          else console.log(data.Items);
        });
      });
    }
  };

  signoutHandler = event => {
    Auth.signOut()
      .then(data => {
        console.log(data);
        this.setState({
          username: null,
          authorized: false
        });
      })
      .catch(err => console.log(err));
  };

  getCalenderInfoHandler = event => {
    Auth.currentCredentials().then(credentials => {
      //console.log(credentials)
      const db = new DynamoDB.DocumentClient({
        credentials: Auth.essentialCredentials(credentials)
      });

      let params2 = {
        TableName: "Calender"
      };
      db.scan(params2, (err, data) => {
        if (err) console.log(err);
        else {
          data.Items.forEach((anObjectMapped, index) => {
            anObjectMapped.start = moment(
              anObjectMapped.start,
              "DD-MM-YYYY-HH-mm"
            );
            anObjectMapped.end = moment(anObjectMapped.end, "DD-MM-YYYY-HH-mm");
          });
        }
      });
    });
  };

  getRanking() {
    console.log("Hellko");
    Auth.currentCredentials().then(credentials => {
      //console.log(credentials)
      const db = new DynamoDB.DocumentClient({
        credentials: Auth.essentialCredentials(credentials)
      });

      let param = {
        TableName: "Etc",
        Key: {
          Contents: "PopularSearch"
        }
      };

      db.get(param, (err, data) => {
        if (err) console.log(err);
        if (data) {
          console.log(data);
        }
      });
    });
  }

  increment() {
    Auth.currentCredentials().then(credentials => {
      // let params = {
      //     TableName: "Shoes",

      //     FilterExpression: "OnSale=:onSale and Brand=:brand",
      //     ExpressionAttributeValues: {
      //         ":brand": BrandName[x],
      //         ":onSale": 2,
      //     }
      // }

      // let params3 = {
      //     TableName: "MainGraph",
      //     Key: {
      //         Brand: BrandName[x]
      //     },
      //     UpdateExpression: 'set #data.#date = :data',
      //     ExpressionAttributeNames: {
      //         "#data": "Date",
      //         "#date": rightNow
      //     },
      //     ExpressionAttributeValues: {
      //         ":data": totalPrice
      //     },
      //     ReturnValues: "ALL_NEW"
      // }

      const db = new DynamoDB.DocumentClient({
        credentials: Auth.essentialCredentials(credentials)
      });

      let param = {
        TableName: "Etc",
        Key: {
          Contents: "PopularSearch"
        },
        UpdateExpression: "set #data.#date = :data",
        ExpressionAttributeNames: {
          "#data": "Ranking",
          "#date": "Shoe1"
        },
        ExpressionAttributeValues: {
          ":data": 78
        }
      };

      db.update(param, (err, data) => {
        if (err) console.log(err);
        else {
          console.log(data);
        }
      });
    });
  }

  componentDidMount() {
    this.getRanking();
  }

  render() {
    // const images = this.state.images.map((link) => {
    //     return <img src={link} width="30%" height="30%" />
    // })

    return (
      //     <div>
      //         {this.state.authorized}
      //         <br />
      //         {this.state.username}
      //         <br />

      //         <TextField
      //             id="datetime-local"
      //             label="Start Date"
      //             type="datetime-local"
      //             defaultValue="2017-07-24T10:30"
      //             onChange={this.calenderStartEventHandler}
      //             InputLabelProps={{
      //                 shrink: true,
      //             }}
      //         />
      //         <br />
      //         <TextField
      //             id="datetime-local"
      //             label="End Date"
      //             type="datetime-local"
      //             defaultValue="2018-07-24T10:30"
      //             onChange={this.calenderEndEventHandler}
      //             InputLabelProps={{
      //                 shrink: true,
      //             }}
      //         />
      //         <br />
      //         Event Name
      //         <br />
      //         <Input id="name-simple" value={this.state.eventTitle} onChange={this.titleChangeHandler} />
      //         <br />
      //         color: azure/rose/orange/red/green/grey
      //         <br />
      //         <Input id="name-simple" value={this.state.color} onChange={this.colorChangeHandler} />
      //         <br />
      //         <Button onClick={this.createEventHandler}>Create Event</Button>
      //         <br />
      //         Manual Create Users right now... Later add form box
      //         <br />

      //         <br />
      //         Manual Log Users right now... Later add form box
      //         <br />
      //         Test Sign In <Button onClick={this.signinHandler}>TEST Login</Button>
      //         <br />

      //         <br />
      //         <Button onClick={this.signoutHandler}>Sign out</Button>
      //         <br />
      //         LogIn OUT TEST HERE
      //         <LoginOut />
      //         <br />
      //         <Button onClick={this.getCalenderInfoHandler}>Calender Data</Button>
      //         <br />
      //         <Button onClick={this.checkHandler}>Test</Button>

      <div>
        <br />
        <br />
        <br />
        Ranking:
        <br />
        <Button onClick={this.increment}>Increment Shoe Search Counter</Button>
        <br />
      </div>
    );
  }
}

export default TestPage;
