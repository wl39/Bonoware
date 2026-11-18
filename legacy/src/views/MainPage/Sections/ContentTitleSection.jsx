import React from "react";
// react plugin that creates slider
import Nouislider from "react-nouislider";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Switch from "@material-ui/core/Switch";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import People from "@material-ui/icons/People";
import Check from "@material-ui/icons/Check";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem"
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import Paginations from "components/Pagination/Pagination.jsx";
import Badge from "components/Badge/Badge.jsx";

import contentTitleSectionStyles from "assets/jss/material-kit-react/views/componentsSections/ContentTitleSectionStyles.jsx";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
});

class SectionBasics extends React.Component {
  render() {
    const { classes } = this.props;
    return (

      <Grid
        container
        spacing={16}
        alignItems="row"
        direction="flex-end"
        justify="space-between"
      >
        <Grid item stlye={{ marginLeft: "10px" }}>
          <h5 style={{
            lineHeight: "0 !important"
          }}>Most Popular</h5>
        </Grid>

        <Grid item>
          <Button color="primary" simple>모두 보기</Button>
        </Grid>

      </Grid>

    );
  }
}

export default withStyles(styles)(SectionBasics);
