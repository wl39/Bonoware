import archiveImage0 from "assets/img/dummy/Nike-Zoom-Terra-Kiger-5-Off-White-White-W.jpg";
import archiveImage1 from "assets/img/dummy/img-nike.jpg";
import archiveImage2 from "assets/img/dummy/Air-Jordan-1-Retro-High-Black-Gym-Red-Product.jpg";
import archiveImage3 from "assets/img/dummy/img-jordan.jpg";
import archiveImage4 from "assets/img/dummy/adidas-Ultra-Boost-4-Game-of-Thrones-White-Walkers-1.jpg";
import archiveImage5 from "assets/img/dummy/img-adidas.jpg";
import archiveImage6 from "assets/img/dummy/adidas-Yeezy-Boost-350-V2-Antlia-Product.jpg";
import archiveImage7 from "assets/img/dummy/img-yzy.jpg";
import React from "react";
import mostPopularBrand from "assets/jss/material-kit-react/views/mostPopularBrand.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

const brands = [
  { filter: "nike", label: "Nike", shoe: archiveImage0, logo: archiveImage1 },
  { filter: "airjordan", label: "Jordan", shoe: archiveImage2, logo: archiveImage3 },
  { filter: "adidas", label: "adidas", shoe: archiveImage4, logo: archiveImage5 },
  { filter: "yeezy", label: "Yeezy", shoe: archiveImage6, logo: archiveImage7 }
];

function MostPopularBrand({ classes }) {
  return (
    <div className={classes.container}>
      <div className={classes.title}>인기 브랜드</div>
      <div className={classes.brandContainer}>
        {brands.map(({ filter, label, shoe, logo }) => (
          <Link
            key={filter}
            to={{ pathname: "/products", state: { filter: "", brand: filter } }}
            className={classes.brandCard}
            aria-label={label}
          >
            <img src={shoe} alt="" className={classes.shoeImg} />
            <img src={logo} alt={label} className={classes.brandImg} />
          </Link>
        ))}
      </div>
    </div>
  );
}
export default withStyles(mostPopularBrand)(MostPopularBrand);
