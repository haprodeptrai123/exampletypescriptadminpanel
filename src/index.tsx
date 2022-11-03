import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { config as configEnv } from "dotenv";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
  uri: 'http://128.199.110.106:8080/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": "myadminsecretkey",
  },
});
ReactDOM.render(
  <HelmetProvider>
    <ApolloProvider client ={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
