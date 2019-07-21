import * as React from 'react'

export default class Loader extends React.Component<{}, {}> {

  render() {
    return <div className="component-loader">
      <img src='/img/loader.svg'/>
    </div>
  }
}