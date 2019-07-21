import * as React from 'react'
import {observer} from 'mobx-react'
import Truncate from 'react-truncate'
import {
  action,
  observable
} from 'mobx'

interface Props {
  longText: string
  lines: number
  isShowMore: boolean
}

@observer
export default class Index extends React.Component<Props, {}> {

  @observable
  private lines: number = this.props.lines

  @observable
  private more: string = 'More'

  @observable
  private less: string = 'Less'

  @observable
  private expanded: boolean = false

  @observable
  private truncated: boolean = false

  @observable
  private isShowMore: boolean = this.props.isShowMore

  constructor(props: any) {
    super(props)

    this.toggleLines = this.toggleLines.bind(this)
  }

  render() {
    return (
      <div className={`truncate-content ${this.expanded? 'nowrap': ''}`}>
        <Truncate
          lines={!this.expanded && this.lines}
          ellipsis={(
            <span>...
              {this.isShowMore &&
              <span className='more' onClick={(event: any) => this.toggleLines(event)}>{this.more}</span>}
            </span>
          )}
          onTruncate={() => this.handleTruncate}
        >
          {this.props.longText}

        </Truncate>
        {this.isShowMore && !this.truncated && this.expanded && (
          <span className='less less-button clearfix' onClick={this.toggleLines}>{this.less}</span>)
        }
      </div>
    )
  }

  @action
  handleTruncate(truncated: boolean) {
    if (this.truncated !== truncated) {
      this.truncated = truncated
    }
  }

  @action
  toggleLines(event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.expanded = !this.expanded
  }
}