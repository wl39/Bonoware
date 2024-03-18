import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import shoeNewsPage from "assets/jss/material-kit-react/views/shoeNewsPage";
import classNames from "classnames";
import { Link } from "react-router-dom";

import axios from "axios";

class ShoeNewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNews: [],
      skip: 0,
      next: true
      //   headLine: [],
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

  componentWillMount() {
    axios({
      method: "get",
      url: "https://api.probe.gg/open/list_news?skip=0"
    }).then(value => {
      let allNews = [];
      let next = false;
      console.log(value.data.data);
      value.data.data.forEach((value, index) => {
        if (index >= 6) {
          next = true;
        } else {
          let date = new Date(value.postDate);

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

          value.postDate = this.dateTransform(value.postDate);

          allNews = [...allNews, value];
        }
      });

      this.setState({
        allNews: allNews,
        next: next
      });
    });
  }

  previous = () => {
    if (this.state.skip) {
      axios({
        method: "get",
        url: "https://api.probe.gg/open/list_news?skip=" + (this.state.skip - 1)
      }).then(value => {
        let allNews = [];
        let next = false;

        value.data.data.forEach((value, index) => {
          if (index >= 6) {
            next = true;
          } else {
            let date = new Date(value.postDate);

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

            value.postDate = this.dateTransform(value.postDate);

            allNews = [...allNews, value];
          }
        });

        this.setState({
          allNews: allNews,
          skip: this.state.skip - 1,
          next: next
        });
      });
    }
  };

  next = () => {
    axios({
      method: "get",
      url: "https://api.probe.gg/open/list_news?skip=" + (this.state.skip + 1)
    }).then(value => {
      let allNews = [];
      let next = false;

      value.data.data.forEach((value, index) => {
        if (index >= 6) {
          next = true;
        } else {
          let date = new Date(value.postDate);

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

          value.postDate = this.dateTransform(value.postDate);

          allNews = [...allNews, value];
        }
      });

      this.setState({
        allNews: allNews,
        skip: this.state.skip + 1,
        next: next
      });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {this.state.allNews[0] ? (
          <div>
            <div className={classes.headlineContainer}>
              {/* 뉴스 페이지 맨 위 쪽 */}
              <div className={classes.headlineLeft}>
                {/* 뉴스 페이지 왼쪽 위 컨테이너 */}
                <div className={classes.headlineTitleHeader}>
                  {/* Details container */}
                  <div className={classes.headlineTitleContainer}>
                    <div className={classes.headlineIndex}>01. </div>
                    <div className={classes.headlineTitle}>
                      Sneakers
                      {/* {this.state.allNews[0].title} */}
                    </div>
                  </div>
                  <div className={classes.unknown}>
                    프로브에서 새로 선보이는 심플함 속에서 찾을 수 있는
                    멋스러움과 섬세한 디테일, 그리고 즐거움을 표현하는 캐쥬얼
                    브랜드입니다.
                  </div>
                  <div className={classes.headlineDetailsContainer}>
                    <div className={classes.headlineDetailsLeft}>
                      By {this.state.allNews[0].writer},{" "}
                      {this.state.allNews[0].postDate}
                    </div>
                    {/*Date*/}
                    <div style={{ borderRight: "1px solid black" }} />
                    <div>조회수 {this.state.allNews[0].viewCount}</div>
                    {/*Views*/}
                  </div>
                </div>
                <div className={classes.headlineImageContainer}>
                  <img
                    className={classes.headlineImage}
                    src={this.state.allNews[0].image[0]}
                    alt={this.state.allNews[0].title}
                  />
                </div>
                {/* <div className={classes.headlineContent}>
                  {this.state.allNews[0].Contents}
                </div> */}
                {/* Contents */}
              </div>
              <div className={classes.headlineRight}>
                {/* 뉴스 페이지 왼쪽 위 컨테이너 */}
                <div className={classes.headlineTitleHeader}>
                  {/* Details container */}
                  <div className={classes.headlineTitleContainer}>
                    <div className={classes.headlineIndex}>02. </div>
                    <div className={classes.headlineTitle}>
                      Sneakers
                      {/* {this.state.allNews[1].title} */}
                    </div>
                  </div>
                  <div className={classes.unknown}>
                    프로브에서 새로 선보이는 심플함 속에서 찾을 수 있는
                    멋스러움과 섬세한 디테일, 그리고 즐거움을 표현하는 캐쥬얼
                    브랜드입니다.
                  </div>
                  <div className={classes.headlineDetailsContainer}>
                    <div className={classes.headlineDetailsLeft}>
                      By {this.state.allNews[1].writer},{" "}
                      {this.state.allNews[1].postDate}
                    </div>
                    {/*Date*/}
                    <div style={{ borderRight: "1px solid black" }} />
                    <div>조회수 {this.state.allNews[1].viewCount}</div>
                    {/*Views*/}
                  </div>
                </div>
                <div className={classes.headlineImageContainer}>
                  <img
                    className={classes.headlineImage}
                    src={this.state.allNews[1].image[0]}
                    alt={this.state.allNews[1].title}
                  />
                </div>
              </div>
            </div>
            <div className={classes.newsTypeContainer}>
              <div>all</div>
              <div>sneakers</div>
              <div>designer</div>
              <div>editorial</div>
            </div>
            <div className={classes.newsCardContainer}>
              <Link
                to={"/news/" + this.state.allNews[2].title}
                className={classes.newsCard}
              >
                <img
                  className={classes.newsCardImg}
                  src={this.state.allNews[2].image[0]}
                  alt={this.state.allNews[2].title}
                />
                <div className={classes.category}>SNEAKERS</div>
                <div className={classes.newsCardTitle}>
                  {this.state.allNews[2].title}
                </div>
                <div className={classes.newsCardDetailsContainer}>
                  <div>
                    By {this.state.allNews[2].writer},{" "}
                    {this.state.allNews[2].postDate}
                  </div>
                  <div style={{ borderRight: "1px solid black" }} />
                  <div>조회수 {this.state.allNews[2].viewCount}</div>
                </div>
              </Link>
              <Link
                to={"/news/" + this.state.allNews[3].title}
                className={classes.newsCard}
              >
                <img
                  className={classes.newsCardImg}
                  src={this.state.allNews[3].image[0]}
                  alt={this.state.allNews[3].title}
                />
                <div className={classes.category}>SNEAKERS</div>
                <div className={classes.newsCardTitle}>
                  {this.state.allNews[3].title}
                </div>
                <div className={classes.newsCardDetailsContainer}>
                  <div>
                    By {this.state.allNews[3].writer},{" "}
                    {this.state.allNews[3].postDate}
                  </div>
                  <div style={{ borderRight: "1px solid black" }} />
                  <div>조회수 {this.state.allNews[3].viewCount}</div>
                </div>
              </Link>
              <Link
                to={"/news/" + this.state.allNews[4].title}
                className={classes.newsCard}
              >
                <img
                  className={classes.newsCardImg}
                  src={this.state.allNews[4].image[0]}
                  alt={this.state.allNews[4].title}
                />
                <div className={classes.category}>SNEAKERS</div>
                <div className={classes.newsCardTitle}>
                  {this.state.allNews[4].title}
                </div>
                <div className={classes.newsCardDetailsContainer}>
                  <div>
                    By {this.state.allNews[4].writer},{" "}
                    {this.state.allNews[4].postDate}
                  </div>
                  <div style={{ borderRight: "1px solid black" }} />
                  <div>조회수 {this.state.allNews[4].viewCount}</div>
                </div>
              </Link>
              <Link
                to={"/news/" + this.state.allNews[5].title}
                className={classes.newsCard}
              >
                <img
                  className={classes.newsCardImg}
                  src={this.state.allNews[5].image[0]}
                  alt={this.state.allNews[5].title}
                />
                <div className={classes.category}>SNEAKERS</div>
                <div className={classes.newsCardTitle}>
                  {this.state.allNews[5].title}
                </div>
                <div className={classes.newsCardDetailsContainer}>
                  <div>
                    By {this.state.allNews[5].writer},{" "}
                    {this.state.allNews[5].postDate}
                  </div>
                  <div style={{ borderRight: "1px solid black" }} />
                  <div>조회수 {this.state.allNews[5].viewCount}</div>
                </div>
              </Link>
              <Link
                to={"/news/" + this.state.allNews[5].title}
                className={classes.newsCard}
              >
                <img
                  className={classes.newsCardImg}
                  src={this.state.allNews[5].image[0]}
                  alt={this.state.allNews[5].title}
                />
                <div className={classes.category}>SNEAKERS</div>
                <div className={classes.newsCardTitle}>
                  {this.state.allNews[5].title}
                </div>
                <div className={classes.newsCardDetailsContainer}>
                  <div>
                    By {this.state.allNews[5].writer},{" "}
                    {this.state.allNews[5].postDate}
                  </div>
                  <div style={{ borderRight: "1px solid black" }} />
                  <div>조회수 {this.state.allNews[5].viewCount}</div>
                </div>
              </Link>
            </div>
            {this.state.skip ? (
              <Button onClick={this.previous}>이전</Button>
            ) : null}
            {this.state.next ? <Button onClick={this.next}>다음</Button> : null}
            {/* {this.state.allNews.slice(this.state.skip * this.state.toShow, ((this.state.skip + 1) * this.state.toShow))} */}
          </div>
        ) : (
          <div>로딩중입니다.</div>
        )}
      </div>
    );
  }
}

export default withStyles(shoeNewsPage)(ShoeNewsPage);
