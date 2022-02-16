import "../styles/globals.css";
import "antd/dist/antd.css";
import "../styles/index.css";
import type { AppProps } from "next/app";
import Sider from "../components/Sider";
import { useRouter } from "next/router";
import Link from "next/link";
import Home from "./home";
import { isAuthenticated } from "./utils/auth";
import { useEffect } from "react";

export type MenuList = {
  key: string;
  route: string;
};

let menuList: MenuList[] = [
  {
    key: "home",
    route: "/home",
  },
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Sider menuList={menuList} needSider={false}>
        <Component {...pageProps} />
      </Sider>
    </>
  );
}

export default MyApp;
