import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import * as navActions from 'redux/modules/nav';
import * as transferActions from 'redux/modules/transfer';

import dict from 'constants/dict';
import global from 'utils/global';
import {sessionStorage} from 'utils/storage';
import log from 'utils/log';
import emitter from 'utils/emitter';

@connect(
  state => ({
    user: state.auth.status,
    currentStatus: state.auth.currentStatus,
    waitNum: state.nav.waitNum,
    chatNum: state.nav.chatNum,
    rankList: state.nav.rankList,
    serviceList: state.nav.serviceList
  }),
  {...authActions, ...navActions, loadGenius: transferActions.load})
export default class Nav extends Component {
  static propTypes = {
    // auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    updateServiceType: PropTypes.func.isRequired,
    updateAccessType: PropTypes.func.isRequired,
    getRank: PropTypes.func.isRequired,
    loadGenius: PropTypes.func.isRequired,
    getServiceType: PropTypes.func.isRequired,
    getCurrentStatus: PropTypes.func.isRequired,
    status: PropTypes.bool,
    waitNum: PropTypes.string,
    chatNum: PropTypes.number,
    rankList: PropTypes.array,
    serviceList: PropTypes.array,
    currentStatus: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      menuDisplay: 'none',
      soundState: true,
      notificationState: true,
      serviceTypeIsShown: false
    };
    this.lastClick = Date.now();
    this.heartbeat = null;
    this.serviceType = {};
    this.accessType = -1;
    this.currentServiceType = -1;
    this.auth = {};

