import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerAttributifyJsx,
} from "unocss";

export default defineConfig({
  shortcuts: [["full", "w-full h-full"]],
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerAttributifyJsx()],
});
