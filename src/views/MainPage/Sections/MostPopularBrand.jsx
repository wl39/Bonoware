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
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
class MostPopularBrand extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.title}>인기 브랜드</div>
        <div className={classes.brandContainer}>
          <div className={classes.firstRow}>
            <Link
              to={{
                pathname: "/products",
                state: {
                  filter: "",
                  brand: "nike"
                }
              }}
              className={classes.firstBrand}
            >
              <img
                src={archiveImage0}
                alt="nikeImage"
                className={classes.shoeImg}
              />
              <img
                src={archiveImage1}
                alt="nike"
                className={classes.brandImg}
              />
            </Link>
            <Link
              to={{
                pathname: "/products",
                state: {
                  filter: "",
                  brand: "airjordan"
                }
              }}
              className={classes.middleBrandLeft}
            >
              <img
                src={archiveImage2}
                alt="jordanImage"
                className={classes.shoeImg}
              />
              <img
                src={archiveImage3}
                alt="jordan"
                className={classes.brandImg}
              />
            </Link>
          </div>
          <div className={classes.secondRow}>
            <Link
              to={{
                pathname: "/products",
                state: {
                  filter: "",
                  brand: "adidas"
                }
              }}
              className={classes.middleBrandRight}
            >
              <img
                src={archiveImage4}
                alt="adidasImage"
                className={classes.shoeImg}
              />
              <img
                src={archiveImage5}
                alt="adidas"
                className={classes.brandImg}
              />
            </Link>
            {/* </Button>
          <Button> */}
            <Link
              to={{
                pathname: "/products",
                state: {
                  filter: "",
                  brand: "yeezy"
                }
              }}
              className={classes.lastBrand}
            >
              {" "}
              <img
                src={archiveImage6}
                alt="yeezyImage"
                className={classes.shoeImg}
              />
              <img
                src={archiveImage7}
                alt="yeezy"
                className={classes.brandImg}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(mostPopularBrand)(MostPopularBrand);
