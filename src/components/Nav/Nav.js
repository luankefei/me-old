import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default function Nav() {
  const styles = require('./Nav.scss');
  const ACTIVE = {
    color: '#fff',
    backgroundColor: '#575c68',
    borderLeftColor: '#ffd300'
  };
  const logoImage = require('./logo.png');
  return (
    <header className={styles.nav}>
      <div className={styles.top}>
        <img className={styles.logo} src={logoImage} alt='www.sunken.me' />
        <div className={styles.slogan}>想法、层次、评论、戏剧性、流言</div>
      </div>
      <nav>
        <div className={styles.container}>
          <Link to='list' activeStyle={ACTIVE}>首页</Link>
          <Link to='about' activeStyle={ACTIVE}>关于</Link>
        </div>
      </nav>
      <div className={styles['load-bar']}></div>
    </header>
  );
}

// TODO: test
Nav.propTypes = {
  user: PropTypes.object
};
