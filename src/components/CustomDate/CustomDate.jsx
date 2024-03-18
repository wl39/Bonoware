import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import customInputStyle from "assets/jss/material-kit-react/components/customInputStyle.jsx";

import Datetime from 'react-datetime';


function CustomDate({ ...props }) {
    const {
        classes,
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        white,
        inputRootCustomClasses,
        success,
        onChange,
        type
    } = props;

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: true,
        [classes.whiteUnderline]: white
    });
    const marginTop = classNames({
        [classes.marginTop]: labelText === undefined,
        [inputRootCustomClasses]: inputRootCustomClasses !== undefined
    });
    const inputClasses = classNames({
        [classes.input]: true,
        [classes.whiteInput]: white
    });
    const formControlClasses = classNames({
        [classes.formControl]: true,
        [classes.formControlLabel]: labelText !== undefined,
        [formControlProps.className]: formControlProps.className !== undefined
    });
    return (
        <FormControl {...formControlProps} className={formControlClasses}
        >
            <Datetime
                dateFormat='YYYY-MM-DD'
                timeFormat={false}
                inputProps={{
                    placeholder: "Pick a Date",
                    underline: underlineClasses,
                    type: "date",


                }}
                // classes={{
                //     input: inputClasses,
                //     root: marginTop,
                //     disabled: classes.disabled,
                //     underline: underlineClasses,
                //     className: "Here"
                // }}

                onChange={onChange}
                onBlur={onChange}
                id={id}
                {...inputProps}

            />
            {error ? (
                <Clear className={classes.feedback + " " + classes.labelRootError}
                />
            ) : success ? (
                <Check className={classes.feedback + " " + classes.labelRootSuccess} />
            ) : null}
        </FormControl>
    );
}

CustomDate.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    white: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomDate);
