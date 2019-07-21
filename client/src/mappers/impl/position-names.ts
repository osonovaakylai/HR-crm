import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {PositionNamesStore} from '../../stores/index'
import {PositionNamesMapper} from '../index'
import {computed} from 'mobx'

@injectable('PositionNamesMapper')
export default class DefaultPositionNamesMapper implements PositionNamesMapper {
  constructor(@injectOnProperty('PositionNamesStore') protected store: PositionNamesStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }
}
