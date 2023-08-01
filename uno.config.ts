import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from "unocss";

// import transformerAttributifyJsx from "@unocss/transformer-attributify-jsx";
import transformerAttributifyJsx from "@unocss/transformer-attributify-jsx-babel";

export default defineConfig({
  shortcuts: [["full", "h-full w-full"]],
  presets: [presetUno(), presetIcons(), presetAttributify()],
  transformers: [transformerAttributifyJsx()],
});
