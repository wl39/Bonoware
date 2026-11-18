import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import panel from "assets/jss/material-kit-react/components/panel.jsx"

class PopularSearch extends React.Component {
    render() {
        const { classes } = this.props
        let hidden = this.props.hidden ? classes.hidden : classes.leftShow;
        let highlight = this.props.hidden ? classes.flatTitle : classes.title;

        return (
            <div className={classes.child}>
                <div className={highlight} onClick={this.props.showMonth}>월별</div>
                <div className={hidden}>
                    {this.props.data}
                </div>
            </div>
        )
    }
}

export default withStyles(panel)(PopularSearch)