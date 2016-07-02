import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class List extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  }

  render() {
    const styles = require('./List.scss');
    return <div className={styles.list}>列表页，呵呵</div>;
  }
}
