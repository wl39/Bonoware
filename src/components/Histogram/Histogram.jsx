import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";

function Histogram({ histogram = [] }) {
  // The original graph has 50 price buckets. Never allocate DOM from an
  // untrusted sparse-array length (a currency amount used as an index can hang a tab).
  const buckets = Array.from(
    { length: Math.min(histogram.length, 50) },
    (_, i) => histogram[i],
  );
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}
    >
      {buckets.map((bucket, i) => (
        <div key={i} style={{ width: "2%" }}>
          <div
            style={{
              height: Math.max(0, Number(bucket?.frequency) || 0) * 10 + "px",
              width: "100%",
              background: "#c8c8c8",
            }}
          />
          <div
            style={{
              height:
                Math.max(0, Number(bucket?.lowestFrequency) || 0) * 10 + "px",
              width: "100%",
              backgroundImage: "linear-gradient(#c8c8c8, #939393)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
export default withStyles(null)(Histogram);
