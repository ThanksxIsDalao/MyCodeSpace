import { defineConfig } from "vitepress";
import { generateSidebar } from "./utils/autoSideBar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Code Space",
  description: "A VitePress Site",
  base:'/mycodespace/',
  srcDir: "docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: generateSidebar(),

    socialLinks: [
      { icon: "github", link: "https://github.com/ThanksxIsDalao" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present Thanks",
    },
  },
});
