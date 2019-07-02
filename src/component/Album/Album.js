import React, {Component} from 'react'

class Album extends Component {
  componentDidMount () {
    console.log(this.props.match.params.id)
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default Album