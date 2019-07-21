import {CandidatesStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {CandidatesResults} from '../../results'

@injectable('CandidatesStore')
export class DefaultCandidatesStore extends BaseResultStore<CandidatesResults> implements CandidatesStore {

}
