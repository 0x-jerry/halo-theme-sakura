import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { presetBrand } from "@0x-jerry/unocss-preset-brand";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      autoInstall: true,
    }),
    presetAttributify(),
    presetBrand({
      brand: {
        primary: 'orange',
        gray: 'zinc'
      }
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
