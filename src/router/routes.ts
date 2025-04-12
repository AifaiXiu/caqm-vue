import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "主页"
        }
      },
      {
        path: "audit",
        name: "Audit",
        component: () => import("@/views/audit/index.vue"),
        meta: {
          title: "审计"
        }
      },
      {
        path: "finding",
        name: "Finding",
        component: () => import("@/views/finding/index.vue"),
        meta: {
          title: "不符合项"
        }
      },
      {
        path: "about_layout",
        name: "AboutLayout",
        redirect: { name: "About" },
        component: () => import("@/views/about/layout/index.vue"),
        meta: {
          title: "关于",
          noCache: true
        },
        children: [
          {
            path: "about",
            name: "About",
            component: () => import("@/views/about/index.vue"),
            meta: {
              title: "关于"
            }
          },
          {
            path: "dataitem",
            name: "Dataitem",
            component: () => import("@/views/dataitem/index.vue"),
            meta: {
              title: "数据项配置",
              noCache: true
            }
          },
          {
            path: "user",
            name: "User",
            component: () => import("@/views/user/index.vue"),
            meta: {
              title: "用户管理"
            }
          },
          {
            path: "company",
            name: "Company",
            component: () => import("@/views/company/index.vue"),
            meta: {
              title: "公司管理"
            }
          },
          {
            path: "file",
            name: "File",
            component: () => import("@/views/file/index.vue"),
            meta: {
              title: "文件管理"
            }
          }
        ]
      }
    ]
  }
];

export default routes;
