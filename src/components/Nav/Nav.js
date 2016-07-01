import React from 'react';
import {Link} from 'react-router';

export default function Nav() {
  const styles = require('./Nav.scss');
  const ACTIVE = {
    color: '#fff',
    backgroundColor: 'rgb(237, 68, 65)'
  };
  return (
    <nav className={styles.nav}>
      <div>
        <Link to='/' activeStyle={ACTIVE}>首页</Link>
        <Link to='about' activeStyle={ACTIVE}>关于</Link>
      </div>
    </nav>
  );
}
