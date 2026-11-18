// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import mainPageStyle from "assets/jss/material-kit-react/views/mainPage.jsx";
// nodejs library that concatenates classes
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import Parallax from 'components/Parallax/Parallax.jsx';
import CustomSearch from "components/CustomSearch/CustomSearch.jsx";
import Aux from "hoc/Aux_/Aux_";
import React from "react";
import AdvertisementSection from "./Sections/AdvertisementSection.jsx";
// import ReleaseCalanderSection from "./Sections/ReleaseCalanderSection";
import MainBottomSection from "./Sections/MainBottomSection.jsx";

import NewsPanel from "components/NewsPanel/NewsPanel.jsx";
import ReleaseDatePanel from "components/ReleaseDatePanel/ReleaseDatePanel.jsx";

import { connect } from "react-redux";
import * as actions from "store/actions/actions";
// @material-ui/icons
import Ticker from "components/Ticker/Ticker.jsx";

class MainPage extends React.Component {
  state = { campaign: 2 };

  changeCampaign = (campaign) => this.setState({ campaign });

  componentDidMount() {
    this.props.getMainImagesHandler();
  }

  render() {
    const { classes } = this.props;
    return (
      <Aux>
        <div style={{ backgroundColor: "#000000" }}>
          <div
            className={classes.parallax}
            aria-hidden="true"
          >
            {[
              import.meta.env.BASE_URL + "images/banner-canvas.jpg",
              import.meta.env.BASE_URL + "images/yeezy-butter.jpg",
              this.props.backgroundImage
            ].map((image, i) => (
              <div
                key={i}
                className={"campaign-hero campaign-hero--" + i}
                data-current={this.state.campaign === i}
                style={image ? { backgroundImage: `url("${image}")` } : undefined}
              />
            ))}
          </div>
          {/* <Parallax> */}

          <div className={classes.titleContainer}>
            <GridContainer>
              <GridItem className={classes.gridDummy}>
                <div className={classes.brand}>
                  <div className={classes.titles}>
                    <h1 className={classes.title}>당신의 특별한 신발을</h1>
                    <h1 className={classes.title}>프로브하세요</h1>
                  </div>
                </div>
                <div className={classes.searchContainer}>
                  <CustomSearch
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </div>
              </GridItem>
            </GridContainer>
          </div>
          {/* </Parallax> */}
        </div>
        <AdvertisementSection active={this.state.campaign} onChange={this.changeCampaign} />
        <Ticker />
        <MainBottomSection />
        <div className={classes.gridContainer}>
          <div className={classes.backgroundContainerLeft}>
            <div className={classes.backgroundBlack}>
              <div className={classes.newsContainer}>
                <NewsPanel />
              </div>
            </div>
          </div>
          <div className={classes.backgroundContainerRight}>
            <div className={classes.releaseDateContainer}>
              <ReleaseDatePanel />
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    backgroundImage: state.backgroundImage
  };
};

const mapDispatchToProps = {
  getMainImagesHandler: actions.getMainImages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(mainPageStyle)(MainPage));
