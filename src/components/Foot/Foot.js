import React from 'react';
import {Link} from 'react-router';

export default function Foot() {
  const styles = require('./Foot.scss');
  return (
    <footer className={styles.foot}>
      <span>design by sunken, all rights reserved</span>
      <Link to='about'>关于我</Link>
      <Link to='#'>作品展示</Link>
    </footer>
  );
}
