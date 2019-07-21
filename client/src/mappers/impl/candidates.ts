import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {CandidatesStore} from '../../stores/index'
import {CandidatesMapper} from '../index'
import {computed} from 'mobx'
import CandidatesModel from '../../models/candidates'

@injectable('CandidatesMapper')
export default class DefaultCandidatesMapper implements CandidatesMapper {
  constructor(@injectOnProperty('CandidatesStore') protected store: CandidatesStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }

  @computed
  get profile() {
    const result = this.store.get('profile').result
    return result ? result : CandidatesModel.of({
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      skype: '',
      department: null,
      experience: '',
      level: null,
      status: null,
      comment: [],
      attachedCV: null
    })
  }
}
