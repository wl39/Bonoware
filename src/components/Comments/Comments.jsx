import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import comments from "assets/jss/material-kit-react/components/comments";
import {
  AccountCircleOutlined,
  ThumbUpAltOutlined,
  ThumbUpAlt,
  ThumbDownAlt,
  ThumbDownAltOutlined
} from "@material-ui/icons";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      userName: "",
      contents: "",
      date: "",
      likeNum: "",
      like: false,
      likeNum: 0,
      dislike: false,
      dislikeNum: 0
    };
  }

  like = () => {
    //do lambda function in here (cancle like also)

    //If it succeeded do setState
    this.setState({
      like: !this.state.like,
      likeNum: this.state.like
        ? parseInt(this.state.likeNum - 1, 10)
        : parseInt(this.state.likeNum + 1, 10)
    });
  };

  dislike = () => {
    //do lambda function in here (cancle like also)

    //If it succeeded do setState
    this.setState({
      dislike: !this.state.dislike,
      dislikeNum: this.state.dislike
        ? parseInt(this.state.dislikeNum - 1, 10)
        : parseInt(this.state.dislikeNum + 1, 10)
    });
  };

  componentWillMount() {
    this.setState({
      userID: this.props.userID,
      userName: this.props.userName, //.substr(0, this.props.userName.length - 1) + "*",
      contents: this.props.contents,
      date: this.props.date,
      likeNum: this.props.like
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <AccountCircleOutlined className={classes.userIcon} />
        <div className={classes.detailsContainer}>
          <div className={classes.commentsHeader}>
            <div className={classes.nickname}>{this.state.userName}</div>
            <div className={classes.date}>{this.state.date}</div>
          </div>
          <div className={classes.contents}>{this.state.contents}</div>
        </div>
        <IconButton className={classes.likeButton} onClick={this.like}>
          {this.state.like ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
        </IconButton>
        <div className={classes.likeNum}>{this.state.likeNum}</div>
        <IconButton className={classes.dislikeButton} onClick={this.dislike}>
          {this.state.dislike ? <ThumbDownAlt /> : <ThumbDownAltOutlined />}
        </IconButton>
        <div className={classes.dislikeNum}>{this.state.dislikeNum}</div>
      </div>
    );
  }
}

export default withStyles(comments)(Comments);
