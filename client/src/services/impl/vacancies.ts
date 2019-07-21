import {VacanciesService, AuthService} from '../index'
import {VacanciesStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty, instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {observable, runInAction} from 'mobx'
import VacanciesModel from "../../models/vacancies";
import {PositionRequest} from "../../models/position";

@injectable('VacanciesService')
export default class DefaultVacanciesService extends BaseService implements VacanciesService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('VacanciesStore') private store: VacanciesStore) {
    super()
  }

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  async list() {
    // const response = await this.fetcher.get(Pathes.Position.all)

    // const allDocs = await response.json()

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.Vacancy.all, {}, {'x-access-token': jwtToken})
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
    //
    // const allDocs = {
    //   'list': [
    //     {
    //       'id': 11,
    //       'name': 'name',
    //       'creationDate': 1527703200,
    //       'publicationDate': 1527703200,
    //       'status': 'active'
    //     },
    //     {
    //       'id': 111,
    //       'name': 'name',
    //       'creationDate': 1527703100,
    //       'publicationDate': 1527743200,
    //       'status': 'not active'
    //     }
    //   ]
    // }
  }

  async getById(vacId: string) {

    console.log('Get vacancy by id')

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.Vacancy.getById(vacId), {}, {'x-access-token': jwtToken})
      const pos = await response.json()
      this.store.load('vacancy', pos)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }

    // const response = await this.fetcher.get(Pathes.Positions.getById(posId))

    // const pos = await response.json()
    // const vac = {
    //   'id': 11,
    //   'tarif': 'tarif',
    //   'topic': 'topic',
    //   'name': 'name',
    //   'city': 'city',
    //   'requirement' : 'requirement',
    //   'optional': 'optional',
    //   'address': 'address',
    //   'education': 'education',
    //   'schedule': 'schedule',
    //   'experience': 'experience',
    //   'condition': 'condition',
    //   'responsibility': 'responsibility',
    //   'other' : 'other',
    //   'salary': 'salary',
    //   'employmentType': 'employmentType',
    //   'socialMedia': null,
    //   'attachedFile': null
    // }
  }

  async update(docId: string, vacancy: VacanciesModel) {

    console.log('Update position by id')

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.put(Pathes.Vacancy.update(docId), vacancy, {'x-access-token': jwtToken})
      const pos = await response.json()
      this.store.load('vacancy', pos)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  delete(id: string) {
    return this.fetcher.delete(Pathes.Vacancy.delete(id))
  }

  async createVacancy(vacancy: VacanciesModel) {
    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {
      await this.fetcher.post(Pathes.Vacancy.create, vacancy, {'x-access-token': jwtToken})

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  async createVacancyFromProposal(propId: any) {

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {
      const response = await this.fetcher.post(Pathes.Vacancy.createFromProposal, {proposalId: propId}, {'x-access-token': jwtToken})
      return await response.json()
    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }
}
