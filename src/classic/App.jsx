import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import ErrorBoundary from "./ErrorBoundary";
import "./storefront.css";
const theme = createMuiTheme({
  shape: { borderRadius: 0 },
  overrides: {
    MuiIconButton: { root: { borderRadius: 0 } },
  },
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  body: { fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 },
});
const Home = lazy(() => import("views/MainPage/MainPage.jsx"));
const Products = lazy(() => import("views/ProductPage/ProductPage.jsx"));
const Product = lazy(
  () => import("views/ProdcutDetailPage/ProductDetailPage.jsx"),
);
const Releases = lazy(() => import("views/NewReleases/NewReleasesPage.jsx"));
const News = lazy(() => import("views/ShoeNews/ShoeNewsPage.jsx"));
const Article = lazy(() => import("views/ShoeNews/ShoeNews.jsx"));
const Sell = lazy(() => import("views/SellPage/SellPage.jsx"));
const SellDetail = lazy(() => import("views/SellPage/DetailSell.jsx"));
const Profile = lazy(() => import("views/ProfilePage/ProfileContent.jsx"));
const Register = lazy(() => import("views/Forms/Wizard.jsx"));
const About = lazy(() => import("components/About/About.jsx"));
const Privacy = lazy(() => import("views/PrivacyPage/PrivacyPage.jsx"));
const Terms = lazy(() => import("views/TermsPage/TermsPage.jsx"));
const Complete = lazy(() => import("views/Payments/Complete.jsx"));
export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <MuiThemeProvider theme={theme}>
      <Header
        brand="Probe"
        routeKey={location.pathname}
        fixed
        color="transparent"
        searchBar={location.pathname !== "/"}
        leftLinks={null}
        changeColorOnScroll={{ height: 100, color: "white" }}
      />
      <ErrorBoundary key={location.pathname}>
        <Suspense
          fallback={
            <div
              style={{ minHeight: 500 }}
              role="status"
              aria-label="화면을 불러오는 중"
            />
          }
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:model" component={Product} />
            <Route path="/new-releases" component={Releases} />
            <Route exact path="/news" component={News} />
            <Route path="/news/:model" component={Article} />
            <Route exact path="/sell" component={Sell} />
            <Route path="/sell/details" component={SellDetail} />
            <Route path="/profile/:content?" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/about" component={About} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/payments/complete" component={Complete} />
            <Route component={Home} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </MuiThemeProvider>
  );
}
