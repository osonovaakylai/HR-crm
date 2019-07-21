import * as React from 'react'
import {AuthService} from '../../services/index'
import {instanceRegistry} from '../../common/annotations/common'
import {observer} from 'mobx-react'
import {Redirect} from 'react-router'
import {CurrentUser} from "../../models/user";
import {ROLES_AND_PERMISSIONS} from "../../dicts/roles-and-permissions";
import {GoogleLogin} from 'react-google-login';

const config = require('./../../config.json');
import {
  action,
  observable,
  runInAction
} from 'mobx'
import '../../styles/login.scss'
import {type} from "os";

interface Props {
  history: any
  location: any
  match: any
}

const EMAILREGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

@observer
export class LoginScene extends React.Component<Props, {}> {

  @observable
  private userName: string = ''

  @observable
  private password: string = ''

  @observable
  private loginError: boolean

  @observable
  private passwordError: boolean

  @observable
  private emailError: boolean

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  @observable
  private currentUser?: CurrentUser

  googleResponse = (response: any) => {
    console.log(response)
    const tokenBlob = new Blob([JSON.stringify({id_token: response.tokenId}, null, 2)], {type: 'application/json'});
    const options: any = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    console.log('OPTIONS IS: ', tokenBlob);
    fetch('http://localhost:8081/api/auth/google', options).then((r: any) => {
      const token = r.headers.get('x-auth-token');
      console.log('TOKEN: ', token);
      r.json().then((user: any) => {
        console.log('++++++++++++++++' + token);
        // if (token) {
        //   this.setState({isAuthenticated: true, user, token})
        // }
      }).catch((err: any) => {
        console.log('ERR IS: ', err);
      })
    })
  };

  onFailure = (err: any) => {
    alert(err);
  }

  componentWillMount() {
    document.title = 'Sign in'
    const ele = document.getElementById('loader')
    if (ele && !ele.classList.contains('load')) {
      ele.classList.add('load')
    }
  }

  getId = () => {
    return JSON.parse(config).GOOGLE_CLIENT_ID;
  };

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
    //   const user  = this.authService.getCurrentUser()
    //   if(user.role === ROLES_AND_PERMISSIONS.HEAD_OF_DEPARTMENT) {
    //     return <Redirect to="/positions"/>
    //   } else {
    //     return <Redirect to="/"/>
    //   }
    // }
    return (
      <div className="form-wrapper" id="base-view">
        <div className="login-form" style={{paddingBottom: '55px'}}>
          <div className="form-header clearfix">
            <img src="img/logo11.png" alt=""/>
            <h2>Account Login</h2>
            {this.loginError ?
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

          {/*<div className="login-google">*/}
            {/*<p>Sign up with Google account</p>*/}
            {/*<GoogleLogin*/}
              {/*clientId={this.getId()}*/}
              {/*buttonText="Login"*/}
              {/*onSuccess={this.googleResponse}*/}
              {/*onFailure={this.googleResponse}*/}
            {/*/>*/}
          {/*</div>*/}

        </div>
        <div className="login-form-actions-style">
          <button className="button login-button login-button-second" onClick={this.login}>Cancel</button>
          {/*<div className="login-form-labels">*/}
          {/*<a className="forgot-link" style={{cursor: 'pointer'}} onClick={this.redirectToForgotPassword}>Forgot*/}
          {/*Password?</a>*/}
          {/*</div>*/}
          <button className="button login-button " onClick={this.login}>Sign in</button>
        </div>
      </div>
    )
  }

  private onUserNameChange = action((e: any) => {
    this.userName = e.target.value
    this.emailError = false
    this.loginError = false
  })

  private onPasswordChange = action((e: any) => {
    this.password = e.target.value
    this.passwordError = false
    this.loginError = false
  })

  private keyPress = (event: any) => {
    // Enter keyCode
    if (event.keyCode == 13 && this.userName.length && this.password.length) {
      this.login()
    }
  }

  private onSubmit = (e: any) => {
    this.login()
    e.preventDefault()
    return false
  }

  private login = async () => {
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

    const response = await this.authService.login(this.userName.toLowerCase(), this.password)

    if (response) {
      const user = this.authService.getCurrentUser()

      if (!this.props.location.state) {
        this.props.history.push('/')
        return
      }
      let nextPath

      if (user.role === ROLES_AND_PERMISSIONS.HEAD_OF_DEPARTMENT) {
        nextPath = this.props.location.state.nextPath ?
          this.props.location.state.nextPath : '/positions'
      } else {
        nextPath = this.props.location.state.nextPath ?
          this.props.location.state.nextPath : '/'
      }

      console.log('NEXT PATH: ' + nextPath)
      this.props.history.push({
        pathname: nextPath,
        state: {match: this.props.location.state.match}
      })

    } else {
      runInAction(() => {
        this.loginError = true
      })
    }
  }

  private redirectToForgotPassword = () => {
    this.props.history.push('/forgot-password')
  }
}
