import * as React from 'react'
import {AuthService} from '../../services/index'
import {instanceRegistry} from '../../common/annotations/common'
import {observer} from 'mobx-react'
import {Redirect} from 'react-router'
import {
  action,
  observable,
  runInAction
} from 'mobx'
import '../../styles/login.scss'

interface Props {
  history: any
  location: any
  match: any
}

const EMAILREGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

export class RegisterScene extends React.Component<Props, {}> {

  @observable
  private userName: string = ''

  @observable
  private password: string = ''

  @observable
  private registerError: boolean

  @observable
  private emailError: boolean

  @observable
  private passwordError: boolean

  private authService: AuthService = instanceRegistry.get('AuthService')

  componentWillMount() {
    document.title = 'Sign up'
    const ele = document.getElementById('loader')
    if (ele && !ele.classList.contains('load')) {
      ele.classList.add('load')
    }
  }

  async componentDidMount() {
    this.showWithAnimation()
    this.removeLoader()

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

    // if (this.authService.isLogged()) {
    //   return <Redirect to="/"/>
    // }
    return (
      <div className="form-wrapper" id="base-view">
        <div className="login-form">
          <div className="form-header clearfix">
            <img src="img/logo11.png" alt=""/>
            <h2>Sign up</h2>
            {this.registerError ?
              <p className="text-color-red">The email or password you’ve entered doesn’t match any account.</p> : null}
          </div>
          <form onSubmit={this.onSubmit} action="login#" className="clearfix">
            <div className="form-group clearfix">
              <label className="text-color">Email<span className="text-color-red">*</span></label>
              <input className={this.emailError ? 'has-error' : ''} type="text" id="email"
                     onChange={this.onUserNameChange}
                     onKeyDown={this.keyPress}/>
              {this.emailError ?
                <p style={{color: '#FF3850'}}>Please enter a valid email</p> : null}
            </div>
            <div className="form-group">
              <label>Password<span className="text-color-red">*</span></label>
              <input className={this.passwordError ? 'has-error' : ''} type="password" id="password"
                     onChange={this.onPasswordChange}
                     onKeyDown={this.keyPress}/>
              {this.passwordError ?
                <p className="text-color-red">Password can't be empty</p> : null}
            </div>
          </form>
          <div className="login-form-actions">
            <button className="button login-button" onClick={this.register}>Sign up</button>
          </div>
          <hr className="clearfix"/>
          <div className="login-google">
            <p>Or Sign up with Google account</p>
          </div>

        </div>
      </div>
    )
  }

  private onUserNameChange = action((e: any) => {
    this.userName = e.target.value
    this.emailError = false
    this.registerError = false
  })

  private onPasswordChange = action((e: any) => {
    this.password = e.target.value
    this.passwordError = false
    this.registerError = false
  })


  private keyPress = (event: any) => {
    // Enter keyCode
    if(event.keyCode == 13 && this.userName.length && this.password.length){
      this.register()
    }
  }

  private onSubmit = (e: any) => {
    this.register()
    e.preventDefault()
    return false
  }

  private register = async () => {
    if (!new RegExp(EMAILREGEX).test(this.userName)) {
      runInAction(() => {
        this.emailError = true
      })
    }

    if (!this.password.trim().length) {
      runInAction(() => {
        this.passwordError = true
      })
    }

    if (this.emailError || this.passwordError) {
      return
    }

    const response = await this.authService.register(this.userName.toLowerCase(), this.password)

    if (response) {
      this.props.history.push('/login')
    } else {
      runInAction(() => {
        this.registerError = true
      })
    }
  }
}
