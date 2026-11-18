import React from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import detailSell from "assets/jss/material-kit-react/views/landingPageSections/detailSell";
import TextField from "@material-ui/core/TextField";
import options from "./constant";
import SearchResult from "./SearchHandler/SearchResult";
import {
  FormControlLabel,
  Checkbox,
  ClickAwayListener,
  Button
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";

class DetailSell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      bank: "선택해주세요.",
      accountNum: "",
      open: false,
      search: false,
      model: "",
      imgPreview: null,
      lowest: "",
      size: 270,
      price: "",
      pending: false
    };
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleClickAway = () => {
    this.setState({
      open: false
    });
  };

  bankHandler = value => {
    this.setState({
      bank: value
    });
  };

  componentWillMount() {
    if (!this.props.location.state) {
      this.props.history.push("/sell");
      //user이름, 은행정보 받아오기
    } else {
      if (!this.props.location.state.checked) {
        this.props.history.push("/sell");
      }
    }
  }

  searchClickToClose = () => {
    this.setState({
      search: false
    });
  };
  searchClickToOpen = () => {
    if (this.state.model) {
      this.setState({
        search: true
      });
    }
  };

  search = event => {
    this.setState({
      search: true,
      model: event.target.value
    });
  };

  select = (model, imgPreview, lowest) => {
    this.setState({
      search: false,
      model: model,
      imgPreview: imgPreview,
      lowest: lowest
    });
  };

  submit = async () => {
    if (this.state.pending) return;
    if (!this.state.model || !this.state.imgPreview) {alert("검색 결과에서 판매할 상품을 선택해주세요.");return;}
    this.setState({pending:true});
    try {
      await axios.post("https://api.probe.gg/protected/createListing",{productId:this.state.model,size:Number(this.state.size),price:Number(this.state.price),condition:"new"});
      this.props.history.push("/profile/selling");
    } catch(error) {alert(error.response?.data?.message || "로그인과 입력값을 확인해주세요.");}
    finally {this.setState({pending:false});}
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.indexLeft}>2</div>
        <div className={classes.indexRight}>2</div>
        <div className={classes.title}>SELL</div>
        <div className={classes.cardContainer}>
          <div className={classes.cardLeft}>
            <div className={classes.subtitle}>계좌정보</div>
            <div className={classes.inputContainer}>
              <div className={classes.inputLabel}>이름</div>
              <FormControl className={classes.inputWrapper}>
                <InputBase
                  fullWidth
                  classes={{
                    root: classes.root,
                    error: classes.error,
                    focused: classes.focused
                  }}
                />
              </FormControl>
            </div>
            <div className={classes.inputContainer}>
              <div className={classes.inputLabel}>은행명</div>
              <ClickAwayListener onClickAway={this.handleClickAway}>
                <div
                  className={classes.filterOptionContainer}
                  onClick={this.handleClick}
                >
                  <div
                    className={
                      this.state.open
                        ? classes.filterActive
                        : classes.filterDeactive
                    }
                  >
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("(구)KB국민은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        (구)KB국민은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("(신)KB국민은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        (신)KB국민은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("IBK기업은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        IBK기업은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("NH농협은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        NH농협은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("(구)신한은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        (구)신한은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("(신)신한은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        (신)신한은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("우리은행")}
                    >
                      <div className={classes.filterOptionTitle}>우리은행</div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("우리은행")}
                    >
                      <div className={classes.filterOptionTitle}>우리은행</div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("KEB하나은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        KEB하나은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("(구)외한은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        (구)외한은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("씨티은행")}
                    >
                      <div className={classes.filterOptionTitle}>씨티은행</div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("DGB대구은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        DGB대구은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("BNK부산은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        BNK부산은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("SC제일은행")}
                    >
                      <div className={classes.filterOptionTitle}>
                        SC제일은행
                      </div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("케이뱅크")}
                    >
                      <div className={classes.filterOptionTitle}>케이뱅크</div>
                    </div>
                    <div
                      className={
                        this.state.open
                          ? classes.filterOptionActive
                          : classes.filterOptionDeactive
                      }
                      onClick={() => this.bankHandler("카카오뱅크")}
                    >
                      <div className={classes.filterOptionTitle}>
                        카카오뱅크
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      this.state.bank === "선택해주세요."
                        ? classes.filterOption
                        : classes.filterOptionSelected
                    }
                  >
                    {this.state.bank}
                  </div>
                  <KeyboardArrowDown className={classes.filterIcon} />
                </div>
              </ClickAwayListener>
            </div>
            <div className={classes.inputContainer}>
              <div className={classes.inputLabel}>계좌번호</div>
              <FormControl className={classes.inputWrapper}>
                <InputBase
                  fullWidth
                  classes={{
                    root: classes.root,
                    error: classes.error,
                    focused: classes.focused
                  }}
                />
              </FormControl>
            </div>
          </div>
          <div className={classes.cardRight}>
            <div className={classes.subtitle}>신발정보</div>
            <ClickAwayListener onClickAway={this.searchClickToClose}>
              <div className={classes.inputContainer}>
                <div className={classes.inputLabel}>모델</div>
                <FormControl className={classes.inputWrapper}>
                  <InputBase
                    fullWidth
                    inputProps={{"aria-label":"판매 모델"}}
                    value={this.state.model}
                    onClick={this.searchClickToOpen}
                    onChange={this.search}
                    classes={{
                      root: classes.root,
                      error: classes.error,
                      focused: classes.focused
                    }}
                  />
                </FormControl>
              </div>
              <SearchResult
                search={this.state.search}
                model={this.state.model}
                select={this.select}
              />
            </ClickAwayListener>
            <div className={classes.inputContainer}>
              <div className={classes.inputLabel}>사이즈</div>
              <FormControl className={classes.inputWrapper}>
                <InputBase
                  value={this.state.size}
                  inputProps={{"aria-label":"판매 사이즈"}}
                  onChange={event => this.setState({size:event.target.value})}
                  fullWidth
                  classes={{
                    root: classes.root,
                    error: classes.error,
                    focused: classes.focused
                  }}
                />
              </FormControl>
            </div>
            <div
              className={
                this.state.imgPreview
                  ? classes.shoeImage
                  : classes.shoeImageText
              }
            >
              {this.state.imgPreview ? (
                <img
                  src={this.state.imgPreview}
                  alt={this.state.model}
                  className={classes.imgPreview}
                />
              ) : (
                "신발 프리뷰입니다."
              )}
            </div>
            {this.state.lowest ? (
              <div className={classes.priceContainer}>
                <div>최저가 ₩ {this.state.lowest}</div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.inputLabel}>판매가</div>
          <FormControl className={classes.inputWrapper}><InputBase fullWidth value={this.state.price} onChange={event => this.setState({price:event.target.value})} placeholder="원" inputProps={{"aria-label":"판매 금액"}} classes={{root:classes.root,focused:classes.focused}} /></FormControl>
        </div>
        <Button className={classes.next} onClick={this.submit} disabled={this.state.pending}>판매 등록</Button>
      </div>
    );
  }
}

export default withStyles(detailSell)(DetailSell);
