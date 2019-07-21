import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {RecipientListStore} from '../../stores/index'
import {RecipientListMapper} from '../index'
import {computed} from 'mobx'

@injectable('RecipientListMapper')
export default class DefaultRecipientListMapper implements RecipientListMapper {
  constructor(@injectOnProperty('RecipientListStore') protected store: RecipientListStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }
}
