import {CandidateInviteStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {
  CandidateInviteResults
} from '../../results'

@injectable('CandidateInviteStore')
export class DefaultCandidateInviteStore extends BaseResultStore<CandidateInviteResults> implements CandidateInviteStore {

}
