import React from "react";
import { withStyles, Checkbox, FormControlLabel } from "@material-ui/core";
import sortingPanel from "../../assets/jss/material-kit-react/components/sortingPanel";

class SortingPanel extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <FormControlLabel
          className={classes.label}
          control={
            <Checkbox
              checked={this.props.mostPopular}
              onClick={this.props.setSort("mostPopular")}
              value="mostPopular"
              color="default"
            />
          }
          label="인기순"
        />
        <FormControlLabel
          className={classes.label}
          control={
            <Checkbox
              checked={this.props.mostRecent}
              onClick={this.props.setSort("mostRecent")}
              value="mostRecent"
              color="default"
            />
          }
          label="최신순"
        />

        <FormControlLabel
          className={classes.label}
          control={
            <Checkbox
              checked={this.props.lowestPrice}
              onClick={this.props.setSort("lowestPrice")}
              value="lowestPrice"
              color="default"
            />
          }
          label="가격순"
        />
      </div>
    );
  }
}

export default withStyles(sortingPanel)(SortingPanel);
