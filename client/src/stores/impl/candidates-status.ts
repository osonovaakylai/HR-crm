import {CandidatesStatusStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {CandidatesStatusResults} from '../../results'

@injectable('CandidatesStatusStore')
export class DefaultCandidatesStatusStore extends BaseResultStore<CandidatesStatusResults> implements CandidatesStatusStore {

}
