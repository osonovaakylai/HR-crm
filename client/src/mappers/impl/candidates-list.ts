import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {CandidatesListStore} from '../../stores/index'
import {CandidatesListMapper} from '../index'
import {computed} from 'mobx'

@injectable('CandidatesListMapper')
export default class DefaultCandidatesListMapper implements CandidatesListMapper {
  constructor(@injectOnProperty('CandidatesListStore') protected store: CandidatesListStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }
}
