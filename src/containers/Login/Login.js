import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
// import api from 'constants/api';

// import global from 'utils/global';
// import log from 'utils/log';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   console.log('status:', api.status);

  //   const username = this.refs.username.value;
  //   const password = this.refs.password.value;

  //   if (!username || !password) {
  //     return false;
  //   }

  //   this.props.login(username, password)
  //     .then(res => {
  //       if (!res.error) {
  //         log.send({
  //           log_key: 'genius_login',
  //           genius_id: res.data.genius.genius_id
  //         });
  //         global.fortune = res.data.fortune_cookie;

  //       } else {
  //         global.App.showNotifications({
  //           title: '登录失败',
  //           message: res.error.detail,
  //           level: 'error'
  //         });
  //       }
  //     });
  // }

  render() {
    const styles = require('./Login.scss');
    // const logoSrc = require('../components/Nav/logo.png');
    return (
      <div className={styles.login}>
        <div className={styles.slogan}>Hello, my old friend.</div>
        <input ref='username' type='text' placeholder='用户名' value='sunken' />
        <input ref='password' type='password' placeholder='密码' value='123456' />
      </div>
    );
  }
}
