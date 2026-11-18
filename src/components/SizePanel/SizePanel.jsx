import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";

const values = Array.from({ length: 23 }, (_, i) => 220 + i * 5);
function SizePanel({ classes, sizes, setSizes }) {
  return (
    <div className={classes.panel}>
      <div className={classes.panelHeader}>Sizes</div>
      <div className={classes.shoeSizeContainer}>
        {values.map((size) => (
          <button
            type="button"
            key={size}
            className={classes.sizeChoice}
            aria-pressed={sizes.includes(size)}
            onClick={() =>
              setSizes((previous) =>
                previous.includes(size)
                  ? previous.filter((value) => value !== size)
                  : [...previous, size],
              )
            }
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
export default withStyles(propageStyle)(SizePanel);
