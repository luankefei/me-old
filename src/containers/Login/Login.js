import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  }

  constructor(props) {
    super(props);

    // 登录
    this._login = () => this.login.call(this);
  }

  login() {
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    if (username && password) {
      this.props.login(username, password);
        // .then(res => console.log('do Login response', res));
    }
  }

  render() {
    const styles = require('./Login.scss');
    return (
      <div className={styles.login}>
        <div className={styles.main}>
          <div className={styles.slogan}>Hello, my old friend.</div>
          <form onSubmit={this._login}>
            <input ref='username' type='text' placeholder='用户名' defaultValue='youdontknowmeyoudontknowmeyoudontknowmeyoudontknowmeyoudontknowme' />
            <input ref='password' type='password' placeholder='密码' defaultValue='123456123456123456123456123456123456123456123456123456123456123456' />
            <button type='button' onClick={this._login}>登录</button>
            {/* <button type='submit' style={{ opacity: 0 }}>登录</button> */}
          </form>
        </div>
      </div>
    );
  }
}
