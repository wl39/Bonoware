import React, { useRef, useState } from "react";
import { ClickAwayListener, IconButton, Tooltip } from "@material-ui/core";
import Help from "@material-ui/icons/Help";
import { Link } from "react-router-dom";
import "./product-shelf.css";

export default function ProductShelf({ headerName, helper, shoes, filter }) {
  const [helpOpen, setHelpOpen] = useState(false);
  const drag = useRef(null);
  const dragged = useRef(false);

  function startDrag(event) {
    dragged.current = false;
    if (event.pointerType === "mouse" && event.button === 0) {
      drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft };
    }
  }

  function moveDrag(event) {
    if (!drag.current || event.buttons !== 1) return;
    const distance = event.clientX - drag.current.x;
    if (!dragged.current && Math.abs(distance) < 5) return;
    dragged.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.scrollLeft = drag.current.left - distance;
  }

  return (
    <section className="product-shelf" aria-label={headerName}>
      <div className="product-shelf__heading">
        <h2>{headerName}</h2>
        <ClickAwayListener onClickAway={() => setHelpOpen(false)}>
          <Tooltip
            title={helper}
            open={helpOpen}
            onClose={() => setHelpOpen(false)}
            placement="top"
            disableTouchListener
          >
            <IconButton
              aria-label={headerName + " 안내"}
              onClick={() => setHelpOpen(!helpOpen)}
            >
              <Help fontSize="small" />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
        {filter && (
          <Link
            className="product-shelf__all"
            to={{ pathname: "/products", state: { filter, brand: "" } }}
          >
            전체보기
          </Link>
        )}
      </div>
      <div
        className="product-shelf__items"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (dragged.current && event.detail !== 0) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        {shoes.map((product) => {
          const [name, subtitle] = product.name.split("|");
          const id = product._id || product.name;
          return (
            <Link
              key={id}
              to={"/products/" + encodeURIComponent(id)}
              className="shelf-card"
            >
              <span className="shelf-card__photo">
                <img src={product.image[0]} alt="" loading="lazy" />
              </span>
              <span className="shelf-card__body">
                <strong className="shelf-card__name">{name}</strong>
                <span className="shelf-card__subtitle">{subtitle}</span>
                <span className="shelf-card__price">
                  <small>최저가</small>
                  <b>
                    {product.lowestPrice
                      ? "₩" + product.lowestPrice.toLocaleString("ko-KR")
                      : "품절"}
                  </b>
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
