import {SendMessageStore} from '../index'
import {injectable} from '../../common/annotations/common'
import BaseResultStore from '../base/impl/result'
import {
  SendMessageResults
} from '../../results'

@injectable('SendMessageStore')
export class DefaultSendMessageStore extends BaseResultStore<SendMessageResults> implements SendMessageStore {

}
