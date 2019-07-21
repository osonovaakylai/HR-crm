import {AuthService, ProposalService} from '../index'
import {ProposalStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty, instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {observable, runInAction} from 'mobx'

@injectable('ProposalService')
export default class DefaultProposalService extends BaseService implements ProposalService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('ProposalStore') private store: ProposalStore) {
    super()
  }

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  async list(queryParams: any) {

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {
      const response = await this.fetcher.get(Pathes.Proposals.all, this.getRequestParams(queryParams), {'x-access-token': jwtToken})
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


    // const allDocs = {
    //   'list': [
    //     {
    //       'id': 11,
    //       'creator': 'Nikita Nogay',
    //       'position': 'Java developer',
    //       'date': 123,
    //       'amount': 3
    //     },
    //     {
    //       'id': 12,
    //       'creator': 'Nikita Nogay 2',
    //       'position': 'Python developer',
    //       'date': 123885,
    //       'amount': 1
    //     }
    //   ]
    // }


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
