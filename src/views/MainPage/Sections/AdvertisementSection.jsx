import Hidden from "@material-ui/core/Hidden";
// react component for creating beautiful carousel
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import carouselStyle from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx";
import Aux from "hoc/Aux_/Aux_";
import React from "react";
import { connect } from "react-redux";
import Carousel from "react-slick";

class SectionCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true,
      arrows: false,
      adaptiveHeight: false
      // beforeChange: (current, next) => this.setState({ slideIndex: next })
    };

    const { classes } = this.props;
    return (
      <Aux>
        <Hidden only={["xs"]} implementation="css">
          <div className={classes.navBoxContainer}>
            <div
              className={classes.navBox}
              onClick={() => this.slider && this.slider.slickGoTo(0)}
            >
              <div className={classes.num}>01</div>
              <div className={classes.title}>BLAKC IS THE NEW BLACK</div>
              <div className={classes.shoe}>Yeezy Boost</div>
            </div>
            <div
              className={classes.navBox}
              onClick={() => this.slider && this.slider.slickGoTo(1)}
            >
              <div className={classes.num}>02</div>
              <div className={classes.title}>TONAL ON THE ROCKS</div>
              <div className={classes.shoe}>Yeezy Boost 700</div>
            </div>
            <div
              className={classes.lastNavBox}
              onClick={() => this.slider && this.slider.slickGoTo(2)}
            >
              <div className={classes.num}>03</div>
              <div className={classes.title}> TESTING</div>
              <div className={classes.shoe}>Testing</div>
            </div>
          </div>
          <Carousel ref={slider => (this.slider = slider)} {...settings}>
            <div>
              <img
                src={this.props.pcSliderImages[0]}
                className="slick-image"
                alt="0"
              />
            </div>
            <div>
              <img
                src={this.props.pcSliderImages[1]}
                className="slick-image"
                alt="1"
              />
            </div>
            <div>
              <img
                src={this.props.pcSliderImages[2]}
                className="slick-image"
                alt="2"
              />
            </div>
          </Carousel>
        </Hidden>
        <Hidden only={["sm", "lg", "xl", "md"]} implementation="css">
          <Carousel {...settings}>
            <div>
              <img
                src={this.props.mobileSliderImages[0]}
                className="slick-image"
                alt="3"
              />
            </div>
            <div>
              <img
                src={this.props.mobileSliderImages[1]}
                className="slick-image"
                alt="4"
              />
            </div>
            <div>
              <img
                src={this.props.mobileSliderImages[2]}
                className="slick-image"
                alt="5"
              />
            </div>
          </Carousel>
        </Hidden>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    pcSliderImages: state.pcSliderImages,
    mobileSliderImages: state.mobileSliderImages
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(carouselStyle)(SectionCarousel));
