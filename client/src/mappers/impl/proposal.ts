import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {ProposalStore} from '../../stores/index'
import {ProposalMapper} from '../index'
import ProposalModel from '../../models/proposal'
import {computed} from 'mobx'

@injectable('ProposalMapper')
export default class DefaultProposalMapper implements ProposalMapper {
  constructor(@injectOnProperty('ProposalStore') protected store: ProposalStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }
}
