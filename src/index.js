// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Mw4V1Mnp8",
  client_id: "4vu82ghmfh5tk5adijse0dbf2i",
  redirect_uri: "https://main.d2s921w9x0k31c.amplifyapp.com/",
  response_type: "code",
  scope: "email openid phone",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
Amplify.configure(awsExports);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);