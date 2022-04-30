import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/app/App';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-4i7z7sbw.us.auth0.com"
    clientId="9LIO7jQPeSh0u8iFUtuvhq74ADdQOE41"
    redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>,
  </React.StrictMode>
);




