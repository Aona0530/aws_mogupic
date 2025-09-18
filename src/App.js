// App.js

import { useAuth } from "react-oidc-context";
import { withAuthenticator } from "@aws-amplify/ui-react";

function App({ signOut, user }) {
  return (
    <div>
      <h2>こんにちは, {user?.username} さん</h2>
      <button onClick={signOut}>サインアウト</button>
    </div>
  );
}

export default withAuthenticator(App);