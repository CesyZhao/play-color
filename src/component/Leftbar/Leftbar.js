import React, {Component} from 'react'
import './Leftbar.less'
import logo from '../../asset/daydream.png'
import menu from './menu'
import { Link } from 'react-router-dom'

class Leftbar extends Component {

  render () {
    return (
      <div className='pc-leftbar'>
        <div className='pc-leftbar-logo'>
          {/* <Link to="/">
            <img src={logo} alt="logo"/>
            <span>PLAY COLOR</span> 
          </Link> */}
        </div>
        {
          menu.map((category,index) => {
            const item = category.list.map(item => 
              <Link to={item.link}  key={item.name}>
                <div className='pc-leftbar-category-item'>
                  <i className={`iconfont ${item.icon}`} /> {item.name} 
                </div>
              </Link> )
            return (
              <div className='pc-leftbar-category' key={index}>
                {category.name && <div className='pc-leftbar-category-label'>{ category.name }</div>} 
                { item }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Leftbar
