import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReleaseCards from "./ReleaseCards";

export default function ReleaseDatePanel() {
  const shoes = useSelector((state) => state.unreleased);
  return (
    <section className="release-preview" aria-label="출시 예정 신발">
      <div className="store-section-heading">
        <h2>출시 예정 신발</h2>
        <Link to="/new-releases" className="store-see-all">
          전체보기
        </Link>
      </div>
      <ReleaseCards shoes={shoes.slice(0, 4)} />
    </section>
  );
}
