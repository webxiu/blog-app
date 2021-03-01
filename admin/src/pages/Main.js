import '../static/css/AdminIndex.css'

import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';

import routes from "../config/routes";
import { useHistory } from 'react-router'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const Main = (props) => {
    const history = useHistory()
    const [collapsed, setCollapsed] = useState(false)
    const [openKeys, setOpenKeys] = useState(["sub1"]);
    const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    // 菜单渲染
    const renderMenu = (data) => {
        let path = "";
        return data.map((item) => {
            if (item.children) {
                const cItem = item.children.find((cItem) => cItem.key === path);
                if (cItem) {
                    setOpenKeys(item.key); // 把openKey存在this种
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={<span>
                            <item.icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>}>
                        {renderMenu(item.children)}
                    </SubMenu>
                );
            }
            // 判断item是否是当前对应的item
            // if (item.key === path || path.indexOf(item.key) ===0) { //存在二季子路由判断
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <span key={item.key} onClick={() => {
                        history.push(item.key);
                    }}>
                        <item.icon type={item.icon} />
                        <span> {item.title}</span>
                    </span>
                </Menu.Item>
            );
        });
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    mode="inline">
                    {renderMenu(routes)}
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#f60', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>www.baidu.com</Footer>
            </Layout>
        </Layout>
    )
}
export default Main
