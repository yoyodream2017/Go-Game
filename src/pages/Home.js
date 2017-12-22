import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div>
        <div>Welcome to yoyo game, please choose the game you want to play:</div>
        <div>
          <ul>
            <li><a href='/toe'>Tic tac toe</a></li>
            <li><a href='/gobang'>Gobang game</a></li>
            <li><a href='/go'>Go game</a></li>
          </ul>
        </div>    
      </div>
    )
  }
}

export default Home
