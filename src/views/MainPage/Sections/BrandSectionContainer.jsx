import React from "react";
// react component for creating beautiful carousel
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// @material-ui/icons
// core components
import nike from "assets/img/brand/rsz_1jordan.jpg";
import adidas from "assets/img/brand/adidas.jpeg";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: 10
    },
    paper: {
        textAlign: "center",
        height: "auto",
        width: "100%"
    },
    subheader: {
        width: "100%"
    },
    imageButton: {
        height: "50%",
        width: "100%",
        "&:hover, &$focusVisible": {
            zIndex: 1,
            "& $imageBackdrop": {
                opacity: 0.15
            },
            "& $imageMarked": {
                opacity: 0
            }
        }
    },
    image: {
        height: "auto",
        width: "100%"
    },
    focusVisible: {},
    imageSrc: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: "cover",
        backgroundPosition: "center 40%"
    },
    imageBackdrop: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create("opacity"),
        imageButton: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.common.white
        }
    }
});

class BrandSectionContainer extends React.Component {
    state = {
        spacing: "40"
    };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <div className={classes.root}>
                <Grid container className={classes.root} spacing={spacing}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                            <ButtonBase
                                focusRipple
                                className={classes.imageButton}
                                focusVisibleClassName={classes.focusVisible}
                            >
                                <img src={nike} className={classes.image} />
                                {/* <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: 'url(${nike})'
                  }}
                /> */}
                                {/* <span className={classes.imageBackdrop} />
                <span className={classes.imageButton} /> */}
                            </ButtonBase>
                            <h2>Test</h2>
                            <h4>Descibe</h4>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                            <ButtonBase
                                focusRipple
                                className={classes.imageButton}
                                focusVisibleClassName={classes.focusVisible}
                            >
                                <img src={adidas} className={classes.image} />
                            </ButtonBase>
                            <h2>Test</h2>
                            <h4>Descibe</h4>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(BrandSectionContainer);