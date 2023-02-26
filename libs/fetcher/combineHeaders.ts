export const combineHeaders = (...sources: HeadersInit[]): Headers => {
  const result: Record<string, string> = {}

  for (const source of sources) {
    const headers = new Headers(source)

    for (const [key, value] of headers.entries()) {
      if (value === undefined || value === null) {
        delete result[key]
      } else {
        result[key] = value
      }
    }
  }

  return new Headers(result)
}
