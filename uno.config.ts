import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
  shortcuts: [["full", "w-full h-full"]],
  presets: [presetUno(), presetIcons()],
});
