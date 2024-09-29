async function withNextra() {
  const nextra = (await import("nextra")).default
  return nextra({
    theme: "nextra-theme-docs",
    themeConfig: "./theme.config.tsx"
  })
}

module.exports = withNextra()
