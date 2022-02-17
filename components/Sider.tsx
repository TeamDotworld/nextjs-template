import { Layout, Menu } from "antd";
import _ from "lodash";
import { Children, ReactChild, ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { decodePayload } from "../utils/auth";
import { MenuList } from "../pages/index";
import Link from "next/link";
const { Header, Content, Sider } = Layout;
import { useRouter } from "next/router";
import Image from "next/image";

interface Props {
  needSider: boolean | true;
  menuList: MenuList[];
  children: ReactChild;
}

function SiderDemo(props: Props) {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState(
    props.menuList.find((_item) => router.pathname.startsWith(_item.route))?.key
  );

  useEffect(() => {
    setSelectedKey(
      props.menuList.find((_item) => router.pathname.startsWith(_item.route))
        ?.key
    );
  }, [router.query]);

  const logOut = () => {
    localStorage.clear();
    // global.window.location.href = "/";
  };
  return (
    <AuthContext.Consumer>
      {({ is_authenticated }) => (
        <Layout>
          {is_authenticated && (
            <Sider width="200" theme="light" trigger={null} breakpoint="sm">
              <div className={`mt-6 text-center`}>
                <Image
                  src="/favicon.ico"
                  className="h-12 mt-4 w-full object-scale-down"
                  alt="Vercel Logo"
                  width={122}
                  height={36}
                />
              </div>
              <Menu
                className={`mt-6`}
                theme="light"
                mode="inline"
                defaultSelectedKeys={[selectedKey ? selectedKey : "home"]}
              >
                {props.menuList.map((value, index) => (
                  <>
                    <Menu.Item
                      className={`flex items-center place-content-left`}
                      key={value.key}
                    >
                      <Link href={value.route}>
                        {_.startCase(_.camelCase(value.key))}
                      </Link>
                    </Menu.Item>
                  </>
                ))}
              </Menu>
            </Sider>
          )}
          <Layout className={`gradient-bg h-screen overflow-y-auto`}>
            {is_authenticated && (
              <Header className={`gradient-bg px-8 flex my-4`}></Header>
            )}
            <Content className={`${is_authenticated ? "p-0" : "p-6"}`}>
              {props.children}
            </Content>
          </Layout>
        </Layout>
      )}
    </AuthContext.Consumer>
  );
}

export default SiderDemo;
