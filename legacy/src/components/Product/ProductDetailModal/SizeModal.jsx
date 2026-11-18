import React from "react";
import sizeModal from "assets/jss/material-kit-react/views/landingPageSections/sizeModal.jsx";

import { withStyles } from "@material-ui/core/styles";

class SizeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <div className={classes.modalHeader}>사이즈 선택</div>
        <div className={classes.sizeContainer}>
          <div
            className={
              this.props.size === null
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(null)}
          >
            All
          </div>
          <div
            className={
              this.props.size === 220
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(220)}
          >
            220
          </div>
          <div
            className={
              this.props.size === 225
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(225)}
          >
            225
          </div>
          <div
            className={
              this.props.size === 230
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(230)}
          >
            230
          </div>
          <div
            className={
              this.props.size === 235
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(235)}
          >
            235
          </div>
          <div
            className={
              this.props.size === 240
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(240)}
          >
            240
          </div>
          <div
            className={
              this.props.size === 245
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(245)}
          >
            245
          </div>
          <div
            className={
              this.props.size === 250
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(250)}
          >
            250
          </div>
          <div
            className={
              this.props.size === 255
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(255)}
          >
            255
          </div>
          <div
            className={
              this.props.size === 260
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(260)}
          >
            260
          </div>
          <div
            className={
              this.props.size === 265
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(265)}
          >
            265
          </div>
          <div
            className={
              this.props.size === 270
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(270)}
          >
            270
          </div>
          <div
            className={
              this.props.size === 275
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(275)}
          >
            275
          </div>
          <div
            className={
              this.props.size === 280
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(280)}
          >
            280
          </div>
          <div
            className={
              this.props.size === 285
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(285)}
          >
            285
          </div>
          <div
            className={
              this.props.size === 290
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(290)}
          >
            290
          </div>
          <div
            className={
              this.props.size === 295
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(295)}
          >
            295
          </div>
          <div
            className={
              this.props.size === 300
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(300)}
          >
            300
          </div>
          <div
            className={
              this.props.size === 305
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(305)}
          >
            305
          </div>
          <div
            className={
              this.props.size === 310
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(310)}
          >
            310
          </div>
          <div
            className={
              this.props.size === 315
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(315)}
          >
            315
          </div>
          <div
            className={
              this.props.size === 320
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(320)}
          >
            320
          </div>
          <div
            className={
              this.props.size === 325
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(325)}
          >
            325
          </div>
          <div
            className={
              this.props.size === 330
                ? classes.gridValueActive
                : classes.gridValue
            }
            onClick={() => this.props.sizeHandler(330)}
          >
            330
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(sizeModal)(SizeModal);
