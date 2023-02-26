export class FetcherError extends Error {
  messages?: string[]
  status: number

  constructor(data: string | Record<string, string[]>, status: number) {
    super(typeof data === 'string' ? data : 'Query error')

    if (typeof data === 'object') {
      this.messages = data.message ?? data.messages
    }

    this.status = status
  }
}
