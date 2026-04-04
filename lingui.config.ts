import type { LinguiConfig } from "@lingui/conf"
import { formatter } from "@lingui/format-po"

const config: LinguiConfig = {
  locales: ["en", "fr", "fi"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["app", "components", "hooks", "lib", "data"],
    },
  ],
  format: formatter({ lineNumbers: false }),
  compileNamespace: "ts",
}

export default config
