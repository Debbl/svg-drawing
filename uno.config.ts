import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from "unocss";

import transformerAttributifyJsxBabel from "@unocss/transformer-attributify-jsx-babel";

export default defineConfig({
  shortcuts: [
    ["full", "h-full w-full"],
    ["flex-center", "flex items-center justify-center"],
    [
      "btn",
      "font-medium rounded-2 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed",
    ],
    [
      "btn-outline",
      "font-medium rounded-2 px-4 py-2 b-1 bg-white border-color-purple-600 text-purple-700 hover:text-purple-700 hover:border-color-purple-700 disabled:opacity-50 disabled:cursor-not-allowed",
    ],
    [
      "preview-btn",
      "rounded-full bg-white px4 py2 font-medium text-dark/70 hover:text-dark hover:bg-white/80 transition-all",
    ],
  ],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetAttributify(),
  ],
  transformers: [transformerAttributifyJsxBabel()],
});
