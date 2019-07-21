import {PositionService, AuthService} from '../index'
import {PositionStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty, instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {PositionRequest} from '../../models/position'
import {observable, runInAction} from 'mobx'

@injectable('PositionService')
export default class DefaultPositionService extends BaseService implements PositionService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('PositionStore') private store: PositionStore) {
    super()
  }

  // const response = await this.fetcher.get(Pathes.Position.all)

  // const allDocs = await response.json()

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  async list(queryParams: any) {

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.Positions.all, this.getRequestParams(queryParams), {'x-access-token': jwtToken})
      if (response.ok) {
        const allDocs = await response.json()
        this.store.load('list', allDocs)
      }
    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  async createPosition(positionRequest: PositionRequest.CreatePosition) {
    console.log('registerPosition')
    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {
      await this.fetcher.post(Pathes.Positions.create, positionRequest, {'x-access-token': jwtToken})

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  async update(docId: string, positionRequest: PositionRequest.CreatePosition) {

    console.log('Update position by id')

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.put(Pathes.Positions.update(docId), positionRequest, {'x-access-token': jwtToken})
      const pos = await response.json()
      this.store.load('position', pos)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  async close(docId: string) {


    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.post(Pathes.Positions.close(docId), {}, {'x-access-token': jwtToken})

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  async getById(posId: string) {
    console.log('Get position by id')

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.Positions.getById(posId), {}, {'x-access-token': jwtToken})
      const pos = await response.json()
      this.store.load('position', pos)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  getRequestParams(queryParams: any) {
    let requestParams = {}

    Object.keys(queryParams)
          .forEach((key: string) => {

            const value = queryParams[key]
            const isAMomentObject = value ? value._isAMomentObject : false

            if (isAMomentObject) {
              // @ts-ignore
              requestParams[key] = value.unix()
            }

            const isObject = ((typeof(queryParams[key]) === 'object') && queryParams[key] !== null)

            if (isObject) {
              if (queryParams[key]['value'] !== null && queryParams[key]['value'] !== undefined && queryParams[key]['value'] !== '' && queryParams[key]['value'] !== 'ALL') {
                // @ts-ignore
                requestParams[key] = queryParams[key]['value']
              }
            } else {
              if (queryParams[key] !== null && queryParams[key] !== undefined && queryParams[key] !== '') {
                // @ts-ignore
                requestParams[key] = queryParams[key]
              }
            }
          })
    return requestParams
  }
}
