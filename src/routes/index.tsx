import { Suspense } from "react"
import { useTranslation } from "react-i18next"
import { useDarkMode } from "~/hooks/useDarkmode"
import { OptionRoutingChrome, SidepanelRoutingChrome } from "./chrome"
import { PageAssistLoader } from "@/components/Common/PageAssistLoader"

export const OptionRouting = () => {
  const { mode } = useDarkMode()
  const { i18n } = useTranslation()

  return (
    <div
      className={`${mode === "dark" ? "dark" : "light"} ${
        i18n.language === "ru" ? "onest" : "inter"
      }`}
    >
      <Suspense fallback={<PageAssistLoader />}>
        <OptionRoutingChrome />
      </Suspense>
    </div>
  )
}

export const SidepanelRouting = () => {
  const { mode } = useDarkMode()
  const { i18n } = useTranslation()

  return (
    <div
      className={`${mode === "dark" ? "dark" : "light"} ${
        i18n.language === "ru" ? "onest" : "inter"
      }`}
    >
      <Suspense fallback={<PageAssistLoader />}>
        <SidepanelRoutingChrome />
      </Suspense>
    </div>
  )
}