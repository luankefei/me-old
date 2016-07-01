import React from 'react';
import {Link} from 'react-router';

export default function Nav() {
  const styles = require('./Nav.scss');
  const ACTIVE = {
    color: '#fff',
    backgroundColor: '#575c68',
    borderLeftColor: '#ffd300'
  };
  return (
    <nav className={styles.nav}>
      <div>
        <Link to='list' activeStyle={ACTIVE}>首页</Link>
        <Link to='about' activeStyle={ACTIVE}>关于</Link>
      </div>
    </nav>
  );
}
