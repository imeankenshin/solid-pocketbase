import { defineConfig } from "unocss"

export default defineConfig({
  rules: [],
  variants: [
    (mathcher) => {
      if (!mathcher.startsWith("child:")) return mathcher
      return {
        matcher: mathcher.slice(6),
        selector: (s) => `${s} > *`,
      }
    },
  ],
})
