// import Script from "next/script";
// import type { NextPage } from "next";
import { Component, ReactNode } from "react";
import { HomeFilled } from "@ant-design/icons";
import Sider from "./components/Sider";
import { isAuthenticated } from "./utils/auth";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// import { Router } from "react-router";
import {
  Redirect,
  Router,
  Route,
  RouteProps,
  // BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import { rest } from "lodash";
import React from "react";
import LoginPage from "./page/Login";
// import ReactDOM from "react-dom";
import { History } from "history";
import { createMemoryHistory } from "history";
import Home from "../pages/page/Home";

const history = createMemoryHistory();
// const history = useHistory();
export type MenuList = {
  key: string;
  route: string;
  component: any;
  icon?: ReactNode;
};

interface PrivateRouteProps extends RouteProps {}

let menuList: MenuList[] = [
  {
    key: "home",
    route: "/home",
    component: dynamic(() => import("../pages/page/Home")),
    icon: <HomeFilled />,
  },
];

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  if (!Component) return null;

  return (
    <>
      {/* <Script src="https://www.google-analytics.com/analytics.js" /> */}
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/home", state: { from: props.location } }}
              // to={{ pathname: "/home" }}
            />
          )
        }
      />
    </>
  );
};

const App = () => {
  // let history = useHistory();
  return (
    <>
      {/* <Script src="https://www.google-analytics.com/analytics.js" /> */}
      <Router history={history}>
        <Sider menuList={menuList} needSider={false}>
          <Switch>
            {/* <React.Suspense fallback="Loading..."> */}
            <div suppressHydrationWarning>
              <Route
                exact
                path="/"
                render={
                  () => (
                    // isAuthenticated() && typeof window === "undefined" ? (
                    <Redirect to="/home" />
                  )
                  // ) : (
                  //   <LoginPage />
                  // )
                }
              />
            </div>
            <PrivateRoute exact path="/home" component={Home} />
            {/* </React.Suspense> */}
          </Switch>
        </Sider>
      </Router>
    </>
  );
};

export default App;

// export default function First() {
//   return (
//     <>
//       <h2>jhj</h2>
//     </>
//   );
// }
