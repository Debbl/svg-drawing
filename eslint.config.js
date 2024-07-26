import { defineConfig } from "@debbl/eslint-config";
import unocss from "@unocss/eslint-config/flat";

export default defineConfig({
  typescript: true,
  react: true,
  customConfig: [
    unocss,
    {
      rules: {
        "react/no-unknown-property": "off",
      },
    },
  ],
});
