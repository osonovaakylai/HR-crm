import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {VacanciesListStore} from '../../stores/index'
import {VacanciesListMapper} from '../index'
import {computed} from 'mobx'

@injectable('VacanciesListMapper')
export default class DefaultVacanciesListMapper implements VacanciesListMapper {
  constructor(@injectOnProperty('VacanciesListStore') protected store: VacanciesListStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }
}
