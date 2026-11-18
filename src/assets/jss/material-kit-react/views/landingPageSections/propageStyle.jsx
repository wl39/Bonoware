const propageStyle = {
  container: {
    display: "flex",
    borderRadius: 0,
    zIndex: "3",
    position: "relative",
    background: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    "@media (min-width: 600px)": {
      maxWidth: "97% !important",
      paddingLeft: "0",
      paddingRight: "0",
      paddingBottom: "50px"
    },
    "@media (min-width: 960px)": {
      maxWidth: "95% !important",
      paddingBottom: "100px"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "83.333% !important",
      paddingBottom: "150px"
    }
  },
  sectionContainer: {
    margin: "32px 0",
    "@media (max-width: 599px)": { margin: "24px 16px" }
  },
  detailPageConatiner: {
    display: "flex",
    borderRadius: 0,
    zIndex: "3",
    position: "static",
    background: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    marginTop: "60px",
    "@media (max-width: 599px)": {
      "& > :last-child": { paddingLeft: 16, paddingRight: 16 }
    },
    "@media (min-width: 600px)": {
      maxWidth: "97% !important",
      paddingLeft: "0",
      paddingRight: "0",
      paddingBottom: "50px",
      marginTop: "90px"
    },
    "@media (min-width: 960px)": {
      maxWidth: "95% !important",
      paddingBottom: "100px",
      marginTop: "90px"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "83.333% !important",
      paddingBottom: "150px",
      marginTop: "100px"
    }
  },
  pageHeaderContainer: {
    marginTop: "100px",
    height: "250px",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: "100px",
    "@media (max-width: 1199px)": {
      marginTop: "90px",
      height: "250px",
      marginBottom: "50px"
    },
    "@media (max-width: 959px)": {
      marginTop: "90px",
      height: "150px",
      marginBottom: "50px"
    },
    "@media (max-width: 599px)": {
      marginTop: "40px",
      marginBottom: "20px",
      height: "150px"
    }
  },
  pageHeaderLeft: {
    backgroundColor: "#ebedec",
    display: "flex",
    flexBasis: "60%"
  },
  descriptionContainer: {
    display: "grid", gap: "6px", width: "72.222%", margin: "auto",
    "@media (max-width: 599px)": { width: "auto", margin: "auto 0 auto 16px", whiteSpace: "nowrap" }
  },
  type: {
    height: "22px",
    fontSize: "22px",
    lineHeight: "18px",
    color: "black",
    textTransform: "uppercase",
    letterSpacing: "3px"
  },
  headerDescription: {
    fontSize: "14px", lineHeight: 1.5, color: "#4b5154"
  },
  pageHeaderRight: {
    backgroundColor: "#a2a9af",
    display: "flex",
    flexBasis: "40%",
    overflow: "hidden",
    "&::before": {
      content: `''`,
      borderBottom: "250px solid #ebedec",
      borderRight: "250px solid transparent",
      "@media (max-width: 959px)": {
        borderBottom: "150px solid #ebedec",
        borderRight: "150px solid transparent"
      }
    }
  },
  cards: {
    display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "28px 18px",
    "@media (max-width: 1199px)": { gridTemplateColumns: "repeat(3, minmax(0,1fr))" },
    "@media (max-width: 599px)": { gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "20px 12px" }
  },
  rows: { display: "grid" },
  cardImage: { display: "block", width: "100%", height: "100%", minWidth: 0, minHeight: 0, objectFit: "contain" },
  sortToggle: { display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "space-between", background: "white", border: 0, padding: "0 10px", cursor: "pointer", font: "inherit", fontSize: "14px", color: "#33393c" },
  viewToggle: { width: "40px", height: "40px", padding: "6px", color: "#72787b", "&[aria-pressed=true]": { color: "#111", background: "#f1f2f2" } },
  filterTrigger: { background: "#fff", border: "1px solid #c5c8ca", color: "#30363a", borderRadius: 0, height: "40px", width: "40px", marginTop: "2px", padding: "6px", "&:hover": { background: "#f1f2f2" } },
  sizeChoice: { font: "inherit", fontSize: "14px", lineHeight: 1.4, minHeight: "34px", background: "white", color: "#565c60", border: "1px solid #c9cdcf", cursor: "pointer", "&[aria-pressed=true], &:hover": { borderColor: "#25292b", color: "black", fontWeight: 600 } },
  sourceLink: { color: "#454e54", textDecoration: "underline", textUnderlineOffset: ".2em" },
  listPrices: { display: "flex", textAlign: "right" },
  saleCell: { width: "100px", marginRight: "12px", textAlign: "right", "@media (max-width: 959px)": { display: "none" } },
  detailFacts: { display: "grid", margin: "16px 16px 24px 0", "@media (max-width: 599px)": { gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "0 16px", margin: 0 } },
  productContainer: {
    display: "flex", flexDirection: "column", flex: "1 1 0", minWidth: 0,
    "@media (max-width: 599px)": { padding: "0 16px 32px" }
  },
  productButtonContainer: {
    padding: "7.5px",
    margin: "5px"
  },
  productButtonContainerList: {
    padding: "0px",
    width: "100%"
  },
  label: {
    width: "100%"
  },
  productFilter: {
    display: "flex", alignItems: "center", justifyContent: "flex-end",
    gap: "4px", height: "44px", marginBottom: "18px"
  },
  filterOptionContainer: {
    width: "175px", border: "1px solid #c5c8ca", height: "40px", position: "relative", marginRight: "8px",
    "@media (max-width: 599px)": { width: "clamp(114px, 35vw, 145px)" }
  },
  filterOption: {
    height: "16px",
    fontSize: "16px",
    lineHeight: "16px",
    margin: "auto 0px",
    color: "inherit",
    fontWeight: "200"
  },
  filterOptionSelected: {
    height: "16px",
    fontSize: "16px",
    lineHeight: "16px",
    margin: "auto 0px",
    color: "black",
    fontWeight: "500"
  },
  filterIcon: {
    margin: "auto 0px",
    color: "#inherit"
  },
  filterViewIconActive: {
    color: "black",
    fontSize: "40px",
    margin: "auto 0px"
  },
  filterViewIconUnactive: {
    color: "#dbdbdb",
    cursor: "pointer",
    fontSize: "40px",
    margin: "auto 0px",
    "&:hover": {
      color: "#bfbfbf"
    }
  },
  filterActive: {
    display: "grid", position: "absolute", background: "#fff", zIndex: 8,
    top: "100%", right: -1, width: "205px", boxShadow: "0 4px 12px rgba(0,0,0,.12)", border: "1px solid #c5c8ca"
  },
  filterDeactive: {
    height: "0px",
    width: "270px",
    position: "absolute",
    overflow: "hidden",
    top: "44px",
    left: "-1px",
    zIndex: "50",
    border: "0px solid #ebebeb",
    WebkitTransition: "height 0.3s, -webkit-transform 0.3s, border 0.3s",
    transition: "height 0.3s, transform 0.3s, border 0.3s"
  },
  filterOptionActive: {
    background: "white", font: "inherit", textAlign: "left", padding: "9px 12px", cursor: "pointer",
    border: 0, borderBottom: "1px solid #e2e4e5", "&:hover, &:focus-visible": { background: "#f3f4f4" }
  },
  filterOptionDeactive: {
    height: "0px",
    padding: "10px 15px",
    width: "100%",
    overflow: "hidden",
    WebkitTransition: "height 0.3s, -webkit-transform 0.3s",
    transition: "height 0.3s, transform 0.3s"
  },
  filterOptionTitle: {
    display: "block", fontSize: "14px", fontWeight: 600, lineHeight: 1.4
  },
  filterOptionDescription: {
    display: "block", fontSize: "12px", color: "#575d60", lineHeight: 1.45
  },
  product: {
    flexBasis: "25%",
    display: "flex",
    "@media (max-width: 959px)": {
      flexBasis: "33.333%"
    },
    "@media (max-width: 599px)": {
      flexBasis: "50%"
    }
  },
  listHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 8px",
    borderTop: "1px solid #a2a9af", borderBottom: "1px solid #d7d9da", color: "#50565a", fontSize: "14px",
    "@media (max-width: 599px)": { padding: "10px 0 10px 66px" }
  },
  shoeName: {
    fontWeight: 500
  },
  headerPriceContainer: {
    fontWeight: "100",
    color: "black",
    margin: "auto 0px",
    fontSize: "16px",
    lineHeight: "16px",
    display: "flex",
    width: "300px",
    "@media (max-width: 1199px)": {
      width: "150px"
    },
    "@media (max-width: 959px)": {
      width: "300px"
    },
    "@media (max-width: 599px)": {
      width: "100px"
    }
  },
  headerLastSale: {
    textAlign: "center",
    margin: "0px auto",
    width: "120px",
    "@media (max-width: 1199px)": {
      display: "none"
    },
    "@media (max-width: 959px)": {
      display: "block"
    },
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  headerLowestPrice: {
    minWidth: "84px", textAlign: "right"
  },
  productList: {
    display: "flex",
    width: "100%",
    padding: "10px 0px",
    borderBottom: "1px solid #ebebeb"
  },
  noResults: {
    textAlign: "center", padding: "36px 0", color: "#545a5e"
  },
  link: {
    display: "flex", flexDirection: "column", minWidth: 0, color: "#191919 !important",
    textDecoration: "none", "&:hover $productHeader, &:focus-visible $productHeader": { borderColor: "#a5a9ab" },
    "@media (max-width: 599px)": {
      border: "1px solid #dce0e1", borderRadius: 0, overflow: "hidden"
    }
  },
  linkList: {
    display: "grid", gridTemplateColumns: "90px minmax(0, 1fr) auto", alignItems: "center",
    gap: "16px", color: "#191919 !important", padding: "12px 8px", textDecoration: "none", borderBottom: "1px solid #e5e5e5",
    "@media (max-width: 599px)": { gridTemplateColumns: "56px minmax(0, 1fr) auto", gap: "10px", padding: "12px 0" }
  },
  productHeader: {
    aspectRatio: "1 / 1", border: "1px solid #dedfe0", padding: "8%", display: "flex", alignItems: "center",
    background: "#fff", transition: "border-color .15s",
    "@media (max-width: 599px)": { border: 0, borderBottom: "1px solid #edf0f0" }
  },
  productHeaderList: {
    display: "grid", placeItems: "center", aspectRatio: "1.25 / 1", padding: "5px", background: "#fff", border: "1px solid #e1e3e4"
  },
  moreButton: {
    alignSelf: "center", background: "#151515", color: "white", padding: "0 30px", height: "46px", minWidth: "170px", margin: "32px auto", borderRadius: 0,
    "&:hover": { background: "#343434" }
  },
  moreButtonList: {
    flexBasis: "50%",
    background: "black",
    color: "white",
    padding: "0px",
    height: "60px",
    margin: "20px auto",
    borderRadius: "0px",
    "&:hover": {
      background: "white",
      color: "black",
      border: "1px solid black"
    }
  },
  productBody: {
    display: "grid", alignContent: "start", gap: "4px", margin: "11px 0 10px", minWidth: 0,
    "@media (max-width: 599px)": { margin: "10px 10px 12px" },
    "& $modelEn": { minHeight: "2.8em" }
  },
  productBodyList: {
    display: "grid", gap: "2px", minWidth: 0
  },
  productFooter: {
    display: "grid", gap: "1px", marginTop: "auto",
    "@media (max-width: 599px)": { padding: "0 10px 12px" }
  },
  productFooterList: {
    display: "flex", alignItems: "center", textAlign: "right", fontVariantNumeric: "tabular-nums"
  },
  modelEn: {
    fontSize: "14px", fontWeight: 500, lineHeight: 1.4, overflow: "hidden", display: "-webkit-box",
    WebkitBoxOrient: "vertical", WebkitLineClamp: 2
  },
  modelEnList: {
    height: "34px",
    fontSize: "14px",
    lineHeight: "1.2",
    letterSpacing: "0.2px",
    overflow: "hidden",
    fontWeight: "300",
    marginBottom: "12px",
    "@media (max-width: 599px)": {
      fontSize: "14px",
      lineHeight: "1.1",
      height: "30px",
      marginBottom: "0px"
    }
  },
  modelKr: {
    color: "#595f63", fontSize: "13px", lineHeight: 1.45, overflow: "hidden",
    whiteSpace: "nowrap", textOverflow: "ellipsis"
  },
  priceHeader: {
    fontSize: "12px", color: "#646a6d", lineHeight: 1.5
  },
  lastSalePrice: {
    width: "120px",
    margin: "0px auto",
    fontSize: "18px",
    fontWeight: "900",
    height: "18px",
    lineHeight: "18px",
    letterSpacing: "0.21px",
    "@media (max-width: 1199px)": {
      display: "none"
    },
    "@media (max-width: 959px)": {
      display: "block"
    },
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  price: {
    fontSize: "17px", fontWeight: 700, color: "#161718", lineHeight: 1.35, fontVariantNumeric: "tabular-nums"
  },
  priceList: {
    minWidth: "84px", fontSize: "15px", fontWeight: 600, color: "#161718", whiteSpace: "nowrap",
    "@media (max-width: 599px)": { minWidth: 0 }
  },
  slider: {
    width: "min(22%, 250px)", flexShrink: 0, marginRight: "clamp(24px, 4vw, 64px)",
    "@media (max-width: 959px)": { width: "auto", margin: 0, position: "absolute", top: 0, left: "16px", zIndex: 5 }
  },
  brandSearchContainer: {
    background: "#697278", padding: "20px", display: "grid", gap: "1px"
  },
  brandSearchValue: {
    background: "transparent", color: "#fff", textAlign: "left", fontFamily: "inherit",
    fontSize: "17px", fontWeight: 400, border: 0, padding: "4px 0", lineHeight: 1.5, cursor: "pointer",
    "&:hover, &:focus-visible": { textDecoration: "underline" }
  },
  brandSearchValueActive: {
    background: "transparent", color: "white", textAlign: "left", fontFamily: "inherit",
    fontSize: "17px", fontWeight: 700, border: 0, padding: "4px 0", lineHeight: 1.5, cursor: "pointer"
  },
  settingButton: {
    fontSize: "30px"
  },
  priceRange: {
    display: "flex", justifyContent: "space-between", paddingBottom: "8px", fontSize: "13px", color: "#43494d", fontVariantNumeric: "tabular-nums"
  },
  panel: {
    padding: "22px 12px", borderBottom: "1px solid #d5d8d9"
  },
  panelHeader: {
    fontSize: "16px", fontWeight: 600, lineHeight: 1.45, color: "#161718", marginBottom: "16px", textTransform: "uppercase"
  },
  dropdownContainer: {
    marginTop: "4px", position: "absolute", top: "100%", left: 0, boxSizing: "border-box",
    width: "min(300px, calc(100vw - 30px))", maxHeight: "65vh", overflowY: "auto", overscrollBehavior: "contain",
    background: "white", border: "1px solid #c9ccce", boxShadow: "0 6px 20px rgba(0,0,0,.15)"
  },
  dropdownContainerClose: {
    display: "none"
  },
  dropdownPriceRange: {
    display: "flex",
    padding: "30px 10px 10px 10px",
    justifyContent: "space-between",
    color: "black",
    fontWeight: "600"
  },
  dropdownSlider: {
    padding: "10px 20px 10px 25px"
  },
  applyButton: {
    right: "10px",
    minWidth: "0",
    minHeight: "0",
    padding: "8px 8px",
    marginTop: "10px"
  },
  applyButtonWeb: {
    minWidth: "0",
    minHeight: "0",
    padding: "8px 8px",
    marginTop: "10px"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  shoeSizeContainer: {
    display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "5px"
  },
  containerItem: {
    padding: "5px"
  },
  boxesContainer: {
    display: "flex", flexWrap: "wrap"
  },
  checkboxContainer: {
    display: "flex", alignItems: "center", width: "50%", minHeight: "34px", margin: "0", cursor: "pointer"
  },
  checkboxValue: {
    fontSize: "14px", lineHeight: 1.4, paddingLeft: "6px"
  },
  checkboxValueChecked: {
    fontSize: "16px",
    lineHeight: "16px",
    fontWeight: "500",
    letterSpacing: "0.4px",
    margin: "auto 0px",
    paddingLeft: "10px"
  },
  root: {
    padding: "0px",
    height: "24px"
  },
  imageContainer: {
    "&[data-single=true] $withImage, &[data-single=true] $withImageActive": { width: "100%", borderRight: 0 },
    "&[data-single=true] $imageWrapper": { padding: "12px 6%" },
    display: "flex",
    position: "relative",
    flexDirection: "row",
    flexBasis: "60%",
    "@media (max-width: 1199px)": {
      flexBasis: "65%"
    },
    "@media (max-width: 959px)": {
      flexBasis: "50%",
      flexDirection: "column",
      maxWidth: "50%"
    },
    "@media (max-width: 599px)": {
      flexBasis: "100%",
      flexDirection: "column",
      height: "auto",
      maxWidth: "100%"
    }
  },
  //
  withImage: {
    padding: "70px 50px",
    paddingBottom: "30px",
    borderRight: "1px solid #ebebeb",
    display: "flex",
    width: "83.333%",
    height: "710px",
    transition: "0.3s",
    "@media (max-width: 1199px)": {
      height: "510px",
      padding: "40px 30px 30px"
    },
    "@media (max-width: 959px)": {
      height: "340px",
      width: "100%",
      padding: "40px 30px 10px"
    },
    "@media (max-width: 599px)": {
      flexDirection: "column",
      height: "clamp(225px, 66vw, 300px)",
      padding: "8px 16px 0"
    }
  },
  withImageActive: {
    padding: "70px 50px",
    paddingBottom: "30px",
    display: "flex",
    width: "83.333%",
    height: "710px",
    transition: "0.3s",
    background: "rgba(0, 0, 0, 0.65)",
    zIndex: "6",
    "@media (max-width: 1199px)": {
      height: "510px",
      padding: "40px 30px 30px"
    },
    "@media (max-width: 959px)": {
      height: "340px",
      width: "100%"
    },
    "@media (max-width: 599px)": {
      flexDirection: "column",
      height: "325px",
      padding: "15px 20px"
    }
  },
  imageWrapper: {
    background: "white",
    zIndex: "5",
    width: "100%",
    display: "flex",
    border: "1px solid #ebebeb",
    transition: "0.3s",
    "@media (max-width: 959px)": {
      width: "100%",
      paddingBottom: "60px",
      paddingLeft: "20px",
      paddingRight: "20px"
    },
    "@media (max-width: 599px)": {
      height: "100%",
      paddingBottom: "90px",
      overflow: "inherit",
      position: "inherit"
    }
  },
  imageWrapperOther: {
    background: "white",
    zIndex: "5",
    width: "100%",
    display: "flex",
    transition: "0.3s",
    "@media (max-width: 959px)": {
      width: "100%",
      zIndex: "10"
    },
    "@media (max-width: 599px)": {
      height: "100%",
      overflow: "inherit",
      position: "inherit"
    }
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    "@media (max-width: 599px)": {
      width: "100%",
      height: "100%"
    }
  },
  productImageList: {
    height: "100%",
    objectFit: "contain"
    // "@media (max-width: 959px)": {
    //   zIndex: "5"
    // },
    // "@media (max-width: 599px)": {}
  },
  imageList: {
    width: "16.667%",
    height: "calc(100% - 40px)",
    objectFit: "contain",
    display: "grid",
    padding: "0px 15px",
    gridGap: "10px",
    margin: "20px 0px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "2px",
      height: "2px"
    },
    "&::-webkit-scrollbar-track": {
      background: "#white"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "black"
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#bfbfbf"
    },
    "@media (max-width: 959px)": {
      width: "calc(100% - 60px)",
      padding: "0px 10px",
      margin: "0px 30px",
      bottom: "30px",
      position: "absolute",
      height: "60px",
      zIndex: "5",
      gridTemplateColumns: "20% 20% 20% 20% 20%",
      gridGap: "0px 10px"
    },
    "@media (max-width: 599px)": {
      bottom: "15px",
      padding: "0px 20px",
      margin: "0px 5px",
      width: "calc(100% - 10px)"
    }
  },
  imageListImage: {
    width: "100%",
    padding: "10px 0px",
    objectFit: "contain",
    margin: "auto",
    border: "1px solid #dbdbdb",
    "@media (max-width: 959px)": {
      height: "60px",
      padding: "0px"
    },
    "@media (max-width: 599px)": {
      height: "90px",
      padding: "0px",
      border: "0px"
    }
  },
  buttonLable: {
    width: "100%",
    display: "block",
    alignItems: "inherit",
    justifyContent: "inherit"
  },
  options: {
    transition: "0.3s",
    width: "100%",
    background: "black",
    display: "grid",
    gridTemplateColumns: "10% 25%",
    gridTemplateRows: "50% 50%",
    gridGap: "5px 10px",
    padding: "30px 10%",
    height: "200px",
    left: "0",
    right: "0",
    top: "610px",
    position: "absolute",
    // "@supports (-ms-ime-align: auto)": {
    //   justifyContent: "space-around"
    // },
    "@media (max-width: 1199px)": {
      gridTemplateColumns: "10% 20%",
      padding: "30px 2.666%",
      top: "430px",
      height: "170px"
    },
    "@media (max-width: 959px)": {
      padding: "30px 1.6%",
      gridTemplateColumns: "20% 78.5%"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "auto",
      padding: "16px",
      position: "static",
      gridTemplateColumns: "minmax(82px, 1fr) minmax(0, 2fr)",
      gridTemplateRows: "55px 55px",
      gridGap: "10px 10px"
    }
  },
  optionsActive: {
    transition: "0.3s",
    width: "100%",
    background: "black",
    display: "grid",
    position: "absolute",
    // flexDirection: "column",

    height: "445px",
    paddingTop: "30px",
    paddingBottom: "40px",
    paddingLeft: "10%",
    paddingRight: "10%",
    left: "0",
    right: "0",
    top: "610px",
    gridTemplateColumns: "11.5% 11.5% 11.5%",
    gridGap: "10px 10px",
    // "@supports (-ms-ime-align: auto)": {
    //   justifyContent: "space-around"
    // },
    "@media (max-width: 1199px)": {
      padding: "30px 2.666%",
      top: "430px",
      height: "350px",
      gridTemplateColumns: "10% 10% 10%"
    },
    "@media (max-width: 959px)": {
      padding: "30px 1.6%",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gridGap: "initial",
      justifyContent: "space-between"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "auto",
      padding: "16px",
      position: "static",
      justifyContent: "space-between",
      gridTemplateRows: "55px 205px",
      gridGap: "8px"
    }
  },
  shoeContainer: {
    display: "flex",
    flexDirection: "row",
    height: "510px",
    marginBottom: "200px",
    transition: "0.3s",
    "@media (max-width: 1199px)": {
      height: "340px"
    },
    "@media (max-width: 599px)": {
      height: "auto",
      flexDirection: "column-reverse",
      marginBottom: 0
    }
  },
  shoeContainerActive: {
    display: "flex",
    flexDirection: "row",
    height: "510px",
    marginBottom: "445px",
    "@media (max-width: 1199px)": {
      height: "340px",
      marginBottom: "350px"
    },
    "@media (max-width: 599px)": {
      height: "auto",
      flexDirection: "column-reverse",
      marginBottom: 0
    }
  },
  containerLeft: {
    paddingTop: "70px",
    flexBasis: "40%",
    borderRight: "1px solid #ebebeb",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media (max-width: 1199px)": {
      flexBasis: "35%",
      paddingTop: "40px"
    },
    "@media (max-width: 959px)": {
      flexBasis: "50%",
      paddingTop: "20px"
    },
    "@media (max-width: 599px)": {
      flexBasis: "auto",
      padding: "18px 16px",
      maxHeight: "none",
      borderRight: 0
    }
  },
  optionModel: {
    width: "84%", display: "grid", gap: "8px", color: "#151515",
    "@media (max-width: 599px)": { width: "100%", gap: "5px", marginBottom: "12px" }
  },
  optionModelEnglish: {
    fontSize: "clamp(19px, 2vw, 30px)", lineHeight: 1.22, fontWeight: 650, overflowWrap: "anywhere"
  },
  optionModelKorean: {
    fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.45, color: "#5a5e62", fontWeight: 400
  },
  buttonDisabled: {
    // 품절 버튼 disabled 색깔 &:disabled
    "&:disabled": {
      color: "#eeeeee"
    }
  },
  lowestButton: {
    width: "100%",
    height: "65px",
    minHeight: "65px",
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid white",
    fontWeight: "600",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
    "@media (max-width: 1199px)": {
      // width: "30%",
      height: "55px",
      minHeight: "55px"
    },
    "@media (max-width: 959px)": {
      // width: "70%",
      height: "55px",
      minHeight: "55px",
      margin: "0px auto"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "55px",
      minHeight: "55px",
      margin: "0px auto",
      fontSize: "12px"
    }
  },
  sizeButton: {
    width: "100%",
    height: "65px",
    color: "white",
    backgroundColor: "#fe0229",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "#CC0000"
    },
    "@media (max-width: 1199px)": {
      // width: "30%",
      height: "55px"
    },
    "@media (max-width: 959px)": {
      // width: "70%",
      height: "55px",
      margin: "0px auto"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "55px",
      margin: "0px auto"
    }
  },
  newReleasesButton: {
    position: "absolute",
    color: "black",
    zIndex: "1",
    top: "100px",
    right: "44px",
    padding: "0px",
    "@media (max-width: 1199px)": {
      top: "40px",
      right: "10px"
    },
    "@media (max-width: 599px)": {
      top: "auto",
      bottom: "calc(100% + 12px)",
      right: "25px",
      zIndex: "10"
    }
  },
  icon: {
    fontSize: "36px"
  },
  shoppingCartButton: {
    right: "0",
    position: "absolute",
    color: "black",
    zIndex: "1"
  },
  sizeContainer: {
    height: "300px",
    width: "100%",
    justifyContent: "center",
    overflowY: "scroll",
    flexDirection: "column",
    background: "rgba(255, 255, 255, 0.2)",
    gridColumn: "1/4",
    "&::-webkit-scrollbar": {
      width: "2px"
    },
    "&::-webkit-scrollbar-track": {
      background: "#black"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "white",
      borderRadius: "1.5px"
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#bfbfbf"
    },
    "@media (max-width: 1199px)": {
      height: "205px"
      // width: "30%"
    },
    "@media (max-width: 959px)": {
      // width: "70%",
      height: "205px",
      margin: "0px auto"
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "205px"
    }
  },
  singleSizeContainerAvailable: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    height: "60px",
    padding: "21px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    cursor: "pointer",
    color: "white",
    lineHeight: "16px"
  },
  singleSizeContainer: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    height: "60px",
    padding: "21px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    color: "rgba(255, 255, 255, 0.2)",
    lineHeight: "16px"
  },
  description0: {
    color: "black",
    fontWeight: "100",
    width: "230px",
    display: "flex",
    flexDirection: "column",
    height: "160px",
    marginBottom: "70px",
    "@media (max-width: 1199px)": {
      marginBottom: "20px",
      height: "130px"
    },
    "@media (max-width: 599px)": {
      margin: "auto 0px",
      height: "75px",
      width: "100%",
      flexWrap: "wrap",
      flexDirection: "row"
    }
  },
  description: {
    padding: "0px 10px",
    margin: "0px 10px 10px 10px",
    paddingBottom: "10px",
    borderBottom: "1px solid #eee",
    color: "#7c7c7c",
    "@media (max-width: 599px)": { margin: "0 16px", padding: "0 0 12px" }
  },
  detailsContainer: {
    display: "grid", gridTemplateColumns: "minmax(65px, .8fr) minmax(0, 1.5fr)", alignItems: "baseline", gap: "8px",
    padding: "4px 0", "@media (max-width: 599px)": { gridTemplateColumns: "minmax(0,1fr)", alignContent: "start", borderTop: "1px solid #e4e6e7", padding: "7px 0", gap: "2px" }
  },
  detail: {
    fontSize: "14px", lineHeight: 1.45, color: "#232527", fontVariantNumeric: "tabular-nums",
    "@media (max-width: 599px)": { fontSize: "13px", overflowWrap: "anywhere" }
  },
  recommendButtonContainer: {
    display: "flex",
    margin: "auto",
    padding: "50px 0px",
    color: "black",
    "@media (max-width: 1199px)": {
      padding: "30px 0px"
    },
    "@media (max-width: 959px)": {
      padding: "20px 0px"
    },
    "@media (max-width: 599px)": {
      padding: "10px 0px"
    }
  },
  recommendContainerLeft: {
    marginRight: "20px"
  },
  recommendNumber: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "48px",
    height: "48px",
    lineHeight: "48px",
    fontWeight: "900"
  },
  recommendButtonUp: {
    width: "400px",
    height: "65px",
    borderRadius: "0px",
    background: "#fe0229",
    color: "white",
    fontSize: "16px",
    "&:hover": {
      background: "#fe677d" //#fe677d
    },
    "@media (max-width: 1199px)": {
      width: "250px"
    },
    "@media (max-width: 959px)": {
      width: "200px"
    },
    "@media (max-width: 599px)": {
      width: "120px"
    }
  },
  recommendButtonDown: {
    width: "400px",
    height: "65px",
    borderRadius: "0px",
    background: "black",
    color: "white",
    fontSize: "16px",
    "&:hover": {
      background: "#595959"
    },
    "@media (max-width: 1199px)": {
      width: "250px"
    },
    "@media (max-width: 959px)": {
      width: "200px"
    },
    "@media (max-width: 599px)": {
      width: "120px"
    }
  },
  detailHeader: {
    fontSize: "14px", lineHeight: 1.45, color: "#63696d", "@media (max-width: 599px)": { fontSize: "12px" }
  },
  modelDetail: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "10px",
    color: "black"
  },
  recentSold: {
    "& .apexcharts-tooltip, & .apexcharts-xaxistooltip, & .apexcharts-yaxistooltip": { borderRadius: 0 },
    textAlign: "left",
    fontSize: "24px",
    marginBottom: "10px",
    fontWeight: "600",
    color: "black",
    "@media (max-width: 599px)": {
      fontSize: "18px"
    }
  },
  webModalBuy: {
    width: "100px",
    hieght: "100px",
    position: "absolute",
    top: "50%",
    left: "50%",
    background: "white"
  },
  mobModalBuy: {
    width: "100px",
    hieght: "100px",
    position: "absolute",
    top: "50%",
    left: "50%",
    background: "white"
  }
};

export default propageStyle;
