import React, {Component} from 'react'
import './Leftbar.less'
import logo from '../../asset/daydream.png'
import menu from './menu'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import EventBus from '../../events'

class Leftbar extends Component {
  state = {
    showMenu: false
  }
  componentDidMount () {
    EventBus.on('toggleMenu', () => {
      this.toggleMenu()
    })
  }
  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }
  render () {
    return (
      <CSSTransition in={this.state.showMenu} timeout={300} unmountOnExit classNames="pc-leftbar">
        <div className='pc-leftbar'>
          <div className='pc-leftbar-logo'>
            <Link to="/" onClick={ this.toggleMenu }>
              <img src={logo} alt="logo"/>
              <span>PLAY COLOR</span> 
            </Link>
          </div>
          {
            menu.map((category,index) => {
              const item = category.list.map(item => 
                <Link to={item.link}  key={item.name} onClick={ this.toggleMenu }>
                  <div className='pc-leftbar-category-item'>
                    <i className={`iconfont ${item.icon}`} />
                    <span>{item.name}</span>
                  </div>
                </Link> )
              return (
                <div className='pc-leftbar-category' key={index}>
                  {/* {category.name && <div className='pc-leftbar-category-label'>{ category.name }</div>}  */}
                  { item }
                </div>
              )
            })
          }
        </div>
        </CSSTransition>
    )
  }
}

export default Leftbar
