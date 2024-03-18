// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import parallaxStyle from "assets/jss/material-kit-react/components/parallaxStyle.jsx";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
import { connect } from 'react-redux';




class Parallax extends React.Component {
  constructor(props) {
    super(props);
    var windowScrollTop = window.pageYOffset / 4.7;
    this.state = {
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    };
    this.resetTransform = this.resetTransform.bind(this);
  }
  componentDidMount() {

    var windowScrollTop = window.pageYOffset / 4.7;
    this.setState({
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    });
    window.addEventListener("scroll", this.resetTransform);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.resetTransform);
  }
  resetTransform() {
    var windowScrollTop = window.pageYOffset / 4.7;
    this.setState({
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    });
  }
  render() {
    const {
      classes,
      filter,
      className,
      children,
      style,
      small
    } = this.props;
    const parallaxClasses = classNames({
      [classes.parallax]: true,
      [classes.filter]: filter,
      [classes.small]: small,
      [className]: className !== undefined
    });
    return (
      <div
        className={parallaxClasses}
        style={{
          ...style,
          backgroundImage: "url(" + this.props.backgroundImage + ")",
          ...this.state
        }}
        ref="parallax"
      >
        {children}
      </div>
    );
  }
}

Parallax.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string
};


const mapStateToProps = state => {
  return {
    backgroundImage: state.backgroundImage,
  };
};

export default connect(mapStateToProps, null)(withStyles(parallaxStyle)(Parallax));
