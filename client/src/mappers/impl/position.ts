import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {PositionStore} from '../../stores/index'
import {PositionMapper} from '../index'
import PositionRequestModel from '../../models/position'
import {computed} from 'mobx'

@injectable('PositionMapper')
export default class DefaultPositionMapper implements PositionMapper {
  constructor(@injectOnProperty('PositionStore') protected store: PositionStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }

  @computed
  get position() {
    const result = this.store.get('position').result
    return result ? result : PositionRequestModel.of({
      'department': '',
      'amount': 0,
      'position': '',
      'requirements': [],
      'skills': [],
      'level': '',
      'general': '',
      'date': 0,
      'status': ''
    })
  }
}
