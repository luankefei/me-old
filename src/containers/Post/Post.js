import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Post extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  }

  render() {
    const styles = require('./Post.scss');
    return (
      <div className={styles.post}>
        <div ref='editor'>
          <textarea name='ckeditor' id='' cols='30' rows='10'></textarea>
        </div>
        <div ref='form'>
          <dl className={styles.clearfix}>
            <dt>文章类型</dt>
            <dd>
              <div ref='type' className={styles.select} data-id='3'>
                <span className={styles['select-value']}></span>
                <i></i>
                <div className={styles['select-wrapper']}>
                  <div className={styles['select-list']}>
                    <ul>
                      <li>评测</li>
                      <li>推荐</li>
                      <li>新闻</li>
                    </ul>
                  </div>
                </div>
              </div>
            </dd>
          </dl>

          <dl className={styles.clearfix}>
            <dt>作者</dt>
            <dd>
            <div ref='author' className={styles.select} data-id='1'>
              <span className={styles['select-value']}>sunken</span>
              <i></i>
              <div className={styles['select-wrapper']}>
                <div className={styles['select-list']}>
                  <ul>
                    <li>sunken</li>
                  </ul>
                </div>
              </div>
            </div>
            <label className={styles.timer}>定时发送</label>
            <input className={styles.textbox} type='text' placeholder='2014.11.11 11:11:11' />
            </dd>
          </dl>
          <dl className={styles.clearfix}>
            <dt>标题</dt>
            <dd>
            <input ref='title' className='textbox' type='text' placeholder='测试的占位标题' />
            </dd>
          </dl>
          <dl className={styles.clearfix}>
            <dt>推荐内容</dt>
            <dd>
            <textarea ref='tweet-content' cols='30' rows='10'>textarea内容应该用value属性获取</textarea>
            </dd>
          </dl>
          <dl className={styles.clearfix}>
            <dt></dt>
            <dd>
            <div ref='upload'>
              <input className={styles.textbox} type='text' value='图片上传的占位' />
            </div>
            </dd>
          </dl>
          <dl className={styles.clearfix}>
            <dt></dt>
            <dd>
            <button ref='submit' className={styles.button}>发送</button>
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}
