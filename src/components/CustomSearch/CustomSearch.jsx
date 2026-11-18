import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InputBase from "@material-ui/core/InputBase";

// @material-ui/icons
import SearchIcon from "@material-ui/icons/Search";

// core components
import customInputStyleSearch from "assets/jss/material-kit-react/components/customInputStyleSearchMain.jsx";
import SearchResults from "./SearchResults/SearchResults";

class CustomSearch extends React.Component {
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

    const labelClasses = classNames({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });

    const formControlClasses = classNames({
      [classes.formControl]: true,
      [classes.formControlLabel]: labelText !== undefined,
      [formControlProps.className]: formControlProps.className !== undefined
    });

    return (
      <ClickAwayListener onClickAway={this.clickToLeave}>
        <FormControl {...formControlProps} className={formControlClasses}>
          <InputBase
            className={classes.inputBase}
            placeholder="신발명, 브랜드 검색하세요."
            inputProps={{ "aria-label": "신발명, 브랜드 검색하세요." }}
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
            header={false}
            search={this.state.search}
            visible={this.state.visible}
            test={classes.windowHeader}
            josh={classes.mainPage}
            lol={value => this.clickToLeaveWithUpdate(value)}
          />
        </FormControl>
      </ClickAwayListener>
    );
  }
}

CustomSearch.propTypes = {
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

export default withStyles(customInputStyleSearch)(CustomSearch);
