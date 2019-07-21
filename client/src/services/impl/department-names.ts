import {AuthService, DepartmentNamesService} from '../index'
import {DepartmentNamesStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty, instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {observable, runInAction} from "mobx";

@injectable('DepartmentNamesService')
export default class DefaultDepartmentNamesService extends BaseService implements DepartmentNamesService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('DepartmentNamesStore') private store: DepartmentNamesStore) {
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

      const response = await this.fetcher.get(Pathes.DepartmentNames.all, {}, {'x-access-token': jwtToken})

      const all = await response.json()
      this.store.load('list', all)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }



    // const all = {
    //   'list': [
    //     {
    //       'name': 'Project Management'
    //     },
    //     {
    //       'name': 'Administration'
    //     },
    //     {
    //       'name': 'Dev Ops'
    //     },
    //     {
    //       'name': 'QA'
    //     },
    //     {
    //       'name': 'Development'
    //     }
    //   ]
    // }


  }
}
