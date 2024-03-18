import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import {
  BrowserRouter
} from 'react-router-dom';
import "assets/scss/material-kit-react.css?v=1.1.0";
import {
  createStore,
  compose,
  applyMiddleware
} from "redux";
import thunk from 'redux-thunk';
import {
  Provider
} from 'react-redux';
import Amplify from 'aws-amplify';
import AWS from 'aws-sdk'
import reducer from "store/reducer/reducer"
import 'core-js'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

AWS.config.region = 'ap-northeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-northeast-2:3b28b649-c3a2-4c66-be17-613bc2601b8e',
});

Amplify.configure({
  Auth: {
    identityPoolId: 'ap-northeast-2:3b28b649-c3a2-4c66-be17-613bc2601b8e',
    region: 'ap-northeast-2',
    userPoolId: 'ap-northeast-2_i5pwx5RCr',
    userPoolWebClientId: 'brrd56peesoquad52tcsgf6am',
  },
});

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

const Root = () => {
  return ( <
    BrowserRouter >
    <
    App / >
    <
    /BrowserRouter>
  )
}

ReactDOM.render( <
  Provider store = {
    store
  } >
  <
  Root / >
  <
  /Provider>,
  document.getElementById("root")
);
registerServiceWorker();