import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { cloudflare } from "@cloudflare/vite-plugin";
import { execFileSync } from "node:child_process";

function getBuildCommit() {
  const environmentCommit = process.env.CF_PAGES_COMMIT_SHA ?? process.env.GITHUB_SHA;
  if (environmentCommit) return environmentCommit;

  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [cloudflare({ viteEnvironment: { name: "ssr" } })],
    define: {
      __APP_COMMIT__: JSON.stringify(getBuildCommit()),
      __APP_BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  },
});
