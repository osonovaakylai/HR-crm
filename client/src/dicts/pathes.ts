import {configuration} from '../configs/index'

const baseApi = (rest: string) => `${configuration.remoteApi}/${rest}`

export default class Pathes {

  static Auth = class {
    static login = baseApi('auth/login')
    static logout = baseApi('auth/logout')
    static register = baseApi('auth/register')
    static currentUser = baseApi('auth/current-user')
  }

  static Positions = class {
    static all = baseApi('positions')
    static create = baseApi('positions/create-position')
    static getById = (posId: string) => baseApi(`positions/${posId}`)
    static update = (docId: string) => baseApi(`positions/${docId}`)
    static close = (docId: string) => baseApi(`positions/close/${docId}`)
  }

  static Interviews = class {
    static all = baseApi('interviews')
    static create = baseApi('interviews/create')
    static getById = (docId: string) => baseApi(`interviews/${docId}`)
    static update = (docId: string) => baseApi(`interviews/${docId}`)
    static delete = (id: string) => baseApi(`interviews/${id}`)
  }

  static Proposals = class {
    static all = baseApi('proposals')
    static getById = (posId: string) => baseApi(`positions/${posId}`)
  }

  static LevelNames = class {
    static all = baseApi('level-names')
  }

  static DepartmentNames = class {
    static all = baseApi('department-names')
  }

  static PositionNames = class {
    static all = baseApi('position-names')
  }

  static CandidatesStatus = class {
    static all = baseApi('candidates-status')
  }

  static Candidates = class {
    static all = baseApi('candidates')
    static getById = (profileId: string) => baseApi(`candidates/${profileId}`)
    static doInvite = baseApi('candidates/doInvite')
    static create = baseApi('candidates/create')
    static update = (docId: string) => baseApi(`candidates/${docId}`)
    static delete = (id: string) => baseApi(`candidates/${id}`)
  }

  static CandidatesList = class {
    static all = baseApi('candidates-list')
  }

  static RecipientList = class {
    static all = baseApi('recipient-list')
  }

  static Message = class {
    static sendMessage = baseApi('message/send')
  }

  static Vacancy = class {
    static all = baseApi('vacancies')
    static vacancyNames = baseApi('vacancies/vacancy-names')
    static template = baseApi('vacancy-template')
    static create = baseApi('vacancies/create')
    static createFromProposal = baseApi('vacancies/create-from-proposal')
    static getById = (docId: string) => baseApi(`vacancies/${docId}`)
    static update = (docId: string) => baseApi(`vacancies/${docId}`)
    static delete = (id: string) => baseApi(`vacancies/${id}`)
  }

  static Attachments = class {
    static upload = baseApi('attachment/doRegisterDocumentUpload')
    static attachmentUpload = baseApi('attachment/doAttachmentUpload')
  }

  static HrStatistics = class {
    static resumeLine = baseApi('statistics/resumeLine')
    static languagePie = baseApi('statistics/languagePie')
    static totals = baseApi('statistics/totals')
  }
}
