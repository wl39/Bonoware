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
            <div>
              <Link to="/privacy" className={classes.block}>
                개인정보처리방침
              </Link>
            </div>
          </div>
          <div className={classes.list}>
            <div className={classes.listInfoContainer}>
              <div>
                <Link to="/about" className={classes.block2}>
                  About us
                </Link>
              </div>
              <div>
                <a href="/" className={classes.block2} target="_blank">
                  Delivery & Returns
                </a>
              </div>
            </div>
            <div className={classes.listInfoContainer}>
              <div>
                <a href="/" className={classes.block2} target="_blank">
                  FAQ
                </a>
              </div>

              <div>
                <a href={import.meta.env.BASE_URL + "images/catalog-credits.html"} className={classes.block2} target="_blank" rel="noopener noreferrer">
                  Licenses
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.secondRow}>
          <div>
            <div>
              AM 10:00 - PM 18:00 | off time PM 12:00 - 14:00
            </div>
            <div>
              DAY OFF (SATURDAY, SUNDAY, HOLIDAY)
            </div>
          </div>
          <div>
            <div>Fax: 02-753-4290</div>
            <div>email: admin@probe.gg</div>
          </div>
        </div>
        <div className={classes.lastRow}>
          <div>상호명 : (주)보노웨어</div>
          <div>
            사업장소재지 : 서울특별시 종로구 창신1동
          </div>
          <div>종로46길 23, 2층 (창신동)</div>
          <div>사업자등록번호 : 524-88-01143</div>
          <div>
            통신판매업신고 : 2019-서울종로-0020
          </div>
          <div>대표이사 : 조상훈</div>
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
