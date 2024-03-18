import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

import Aux from "hoc/Aux_/Aux_";
import Header from "components/Header/Header.jsx";

import LeftHeaderLinks from "components/Header/LeftHeaderLinks.jsx";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import Footer from "components/Footer/Footer.jsx";
import { hot } from "react-hot-loader";
import NFCDetailPage from "./views/NFCDetailPage/NFCDetailPage";

const THEME = createMuiTheme({
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  body: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 300
  }
});

const Loading = () => <div></div>;

const MainPageLoader = Loadable({
  loader: () => import("views/MainPage/MainPage.jsx"),
  loading: Loading
});

const ProductDetailPageLoader = Loadable({
  loader: () => import("views/ProdcutDetailPage/ProductDetailPage.jsx"),
  loading: Loading
});

const NFCDetailPageLoader = Loadable({
  loader: () => import("views/NFCDetailPage/NFCDetailPage.jsx"),
  loading: Loading
});

const ProductLoader = Loadable({
  loader: () => import("views/ProductPage/ProductPage.jsx"),
  loading: Loading
});

const SellLoader = Loadable({
  loader: () => import("views/SellPage/SellPage.jsx"),
  loading: Loading
});

const DetailSellLoader = Loadable({
  loader: () => import("views/SellPage/DetailSell.jsx"),
  loading: Loading
});

const AboutPageLoader = Loadable({
  loader: () => import("components/About/About.jsx"),
  loading: Loading
});

const AdminPageLoader = Loadable({
  loader: () => import("views/AdminPage/AdminPage.jsx"),
  loading: Loading
});

const PrivacyPageLoader = Loadable({
  loader: () => import("views/PrivacyPage/PrivacyPage.jsx"),
  loading: Loading
});

const TermsPageLoader = Loadable({
  loader: () => import("views/TermsPage/TermsPage.jsx"),
  loading: Loading
});

const TestPage2Loader = Loadable({
  loader: () => import("views/TestPage2/TestPage2.jsx"),
  loading: Loading
});

const TestPageLoader = Loadable({
  loader: () => import("views/TestPage/TestPage.jsx"),
  loading: Loading
});

const RegisterPageLoader = Loadable({
  loader: () => import("views/Forms/Wizard.jsx"),
  loading: Loading
});

const ProfilePageLoader = Loadable({
  loader: () => import("views/ProfilePage/ProfileContent.jsx"),
  loading: Loading
});

const ProfileContentoader = Loadable({
  loader: () => import("views/ProfilePage/ProfileContent.jsx"),
  loading: Loading
});

const PaymentsCompleteLoader = Loadable({
  loader: () => import("views/Payments/Complete.jsx"),
  loading: Loading
});

const EmailCompleteLoader = Loadable({
  loader: () => import("views/EmailVerification/Complete.jsx"),
  loading: Loading
});

const ShoeNewReleasesPageLoader = Loadable({
  loader: () => import("views/NewReleases/NewReleasesPage.jsx"),
  loading: Loading
});

const ShoeNewsPageLoader = Loadable({
  loader: () => import("views/ShoeNews/ShoeNewsPage.jsx"),
  loading: Loading
});

const ShoeNewsLoader = Loadable({
  loader: () => import("views/ShoeNews/ShoeNews.jsx"),
  loading: Loading
});

class App extends Component {
  state = {
    mobileOpen: false,
    miniActive: false,
    searchBar: false
  };
  // async componentWillMount() {
  //   this.props.getMainImagesHandler()
  //   this.props.getGraphDataHandler()
  // }

  //When an user moved to other pages
  componentWillReceiveProps() {
    if (window.location.pathname === "/") {
      this.setState({
        searchBar: false
      });
    } else {
      this.setState({
        searchBar: true
      });
    }
  }

  //When an user comes to the website
  componentWillMount() {
    if (window.location.pathname === "/") {
      this.setState({
        searchBar: false
      });
    } else {
      this.setState({
        searchBar: true
      });
    }
  }

  handleDrawerToggle = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen
    });
  };

  //http://fonts.googleapis.com/earlyaccess/notosanskr.css
  render() {
    let routes = (
      <Switch>
        <Route path="/admin" component={AdminPageLoader} />
        <Route path="/about" component={AboutPageLoader} />
        <Route path="/privacy" component={PrivacyPageLoader} />
        <Route path="/terms" component={TermsPageLoader} />
        <Route path="/test" component={TestPageLoader} />
        <Route path="/test2" component={TestPage2Loader} />
        <Route path="/profile/:content" component={ProfileContentoader} />
        <Route exact path="/profile" component={ProfilePageLoader} />
        <Route path="/products/:model" component={ProductDetailPageLoader} />
        {/* <Route path = "/products/:filter" component = {ProductLoader} /> */}
        <Route exact path="/products" component={ProductLoader} />
        <Route exact path="/sell/details" component={DetailSellLoader} />
        <Route exact path="/sell" component={SellLoader} />
        <Route path="/news/:model" component={ShoeNewsLoader} />
        <Route exact path="/news" component={ShoeNewsPageLoader} />
        <Route
          exact
          path="/new-releases"
          component={ShoeNewReleasesPageLoader}
        />
        <Route
          path="/register/email_comfirm_complete"
          component={EmailCompleteLoader}
        />
        <Route exact path="/register" component={RegisterPageLoader} />
        <Route path="/payments/complete" component={PaymentsCompleteLoader} />
        <Route exact path="/nfc/:id" component={NFCDetailPage} />
        <Route path="/" exact component={MainPageLoader} /> <Redirect to="/" />
      </Switch>
    );
    const { classes, ...rest } = this.props;

    return (
      <Aux>
        <MuiThemeProvider theme={THEME}>
          <Header
            brand="Probe"
            fixed
            color="transparent"
            // rightLinks={<HeaderLinks buysell={""} />}
            searchBar={this.state.searchBar}
            leftLinks={null}
            changeColorOnScroll={{
              height: 100,
              color: "white"
            }}
            {...rest}
          />

          {routes}

          <Footer />
        </MuiThemeProvider>
      </Aux>
    );
  }
}

// const mapDispatchToProps = {
//   getMainImagesHandler: actions.getMainImages,
//   getGraphDataHandler: actions.getGraphData,
// };

export default withRouter(App);
