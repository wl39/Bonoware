import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import panel from "assets/jss/material-kit-react/components/panel.jsx"

class EditorRecommendation extends React.Component {
    render() {
        const { classes } = this.props;
        let hidden = this.props.hidden ? classes.hidden : classes.RightShow;
        let highlight = this.props.hidden ? classes.flatTitle : classes.title;

        return (
            <div className={classes.child}>
                <div onClick={this.props.hideMonth} className={highlight}>추천</div>
                <div className={hidden}>
                {this.props.data}
                </div>
            </div>
        )
    }
}

export default withStyles(panel)(EditorRecommendation)