import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
// import { Auth } from "aws-amplify";
// import DynamoDB from "aws-sdk/clients/dynamodb";
import axios from "axios";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import searchStyle from "../../../assets/jss/material-kit-react/components/searchStyle";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      imgs: [],
      skip: 1,
      next: false
    };
    this.timer = null;
  }

  componentWillReceiveProps(prevProps) {
    const { classes } = this.props;
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        visible: prevProps.visible
      });
    }

    if (this.props.search !== prevProps.search) {
      if (prevProps.search && !prevProps.skip) {
        this.setState({
          imgs: (
            <div className={classes.loader}>
              <CircularProgress color="secondary" size={100} />
            </div>
          ),
          skip: 0
        });

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          this.setState({
            imgs: []
          });
          axios({
            method: "get",
            url:
              "https://api.probe.gg/open/search?shoe=" +
              this.props.search +
              "&skip=0"
          }).then(value => {
            let data = value.data;
            let imgs = [];
            let next = false;
            if (data.length !== 0) {
              data.forEach((value, index) => {
                let splitName = value.name.split("|");

                if (index >= 6) {
                  next = true;
                } else {
                  imgs = [
                    ...imgs,

                    <Button className={classes.button} key={value.name}>
                      <Link
                        to={"/products/" + value.name}
                        className={classes.link}
                        onClick={() => this.props.lol(value.name)}
                      >
                        <div
                          key={index}
                          className={
                            this.props.header
                              ? classes.headerPaperStyle
                              : classes.paperStyle
                          }
                        >
                          <img
                            className={classes.img}
                            src={value.image[0]}
                            alt={value.name}
                          />
                          <div className={classes.detailsContainer}>
                            <div>
                              <div className={classes.model}>
                                <div className={classes.modelEn}>
                                  {splitName[0]}
                                </div>
                                <div>{splitName[1]}</div>
                              </div>
                              <div className={classes.price}>
                                {value.lowestPrice
                                  ? "최저가 ₩ " +
                                    value.lowestPrice.toLocaleString()
                                  : "품절"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Button>
                  ];
                }
              });
              this.setState({
                imgs: imgs,
                next: next,
                skip: this.state.skip + 1
              });
            } else {
              this.setState({
                imgs: <div>검색 결과가 없습니다.</div>,
                next: next,
                skip: 0
              });
            }
          });
        }, 500);
      }
    }
  }

  viewMoreShoews = elem => {
    const { classes } = this.props;

    let div = elem.target;

    if (div.scrollHeight - div.scrollTop === div.clientHeight) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // an error occurred
        axios({
          method: "get",
          url:
            "https://api.probe.gg/open/search?shoe=" +
            this.props.search +
            "&skip=" +
            this.state.skip
        }).then(value => {
          let data = value.data;
          let imgs = [];
          let next = false;
          if (data.length !== 0) {
            data.forEach((value, index) => {
              let splitName = value.name.split("|");

              if (index >= 6) {
                next = true;
              } else {
                imgs = [
                  ...imgs,
                  <Button className={classes.button} key={value.name}>
                    <Link
                      to={"/products/" + value.name}
                      className={classes.link}
                      onClick={() => this.props.lol(value.name)}
                    >
                      <div
                        key={index}
                        className={
                          this.props.header
                            ? classes.headerPaperStyle
                            : classes.paperStyle
                        }
                      >
                        <img
                          className={classes.img}
                          src={value.image[0]}
                          alt={value.name}
                        />
                        <div className={classes.detailsContainer}>
                          <div>
                            <div className={classes.model}>
                              <div className={classes.modelEn}>
                                {splitName[0]}
                              </div>
                              <div>{splitName[1]}</div>
                            </div>
                            <div className={classes.price}>
                              {value.lowestPrice
                                ? "최저가 ₩ " +
                                  value.lowestPrice.toLocaleString()
                                : "품절"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                ];
              }
            });
            this.setState({
              skip: this.state.skip + 1,
              imgs: [...this.state.imgs, ...imgs],
              next: next
            });
          } else {
            this.setState({
              next: next
            });
          }
        });
      }, 500);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classNames(this.props.josh, this.props.test)}
        onScroll={this.viewMoreShoews}
      >
        {this.state.visible ? this.state.imgs : null}
        {this.state.visible && this.state.next ? (
          <Button className={classes.moreButton} onClick={this.viewMoreShoews}>
            더 보기
          </Button>
        ) : null}
      </div>
    );
  }
}

export default withStyles(searchStyle)(SearchResults);
