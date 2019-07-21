import {StatisticsService, AuthService} from '../index'
import {StatisticsStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty, instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {ERRORS} from '../../../dicts/back-end-errors'
import {observable, runInAction} from "mobx";

@injectable('StatisticsService')
export default class DefaultStatisticsService extends BaseService implements StatisticsService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('StatisticsStore') private store: StatisticsStore) {
    super()
  }

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  async resumeLine() {

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.HrStatistics.resumeLine, {}, {'x-access-token': jwtToken})
      if (response.ok) {
        const allDocs = await response.json()
        this.store.load('resumeLine', allDocs)
      }
    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }

    // const response = await this.fetcher.get(Pathes.HrStatistics.resumeLine)
    // const all = await response.json()
    // this.store.load('resumeLine', all)

    //     const all = {
    //       'values' : [
    //       {
    //         'key': 1527394160.401,
    //         'value': 45000
    //       },
    //       {
    //         'key': 1530072560.401,
    //         'value': 67000
    //       },
    //       {
    //         'key': 1532664560.401,
    //         'value': 70500
    //       },
    //       {
    //         'key': 1535342960.401,
    //         'value': 70000
    //       },
    //       {
    //         'key': 1538021360.401,
    //         'value': 50000
    //       },
    //       {
    //         'key': 1538476150.401,
    //         'value': 60000
    //       }
    //     ]
    // }


  }

  async languagePie() {

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.HrStatistics.languagePie, {}, {'x-access-token': jwtToken})
      if (response.ok) {
        const allDocs = await response.json()
        this.store.load('languagePie', allDocs)
      }
    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }

    // const response = await this.fetcher.get(Pathes.HrStatistics.languagePie)
    // // const all = await response.json()
    //
    // const all = {
    //   'values': [
    //     {
    //       'key': 1527394160.401,
    //       'value': 45000
    //     },
    //     {
    //       'key': 1530072560.401,
    //       'value': 67000
    //     },
    //     {
    //       'key': 1532664560.401,
    //       'value': 70500
    //     },
    //     {
    //       'key': 1535342960.401,
    //       'value': 70000
    //     },
    //     {
    //       'key': 1538021360.401,
    //       'value': 50000
    //     },
    //     {
    //       'key': 1538476150.401,
    //       'value': 60000
    //     }
    //   ]
    // }
    //
    // this.store.load('languagePie', all)

  }

  async totals() {

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.HrStatistics.totals, {}, {'x-access-token': jwtToken})
      if (response.ok) {
        const allDocs = await response.json()
        this.store.load('totals', allDocs)
      }
    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }

    // const all = {
    //   "interviews": 200,
    //   "telInterviews": 50,
    //   "hired": 210,
    //   "totalCV": 100
    //
    // }

  }
}
