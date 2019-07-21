import {
  action,
  observable
} from 'mobx'
import {Maybe} from '../../common/types'
import ResultSet from './props'
import ResultSetWriter from './methods'

export default class BaseResultSet<T, K> implements ResultSet<T, K>, ResultSetWriter<T, K> {

  @observable
  loading: boolean = true

  @observable
  result: Maybe<T>

  @observable
  error: Maybe<K>

  @action
  loadResult(result: T) {
    this.loading = false
    this.result = result
    return this
  }

  @action
  clearResult() {
    this.loading = true
    this.result = null
    return this
  }

  @action
  clearError() {
    this.error = null
    return this
  }

  @action
  setError(error: K) {
    this.loading = false
    this.error = error
    return this
  }
}