    this._selectServiceType = typeId => this.selectServiceType.bind(this, typeId);
    this._toggleMenu = state => this.toggleMenu.bind(this, state);
    this._logout = this.logout.bind(this);
    this._forceUpdate = this.forceUpdate.bind(this);
    this._toggleServiceType = this.toggleServiceType.bind(this);
    this._changeServiceType = this.changeServiceType.bind(this);
    this._changeAccessType = this.changeAccessType.bind(this);
    this._toggleSoundState = this.toggleSoundState.bind(this);
    this._toggleNotiState = this.toggleNotiState.bind(this);
  }

  // 获取助理接入排行
  componentWillMount() {
    this.props.getRank();
  }

  // 初始化接入状态
  componentDidMount() {
    this.refs.accessType.value = this.accessType;
    this.serviceType = {'-1': '不限', ...sessionStorage.get('serviceType')};
    this.auth = sessionStorage.get('auth');

    // 初始化接入状态
    this.checkCurrentStatus();

    // 监听助理的所有动作，并记录时间戳
    document.addEventListener('click', () => {
      this.lastClick = Date.now();
    }, false);

    this.heartbeat = setInterval(() => {
      this.checkServeState();
      this.isAlive();
      this.checkCurrentStatus();

    }, 300000); // 5m

    window.onerror = err => {
      log.send({
        log_key: 'genius_err',
        genius_id: sessionStorage.get('auth').genius_id,
        e: err
      });
    };

    emitter.on('closeServicePanel', () => {
      if (this.state.serviceTypeIsShown) {
        this.setState({
          serviceTypeIsShown: false
        });
      }
    });

    emitter.on('navRefresh', () => {
      this.forceUpdate();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.serviceList && nextProps.serviceList) {
      const data = nextProps.serviceList;
      const items = this.refs.serviceType.querySelectorAll('input[type="checkbox"]');

      /* eslint no-param-reassign: 0 */
      if (data.length) {
        Array.prototype.forEach.call(items, item => {
          if (data.indexOf(item.value) !== -1) {
            item.checked = true;

          } else {
            item.checked = false;
          }
        });
      } else {

        // 移除其他选项，选中 -1
        Array.prototype.forEach.call(items, item => {
          if (item.value === '-1') {
            item.checked = true;

          } else {
            item.checked = false;
          }
        });
      }
    }

    // 检查接入状态变化，强制更新
    if (this.props.currentStatus !== nextProps.currentStatus) {
      this.refs.accessType.value = nextProps.currentStatus;
      this.accessType = nextProps.currentStatus;
    }
  }

  checkCurrentStatus() {
    this.props.getCurrentStatus();
  }

  // 定时任务，每5分钟查询待接入和助理开派单的情况
  checkServeState() {
    const limit = Object.keys(dict.accessType).pop();
    const waitingNumLimit = 10;
    const serviceType = this.refs.serviceType.value;

    // 待接入人数不足或已经开启了派单
    if (this.props.waitNum < waitingNumLimit || serviceType === limit) {
      return;
    }

    this.props.loadGenius()
      .then(res => {
        if (res.error) {
          return;
        }

        const data = res.data;
        const stateLimit = 5;
        let stateCount = 0;

        data.forEach(genius => {
          if (genius.accept_limit === limit) {
            ++stateCount;
          }
        });

        if (stateCount <= stateLimit && this.props.waitNum >= waitingNumLimit) {
          const message = `目前待接入用户较多，请各助理开启派单模式。当前已开启派单助理：${stateCount}`;

          global.App.showNotifications({
            title: '派单状态预警',
            message,
            level: 'error'
          });
        }
      });
  }

  // 判断助理是否离开，5分钟不在就不发了
  isAlive() {
    if (new Date() - this.lastClick > 300000) {
      return;
    }

    // 打点: 记录助理是否离开
    if (window) {
      log.send({
        log_key: 'genius_keyboard',
        access_type: this.refs.accessType.value,
        access_status: this.currentServiceType,
        genius_id: sessionStorage.get('auth').genius_id,
        user_nums: this.props.chatNum ? this.props.chatNum : 0
      });
    }
  }

  // 更改服务类别
  changeServiceType() {
    let value = '';
    const items = this.refs.serviceType.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(items, item => {
      if (item.checked) {
        value = `${value}${item.value},`;
      }
    });

    if (value === '') {
      value = '-1';
    }

    // 去掉最后的逗号
    if (value[value.length - 1] === ',') {
      value = value.substring(0, value.length - 1);
    }

    this.currentServiceType = value;
    // this.serviceType = value;
    this.props.updateServiceType(value);
    this.toggleServiceType();
  }

  changeAccessType(event) {
    const type = event.target.value;
    this.refs.accessType.value = type;
    this.accessType = type;
    this.props.updateAccessType(type)
      .then(res => {
        if (res.error) {
          return;
        }

        // 变更接入状态打点
        log.send({
          log_key: 'access_state',
          genius_id: sessionStorage.get('auth').genius_id,
          limit: type
        });

        this.forceUpdate();
      })
      .catch(err => {
        console.error(err);
      });
  }

  // 切换提示音开关
  toggleSoundState() {
    global.soundState = !global.soundState;
    this.setState({ soundState: global.soundState });
  }

  // 切换通知开关
  toggleNotiState() {
    global.notificationState = !global.notificationState;
    this.setState({ notificationState: global.notificationState });
  }

  logout() {
    log.send({
      log_key: 'genius_logout',
      genius_id: sessionStorage.get('auth').genius_id
    });
    clearInterval(this.heartbeat);
    if (confirm('退出登录会关闭所有会话，确定退出登录吗？')) {
      this.props.logout();
    }
  }

  selectServiceType(typeId) {
    const items = this.refs.serviceType.querySelectorAll('input[type="checkbox"]');

    // 点了不限，清空其他选项
    if (parseInt(typeId, 10) === -1) {
      Array.prototype.forEach.call(items, item => {
        if (parseInt(item.value, 10) !== -1 && item.checked) {
          item.checked = false;
        }
      });

    // 点了其他选项，检查不限是否存在
    } else {
      if (items[0].checked) {
        items[0].checked = false;
      }
    }
  }

  toggleServiceType(event) {
    // 被打开，向服务器请求数据，重置选中状态
    if (!this.state.serviceTypeIsShown) {
      this.props.getServiceType();
    }

    this.setState({
      serviceTypeIsShown: !this.state.serviceTypeIsShown
    });

    if (event) {
      event.stopPropagation();
    }
  }

  // TODO: 鼠标悬浮时，state变化非常频繁
  toggleMenu(state) {
    this.setState({
      menuDisplay: state ? 'block' : 'none'
    });
  }

  forceUpdate() {
    this.setState({
      number: Math.random()
    });
  }

  render() {
    const styles = require('./Nav.scss');
    const geniusDefualt = require('./head_default_genius.png');
    const {waitNum, chatNum, rankList, getRank} = this.props;
    const {menuDisplay, soundState, notificationState, serviceTypeIsShown} = this.state;
    const ACTIVE = {
      color: '#fff',
      backgroundColor: '#575c68',
      borderLeftColor: '#ffd300'
    };
    const renderOptions = optionDic => {
      const keys = Object.keys(optionDic).map(key => parseInt(key, 10)).sort();
      return keys.map(key => <option key={key} value={key}>{optionDic[key]}</option>);
    };
    const renderRankList = () => (
      rankList && rankList.map(genius => (
        <li
          key={genius.genius_id}
          className={parseInt(genius.genius_id, 10) === this.auth.genius_id ? styles.highlight : ''}
        >
          <span className={styles.name}>{genius.real_name.split(' - ')[0]}</span>
          <span className={styles.count}>{genius.served_count}</span>
        </li>
      ))
    );
    const renderServiceTypeList = () => Object
      .keys(this.serviceType)
      .sort()
      .map(key => (
        <li key={key}>
          <label>
            <input
              type='checkbox'
              value={key}
              onClick={this._selectServiceType(key)}
            />
            <span>{this.serviceType[key]}</span>
          </label>
        </li>)
      );
    return (
      <div className={styles.nav}>
        <div
          className={styles['account-info']}
          onMouseOver={this._toggleMenu(true)}
          onMouseOut={this._toggleMenu(false)}
        >
          <img src={this.auth.avatar_url || geniusDefualt} alt="头像" />
          <span>{this.auth.real_name}</span>
          <div className={styles['account-menu']} style={{display: menuDisplay}}>
            <ul>
              <li onClick={getRank}>刷新排行</li>
              <li onClick={this._logout}>登出</li>
            </ul>
          </div>
          <div className={styles['rank-list']} style={{display: menuDisplay}}>
            <h3>接入排名</h3>
            <ul>{renderRankList()}</ul>
          </div>
        </div>
        <nav onClick={this._forceUpdate}>
          <Link to='chat' activeStyle={ACTIVE} className={styles.relative}>
            <span>当前</span>
            <span
              className={styles.chat}
              style={{ display: chatNum > 0 ? 'block' : 'none' }}
            >
              {chatNum || ''}
            </span>
          </Link>
          <Link to='wait' activeStyle={ACTIVE} className={styles.relative}>
            <span>待接入</span>
            <span
              className={styles.wait}
              style={{ display: waitNum > 0 ? 'block' : 'none' }}
            >
              {waitNum || ''}
            </span>
          </Link>
          <Link to='recent' activeStyle={ACTIVE}>历史</Link>
          <Link to='search' activeStyle={ACTIVE}>搜索</Link>
          <Link to='like' activeStyle={ACTIVE}>点赞</Link>

          {/* <Link to='/notice' activeStyle={ACTIVE}>通知</Link> */}
          {/* <Link to='/user' activeStyle={ACTIVE}>我的</Link> */}
        </nav>
        <div className={styles.bottom}>
          <div className={styles['service-type']}>
            <span>接入类别</span>
            <button onClick={this._toggleServiceType}>品类</button>
            <div
              className={styles.list}
              ref='serviceType'
              style={{ display: serviceTypeIsShown ? 'block' : 'none' }}
              onClick={event => event.stopPropagation()}
            >
              <ul>{renderServiceTypeList.call(this)}</ul>
              <button onClick={this._changeServiceType}>确定</button>
            </div>
          </div>
          <div>
            <span>接入状态</span>
            <select
              ref='accessType'
              onChange={this._changeAccessType}
              value={this.accessType}
            >
              {renderOptions(dict.accessType)}
            </select>
          </div>
          <button
            className={`${styles.sound} fa ${soundState ? 'fa-volume-up' : 'fa-volume-off'}`}
            onClick={this._toggleSoundState}
            title='声音'
          >
          </button>
          <button
            className={`${styles.noti} fa ${notificationState ? 'fa-bell-o' : 'fa-bell-slash-o'}`}
            onClick={this._toggleNotiState}
            title='通知'
          >
          </button>
        </div>
      </div>
    );
  }
}
