import {InterviewStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {InterviewResults} from '../../results'

@injectable('InterviewStore')
export class DefaultInterviewStore extends BaseResultStore<InterviewResults> implements InterviewStore {

}
