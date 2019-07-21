import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {StatisticsStore} from '../../stores/index'
import {StatisticsMapper} from '../index'
import {computed} from 'mobx'
import StatisticsModel from '../../models/statistics'


@injectable('StatisticsMapper')
export default class DefaultStatisticsMapper implements StatisticsMapper {
  constructor(@injectOnProperty('StatisticsStore') protected store: StatisticsStore) {

  }

  @computed
  get resumeLine() {
    const result = this.store.get('resumeLine').result
    return result ? result.values : []
  }

  @computed
  get languagePie() {
    const result = this.store.get('languagePie').result
    return result ? result.values : []
  }

  @computed
  get totals() {
    const result = this.store.get('totals').result
    return result ? result : {
      interviews: 0,
      telInterviews: 0,
      hired: 0,
      totalCV: 0
    } as StatisticsModel.Totals
  }
}
