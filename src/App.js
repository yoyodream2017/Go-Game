import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Game from './components/Game'
import ToeGame from './components/ToeGame'
import Home from './pages/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Home}/>
        <Route path="/toe" component={ToeGame}/>
        <Route path="/gobang" component={Game}/>
      </div>
    )
  }
}

export default App
