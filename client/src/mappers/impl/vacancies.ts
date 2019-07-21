import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {VacanciesStore} from '../../stores/index'
import {VacanciesMapper} from '../index'
import VacanciesModel from '../../models/vacancies'
import {computed} from 'mobx'

@injectable('VacanciesMapper')
export default class DefaultVacanciesMapper implements VacanciesMapper {
  constructor(@injectOnProperty('VacanciesStore') protected store: VacanciesStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }

  @computed
  get vacancy() {
    const result = this.store.get('vacancy').result
    return result ? result : VacanciesModel.of({
      tarif: '',
      topic: '',
      vacancyName: '',
      city: '',
      requirement: '',
      optional: '',
      address: '',
      education: '',
      schedule: '',
      experience: '',
      condition: '',
      responsibility: '',
      other: '',
      salary: '',
      employmentType: '',
      socialMedia: [],
      status: ''
    })
  }
}
