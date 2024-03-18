import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// @material-ui/icons
// core components
import customInputStyleSearch from "assets/jss/material-kit-react/components/customInputStyleSearch.jsx";
import SearchResults from "./SearchResults/SearchResults";

class CustomSearchHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      visible: false
    };
  }

  searchBar = event => {
    this.setState({
      search: event.target.value
    });
  };

  clickToLeave = () => {
    this.setState({
      visible: false
    });
  };

  clickToLeaveWithUpdate = productName => {
    this.setState({
      visible: false
    });
  };

  test = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    const {
      classes,
      formControlProps,
      labelText,
      id,
      labelProps,
      inputProps,
      error,
      white,
      inputRootCustomClasses,
      success,
      type
    } = this.props;
    return (
      <ClickAwayListener onClickAway={this.clickToLeave}>
        <FormControl
          id="searchBar"
          {...formControlProps}
          className={
            this.props.main ? classes.formControlMain : classes.formControl
          }
        >
          <InputBase
            style={{
              marginLeft: 8,
              flex: 1,
              color: "inherit"
            }}
            placeholder="신발명, 브랜드 검색하세요."
            onClick={() => this.test()}
            onChange={this.searchBar}
            id={id}
          />
          <div className={classes.searchIconContainer}>
            <SearchIcon
              style={{
                position: "relative",
                width: "20px",
                height: "20px",
                fontSize: "20px",
                top: "-3px",
                color: "#fe0229"
              }}
            />
          </div>
          <SearchResults
            header={true}
            search={this.state.search}
            visible={this.state.visible}
            test={classes.windowHeader}
            josh={this.props.srcoll}
            lol={value => this.clickToLeaveWithUpdate(value)}
          />
        </FormControl>
      </ClickAwayListener>
    );
  }
}

CustomSearchHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool
};

export default withStyles(customInputStyleSearch)(CustomSearchHeader);
