import * as actionTypes from "../actions/actions";

const initialState = {
  isAuthenticated: false,
  attr: "",
  userName: "",
  id: "",
  pw: "",
  modalOpen: false,
  error: "",
  pcSliderImages: [],
  mobileSliderImages: [],
  backgroundImage: "",
  mostPopular: [],
  mostRecent: [],
  mostCheapest: [],
  nikeGraph: [],
  adidasGraph: [],
  othersGraph: [],
  daily: [],
  weekly: [],
  monthly: [],
  recommend: [],
  shoeNews: [],
  mostPopularSlider: [],
  mostRecentSlider: [],
  mostCheapestSlider: [],
  unreleased: [],
  ticker: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERNAME:
      return {
        ...state,
        userName: action.userName,
        isAuthenticated: action.auth,
        id: "",
        pw: "",
        modalOpen: action.modalOpen,
        attr: action.attr
      };

    case actionTypes.SET_AUTH:
      return {
        ...state,
        isAuthenticated: action.auth,
        userName: action.userName,
        attr: action.attr
      };

    case actionTypes.SET_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userName: "",
        modalOpen: false,
        attr: ""
      };

    case actionTypes.SET_ID:
      return {
        ...state,
        id: action.id
      };

    case actionTypes.SET_PW:
      return {
        ...state,
        pw: action.pw
      };

    case actionTypes.SET_MODAL:
      return {
        ...state,
        modalOpen: action.modal
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.error
      };

    case actionTypes.SET_MAIN_IMAGES:
      return {
        ...state,
        pcSliderImages: action.pcSliderImages,
        mobileSliderImages: action.mobileSliderImages,
        backgroundImage: action.backgroundImage
      };

    case actionTypes.SET_MOST_POPULAR:
      return {
        ...state,
        mostPopular: action.mostPopular
      };

    case actionTypes.SET_MOST_RECENT:
      return {
        ...state,
        mostRecent: action.mostRecent
      };

    case actionTypes.SET_MOST_CHEAPEST:
      return {
        ...state,
        mostCheapest: action.mostCheapest
      };

    case actionTypes.SET_GRAPH_DATA:
      return {
        ...state,
        nikeGraph: action.nike,
        adidasGraph: action.adidas,
        othersGraph: action.others
      };

    case actionTypes.SET_SEARCH_PANEL:
      return {
        ...state,
        daily: action.daily,
        weekly: action.weekly,
        monthly: action.monthly,
        recommend: action.recommend
      };

    case actionTypes.SET_SHOE_NEWS:
      return {
        ...state,
        shoeNews: action.shoeNews
      };

    case actionTypes.SET_SLIDERS:
      return {
        ...state,
        mostPopularSlider: action.mostPopularSlider,
        mostRecentSlider: action.mostRecentSlider,
        mostCheapestSlider: action.mostCheapestSlider
      };

    case actionTypes.SET_UNRELEASED:
      return {
        ...state,
        unreleased: action.unreleased
      };

    case actionTypes.SET_TICKER:
      return {
        ...state,
        ticker: action.ticker
      };

    case actionTypes.SET_ATTR_FOLLOWING:
      return {
        ...state,
        attr: action.attr
      };
    default:
      return state;
  }
};

export default reducer;
