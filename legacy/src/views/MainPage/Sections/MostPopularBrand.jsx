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
                src="https://stockx.imgix.net/Nike-Zoom-Terra-Kiger-5-Off-White-Black-W-Product.jpg?fit=fill&bg=FFFFFF&w=300&h=214&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1561561490"
                alt="nikeImage"
                className={classes.shoeImg}
              />
              <img
                src="https://stockx-assets.imgix.net/png/brand-tiles/img-nike.png?auto=compress,format"
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
                src="https://stockx.imgix.net/Air-Jordan-1-Retro-High-Black-Gym-Red-Product.jpg?fit=fill&bg=FFFFFF&w=300&h=214&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1560199780"
                alt="jordanImage"
                className={classes.shoeImg}
              />
              <img
                src="https://stockx-assets.imgix.net/png/brand-tiles/img-jordan.png?auto=compress,format"
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
                src="https://stockx.imgix.net/adidas-NMD-R1-Grey-Shock-Pink-W.png?fit=fill&bg=FFFFFF&w=300&h=214&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1544583271"
                alt="adidasImage"
                className={classes.shoeImg}
              />
              <img
                src="https://stockx-assets.imgix.net/png/brand-tiles/img-adidas.png?auto=compress,format"
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
                src="https://stockx.imgix.net/adidas-Yeezy-Boost-350-V2-Black-Product.jpg?fit=fill&bg=FFFFFF&w=300&h=214&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1559748037"
                alt="yeezyImage"
                className={classes.shoeImg}
              />
              <img
                src="https://stockx-assets.imgix.net/png/brand-tiles/img-yzy.png?auto=compress,format"
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
