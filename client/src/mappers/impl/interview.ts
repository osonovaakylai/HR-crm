import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {InterviewStore} from '../../stores/index'
import {InterviewMapper} from '../index'
import InterviewModel from '../../models/interview'
import {computed} from 'mobx'

@injectable('InterviewMapper')
export default class DefaultInterviewMapper implements InterviewMapper {
  constructor(@injectOnProperty('InterviewStore') protected store: InterviewStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }

  @computed
  get interview() {
    const result = this.store.get('interview').result
    return result ? result : InterviewModel.of({
      '_id': '',
      'email': '',
      'date': '',
      'vacancy': '',
      'interviewer': '',
      'interviewers': []
    })
  }
}
