import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Comments from "../Comments/Comments";
import commentsPanel from "assets/jss/material-kit-react/components/commentsPanel";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import axios from "axios";

import { connect } from "react-redux";
import * as actions from "store/actions/actions";

class ProductCommentsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsNumber: 0,
      comments: [],
      userComments: "",
      error: false,
      recent: true
    };
  }

  recentHandler = () => {
    this.setState({
      recent: true
    });
  };

  popularHandler = () => {
    this.setState({
      recent: false
    });
  };

  componentWillReceiveProps(nextProps) {
    let query = nextProps.shoe ? "shoe=" : "news=";

    if (this.props.id !== nextProps.id) {
      axios({
        method: "get",
        url: "https://api.probe.gg/open/findComments?" + query + nextProps.id
      }).then(value => {
        let comments = [];

        value.data.comments.forEach(value => {
          let date = new Date(value.time);
          let mm = date.getMonth() + 1;
          let dd = date.getDate();
          date =
            date.getFullYear() +
            "." +
            (mm > 9 ? "" : "0") +
            mm +
            "." +
            (dd > 9 ? "" : "0") +
            dd +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes();

          comments = [
            ...comments,
            <Comments
              //userID={value.userID}
              userName={value.correspondingUser[0].nick_name}
              contents={value.comment}
              date={date}
              key={value.time}
              like={value.likeCount}
            />
          ];
        });

        this.setState({
          comments: [...comments],
          commentsNumber: value.data.comments.length
        });
      });
    }
  }

  componentWillMount() {
    let query = this.props.shoe ? "shoe=" : "news=";

    axios({
      method: "get",
      url: "https://api.probe.gg/open/findComments?" + query + this.props.id
    }).then(value => {
      let comments = [];

      value.data.comments.forEach(value => {
        let date = new Date(value.time);
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        date =
          date.getFullYear() +
          "." +
          (mm > 9 ? "" : "0") +
          mm +
          "." +
          (dd > 9 ? "" : "0") +
          dd +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes();

        comments = [
          ...comments,
          <Comments
            //userID={value.userID}
            userName={value.correspondingUser[0].nick_name}
            contents={value.comment}
            date={date}
            key={value.time}
            like={value.likeCount}
          />
        ];
      });

      this.setState({
        comments: [...comments],
        commentsNumber: value.data.comments.length
      });
    });
  }

  submit = () => {
    let query = this.props.shoe ? "shoe_comment" : "news_comment";
    let body = this.props.shoe
      ? {
          shoe: this.props.id,
          comment: this.state.userComments
        }
      : {
          news: this.props.id,
          comment: this.state.userComments
        };

    axios
      .post("https://api.probe.gg/protected/post_" + query, body, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg"
        }
      })
      .then(res => {
        let date = new Date();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        date =
          date.getFullYear() +
          "." +
          (mm > 9 ? "" : "0") +
          mm +
          "." +
          (dd > 9 ? "" : "0") +
          dd +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes();

        let newComments = (
          <Comments
            userName={this.props.attr.nick_name}
            contents={this.state.userComments}
            date={date}
            key={date}
            like={0}
          />
        );

        this.setState({
          comments: [...this.state.comments, newComments],
          userComments: ""
        });
      })
      .catch(err => {
        this.props.modalHandler(true);
      });
  };

  type = event => {
    this.setState({
      userComments: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.sortPanel}>
          <div
            onClick={this.recentHandler}
            className={this.state.recent ? classes.active : classes.deactive}
          >
            최신순
          </div>
          <div style={{ borderRight: "1px solid #2a2a2a" }} />
          <div
            onClick={this.popularHandler}
            className={this.state.recent ? classes.deactive : classes.active}
          >
            인기순
          </div>
        </div>

        {this.state.commentsNumber ? (
          this.state.comments
        ) : (
          <div className={classes.header}>
            아직 이 {this.props.shoe ? "상품" : "뉴스"}에 대한 코멘트가
            없습니다.
          </div>
        )}

        <div className={classes.addContainer}>
          <TextField
            error={this.state.error}
            label="댓글 달기"
            fullWidth
            onChange={this.type}
            value={this.state.userComments}
            InputLabelProps={{
              classes: {
                root: classes.addCommentsLabel,
                focused: classes.focused
              }
            }}
            InputProps={{
              classes: {
                underline: classes.addComentsUnderLine,
                inputMultiline: classes.overflowsHidden
              }
            }}
          />
          <Button className={classes.button} onClick={this.submit}>
            등록
          </Button>
        </div>
        {/* <div className={classes.commentsContainer}>{this.state.comments}</div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    attr: state.attr
    //attr: state.attr
  };
};
const mapDispatchToProps = {
  modalHandler: actions.getModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(commentsPanel)(ProductCommentsPanel));
