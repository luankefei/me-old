import React, {PropTypes} from 'react';
// import React from 'react';
import {Nav, Foot} from 'components';

export default function Main(props) {
  const styles = require('./Main.scss');
  return (
    <div className={styles.main}>
      <Nav />
      <div>{props.children}</div>
      <Foot />
    </div>
  );
}


// <div ref='view' className={styles.container}>{this.props.children}</div>

Main.propTypes = {
  children: PropTypes.object.isRequired
};
