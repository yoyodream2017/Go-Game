import React, { Component } from 'react'
import Board from './Board'

class GoGame extends Component {

  constructor(props) {
    super(props)
    this.boardSize = 19
    this.state = {
      history: [
        {
          squares: Array.from({length: this.boardSize}).map(() => new Array(this.boardSize).fill(null)),
          block: [],
          capturedSquare: [],
          position: [],
          forbid: false
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  calculateWinner() {
    return null
  }

  // Clicking, say ‘X’, set new block number, use block number array in history to store it.
     
  // Check all states in four neighbors, set all X with same block number to the new block number.

  // Check the block number of 'O' in four directions, record the block number. Check all squares with same block number,for four directions for each square, if no space, remove them all.

  // State: three type of states: X, O, space. will not set state for border, just judge when close to border. 
  
  // Forbiding the suiside and ko case. suiside case, just do remove first and check death for the new block. if no block removed and death true for the new block, forbidden. 
    
  // Ko case: the position is the only one last killed and killed the last position only.

  calculateCapture(i, j, squares, block, capturedSquare, position, forbid) {
    const currentState = this.currentState()
    let addedArr = []// define the new added array for block
    let addNum = []// define the block num for same state
    let subNum = []// define the block num for different state

    addedArr.push([i, j])

    if (j !== 0) {
      const left = squares[i][j-1]
      const blockNumberLeft = this.checkBlockNumber(i, j-1, block)
      
      if (currentState === left) {
        this.checkAdd(block, blockNumberLeft, addNum, addedArr)
      } else if (left !== null) {
        this.checkSub(block, blockNumberLeft, subNum, squares)
      }
    }

    if (j !== this.boardSize-1) {
      const right = squares[i][j+1]
      const blockNumberRight = this.checkBlockNumber(i, j+1, block)

      if (currentState === right) {
        this.checkAdd(block, blockNumberRight, addNum, addedArr)
      } else if (right !== null) {
        this.checkSub(block, blockNumberRight, subNum, squares)
      }
    }

    if (i !== 0) {
      const top = squares[i-1][j]
      const blockNumberTop = this.checkBlockNumber(i-1, j, block)

      if (currentState === top) {
        this.checkAdd(block, blockNumberTop, addNum, addedArr)
      } else if (top !== null) {
        this.checkSub(block, blockNumberTop, subNum, squares)       
      }
    }

    if (i !== this.boardSize-1 ) {
      const bottom = squares[i+1][j]
      const blockNumberBottom = this.checkBlockNumber(i+1, j, block)

      if (currentState === bottom) {
        this.checkAdd(block, blockNumberBottom, addNum, addedArr)
      } else if (bottom !== null) {
        this.checkSub(block, blockNumberBottom, subNum, squares)        
      }
    }

    if(this.setCapturedSquare(i, j, subNum, block, capturedSquare, position)) {
      return true
    }

    this.setBlock(addNum, subNum, block, addedArr)

    forbid = this.checkSuisideCase(block, squares)

    return forbid
  }

  currentState() {
    return this.state.xIsNext ? 'X' : 'O'
  }

  /* checkBlockNumber: check the block number of a single square
    In: square coordinate, block
    Out: the block number the square belongs to
    Algorithm: do traversal on block and find the block number of the square
  */ 
  checkBlockNumber(i, j, block) {
    for (let k = 0; k < block.length; k++) {
      for (let z = 0; z < block[k].length; z++) {
        if (block[k][z][0] === i && block[k][z][1] === j) {
          return k
        }
      }
    }
  }

  /* checkAdd: push array in the block with same state to addedArr, and the block to addNum
  */ 
  checkAdd(block, blockNumber, addNum, addedArr) {
    if (blockNumber !== undefined && !addNum.includes(blockNumber)) {

      addNum.push(blockNumber)

      block[blockNumber].forEach(arr => {
        addedArr.push(arr)
      })
    }
  }
  /* checkAdd: push the block number that should be removed to subNum
  */ 
  checkSub(block, blockNumber, subNum, squares) {
    if (blockNumber !== undefined && !subNum.includes(blockNumber)) {
      let count = 0
  
      block[blockNumber].forEach(arr => {
        if (this.checkDeath(arr, squares)) {
          count++
        }
      })
  
      if (count === block[blockNumber].length) {
        block[blockNumber].forEach(arr => {
          squares[arr[0]][arr[1]] = null
        })
  
        subNum.push(blockNumber)
      }
    }
  }

  /* getDistinctNumber: return distinct block number in addNum and subNum
  */
  getDistinctNumber(addNum, subNum) {
    let totalNum = []

    addNum.concat(subNum).forEach(num => {
      if(!totalNum.includes(num)){
        totalNum.push(num)
      }
    })

    return totalNum
  }
  
  /*setCapturedSquare: if single square is captured then record and prevent KO case
  */
  setCapturedSquare(i, j, subNum, block, capturedSquare, position) {
    if (subNum.length === 1 && block[subNum[0]].length === 1) {
      if(capturedSquare[0] === i && capturedSquare[1] === j && block[subNum[0]][0][0] === position[0] && block[subNum[0]][0][1] === position[1]) {
        return true
      }

      [capturedSquare[0], capturedSquare[1]] = block[subNum[0]][0].slice()
    } else {
      capturedSquare = []
    }
  }

  /*setBlock: deal with modification of the block array
  */
  setBlock(addNum, subNum, block, addedArr) {
    let totalNum = this.getDistinctNumber(addNum, subNum)
    
    totalNum.forEach(num => {
      block[num] = []
    })
    
    // Array splice would cause the index disturbance, and len and i should be reduced.
    for (let i=0,len=block.length;i<len;i++) {
      if (Object.keys(block[i]).length === 0) {
        block.splice(i, 1)
        len--
        i--
      }
    }

    block.push(addedArr)
  }

  /*setCapturedSquare: prevent suiside case
  */
  checkSuisideCase(block, squares) {// eslint-disable-line
    let count = 0
    
    block[block.length-1].forEach(arr => {
      if (this.checkDeath(arr, squares)) {
        count++
      }
    })

    if(count === block[block.length-1].length) {
      return true
    }

    return false
  }

  /* checkDeath: check a single square is dead or not(no space can be considered dead).
    In: check square array, squares after current round
    Out: bool: true => dead.
    Algorithm: check whether there is space within all four neighbors
  */ 
  checkDeath ([i, j], squares) {
    let [left, right, top, bottom] = new Array(4).fill(true)

    if(j !== 0) {
      left = squares[i][j-1] !== null
    }

    if (j !== this.boardSize-1) {
      right = squares[i][j+1] !== null
    }

    if (i !== 0) {
      top = squares[i-1][j] !== null
    }

    if (i !== this.boardSize-1) {
      bottom = squares[i+1][j] !== null
    }

    return left && right && top && bottom
  }

  handleClick(i,j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const currentMove = history.length - 1
    const current = history[currentMove]
    const squares = JSON.parse(JSON.stringify(current.squares))    
    let block = current.block.slice() // without slice would cause history bug.
    let capturedSquare = current.capturedSquare.slice()
    let position = current.position.slice()
    let forbid = current.forbid

    // Forbid when game is over or square's state is not null
    if (squares[i][j] || this.gameOver) {
      return
    }

    squares[i][j] = this.currentState()

    if (this.calculateCapture(i, j, squares, block, capturedSquare, position, forbid)) {
      return
    }

    position = [i, j]
    this.setState({
      history: history.concat([
        {
          squares,
          block,
          capturedSquare,
          position,
          forbid
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
   
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history
    const stepNumber = this.state.stepNumber
    const current = history[stepNumber]
    const winner = this.calculateWinner(current.squares, ...current.position)

    if (winner && !this.gameOver) {
      this.gameOver = true
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start'
      return (
        <li key={move}>
          <button onClick={
            () => {
              this.jumpTo(move)

              if (stepNumber > move) {
                this.gameOver = false
              }
            }
          }>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div>
        <div>
          <a href="/">Home</a>
        </div>
        <br/>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              boardSize={this.boardSize}
              onClick={(i,j) => this.handleClick(i,j)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    )
  }
}

export default GoGame
