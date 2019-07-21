import {AuthService, CandidatesListService} from '../index'
import {CandidatesListStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty, instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {observable, runInAction} from 'mobx'

@injectable('CandidatesListService')
export default class DefaultCandidatesListService extends BaseService implements CandidatesListService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('CandidatesListStore') private store: CandidatesListStore) {
    super()
  }

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  async list() {
    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.CandidatesList.all, {}, {'x-access-token': jwtToken})

      const all = await response.json()
      this.store.load('list', all)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }
}
