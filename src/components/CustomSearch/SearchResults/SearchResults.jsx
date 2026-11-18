import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import classNames from "classnames";
import { Link } from "react-router-dom";
import searchStyle from "../../../assets/jss/material-kit-react/components/searchStyle";

const pageSize = 6;
function SearchResults({ classes, visible, search, josh, test, lol }) {
  const term = search.trim();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [error, setError] = useState(false);
  const active = useRef(null);
  const nextPage = useRef(0);
  const scrollBox = useRef(null);
  const load = useCallback(
    async (page) => {
      if (active.current) return;
      const controller = new AbortController();
      active.current = controller;
      setError(false);
      setLoading(true);
      try {
        const { data } = await axios.get("https://api.probe.gg/open/search", {
          params: { shoe: term, skip: page, limit: pageSize },
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        setItems((previous) => [
          ...(page ? previous : []),
          ...data.slice(0, pageSize),
        ]);
        nextPage.current = page + 1;
        setMore(data.length > pageSize);
      } catch (cause) {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (active.current === controller) {
          active.current = null;
          setLoading(false);
        }
      }
    },
    [term],
  );
  useEffect(() => {
    setItems([]);
    setMore(false);
    setError(false);
    nextPage.current = 0;
    if (!visible || !term) return;
    setLoading(true);
    if (scrollBox.current) scrollBox.current.scrollTop = 0;
    const timer = setTimeout(() => load(0), 180);
    return () => {
      clearTimeout(timer);
      active.current?.abort();
      active.current = null;
    };
  }, [visible, term, load]);
  if (!visible || !term) return null;
  return (
    <div
      className={classNames(josh, test, classes.surface)}
      role="region"
      aria-label="검색 결과"
      ref={scrollBox}
      onScroll={({ currentTarget }) => {
        if (
          more &&
          !loading &&
          !error &&
          currentTarget.scrollHeight - currentTarget.scrollTop <=
            currentTarget.clientHeight + 2
        )
          load(nextPage.current);
      }}
    >
      {items.map((item) => {
        const [english, korean] = item.name.split("|");
        return (
          <Link
            key={item._id}
            className={classes.result}
            to={"/products/" + encodeURIComponent(item._id)}
            onClick={() => lol(item.name)}
          >
            <img className={classes.img} src={item.image[0]} alt="" />
            <span className={classes.detailsContainer}>
              <span className={classes.modelEn}>{english}</span>
              <span className={classes.model}>{korean}</span>
              <span className={classes.price}>
                {item.lowestPrice
                  ? "최저가 ₩" + item.lowestPrice.toLocaleString("ko-KR")
                  : "품절"}
              </span>
            </span>
          </Link>
        );
      })}
      {loading && (
        <div className={classes.message} role="status" aria-label="검색 중">
          <CircularProgress size={22} color="inherit" />
        </div>
      )}
      {error && (
        <Button onClick={() => load(nextPage.current)}>다시 불러오기</Button>
      )}
      {!loading && !error && !items.length && (
        <div className={classes.message}>검색 결과가 없습니다.</div>
      )}
      {more && !loading && !error && (
        <Button
          className={classes.moreButton}
          onClick={() => load(nextPage.current)}
        >
          더 보기
        </Button>
      )}
    </div>
  );
}
export default withStyles(searchStyle)(SearchResults);
