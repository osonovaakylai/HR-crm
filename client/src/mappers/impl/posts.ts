import {computed} from 'mobx'
import {PostsMapper} from '../index'
import {PostsStore} from '../../stores'
import {
  injectable,
  injectOnProperty
} from '../../common/annotations/common'

@injectable('PostsMapper')
export default class DefaultPostsMapper implements PostsMapper {
  constructor(@injectOnProperty('PostsStore') protected store: PostsStore) {

  }

  @computed
  get all() {
    return this.store.get('list')
  }

  @computed
  get list() {
    const result = this.all.result
    return result ? result.list : []
  }
}
