import {AuthService, CandidatesService} from '../index'
import {CandidatesStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty, instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import CandidatesModel from "../../models/candidates";
import {observable, runInAction} from "mobx";


@injectable('CandidatesService')
export default class DefaultCandidatesService extends BaseService implements CandidatesService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('CandidatesStore') private store: CandidatesStore) {
    super()
  }

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')


  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  async list(queryParams?: any) {

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.Candidates.all, this.getRequestParams(queryParams), {'x-access-token': jwtToken})
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

  async getById(profileId: string) {

    console.log('Get candidate by id')

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.Candidates.getById(profileId), {}, {'x-access-token': jwtToken})
      const pos = await response.json()
      this.store.load('profile', pos)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
    // const response = await this.fetcher.get(Pathes.Candidates.getById(profileId))

    // const doc = {
    //   'id': 112,
    //   'firstname': 'Akylai',
    //   'lastname': 'Java developer',
    //   'email': 'something@gmail.com',
    //   'phoneNumber': 'some ',
    //   'skype': 'active',
    //   'department': {
    //     "id": "id",
    //     "name": "PM"
    //   },
    //   'experience': 'something',
    //   'level': {
    //     "id": "id",
    //     "name": "Junior"
    //   },
    //   'status': {
    //     "id": "id",
    //     "name": "interviewed"
    //   },
    //   'comment': [],
    //   'attachedCV': null
    // }

    // this.store.load('profile', doc)
  }


  async update(docId: string, profile: CandidatesModel) {

    console.log('Update position by id')

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.put(Pathes.Candidates.update(docId), profile, {'x-access-token': jwtToken})
      const pos = await response.json()
      this.store.load('profile', pos)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  async createProfile(profile: CandidatesModel) {
    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {
      await this.fetcher.post(Pathes.Candidates.create, profile, {'x-access-token': jwtToken})

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  delete(id: string) {
    return this.fetcher.delete(Pathes.Candidates.delete(id))
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
