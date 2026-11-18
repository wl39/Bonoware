import axios from "axios";
export const SET_AUTH = "SET_AUTH";
export const SET_USERNAME = "SET_USERNAME";
export const SET_ID = "SET_ID";
export const SET_PW = "SET_PW";
export const SET_LOGOUT = "SET_LOGOUT";
export const SET_MODAL = "SET_MODAL";
export const SET_ERROR = "SET_ERROR";
export const SET_MAIN_IMAGES = "SET_MAIN_IMAGES";
export const SET_MOST_POPULAR = "SET_MOST_POPULAR";
export const SET_MOST_RECENT = "SET_MOST_RECENT";
export const SET_MOST_CHEAPEST = "SET_MOST_CHEAPEST";
export const SET_ATTR = "SET_ATTR";
export const SET_GRAPH_DATA = "SET_GRAPH_DATA";
export const SET_SEARCH_PANEL = "SET_SEARCH_PANEL";
export const SET_SHOE_NEWS = "SET_SHOE_NEWS";
export const SET_SLIDERS = "SET_SLIDERS";
export const SET_UNRELEASED = "SET_UNRELEASED";
export const SET_TICKER = "SET_TICKER";
export const SET_ATTR_FOLLOWING = "SET_ATTR_FOLLOWING";

export const setAuth = (auth, usersname, attr) => {
  return {
    type: SET_AUTH,
    auth: true,
    userName: usersname,
    attr: attr
  };
};

export const setUser = (usersname, attr) => {
  return {
    type: SET_USERNAME,
    userName: usersname,
    auth: true,
    modalOpen: false,
    attr: attr
  };
};

export const loginError = message => {
  return {
    type: SET_ERROR,
    error: message
  };
};

export const authUser = info => {
  return dispatch => {
    console.log(info);
    axios
      .post(
        "https://api.probe.gg/auth/login",
        {
          email: info.email,
          password: info.pw
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://probe.gg"
          }
        }
      )
      .then(response => {
        console.log(response.errors);
        console.log(response);
        if (response.data.error) {
          dispatch(loginError(response.data.error));
        } else if (response.data.errors) {
          if (response.data.errors.email) {
            dispatch(loginError(response.data.errors.email.code));
          } else if (response.data.errors.password) {
            dispatch(loginError(response.data.errors.password.code));
          }
        } else {
          let data = response.data;
          dispatch(setUser(data.name, data));
        }
      });
  };
};

export const setLogout = () => {
  axios
    .get("https://api.probe.gg/auth/logout", {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "https://probe.gg"
      }
    })
    .then(response => {
      console.log("logged out");
    });

  return {
    type: SET_LOGOUT
  };
};

export const setAttrFollowing = (attr, following) => {
  attr.following = following;

  return {
    type: SET_ATTR_FOLLOWING,
    attr: attr
  };
};

export const getUser = () => {
  return dispatch => {
    axios
      .get("https://api.probe.gg/protected/checkLogin", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://probe.gg"
        }
      })
      .then(response => {
        let data = response.data;
        dispatch(setUser(data.name, data, data.email));
      });
  };
};

export const getId = id => {
  return {
    type: SET_ID,
    id: id
  };
};

export const getPw = pw => {
  return {
    type: SET_PW,
    pw: pw
  };
};

export const getModal = bool => {
  return {
    type: SET_MODAL,
    modal: bool
  };
};

export const setMainImages = (
  mainSliderImage,
  mobileSliderImage,
  backgroundImage
) => {
  return {
    type: SET_MAIN_IMAGES,
    pcSliderImages: mainSliderImage,
    mobileSliderImages: mobileSliderImage,
    backgroundImage: backgroundImage
  };
};

export const setMostPopular = data => {
  return {
    type: SET_MOST_POPULAR,
    mostPopular: data
  };
};

export const setMostRecent = data => {
  return {
    type: SET_MOST_RECENT,
    mostRecent: data
  };
};

export const setMostCheapest = data => {
  return {
    type: SET_MOST_CHEAPEST,
    mostCheapest: data
  };
};

export const setGraphData = (nike, adidas, others) => {
  return {
    type: SET_GRAPH_DATA,
    nike: nike,
    adidas: adidas,
    others: others
  };
};

export const setSearchPanel = (daily, weekly, monthly, recommend) => {
  return {
    type: SET_SEARCH_PANEL,
    daily: daily,
    weekly: weekly,
    monthly: monthly,
    recommend: recommend
  };
};

export const setShoeNews = shoeNews => {
  return {
    type: SET_SHOE_NEWS,
    shoeNews: shoeNews
  };
};

export const setSliders = (
  mostPopularSlider,
  mostRecentSlider,
  mostCheapestSlider
) => {
  return {
    type: SET_SLIDERS,
    mostPopularSlider: mostPopularSlider,
    mostRecentSlider: mostRecentSlider,
    mostCheapestSlider: mostCheapestSlider
  };
};

export const setUnreleased = unreleased => {
  return {
    type: SET_UNRELEASED,
    unreleased: unreleased
  };
};

export const setTicker = ticker => {
  return {
    type: SET_TICKER,
    ticker: ticker
  };
};

export const getMainImages = () => {
  return dispatch => {
    let nike = {};
    let adidas = {};
    let others = {};
    let daily = [];
    let weekly = [];
    let monthly = [];
    let recommend = [];
    let shoeNews = [];
    let mostPopularSlider = [];
    let mostRecentSlider = [];
    let mostCheapestSlider = [];
    let unreleased = [];
    let ticker = [];

    axios({
      method: "get",
      url: "https://api.probe.gg/open"
    }).then(value => {
      value.data[1].graph.forEach(value => {
        switch (value.graphName) {
          case "nike":
            nike = value.date;
            break;
          case "adidas":
            adidas = value.date;
            break;
          case "others":
            others = value.date;
            break;
          default:
            break;
        }
      });
      value.data[2].orderby.item.forEach(value => {
        daily.push({ name: value.name, image: value.image[0] });
      });
      value.data[3].orderby.item.forEach(value => {
        weekly.push({ name: value.name, image: value.image[0] });
      });
      value.data[4].orderby.item.forEach(value => {
        monthly.push({ name: value.name, image: value.image[0] });
      });
      value.data[5].orderby.item.forEach(value => {
        recommend.push({ name: value.name, image: value.image[0] });
      });

      mostPopularSlider = value.data[6].item;
      mostRecentSlider = value.data[7].orderby.item;
      mostCheapestSlider = value.data[8].item;

      shoeNews = value.data[9].shoeNews.item;

      unreleased = value.data[10].orderby.item;

      ticker = value.data[11];

      dispatch(
        setMainImages(
          value.data[0].mainpageimages.item[1].images.slice(-3),
          value.data[0].mainpageimages.item[2].images,
          value.data[0].mainpageimages.item[0].images
        )
      );
      dispatch(setGraphData(nike, adidas, others));
      dispatch(setSearchPanel(daily, weekly, monthly, recommend));
      dispatch(
        setSliders(mostPopularSlider, mostRecentSlider, mostCheapestSlider)
      );
      dispatch(setShoeNews(shoeNews));
      dispatch(setUnreleased(unreleased));
      dispatch(setTicker(ticker));
    });
  };
};
