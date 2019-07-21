import {observable} from 'mobx'

namespace StatisticsModel {

  export class KeyValue {

    @observable
    key: any

    @observable
    value: any

  }

  export class ResumeLineList {

    @observable
    values: KeyValue[]

  }

  export class LanguagePieList {

    @observable
    values: KeyValue[]

  }

  export class Totals {

    @observable
    interviews: number

    @observable
    telInterviews: number

    @observable
    hired: number

    @observable
    totalCV: number

  }
}

export default StatisticsModel