import React, { Component } from 'react'
import './WindowOperator.less'

const operators = [
  {
    name: 'close',
    color: 'red',
    icon: 'icon-close'
  },
  {
    name: 'mini',
    color: 'orange',
    icon: 'icon-Minimize'
  },
  {
    name: 'max',
    color: 'green',
    disabeld: 'true'
  }
]
class WindowOperator extends Component {
  render() {
    return(
     <ul className="pc-window-operators">
       {
         operators.map(operator => {
           return (
             <li key={operator.name} className={`${operator.name} pc-window-operator ${operator.disabeld ? 'disabled' : ''}`} style={{backgroundColor: operator.color}}>
               <i className={`iconfont ${operator.icon}`}></i>
             </li>
           )
         })
       }
     </ul>
    )
  }
}

export default WindowOperator