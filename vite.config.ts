import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { content, validateContent } from "./src/domain/content";
export default defineConfig({
  plugins: [
    react(),
    {
      name: "content-gate",
      buildStart() {
        const errors = validateContent(content, (path) =>
          existsSync(resolve("public", path.replace(/^\//, ""))),
        );
        if (errors.length) throw Error(errors.join("\n"));
      },
    },
  ],
  base: "./",
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    restoreMocks: true,
  },
});
