import {PositionNamesStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {PositionNamesResults} from '../../results'

@injectable('PositionNamesStore')
export class DefaultPositionNamesStore extends BaseResultStore<PositionNamesResults> implements PositionNamesStore {

}
