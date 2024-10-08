import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";
import topLevelAwait from "vite-plugin-top-level-await";

const chromeMV3Permissions = [
  "storage",
  "sidePanel",
  "activeTab",
  "scripting",
  "declarativeNetRequest",
  "action",
  "unlimitedStorage",
  "contextMenus",
  "tts",
  "notifications",
];

const firefoxMV2Permissions = [
  "storage",
  "activeTab",
  "scripting",
  "unlimitedStorage",
  "contextMenus",
  "webRequest",
  "webRequestBlocking",
  "notifications",
  "http://*/*",
  "https://*/*",
  "file://*/*",
];

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [
      react(),
      topLevelAwait({
        promiseExportName: "__tla",
        promiseImportName: (i) => `__tla_${i}`,
      }),
    ],
    build: {
      rollupOptions: {
        external: ["langchain", "@langchain/community"],
      },
    },
  }),
  entrypointsDir: "entries",
  srcDir: "src",
  outDir: "build",

  manifest: {
    version: "1.1.15",
    name:
      process.env.TARGET === "firefox"
        ? "aiDe"
        : "__MSG_extName__",
    description: "__MSG_extDescription__",
    default_locale: "en",
    action: {},
    author: "somritdasgupta",
    browser_specific_settings:
      process.env.TARGET === "firefox"
        ? {
            gecko: {
              id: "",
            },
          }
        : undefined,
    host_permissions:
      process.env.TARGET !== "firefox"
        ? ["http://*/*", "https://*/*", "file://*/*"]
        : undefined,
    commands: {
      _execute_action: {
        description: "Open aiDe",
        suggested_key: {
          default: "Ctrl+Shift+L",
        },
      },
      execute_side_panel: {
        description: "aiDe SideKick",
        suggested_key: {
          default: "Ctrl+Shift+P",
        },
      },
    },
    permissions:
      process.env.TARGET === "firefox"
        ? firefoxMV2Permissions
        : chromeMV3Permissions,
  },
});
