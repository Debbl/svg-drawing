/// <reference types="vite/client" />
import type { AttributifyAttributes } from "@unocss/preset-attributify";

// add unocss attributity attributes to react
declare module "react" {
  interface HTMLAttributes<T> extends AttributifyAttributes {
    full?: string | boolean;
    btn?: string | boolean;
  }
}
