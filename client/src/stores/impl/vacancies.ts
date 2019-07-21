import {VacanciesStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {VacanciesResults} from '../../results'

@injectable('VacanciesStore')
export class DefaultVacanciesStore extends BaseResultStore<VacanciesResults> implements VacanciesStore {

}
