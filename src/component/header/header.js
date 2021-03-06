import React from 'react'

import {Link,withRouter} from 'react-router-dom'
import {adminAuth} from "hoc/auth/auth"
import {map} from "smox"
import Cookies from 'js-cookie'
import {removeStorage} from "common/js/localstorage"

import './header.css'

@map({
  state: ['redirectTo'],
  mutations: ['logout']
})
@withRouter
@adminAuth
class Header extends React.Component {
  onLogout(){
    this.props.logout()
    Cookies.remove('uname',{
      path:'/',
      domain:'clicli.us'
    })
    Cookies.remove('uqq',{
      path:'/',
      domain:'clicli.us'
    })
    removeStorage('user-info')
    this.props.history.push('/login')
  }

  render() {
    return (
      <header>
        <ul>
          <Link to='/'>
            <li>控制台</li>
          </Link>
          {this.props.state.role !== 'user' ?
            <Link to='/write-article'>
              <li>撰写</li>
            </Link> : null}
          {this.props.state.role === 'admin' || this.props.state.role === 'editor' ?
            <li>管理
              <ul>
                <Link to='/posts/wait'>
                  <li>审核番剧</li>
                </Link>
                <Link to='/posts/public'>
                  <li>管理番剧</li>
                </Link>
                <Link to='/users/user'>
                  <li>管理用户</li>
                </Link>
              </ul>
            </li>
            : null}
          {this.props.state.role === 'admin' ? <Link to='/options'>
            <li>设置</li>
          </Link> : null}
          <li onClick={this.onLogout.bind(this)} className="logout">
            退出
          </li>
          <a href="https://www.clicli.us" target="_blank">
            <li className="logout">
              网站首页
            </li>
          </a>
        </ul>
      </header>
    )
  }

}

export default Header