import {PositionStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {PositionResults} from '../../results'

@injectable('ProposalStore')
export class DefaultProposalStore extends BaseResultStore<PositionResults> implements PositionStore {

}
