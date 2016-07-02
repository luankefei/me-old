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
    const styles = require('./Home.scss');
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <header className={styles.header}>
          <div className={styles.top}>
            <img className={styles.logo} src={logoImage} alt='www.sunken.me' />
            <div className={styles.slogan}>想法、层次、评论、戏剧性、流言</div>
          </div>
          <div className={styles['load-bar']}></div>
        </header>
        <div className={styles.main}>
          <div className={styles.list}>
            <h2>最新文章</h2>
            <div ref='contents' className={styles.contents}></div>
            <div ref='pager'>
              <a className={styles.prev} href='#'>{'< 前页'}</a>
              <a className={styles.next} href='#'>后页 ></a>
            </div>
          </div>
          <aside>
            <h2>搜索</h2>
            <div className={styles.search}>
              <input type='text' ref='searchInput' placeholder='标题、作者' />
              <button ref='searchSubmit' title='搜索'></button>
            </div>
            <h2>留言</h2>
            <div className={styles.comment}>
              <ul>
                <li>这个东东不赖</li>
                <li>我再发个评论，应该能立马刷出来了，哈哈</li>
                <li>评论一下啊</li>
                <li>这个功能是用来玩的</li>
              </ul>
            </div>
            <h2>标签</h2>
            <div className={styles.tags}>
              <a href='#'>前端</a>
              <a href='#'>产品</a>
              <a href='#'>设计</a>
              <a href='#'>苹果</a>
              <a href='#'>测试标签</a>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}
