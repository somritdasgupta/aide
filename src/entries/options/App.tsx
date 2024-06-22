import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MemoryRouter } from "react-router-dom"
const queryClient = new QueryClient()
import { ConfigProvider, Empty, theme } from "antd"
import { StyleProvider } from "@ant-design/cssinjs"
import { useDarkMode } from "~/hooks/useDarkmode"
import { OptionRouting } from "~/routes"
import { PageAssistProvider } from "@/components/Common/PageAssistProvider"

function IndexOption() {
  const { mode } = useDarkMode()
  return (
    <MemoryRouter>
      <ConfigProvider
        theme={{
          algorithm:
            mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
                  }}
        renderEmpty={() => (
          <Empty
            imageStyle={{
              height: 60
            }}
          />
        )}>
        <StyleProvider hashPriority="high">
          <QueryClientProvider client={queryClient}>
            <PageAssistProvider>
              <OptionRouting />
            </PageAssistProvider>
          </QueryClientProvider>
        </StyleProvider>
      </ConfigProvider>
    </MemoryRouter>
  )
}

export default IndexOption
