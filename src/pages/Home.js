import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <div>Welcome to yoyo game, please choose the game you want to play:</div>
        <div>
          <Link to="/toe">Tic tac toe</Link><br/>
          <Link to="/gobang">Gobang game</Link>
        </div>
      </div>
    )
  }
}

export default Home
