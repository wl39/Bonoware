import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import FollowingModal from "views/Profile/FollowingModal/FollowingModal.jsx";
import { getModal, setAttrFollowing } from "store/actions/actions";
import { getSession } from "../../app/api";
import "./release-cards.css";

export default function ReleaseCards({ shoes }) {
  const account = useSelector((state) => state.attr);
  const signedIn = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);

  async function refreshFollowing() {
    const session = await getSession();
    if (session.user)
      dispatch(setAttrFollowing({ ...account }, session.following));
  }

  return (
    <>
      <div className="release-cards">
        {shoes.map((shoe) => {
          const [name, subtitle] = shoe.name.split("|");
          const saved = account?.following?.includes(shoe._id) ?? false;
          const day = shoe.releaseDate.slice(0, 10);
          return (
            <article className="release-card" key={shoe._id}>
              <div className="release-card__top">
                <time dateTime={day}>{day.replaceAll("-", ".")}</time>
                <IconButton
                  aria-label={subtitle + " 관심 상품 설정"}
                  aria-pressed={saved}
                  onClick={() =>
                    signedIn ? setSelected(shoe) : dispatch(getModal(true))
                  }
                >
                  {saved ? <AddCircle /> : <AddCircleOutline />}
                </IconButton>
              </div>
              <Link
                to={"/products/" + encodeURIComponent(shoe._id)}
                className="release-card__link"
              >
                <img src={shoe.image[0]} alt="" loading="lazy" />
                <div className="release-card__body">
                  <span className="release-card__brand">
                    {shoe.brand.toUpperCase()}
                  </span>
                  <strong>{name}</strong>
                  <span className="release-card__subtitle">{subtitle}</span>
                  <div className="release-card__price">
                    <small>발매가</small>
                    <b>
                      {shoe.releasePrice
                        ? "₩" + shoe.releasePrice.toLocaleString("ko-KR")
                        : "미정"}
                    </b>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      <FollowingModal
        open={Boolean(selected)}
        shoeData={selected}
        modalHandler={() => setSelected(null)}
        reRenderHelper={refreshFollowing}
      />
    </>
  );
}
