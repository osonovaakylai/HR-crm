import {AuthService, PositionNamesService} from '../index'
import {PositionNamesStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty, instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {observable, runInAction} from "mobx";

@injectable('PositionNamesService')
export default class DefaultPositionNamesService extends BaseService implements PositionNamesService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('PositionNamesStore') private store: PositionNamesStore) {
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

      const response = await this.fetcher.get(Pathes.PositionNames.all, {}, {'x-access-token': jwtToken})

      const all = await response.json()
      this.store.load('list', all)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }

    // const response = await this.fetcher.get(Pathes.PositionNames.all)
    //
    // const all = await response.json()
    // const all = {
    //   'list': [
    //     {
    //       'name': 'Java'
    //     },
    //     {
    //       'name': 'Python'
    //     },
    //     {
    //       'name': 'Javascript'
    //     },
    //     {
    //       'name': 'C#'
    //     }
    //   ]
    // }
  }
}
