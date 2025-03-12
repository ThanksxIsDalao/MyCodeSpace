import fs from "fs";
import path from "path";

const docsRoot = path.resolve(__dirname, "../../docs"); // docs 目录

function getSidebar(dir = docsRoot, basePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries
    .filter((entry) => {
      return (
        entry.name !== "README.md" &&
        entry.name !== "index.md" &&
        !entry.name.startsWith(".") // 忽略隐藏文件
      );
    })
    .map((entry) => {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        return {
          text: entry.name,
          collapsible: true,
          collapsed: true,
          items: getSidebar(fullPath, relativePath), // 递归处理子目录
        };
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        return {
          text: entry.name.replace(".md", ""),
          link: `/${relativePath.replace(".md", "")}`,
        };
      }
    })
    .filter(Boolean); // 过滤掉 undefined
}

export function generateSidebar() {
  return [
    {
      text: "文档",
      collapsible: true,
      collapsed: true,
      items: getSidebar(),
    },
  ];
}
