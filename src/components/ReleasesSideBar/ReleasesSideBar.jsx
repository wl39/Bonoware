import React from "react";

const groups = [
  [
    "ADIDAS",
    [
      ["yeezy", "Yeezy"],
      ["ultraBoost", "Ultra Boost"],
      ["nmd", "NMD"],
      ["iniki", "Iniki"],
      ["aOther", "Other"],
    ],
  ],
  [
    "Nike",
    [
      ["airJordan", "Air Jordan"],
      ["airForce", "Air Force"],
      ["airMax", "Air Max"],
      ["nOther", "Other"],
    ],
  ],
];

export default function ReleasesSideBar({
  period,
  onPeriod,
  families,
  onFamily,
}) {
  function checkbox(id, title) {
    return (
      <label key={id}>
        <input
          type="checkbox"
          checked={families.includes(id)}
          onChange={() => onFamily(id)}
        />
        {title}
      </label>
    );
  }
  return (
    <aside className="release-filters" aria-label="출시 필터">
      <div
        className="release-filters__period"
        role="group"
        aria-label="출시 구분"
      >
        {[
          ["upcoming", "출시 예정"],
          ["past", "이전 출시"],
        ].map(([id, title]) => (
          <label key={id}>
            <input
              type="radio"
              name="release-period"
              checked={period === id}
              onChange={() => onPeriod(id)}
            />
            {title}
          </label>
        ))}
      </div>
      <div className="release-filters__brands">
        {groups.map(([brand, options]) => (
          <details key={brand}>
            <summary>{brand}</summary>
            <div>{options.map(([id, title]) => checkbox(id, title))}</div>
          </details>
        ))}
        {checkbox("other", "Other")}
      </div>
    </aside>
  );
}
