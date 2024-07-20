import { getWebSearchPrompt } from "~/services/ollama"
import { webGoogleSearch } from "./search-engines/google"
import { getIsVisitSpecificWebsite, getSearchProvider } from "@/services/search"
import { getWebsiteFromQuery, processSingleWebsite } from "./website"

const getHostName = (url: string) => {
  try {
    const hostname = new URL(url).hostname
    return hostname
  } catch (e) {
    return ""
  }
}

const searchWeb = (provider: string, query: string) => {
  switch (provider) {
    default:
      return webGoogleSearch(query)
  }
}

export const getSystemPromptForWeb = async (query: string) => {
  try {

    const websiteVisit = getWebsiteFromQuery(query)
    let search: {
      url: any;
      content: string;
    }[] = []

    const isVisitSpecificWebsite = await getIsVisitSpecificWebsite()

    if (isVisitSpecificWebsite && websiteVisit.hasUrl) {

      const url = websiteVisit.url
      const queryWithoutUrl = websiteVisit.queryWithouUrls
      search = await processSingleWebsite(url, queryWithoutUrl)

    } else {
      const searchProvider = await getSearchProvider()
      search = await searchWeb(searchProvider, query)
    }



    const search_results = search
      .map(
        (result, idx) =>
          `<result source="${result.url}" id="${idx}">${result.content}</result>`
      )
      .join("\n")

    const current_date_time = new Date().toLocaleString()

    const system = await getWebSearchPrompt()

    const prompt = system
      .replace("{current_date_time}", current_date_time)
      .replace("{search_results}", search_results)

    return {
      prompt,
      source: search.map((result) => {
        return {
          url: result.url,
          name: getHostName(result.url),
          type: "url"
        }
      })
    }
  } catch (e) {
    console.error(e)
    return {
      prompt: "",
      source: []
    }
  }
}
