export class FetcherError extends Error {
  messages?: string
  status: number

  constructor(data: string | Record<string, any>, status: number) {
    super(typeof data === 'string' ? data : 'Query error')
    if (typeof data === 'object') {
      this.messages = data.messages
    }
    this.status = status
  }
}
