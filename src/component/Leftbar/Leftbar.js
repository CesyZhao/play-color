import React, {Component} from 'react'
import './Leftbar.less'
import logo from '../../asset/daydream.png'
import menu from './menu'

class Leftbar extends Component {

  render () {
    return (
      <div className='pc-leftbar'>
        <div className='pc-leftbar-logo'>
          <img src={logo} alt="logo"/>
          <span>PLAY COLOR</span> 
        </div>
        {
          menu.map((category,index) => {
            const item = category.list.map(item => <div className='pc-leftbar-category-item' key={item.name}> <i className={`iconfont ${item.icon}`} /> {item.name} </div> )
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