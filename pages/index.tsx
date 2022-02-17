import { Component, ReactNode } from "react";
import { HomeFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import {
  Redirect,
  Router,
  Route,
  RouteProps,
  Switch,
  useHistory,
  Link,
} from "react-router-dom";
import { rest } from "lodash";
import React from "react";
import { createMemoryHistory } from "history";
import Home from "./home";
import "antd/dist/antd.css";

const history = createMemoryHistory();
export type MenuList = {
  key: string;
  route: string;
  icon?: ReactNode;
};

interface PrivateRouteProps extends RouteProps {}

let menuList: MenuList[] = [
  {
    key: "home",
    route: "/home",
    icon: <HomeFilled />,
  },
];

const App = () => {
  return (
    <>
      <h1>Home page</h1>
    </>
  );
};

export default App;
