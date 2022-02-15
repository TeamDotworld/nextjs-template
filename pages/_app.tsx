import "../styles/globals.css";
// import type { AppProps } from 'next/app'

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import App from "./index";
import LoginPage from "./page/Login";
import Home from "./page/Home";
// import { Formik, Field, Form } from "formik";
import SiderDemo from "./components/Sider";
export default function MyApp() {
  return (
    <>
      <App />
      {/* <Home /> */}
      {/* <LoginPage /> */}
      {/* <SiderDemo needSider={false} children={undefined} menuList={[]} /> */}
    </>
  );
}

// // import type { NextPage } from "next";
// import { Component, ReactNode } from "react";
// import { HomeFilled } from "@ant-design/icons";
// import Sider from "./components/Sider";
// import { isAuthenticated } from "./utils/auth";
// import { useRouter } from "next/router";
// import dynamic from "next/dynamic";
// import { Router } from "react-router";
// import {
//   Redirect,
//   Route,
//   RouteProps,
//   // BrowserRouter as Router,
//   Switch,
//   useHistory,
// } from "react-router-dom";
// import { rest } from "lodash";
// import React from "react";
// import LoginPage from "./page/Login";
// // import ReactDOM from "react-dom";
// // import { History } from "history";
// import { createMemoryHistory } from "history";
// import Home from "../pages/page/Home";

// const history = createMemoryHistory();

// export type MenuList = {
//   key: string;
//   route: string;
//   component: any;
//   icon?: ReactNode;
// };

// interface PrivateRouteProps extends RouteProps {}

// let menuList: MenuList[] = [
//   {
//     key: "home",
//     route: "/home",
//     component: dynamic(() => import("../pages/page/Home")),
//     icon: <HomeFilled />,
//   },
// ];

// const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
//   if (!Component) return null;
//   return (
//     <Route
//       // history={history}
//       {...rest}
//       render={(props) =>
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: "/home", state: { from: props } }}
//             // to={{ pathname: "/home" }}
//           />
//         )
//       }
//     />
//   );
// };

// const App = () => {
//   let history = useHistory();
//   return (
//     <Router history={history}>
//       <Sider menuList={menuList} needSider={false}>
//         <Switch>
//           <React.Suspense fallback="Loading...">
//             <div suppressHydrationWarning>
//               <Route
//                 exact
//                 path="/"
//                 render={() =>
//                   isAuthenticated() && typeof window === "undefined" ? (
//                     history.push("/home")
//                   ) : (
//                     <LoginPage />
//                   )
//                 }
//               />
//             </div>
//             <PrivateRoute exact path="/home" component={Home} />
//           </React.Suspense>
//         </Switch>
//       </Sider>
//     </Router>
//   );
// };

// export default App;
