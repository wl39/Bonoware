/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/icons
import { Apps, CloudDownload, Search } from "@material-ui/icons";

// core components

import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import CustomSearch from "components/CustomSearch/CustomSearch.jsx";

import Aux from "hoc/Aux_/Aux_"
import GridContainer from 'components/Grid/GridContainer.jsx';
import Paper from '@material-ui/core/Paper';
import { classNames } from 'classnames';

function LeftHeaderLinks({ ...props }) {
  const { classes } = props;
  return (

    <CustomSearch
      id="material"

      formControlProps={{
        fullWidth: true,

      }}
      inputProps={{
        placeholder: "Search",
        "aria-label": "Search",
        startAdornment: (
          <div>
            <InputAdornment position="start" >
              <Search className={classes.searchIcon} />
            </InputAdornment>
          </div>
        )
      }}
    />





  );
}

export default withStyles(headerLinksStyle)(LeftHeaderLinks);
