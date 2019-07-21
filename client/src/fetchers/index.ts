export interface Fetcher {

  headers(): any

  addHeader(name: string, value: string): void

  get(url: string, body?: any, customHeaders?: object): Promise<Response>

  post(url: string, body?: any, customHeaders?: object): Promise<Response>

  postUrlEncoded(url: string, body?: any, customHeaders?: object): Promise<Response>

  put(url: string, body?: any, customHeaders?: object): Promise<Response>

  'delete'(url: string, body?: any, customHeaders?: object): Promise<Response>
}
