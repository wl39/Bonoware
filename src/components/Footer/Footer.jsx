/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

// @material-ui/icons
import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.footerContainer}>
        <div className={classes.firstRow}>
          <div className={classes.call}>02.741.4293</div>
          <div className={classes.listInfo}>
            <div className={classes.infoBorder}>
              <a href="/" className={classes.block} target="_blank">
                이용안내
              </a>
            </div>
            <div className={classes.infoBorder}>
              <Link to="/terms" className={classes.block}>
                이용약관
              </Link>
            </div>
            <div className={classes.infoBorderLast}>
              <Link to="/privacy" className={classes.block}>
                개인정보처리방침
              </Link>
            </div>
          </div>
          <div className={classes.list}>
            <div className={classes.listInfoContainer}>
              <div className={classes.inlineBlock}>
                <a href="/about" className={classes.block2} target="_blank">
                  About us
                </a>
              </div>
              <div className={classes.inlineBlock}>
                <a href="/" className={classes.block2} target="_blank">
                  Delivery & Returns
                </a>
              </div>
            </div>
            <div className={classes.listInfoContainer}>
              <div className={classes.inlineBlock}>
                <a href="/" className={classes.block2} target="_blank">
                  FAQ
                </a>
              </div>

              <div className={classes.inlineBlock}>
                <a href="/" className={classes.block2} target="_blank">
                  Licenses
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.secondRow}>
          <div className={classes.firstBox}>
            <div className={classes.boxDetails}>
              AM 10:00 - PM 18:00 | off time PM 12:00 - 14:00
            </div>
            <div className={classes.boxDetails}>
              DAY OFF (SATURDAY, SUNDAY, HOLIDAY)
            </div>
          </div>
          <div className={classes.secondBox}>
            <div className={classes.boxDetails}>Fax: 02-753-4290</div>
            <div className={classes.boxDetails}>email: admin@probe.gg</div>
          </div>
        </div>
        <div className={classes.lastRow}>
          <div className={classes.detailsFirst}>상호명 : (주)보노웨어</div>
          <div className={classes.details}>
            사업장소재지 : 서울특별시 종로구 창신1동
          </div>
          <div className={classes.details}>종로46길 23, 2층 (창신동)</div>
          <div className={classes.details}>사업자등록번호 : 524-88-01143</div>
          <div className={classes.details}>
            통신판매업신고 : 2019-서울종로-0020
          </div>
          <div className={classes.details}>대표이사 : 조상훈</div>
          <a
            href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=5248801143"
            target="_blank"
            className={classes.company}
          >
            사업자 정보확인
          </a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
