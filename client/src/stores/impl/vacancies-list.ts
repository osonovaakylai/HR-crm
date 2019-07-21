import {VacanciesListStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {VacanciesListResults} from '../../results'

@injectable('VacanciesListStore')
export class DefaultVacanciesListStore extends BaseResultStore<VacanciesListResults> implements VacanciesListStore {

}
