import {SendMessageStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty,
  instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import SendMessageModel from '../../models/send-message'
import {
  AuthService,
  SendMessageService
} from '../index'
import {observable, runInAction} from "mobx";

@injectable('SendMessageService')
export default class DefaultSendMessageService extends BaseService implements SendMessageService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('SendMessageStore') private store: SendMessageStore) {
    super()
  }

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  async sendMessage(message: SendMessageModel) {

    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      return await this.fetcher.post(Pathes.Message.sendMessage, message, {'x-access-token': jwtToken})

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }

}
