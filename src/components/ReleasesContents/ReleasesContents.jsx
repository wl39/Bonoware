import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReleaseCards from "components/ReleaseDatePanel/ReleaseCards";

export default function ReleasesContents({
  period,
  families,
  month,
  onMonth,
  page,
  onPage,
}) {
  const [data, setData] = useState(null);
  const [months, setMonths] = useState([]);
  const monthSelect = useRef(null);

  function changePage(nextPage) {
    onPage(nextPage);
    monthSelect.current.focus({ preventScroll: true });
    monthSelect.current.scrollIntoView({ block: "start" });
  }
  const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setData(null);
    setError(false);
    axios
      .get("https://api.probe.gg/open/unreleasedShoe", {
        params: { period, month, subBrand: families, skip: page },
        signal: controller.signal,
      })
      .then(({ data: result }) => {
        if (!controller.signal.aborted) {
          setData({
            ...result,
            total: result.total ?? result.orderby.item.length,
          });
          setMonths(result.months ?? []);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, [period, families, month, page]);

  return (
    <section className="release-results" aria-label="출시 일정">
      <div className="release-results__bar">
        <select
          ref={monthSelect}
          aria-label="출시 월"
          value={month}
          onChange={(event) => onMonth(event.target.value)}
        >
          <option value="">전체 월</option>
          {months.map((value) => {
            const [year, number] = value.split("-");
            return (
              <option key={value} value={value}>
                {year}년 {Number(number)}월
              </option>
            );
          })}
        </select>
        <span aria-live="polite">
          {data && `총 ${data.total.toLocaleString("ko-KR")}종`}
        </span>
      </div>
      {error ? (
        <p role="alert">출시 일정을 불러오지 못했습니다.</p>
      ) : !data ? (
        <p role="status">일정을 불러오는 중입니다.</p>
      ) : data.total ? (
        <ReleaseCards shoes={data.orderby.item} />
      ) : (
        <p role="status">선택한 조건의 출시 일정이 없습니다.</p>
      )}
      {data && (page > 0 || data.hasMore) && (
        <nav className="release-results__pages" aria-label="출시 일정 페이지">
          <button disabled={!page} onClick={() => changePage(page - 1)}>
            이전
          </button>
          <span aria-current="page">{page + 1}</span>
          <button disabled={!data.hasMore} onClick={() => changePage(page + 1)}>
            다음
          </button>
        </nav>
      )}
    </section>
  );
}
