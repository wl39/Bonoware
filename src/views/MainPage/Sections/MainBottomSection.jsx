// import ReleaseCalanderSection from "./Sections/ReleaseCalanderSection";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import bottomPageStyle from "assets/jss/material-kit-react/views/bottomPage.jsx";
import React from "react";
import MostPopularSection from "./MostPopularSection.jsx";
import MostPopularBrand from "./MostPopularBrand.jsx";

import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class MainBottomSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.containerContents}>
        <div className={classes.gridContainer}>
          <div className={classes.shoeContainer}>
            <div className={classes.sectionContainer}>
              <MostPopularBrand />
            </div>

            <div className={classes.sectionContainer}>
              <MostPopularSection
                headerName="인기 제품"
                helper="최근 한달간 가장 많이 판매된 제품입니다."
                iconName="whatshot"
              />
            </div>

            <div className={classes.sectionContainer}>
              <MostPopularSection
                headerName="최신 제품"
                helper="최근 한달간 발매된 신발중 가장 인기있는 제품입니다."
                iconName="new_releases"
              />
            </div>

            <div
              className={classes.sectionContainerLast}
            >
              <MostPopularSection
                headerName="최저가 제품"
                helper="최근 한달간 가장 인기있는 최저가 제품입니다."
                iconName="trending_down"
              />
            </div>
          </div>
        </div>
        <Link
          to={{
            pathname: "/products",
            state: {
              filter: "",
              brand: ""
            }
          }}
          className={classes.link}
        >
          <Button className={classes.buttonLink}>모든 물품 보기</Button>
        </Link>
      </div>
    );
  }
}

export default withStyles(bottomPageStyle)(MainBottomSection);
