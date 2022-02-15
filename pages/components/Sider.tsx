import { Layout, Menu } from "antd";
import _ from "lodash";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { decodePayload } from "../utils/auth";
import { Link, useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
import { MenuList } from "../index";

const { Header, Content, Sider } = Layout;
// import { withRouter } from "next/router";
import { useRouter } from "next/router";

interface Props {
  needSider: boolean | true;
  children: ReactNode;
  menuList: MenuList[];
}

function SiderDemo(props: Props) {
  const location = useLocation();
  const router = useRouter();
  console.log("location", location);
  console.log("router", router);
  // const router = useRouter();
  const [selectedKey, setSelectedKey] = useState(
    props.menuList.find((_item) => location.pathname.startsWith(_item.route))
      ?.key
  );
  useEffect(() => {
    setSelectedKey(
      props.menuList.find((_item) => location.pathname.startsWith(_item.route))
        ?.key
    );
  }, []);
  const logOut = () => {
    localStorage.clear();
    global.window.location.href = "/";
  };
  return (
    <AuthContext.Consumer>
      {({ is_authenticated }) => (
        <Layout>
          {is_authenticated && (
            <Sider width="200" theme="light" trigger={null} breakpoint="sm">
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
                      <Link to={value.route}>
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
              <Header className={`gradient-bg px-8 flex my-4`}>frg</Header>
            )}
            <Content className={`${is_authenticated ? "p-6" : "p-0"}`}>
              {props.children}
            </Content>
          </Layout>
        </Layout>
      )}
    </AuthContext.Consumer>
  );
}

export default SiderDemo;
