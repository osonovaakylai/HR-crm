import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {CandidatesStatusStore} from '../../stores/index'
import {CandidatesStatusMapper} from '../index'
import {computed} from 'mobx'

@injectable('CandidatesStatusMapper')
export default class DefaultCandidatesStatusMapper implements CandidatesStatusMapper {
  constructor(@injectOnProperty('CandidatesStatusStore') protected store: CandidatesStatusStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }
}
