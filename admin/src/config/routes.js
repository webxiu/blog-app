/**
 * 路由表, 都去掉了/admin路由, 如首页: /admin/home ...
 */

import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  SettingFilled,
} from "@ant-design/icons";

const menuList = [
  { title: "工作台", key: "/admin", icon: HomeOutlined },
  { title: "文章列表", key: "/admin/list", icon: DesktopOutlined },
  {
    title: "文章管理",
    key: "/manage",
    icon: SettingFilled,
    children: [
      { title: "添加", key: "/admin/add", icon: FileOutlined },
      // { title: "更新", key: "/update", icon: PieChartOutlined },
    ],
  },
  { title: "留言管理", key: "/admin/message", icon: SettingFilled },
];

export default menuList;
