import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import LocalGroceryStore from "@material-ui/icons/LocalGroceryStore";

import { Link } from "react-router-dom";

import propageStyle from "assets/jss/material-kit-react/views/landingPageSections/propageStyle.jsx";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false
    };
  }

  addShoppingCart = () => {
    this.setState({
      add: !this.state.add
    });
  };

  render() {
    const { classes } = this.props;
    const model = this.props.model.split("|");
    return (
      <div className={this.props.grid ? classes.product : classes.productList}>
        <Button
          className={
            this.props.grid
              ? classes.productButtonContainer
              : classes.productButtonContainerList
          }
        >
          <Link
            to={"/products/" + this.props.model}
            className={this.props.grid ? classes.link : classes.linkList}
          >
            <div
              className={
                this.props.grid
                  ? classes.productHeader
                  : classes.productHeaderList
              }
            >
              <img
                src={this.props.image}
                alt={this.props.model}
                className={
                  this.props.grid ? classes.image : classes.productImageList
                }
              />
            </div>
            <div
              className={
                this.props.grid ? classes.productBody : classes.productBodyList
              }
            >
              <div
                className={
                  this.props.grid ? classes.modelEn : classes.modelEnList
                }
              >
                {model[0]}
              </div>
              <div className={classes.modelKr}>{model[1]}</div>
            </div>
            <div
              className={
                this.props.grid
                  ? classes.productFooter
                  : classes.productFooterList
              }
            >
              {this.props.grid ? (
                <div
                  className={
                    this.props.grid
                      ? classes.priceHeader
                      : classes.priceHeaderList
                  }
                >
                  최저가
                </div>
              ) : null}
              {this.props.grid ? null : (
                <div className={classes.lastSalePrice}>
                  {this.props.price
                    ? "₩" + this.props.price.toLocaleString()
                    : "--"}
                </div>
              )}
              <div
                className={this.props.grid ? classes.price : classes.priceList}
              >
                {this.props.price
                  ? "₩" + this.props.price.toLocaleString()
                  : "--"}
              </div>
              {/* <Tooltip id="tooltip-top" title="장바구니에 담기" placement="top">
                <IconButton onClick={this.addShoppingCart}>
                  {this.state.add ? (
                    <LocalGroceryStore />
                  ) : (
                    <AddShoppingCartIcon />
                  )}
                </IconButton>
              </Tooltip> */}
            </div>
          </Link>
        </Button>
      </div>
    );
  }
}

export default withStyles(propageStyle)(Product);
