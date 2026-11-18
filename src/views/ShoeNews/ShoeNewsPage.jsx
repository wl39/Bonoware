import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import shoeNewsPage from "assets/jss/material-kit-react/views/shoeNewsPage";

function dateLabel(dateString) {
  const date = new Date(dateString);
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days < 1) return "오늘";
  if (days < 7) return days + "일 전";
  if (days < 29) return Math.floor(days / 7) + "주 전";
  if (days < 32) return "한달 전";
  return date.toLocaleDateString("ko-KR");
}

function Byline({ article, className }) {
  return (
    <div className={className}>
      <span>
        By {article.writer}, {dateLabel(article.postDate)}
      </span>
      <span>조회수 {article.viewCount}</span>
    </div>
  );
}

function ShoeNewsPage({ classes }) {
  const [page, setPage] = React.useState(0);
  const [articles, setArticles] = React.useState(null);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    const controller = new AbortController();
    setError(false);
    axios
      .get("https://api.probe.gg/open/list_news", {
        params: { skip: page },
        signal: controller.signal,
      })
      .then(({ data }) => {
        if (!controller.signal.aborted) setArticles(data.data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, [page]);

  return (
    <div className={classes.container}>
      {error ? (
        <p role="alert">뉴스를 불러오지 못했습니다.</p>
      ) : !articles ? (
        <p role="status">로딩중입니다.</p>
      ) : (
        <>
          <div className={classes.headlineContainer}>
            {articles.slice(0, 2).map((article, index) => (
              <Link
                key={article._id}
                to={"/news/" + article.title}
                className={classes.headline}
              >
                <div className={classes.headlineCopy}>
                  <div className={classes.headlineTitle}>
                    <span>0{index + 1}.</span> Sneakers
                  </div>
                  <div className={classes.headlineSummary}>{article.title}</div>
                  <Byline article={article} className={classes.byline} />
                </div>
                <img
                  className={classes.headlineImage}
                  src={article.image[0]}
                  alt={article.title}
                />
              </Link>
            ))}
          </div>
          <div className={classes.newsTypeContainer}>
            <span>All</span>
            <span>Sneakers</span>
            <span>Designer</span>
            <span>Editorial</span>
          </div>
          <div className={classes.newsCardContainer}>
            {articles.slice(2, 6).map((article) => (
              <Link
                key={article._id}
                to={"/news/" + article.title}
                className={classes.newsCard}
              >
                <img
                  className={classes.newsCardImg}
                  src={article.image[0]}
                  alt={article.title}
                />
                <div className={classes.category}>SNEAKERS</div>
                <div className={classes.newsCardTitle}>{article.title}</div>
                <Byline article={article} className={classes.byline} />
              </Link>
            ))}
          </div>
          {page > 0 && <Button onClick={() => setPage(page - 1)}>이전</Button>}
          {articles.length > 6 && (
            <Button onClick={() => setPage(page + 1)}>다음</Button>
          )}
        </>
      )}
    </div>
  );
}
export default withStyles(shoeNewsPage)(ShoeNewsPage);
