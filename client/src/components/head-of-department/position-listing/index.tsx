import * as React from 'react'
import {observer} from 'mobx-react'
import {instanceRegistry} from '../../../common/annotations/common'
import {
  PositionMapper,
  PostsMapper
} from '../../../mappers'

import {
  PositionService,
  PostsService
} from '../../../services'

import {
  action,
  observable,
  runInAction
} from 'mobx'
import PositionRequestModel from '../../../models/position'
import DateFormatter from '../../date-format'
import Select from 'react-select'

interface Props {
  history: any
}

const OPTIONS = [
  {
    value: 'active',
    label: 'Active'
  },
  {
    value: 'reviewed',
    label: 'Reviewed'
  },
  {
    value: 'closed',
    label: 'Closed'
  },
  {
    value: 'all',
    label: 'All statuses'
  }
]

@observer
export default class PositionsListingView extends React.Component<Props, {}> {

  private positionService: PositionService = instanceRegistry.get('PositionService')
  private positionMapper: PositionMapper = instanceRegistry.get('PositionMapper')
  private postsService: PostsService = instanceRegistry.get('PostsService')
  private postsMapper: PostsMapper = instanceRegistry.get('PostsMapper')

  @observable
  private docs: any

  @observable
  private hasDocs: boolean = false

  @observable
  private queryParams: {
    status: {
      label: string,
      value: string
    }
  } = {
    status: {
      label: 'All statuses',
      value: 'all'
    }
  }

  @observable
  private positions: any

  componentWillMount() {
    document.title = 'Positions'
    const ele = document.getElementById('loader')
    if (ele && !ele.classList.contains('load')) {
      ele.classList.add('load')
    }
  }

  async componentDidMount() {
    await this.initLoad()
    this.showWithAnimation()
    this.removeLoader()
  }

  async initLoad() {
    const defaultQueryParams = {
      status: {
        label: 'All Statuses',
        value: 'all'
      }
    }
    await this.positionService.list(defaultQueryParams)
    await this.postsService.list()
    runInAction(() => this.docs = this.positionMapper.list)
    if (this.docs && this.docs.length) {
      runInAction(() => this.hasDocs = true)
    } else {
      runInAction(() => this.hasDocs = false)
    }
  }

  showWithAnimation = () => {
    const base = document.getElementById('base-view')
    if (base) {
      base.classList.add('animated-view')
    }
  }

  removeLoader = () => {
    const ele = document.getElementById('loader')
    if (ele && ele.classList.contains('load')) {
      ele.classList.remove('load')
    }
  }

  render() {
    return (
      <div id="base-view">
        <section className="listing-title">
          <p className="size36 semibold">Positions</p>
          <p className="size36 semibold mob">Positions</p>
        </section>
        <section className="listing-dropdown">
          {/*area for dropdown*/}
        </section>
        <section className='select-section'>
          <Select
            className='select-doc-query'
            name=""
            placeholder="Select status"
            value={this.queryParams.status}
            searchable={true}
            clearable={false}
            onChange={this.onFieldChanged('status')}
            options={OPTIONS}
          />
        </section>

        {this.hasDocs ?
          <section className="listing-content ga">
            <ul className="listing">
              <li className="head">
                <p className="size14 bold">Name</p>
                <p className="size14 bold">Creation date </p>
                <p className="size14 bold">Amount</p>
                <p className="size14 bold">Status</p>
              </li>
            </ul>
            <ul className="listing">
              {this.docs.map((pos: PositionRequestModel) =>
                <li className="user" key={pos._id} onClick={() => this.redirectToPosPage(pos)}>
                  <p className="size14 medium">{pos.position.name}</p>
                  <p className="size14 medium">{<DateFormatter date={pos.date}/>}</p>
                  <p className="size14 medium">{pos.amount}</p>
                  <p className={`size15 status bold yellow`}>{pos.status}</p>
                </li>
              )}
            </ul>
          </section>
          :
          <p className='no-data'>There is no positions yet.</p>
        }
      </div>
    )
  }

  @action
  private onFieldChanged = (fieldName: string) => action((value: any) => {
    // @ts-ignore
    this.queryParams[fieldName] = value

    this.refreshList()
  })

  refreshList = async () => {
    await this.positionService.list(this.queryParams)
    runInAction(() => {
      this.docs = this.positionMapper.list
    })
  }

  redirectToPosPage(pos: PositionRequestModel) {
    this.props.history.push(`/positions/${pos._id}`)
  }
}
