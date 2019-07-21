import {
  SendMessageMapper
} from '../index'
import {
  SendMessageStore
} from '../../stores'
import {injectable, injectOnProperty} from '../../common/annotations/common'

@injectable('SendMessageMapper')
export default class DefaultSendMessageMapper implements SendMessageMapper {
  constructor(@injectOnProperty('SendMessageStore') protected store: SendMessageStore) {

  }
}
