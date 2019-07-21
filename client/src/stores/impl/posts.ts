import {PostsStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {PostsResults} from '../../results'

@injectable('PostsStore')
export class DefaultPostsStore extends BaseResultStore<PostsResults> implements PostsStore {

}
