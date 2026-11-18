import React, { useState } from "react";
import ReleasesSideBar from "components/ReleasesSideBar/ReleasesSideBar";
import ReleasesContents from "components/ReleasesContents/ReleasesContents";
import "./release-calendar.css";

export default function NewReleasesPage() {
  const [period, setPeriod] = useState("upcoming");
  const [families, setFamilies] = useState([]);
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(0);
  function changePeriod(value) {
    setPeriod(value);
    setMonth("");
    setPage(0);
  }
  function changeFamily(value) {
    setFamilies((current) =>
      current.includes(value)
        ? current.filter((id) => id !== value)
        : [...current, value],
    );
    setPage(0);
  }
  function changeMonth(value) {
    setMonth(value);
    setPage(0);
  }
  return (
    <main className="release-calendar">
      <header>
        <h1>출시 예정 신발</h1>
        <p>출시 예정 날짜는 아카이브 모델의 데모 재발매 일정입니다.</p>
      </header>
      <div className="release-calendar__layout">
        <ReleasesSideBar
          period={period}
          onPeriod={changePeriod}
          families={families}
          onFamily={changeFamily}
        />
        <ReleasesContents
          period={period}
          families={families.join(",")}
          month={month}
          onMonth={changeMonth}
          page={page}
          onPage={setPage}
        />
      </div>
    </main>
  );
}
