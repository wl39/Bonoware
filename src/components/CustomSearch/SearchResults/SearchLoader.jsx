import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {

    circle: {
        display: "inline-block",
        width: "51px",
        height: "51px",
        margin: "6px",
        borderRadius: "50%",
        background: "#fff",
        animation: "circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite",
      },
          "@keyframes circle": {
            "0%, 100%": {
              animationTimingFunction: "cubic-bezier(0.5, 0, 1, 0.5)",
            },
            "0%": {
              transform: "rotateY(0deg)",
            },
            "50%": {
              transform: "rotateY(1800deg)",
              animationTimingFunction: "cubic-bezier(0, 0.5, 0.5, 1)",
            },
            "100%": {
              transform: "rotateY(3600deg)",
            }
          }
}
class SearchLoader extends React.Component {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.circle} />
        )
    }
}

export default withStyles(styles)(SearchLoader)