import { config } from "@debbl/eslint-config";
import unocss from "@unocss/eslint-config/flat";

export default config({
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
