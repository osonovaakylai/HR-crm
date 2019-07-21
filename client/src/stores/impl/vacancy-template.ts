import {VacancyTemplateStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {VacancyTemplateResults} from '../../results'

@injectable('VacancyTemplateStore')
export class DefaultVacancyTemplateStore extends BaseResultStore<VacancyTemplateResults> implements VacancyTemplateStore {

}
