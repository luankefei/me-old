import React, { Component, PropTypes } from 'react';
// import React from 'react';
import {Nav, Foot} from 'components';

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  state = {
    test: 0
  };

  render() {
    const styles = require('./Main.scss');
    const {children} = this.props;
    return (
      <div className={styles.main}>
        <Nav />
        <div>{children}</div>
        <Foot />
      </div>
    );
  }
}
