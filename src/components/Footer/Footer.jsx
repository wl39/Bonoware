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
          <div className={classes.call}>**.***.****</div>
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
            <div>Fax: **-***-****</div>
            <div>email: ****@****.***</div>
          </div>
        </div>
        <div className={classes.lastRow}>
          <div>상호명 : ****</div>
          <div>사업장소재지 : ****</div>
          <div>사업자등록번호 : ***-**-*****</div>
          <div>통신판매업신고 : ****-****-****</div>
          <div>대표이사 : ***</div>
          <div>사업자 정보확인 : ****</div>
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
