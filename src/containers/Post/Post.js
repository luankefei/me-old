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

  constructor(props) {
    super(props);

    this.editorLoaded = false;
  }

  componentDidMount() {
    if (!this.editorLoaded) {
      this.initEditor();
    }
  }

  initEditor() {
    const script = document.createElement('script');
    script.src = '/ckeditor/ckeditor.js';
    script.onload = () => {
      window.CKEDITOR.replace(this.refs.editor, {
        height: 500
      });
    };
    document.body.appendChild(script);
    console.log(script);
  }

  render() {
    const styles = require('./Post.scss');
    return (
      <div className={styles.post}>
        <div className={styles.editor}>
          <textarea ref='editor' name='ckeditor' id='' cols='30' rows='10'></textarea>
        </div>
        <div ref='form' className={styles.form}>
          <dl className={styles.clearfix}>
            <dt>文章类型</dt>
            <dd>
              <input type='text' />
            </dd>
          </dl>

          <dl className={styles.clearfix}>
            <dt>作者</dt>
            <dd>
              <input type='text' placeholder='sunken' />
            </dd>
          </dl>
          <dl>
            <dt>定时发送</dt>
            <dd>
              <input className={styles.textbox} type='text' placeholder='2014.11.11 11:11:11' />
            </dd>
          </dl>
          <dl className={styles.clearfix}>
            <dt>标题</dt>
            <dd>
            <input ref='title' className={styles.textbox} type='text' placeholder='测试的占位标题' />
            </dd>
          </dl>
          <dl className={styles.clearfix}>
            <dt>推荐内容</dt>
            <dd>
              <textarea
                ref='tweet-content'
                className={styles['tweet-content']}
                cols='30'
                rows='10'
                placeholder='textarea内容应该用value属性获取'
              >
              </textarea>
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
            <dt>&nbsp;</dt>
            <dd>
              <button ref='submit' className={styles.button}>发送</button>
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}
