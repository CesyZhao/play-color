import React, {Component} from 'react'
import './PlayingPanel.less'
import eventBus from '../../events'

class PlayingPanel extends Component{

  state = {
    showPlayingPanel: false,
    currentSongId: null
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  componentDidMount() {
    eventBus.on('togglePlayingPanel', () => {
      console.log('1111111')
      this.setState(prevState => ({
        showPlayingPanel: !prevState.showPlayingPanel
      }))
    })
  }

  render() {
    return (
      this.state.showPlayingPanel &&
      <div className="pc-current-song-wrapper">
        
      </div>
    );
  }
}

export default PlayingPanel