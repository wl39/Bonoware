import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import People from "@material-ui/icons/People";
import CalendarToday from "@material-ui/icons/CalendarToday";

import Slider from "react-slick";

import shoeNews from "assets/jss/material-kit-react/views/shoeNews";

class ShoeNewsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  dateTransform = oldDate => {
    let today = new Date();
    let date = new Date(oldDate);

    let dateSub = today.getTime() - date.getTime();
    let day = 1000 * 60 * 60 * 24;

    let timeDiff = parseInt(dateSub / day, 10);

    if (timeDiff < 7) {
      if (timeDiff === 0) {
        return "오늘";
      }
      return timeDiff + "일 전";
    } else if (timeDiff < 29) {
      return parseInt(timeDiff / 7, 10) + "주 전";
    } else if (timeDiff < 32) {
      return "한달 전";
    } else {
      let mm = date.getMonth() + 1;
      let dd = date.getDate();

      date =
        date.getFullYear() +
        "." +
        (mm > 9 ? "" : "0") +
        mm +
        "." +
        (dd > 9 ? "" : "0") +
        dd;
      return date;
    }
  };

  componentDidMount() {
    const { classes } = this.props;

    if (this.props.images) {
      Object.keys(this.props.images).forEach((value, index) => {
        this.setState(prevState => ({
          images: [
            ...prevState.images,
            <div className={classes.imgContainer}>
              <img
                className={classes.img}
                key={index}
                src={this.props.images[value]}
                alt={index}
              />
            </div>
          ]
        }));
      });
    }
  }

  render() {
    const { classes } = this.props;
    const setting = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000
    };

    return (
      <div className={classes.newsContainer}>
        <div className={classes.category} />
        <div className={classes.newsHeader}>
          <div className={classes.headerCategory}>Sneakers</div>
          <div className={classes.title}>{this.props.title}</div>
          <div className={classes.info}>
            <div>
              By {this.props.writer}, {this.dateTransform(this.props.date)}
            </div>
            <div style={{ borderRight: "1px solid #010101" }} />
            <div>view {this.props.view}</div>
          </div>
          {/* <div className={classes.info}>
            <div className={classes.iconContainer}>
              <div className={classes.date}>발행일 {this.props.date}</div>
              <CalendarToday className={classes.calendar} />
            </div>
            <div className={classes.iconContainer}>
              <div className={classes.view}>조회수 {this.props.view}</div>
              <People className={classes.people} />
            </div>
          </div> */}
        </div>
        <div className={classes.contentsContainer}>
          <Slider {...setting}>{this.state.images}</Slider>
          <div className={classes.contents}>{this.props.contents}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(shoeNews)(ShoeNewsDetail);
