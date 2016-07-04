import React from 'react';
import {Link} from 'react-router';

export default function Article() {
  const styles = require('./Article.scss');
  const headImage = require('./head.png');
  const screenshotImage = require('./test.png');
  return (
    <section className={styles.article}>
      <div className={styles.top}>
        <img src={headImage} alt='' className={styles.head} />
        <Link className={styles.title} to='/detail/1'>远去的大学青春，碎碎念，其他</Link>
        <span className={styles.author}>sunken</span>
        <span className={styles.date}>2013.11.23</span>
      </div>
      <article>
        <img className={styles['content-image']} src={screenshotImage} alt='' />
        <p>本来逐渐远离了wow，可是突然在某天早上听说某人放出了结婚照，终于看到了这厮的样貌，于是诡异的笑，于是怀念。</p>
        <p>小城里岁月流过去 清澈的勇气 洗涤过的回忆 我记得你骄傲的活下去 ——周杰伦《霍元甲》</p>
        <p>其实想起那个人，每次都会有如MV一样响起背景音乐,《霍元甲》……于是回到wowmovies，搜索到那个熟悉的名字，难以忍受的慢的把那份回忆下载回来。经常会很懒，尤其是以前那个有无数G视频的硬盘报废以后，就总是以“只要曾经拥有”和“相见不如怀念”来掩藏自己的懒惰……</p>
      </article>
      <Link className={styles['read-more']} to='/detail/1'>继续阅读 &gt;</Link>
    </section>
  );
}
