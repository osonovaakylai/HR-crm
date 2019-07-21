import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'
import {DepartmentNamesStore} from '../../stores/index'
import {DepartmentNamesMapper} from '../index'
import {computed} from 'mobx'

@injectable('DepartmentNamesMapper')
export default class DefaultDepartmentNamesMapper implements DepartmentNamesMapper {
  constructor(@injectOnProperty('DepartmentNamesStore') protected store: DepartmentNamesStore) {

  }

  @computed
  get list() {
    const result = this.store.get('list').result
    return result ? result.list : []
  }
}
