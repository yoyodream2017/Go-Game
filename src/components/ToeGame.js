import Game from './Game'

class ToeGame extends Game {
  constructor(props) {
    super(props)
    this.boardSize = 3
    this.lines = [
      [[-2,-2],[-1,-1]],
      [[-1,-1],[1,1]],
      [[1,1],[2,2]],
      
      [[-2,0],[-1,0]],
      [[-1,0],[1,0]],
      [[1,0],[2,0]],
      
      [[0,-2],[0,-1]],
      [[0,-1],[0,1]],
      [[0,1],[0,2]],
      
      [[-2,2],[-1,1]],
      [[-1,1],[1,-1]],
      [[1,-1],[2,-2]]
    ]
  }

  calculateWinner(squares, i, j) {
    if(i === undefined) {
      return null
    }

    const check = squares[i][j]
    const lines = this.lines
    for (let k = 0; k < lines.length; k++) {
      const [a, b] = lines[k]

      if(!squares[i + a[0]] || !squares[i + b[0]]) {
        continue
      }
      if (check === squares[i+a[0]][j+a[1]] && check === squares[i+b[0]][j+b[1]]) {
        return check
      }
    }

    return null
  }
}

export default ToeGame
