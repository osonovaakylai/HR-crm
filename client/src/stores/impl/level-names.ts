import {LevelNamesStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {LevelNamesResults} from '../../results'

@injectable('LevelNamesStore')
export class DefaultLevelNamesStore extends BaseResultStore<LevelNamesResults> implements LevelNamesStore {

}
