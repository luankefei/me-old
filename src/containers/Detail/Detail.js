import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
// import {Article} from 'components';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Detail extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  }

  render() {
    const styles = require('./Detail.scss');
    const screenshotImage = require('../../components/Article/test.png');
    return (
      <div className={styles.detail}>
        <section ref='content' className={styles.content}>
          <h1>远去的大学青春，碎碎念，其他</h1>
          <span className={styles.author}>sunken</span>
          <span className={styles.date}>2016.11.11</span>
          <article>
            <img className={styles['content-image']} src={screenshotImage} alt='' />
            <p>本来逐渐远离了wow，可是突然在某天早上听说某人放出了结婚照，终于看到了这厮的样貌，于是诡异的笑，于是怀念。</p>
            <p>小城里岁月流过去 清澈的勇气 洗涤过的回忆 我记得你骄傲的活下去 ——周杰伦《霍元甲》</p>
            <p>
              其实想起那个人，每次都会有如MV一样响起背景音乐,《霍元甲》……于是回到wowmovies，搜索到那个熟悉的名字，
              难以忍受的慢的把那份回忆下载回来。经常会很懒，尤其是以前那个有无数G视频的硬盘报废以后，就总是以“只要曾经拥有”和“相见不如怀念”来掩藏自己的懒惰……
            </p>
          </article>
          {/* <Article /> */}
        </section>
        <div className={styles.comment}>
          <h2>评论</h2>
          <dl className={styles.clearfix}>
            <dt>昵称</dt>
            <dd><input type='text' placeholder='昵称' /></dd>
          </dl>
          <dl className={styles.clearfix}>
            <dt>内容</dt>
            <dd>
              <textarea name='' id='comment' cols='30' rows='10' placeholder='有事没事，都留个言呗' resize='no'></textarea>
            </dd>
          </dl>
          <dl className={styles.clearfix}>
            <dt>&nbsp;</dt>
            <dd>
              <button className={styles.button} data-style='green'>提交</button>
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}
