export const combineURLs = (baseURL: string, path: string): string => {
  return path
    ? baseURL.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '')
    : baseURL
}
