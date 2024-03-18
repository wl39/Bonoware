import React from "react";
import { withStyles } from "@material-ui/core";

import newsPanel from "assets/jss/material-kit-react/components/newsPanel.jsx";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

class NewsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      shoeNews: []
    };
  }

  renderHelper = props => {
    const { classes } = this.props;

    let shoeNews = [];

    if (props.shoeNews.length && this.state.shoeNews.length === 0) {
      props.shoeNews.forEach((value, index) => {
        let date = new Date(value.postDate);
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        date =
          date.getFullYear() +
          "-" +
          (mm > 9 ? "" : "0") +
          mm +
          "-" +
          (dd > 9 ? "" : "0") +
          dd;

        shoeNews = [
          ...shoeNews,
          <div key={index} className={classes.container}>
            <Link
              to={"/news/" + value.title} //title
              className={classes.link}
            >
              <div className={classes.mainInfo}>
                <div className={classes.title}>{value.title}</div>
                <div className={classes.viewValue}>
                  {/** viewCount */}
                  VIEW {value.viewCount}
                </div>
              </div>
              <div className={classes.details}>
                {value.writer + " "}- {" " + date}
              </div>
            </Link>
          </div>
        ];
      });

      this.setState({
        shoeNews: shoeNews
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.renderHelper(nextProps);
  }

  componentWillMount() {
    this.renderHelper(this.props);
  }

  handleTooltipClose = () => {
    this.setState({
      open: false
    });
  };

  handleTooltipOpen = () => {
    this.setState({
      open: true
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.newsPanelContainer}>
        <div className={classes.cardHeader}>
          <div className={classes.cardHeaderName}>최신 소식</div>
          <Link to="/news" className={classes.newsLink}>
            <div className={classes.seeAll}>전체보기</div>
          </Link>
        </div>
        {/* <ClickAwayListener onClickAway={this.handleTooltipClose}>
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                style={{ padding: "0px", marginRight: "" }}
                PopperProps={{
                  disablePortal: true
                }}
                onClose={this.handleTooltipClose}
                open={this.state.open}
                id="tooltip-top"
                title={"신발에 대한 가장 빠르고 정확한 뉴스"}
                placement="right"
                disableFocusListener
                disableTouchListener
              >
                <IconButton
                  onClick={this.handleTooltipOpen}
                  className={classes.tooltipButton}
                >
                  <Icon className={classes.tooltipAlert}>live_help</Icon>
                </IconButton>
              </Tooltip>
            </ClickAwayListener> */}

        <div className={classes.newsContainer}>{this.state.shoeNews}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shoeNews: state.shoeNews
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(newsPanel)(NewsPanel));
