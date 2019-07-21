import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {StatisticsResults} from '../../results'
import {StatisticsStore} from '../index'

@injectable('StatisticsStore')
export class DefaultStatisticsStore extends BaseResultStore<StatisticsResults> implements StatisticsStore {

}
