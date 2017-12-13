import React, { Component } from 'react'
import { func, string } from 'prop-types'

const propTypes = {
  value: string,
  onClick: func
}

class Square extends Component {
  render () {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    )
  }
}
Square.propTypes = propTypes

export default Square
