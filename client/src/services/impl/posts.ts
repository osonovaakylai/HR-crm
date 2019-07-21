import {PostsService} from '../index'
import {PostsStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {observable} from 'mobx'

@injectable('PostsService')
export default class DefaultPostsService extends BaseService implements PostsService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('PostsStore') private store: PostsStore) {
    super()
  }

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  async list() {
    // const response = await this.fetcher.get(Pathes.Posts.all)

    // const allDocs = await response.json()

    this.store.load('list', [])
  }
}
