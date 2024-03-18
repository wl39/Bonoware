import React from "react";
import Input from "@material-ui/core/Input";
import SearchResults from "components/CustomSearch/SearchResults/SearchResults";
import withStyles from "@material-ui/core/styles/withStyles";
import customInputStyleSearch from "assets/jss/material-kit-react/components/customInputStyleSearch.jsx";
import * as AWS from "aws-sdk";
import { Auth } from "aws-amplify";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  searchBar = event => {
    this.setState({
      search: event.target.value
    });
  };

  update = productName => {
    this.props.test2();
    Auth.currentCredentials().then(credentials => {
      // Prepare to call Lambda function
      let lambda = new AWS.Lambda({
        region: "ap-northeast-2",
        apiVersion: "2015-03-31",
        credentials: Auth.essentialCredentials(credentials)
      });
      let pullParams = {
        FunctionName: "UpdateSearch",
        InvocationType: "RequestResponse",
        LogType: "None",
        Payload: JSON.stringify({
          productName: productName
        })
      };

      lambda.invoke(pullParams, (err, data) => {
        if (err) {
          console.log(err);
        } else {
        }
      });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Input
          //type="search"
          placeholder="검색"
          id="searchBar"
          classes={{ input: this.props.lim, underline: classes.probePink }}
          className={classes.mobileSearchBar}
          onChange={this.searchBar}
        />
        <SearchResults
          header={false}
          josh={this.props.josh}
          test={classes.mobile}
          search={this.state.search}
          visible={this.props.visible}
          lol={value => this.update(value)}
        />
      </div>
    );
  }
}

export default withStyles(customInputStyleSearch)(SearchBar);
