import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {LevelNamesStore} from '../../stores/index'
import {LevelNamesMapper} from '../index'
import {computed} from 'mobx'

@injectable('LevelNamesMapper')
export default class DefaultLevelNamesMapper implements LevelNamesMapper {
  constructor(@injectOnProperty('LevelNamesStore') protected store: LevelNamesStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }
}
