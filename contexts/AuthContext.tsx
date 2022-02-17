import React from "react";

import { isAuthenticated } from "../utils/auth";

export const AuthContext = React.createContext({
  is_authenticated: isAuthenticated(),
});
