import {RecipientListStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {RecipientListResults} from '../../results'

@injectable('RecipientListStore')
export class DefaultRecipientListStore extends BaseResultStore<RecipientListResults> implements RecipientListStore {

}
