import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Checkbox } from "@material-ui/core";
import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";

function ReleaseYearPanel({ classes, options, years, setYears }) {
  return (
    <div className={classes.panel}>
      <div className={classes.panelHeader}>Release Years</div>
      <div className={classes.boxesContainer}>
        {options.map((year) => (
          <label className={classes.checkboxContainer} key={year}>
            <Checkbox
              checked={years.includes(year)}
              color="default"
              classes={{ root: classes.root }}
              onChange={() =>
                setYears((previous) =>
                  previous.includes(year)
                    ? previous.filter((value) => value !== year)
                    : [...previous, year],
                )
              }
            />
            <span className={classes.checkboxValue}>{year}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
export default withStyles(propageStyle)(ReleaseYearPanel);
