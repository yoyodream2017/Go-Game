# Go-Game
This code is mainly copied from react official website with some refactors.
The React website provides a simple tic tac toe and we released the code in release one.
We did the refactor and provided a gobang and a go game by extending the existing components.

# Basic Operations
- npm (run) start: open the app locally under eslint
- npm (run) test: run test on src and see the test coverage
- npm run stylefmt: do the style fmt
- npm run stylelint: do the style lint

# Go game training
- Round: black first and then white, each round one chess.
- Take: if one chess is contained by chesses with different color or border. Or all connected chess block with same color is contained by different color or border. These chess should be removed from chessboard.
![Take example]

