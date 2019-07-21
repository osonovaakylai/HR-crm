import {CandidateInviteStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty,
  instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {CandidateInvite} from '../../models/interview'
import {
  CandidateInviteService
} from '../index'

@injectable('CandidateInviteService')
export default class DefaultCandidateInviteService extends BaseService implements CandidateInviteService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('CandidateInviteStore') private store: CandidateInviteStore) {
    super()
  }

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  async doInvite(CandidateInvite: CandidateInvite.CandidateInterviewInvite) {
    return await this.fetcher.post(Pathes.Candidates.doInvite, CandidateInvite)
  }
}
