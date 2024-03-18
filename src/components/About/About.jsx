import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import aboutPage from "assets/jss/material-kit-react/views/componentsSections/aboutPage.jsx";

class About extends React.Component {
  state = {};

  componentWillReceiveProps(nextProps) {}

  componentWillMount() {}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.firstDiv}>
          {/* <img></img> */}
          <div className={classes.brandTitle}>PROBE</div>
        </div>
        {/* <img /> */}
        <div className={classes.brandDescriptionContainer}>
          <div className={classes.subContainer}>
            <div className={classes.brandDescriptionHeader}>SOLUTION</div>
            <div className={classes.brandDescription}>
              프로브는 신개념 온라인 스니커즈 트레이딩 플랫폼입니다.{"\n"}저희는
              유저분들의 편의를 우선적으로 고려한 서비스를{"\n"}제공할 것을
              약속합니다.{"\n"}
              당신의 특별한 신발을 프로브하세요!
            </div>
          </div>
        </div>
        <div className={classes.howToUse}>
          <div className={classes.square}>
            <div className={classes.firstStep}>
              <div className={classes.stepHeader}>SELLER</div>
              <div className={classes.stepsContainer}>
                <div>
                  <div className={classes.stepIndex}>01</div>
                  <div>프로브로{"\n"}상품발송</div>
                </div>
                <div>
                  <div className={classes.stepIndex}>02</div>
                  <div>프로브 상품수령 후{"\n"}품질 및 정품검수</div>
                </div>
                <div>
                  <div className={classes.stepIndex}>03</div>
                  <div>상품 판매완료 후{"\n"}판매대금 입금</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.secondStep}>
              <div className={classes.stepHeader}>BUYER</div>
              <div className={classes.stepsContainerWhite}>
                <div>
                  <div className={classes.stepIndex}>01</div>
                  <div>웹페이지, 앱에서{"\n"}상품 구매</div>
                </div>
                <div>
                  <div className={classes.stepIndex}>02</div>
                  <div>
                    프로브에서 품질{"\n"}및 정품 검수 완료된{"\n"}상품발송
                  </div>
                </div>
                <div>
                  <div className={classes.stepIndex}>03</div>
                  <div>상품 수령</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.lastStep}>
              <div className={classes.stepHeader}>ORIGINAL PRODUCT</div>
              <div className={classes.stepsContainer}>
                <div>
                  <div className={classes.stepIndex}>01</div>
                  <div>1차검수</div>
                  <div>AI와 사진을 이용한{"\n"}품질 및 정품검수</div>
                </div>
                <div>
                  <div className={classes.stepIndex}>02</div>
                  <div>2차검수</div>
                  <div>
                    검수팀장{"\n"}킥스클라우드{"\n"}품질 및 정품 검수
                  </div>
                </div>
                <div>
                  <div className={classes.stepIndex}>03</div>
                  <div>자체제작 NFC태그{"\n"}부착후 발송</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(aboutPage)(About);
