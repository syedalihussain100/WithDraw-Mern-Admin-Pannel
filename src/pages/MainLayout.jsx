import React, { useState } from "react";
import { Breadcrumb, Layout, theme, Menu } from "antd";
import { Link } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import { FaUsers } from "react-icons/fa";
// import { BiLogOutCircle } from "react-icons/bi";
import { BsDatabaseCheck } from "react-icons/bs";
import {BiSolidVideoPlus} from "react-icons/bi";
import {GiMedallist} from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { UserLogout } from "../redux/features/user/UserSlice";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, link) {
  if (children) {
    return {
      key,
      icon,
      children,
      label,
      link,
      isSubMenu: true, // Add a flag to indicate that it's a submenu
    };
  } else {
    return {
      key,
      icon,
      label,
      link,
    };
  }
}

const items = [
  getItem("All Users", "1", <FaUsers />, null, "/alluser"),
  getItem("Payment Data", "2", <BsDatabaseCheck />, null, "/paymentdata"),
  getItem("Create Video", "3", <BiSolidVideoPlus />, null, "/createvideo"),
  getItem("All Videos", "4", <GiMedallist />, null, "/allvideos"),

  // getItem('Plans', 'sub2', <BiCommentAdd />, [
  //   getItem('Add Plain', '7', null, null, '/add-plain'),
  //   getItem('Plain List', '8', null, null, '/plain-list'),
  // ]),

  // getItem("Logout", "3", <BiLogOutCircle />,null, null ),
];

const App = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(UserLogout());
    localStorage.clear("user");
    localStorage.clear("token");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {items.map((item) =>
            item.isSubMenu ? ( // Check if it's a submenu
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key}>
                    <Link to={subItem.link}>{subItem.label}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {user != null ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                margin: "0px 50px",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  background: "red",
                  color: "#fff",
                  padding: "0px 30px",
                  fontSize: "1.2rem",
                }}
              >
                LOGOUT
              </button>
            </div>
          ) : null}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ©2023 Created By Zee Coder Craft
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
