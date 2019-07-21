import {
  injectable,
  injectOnMethod
} from '../../common/annotations/common'
import {Fetcher} from '../index'
import {AuthService} from '../../services'

interface HeadersContainer {
  [key: string]: string
}

const errorStatusCodesForRefreshPage = [401]
const errorStatusCodesForRefreshUser = [403]

@injectable('Fetcher')
export default class DefaultFetcher implements Fetcher {

  // private authService: AuthService

  private headersRaw: HeadersContainer = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-requested-with': 'XMLHttpRequest',
    'x-access-token': 'XMLHttpRequest'
  }

  private __headers: any

  headers(customHeaders: object = {}) {
    if (!this.__headers) {
      this.__headers = this.headersRaw // new Headers(this.headersRaw)
    }
    return {...this.__headers, ...customHeaders}
  }

  // @injectOnMethod('AuthService')
  // setFetcher(authService: AuthService) {
  //   this.authService = authService
  // }

  addHeader(name: string, value: string) {
    this.headersRaw[name] = value
  }

  get(url: string, body: any = {}, customHeaders: object = {}) {

    const params = Object.keys(body)
                         .map(prop => [prop, body[prop]].join('='))
                         .join('&')

    return this.fetch(`${url}?${params}`, this.defaultRequestInit('get', customHeaders))
  }

  post(url: string, body: any = {}, customHeaders: object = {}) {

    return this.fetch(url, {
      ...this.defaultRequestInit('post', customHeaders),
      body: JSON.stringify(body)
    })
  }

  postUrlEncoded(url: string, body: any = {}, customHeaders: object = {}) {
    const params = Object.keys(body)
                         .map(prop => [prop, body[prop]].join('='))
                         .join('&')

    return this.fetch(`${url}${params ? `?${params}` : ''}`, {
      ...this.defaultRequestInit('post', {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...customHeaders
      })
    })
  }

  put(url: string, body: any = {}, customHeaders: object = {}) {
    return this.fetch(`${url}`, {
      ...this.defaultRequestInit('put', customHeaders),
      body: JSON.stringify(body)
    })
  }

  'delete'(url: string, body: any = {}, customHeaders: object = {}) {
    return this.fetch(`${url}`, {
      ...this.defaultRequestInit('delete', customHeaders),
      body: JSON.stringify(body)
    })
  }

  private defaultRequestInit(method: string, customHeaders: object = {}): RequestInit {
    return {
      method,
      headers: this.headers(customHeaders),
      credentials: 'include'
    }
  }

  private fetch(input: RequestInfo, init?: RequestInit, counter: number = 0): Promise<Response> {
    return fetch(input, init)
      .then(this.handleResponse(input, init, counter))
  }

  private handleResponse = (input: RequestInfo, init?: RequestInit, counter: number = 0) => async (res: Response) => {
    if (errorStatusCodesForRefreshPage.includes(res.status)) {
      if (res.url.includes('current-user') || res.url.includes('login')) {
        return res
      } else {
        window.location.reload()
      }
    }

    // if (errorStatusCodesForRefreshUser.includes(res.status)) {
    //   await this.authService.refreshCurrentUser()
    // }

    return res
  }
}
