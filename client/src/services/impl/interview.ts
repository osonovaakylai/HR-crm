import {AuthService, InterviewService} from '../index'
import {InterviewStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty, instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {observable, runInAction} from 'mobx'
import CandidatesModel from "../../models/candidates";
import InterviewModel, {InterviewRequest} from "../../models/interview";

@injectable('InterviewService')
export default class DefaultInterviewService extends BaseService implements InterviewService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('InterviewStore') private store: InterviewStore) {
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

      const response = await this.fetcher.get(Pathes.Interviews.all, {}, {'x-access-token': jwtToken})
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
    //       'fullname': {
    //         "id": "id",
    //         "name": "AKylai"
    //       },
    //       'date': 1535774400000,
    //       'vacancy': {
    //         "id": "id",
    //         "name": "PM"
    //       },
    //       'interviewer': 'sdfsdf',
    //       'interviewers': ['sss', 'dfdfsdfsd']
    //     },
    //     {
    //       'id': 111,
    //       'fullname': {
    //         "id": "id",
    //         "name": "Osonova"
    //       },
    //       'date': 1535774400000,
    //       'vacancy': {
    //         "id": "id",
    //         "name": "PM"
    //       },
    //       'interviewer': 'sdfsdf',
    //       'interviewers': ['first interviwer', 'second interviewer', 'first interviwer', 'second interviewer', 'first interviwer', 'second interviewer', 'first interviwer', 'second interviewer']
    //     }
    //   ]
    // }

  }

  async update(docId: string, interview: InterviewRequest.InterviewRequestModel) {

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.put(Pathes.Interviews.update(docId), interview, {'x-access-token': jwtToken})
      const pos = await response.json()
      this.store.load('interview', pos)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  async createInterview(interview: InterviewRequest.InterviewRequestModel) {
    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {
      await this.fetcher.post(Pathes.Interviews.create, interview, {'x-access-token': jwtToken})

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

  delete(id: string) {
    return this.fetcher.delete(Pathes.Interviews.delete(id))
  }

  async getById(interviewId: string) {

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.Interviews.getById(interviewId), {}, {'x-access-token': jwtToken})
      const pos = await response.json()
      this.store.load('interview', pos)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
    // const response = await this.fetcher.get(Pathes.Positions.getById(posId))

    // const pos = await response.json()
    // const interview = {
    //   'id': 11,
    //   'fullname': {
    //     "id": "id",
    //     "name": "AYKA"
    //   },
    //   'datetime': 1535774400000,
    //   'vacancy': {
    //     "id": "id",
    //     "name": "PM"
    //   },
    //   'interviewer': 'sdfsdf',
    //   'interviewers': ['first interviwer', 'second interviewer']
    // }
    //
    // this.store.load('interview', interview)
  }
}
