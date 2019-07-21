import {CandidatesListStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {CandidatesListResults} from '../../results'

@injectable('CandidatesListStore')
export class DefaultCandidatesListStore extends BaseResultStore<CandidatesListResults> implements CandidatesListStore {

}
