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
## Round
> Black first and then white, each round one chess. Our game uses "X" to present black chess and "O" to white.

## Take
> If one chess is contained by chesses with different color or border. Or all connected chess block with same color is contained by different color or border. These contained chess should be removed from chessboard.

> Take example one
![Take example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p1.png>
![Take example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p2.png>
> Take example two
![Take example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p3.png>
![Take example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p4.png>

## Eye
> The area chess contained can be considered as eye. Eye can not be filled chesses with different color. For instance, 
> Eye example
![Eye example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p5.png>
Generally, "O" cannot get into the eye of "X", but when take occurs, this will not be forbidden.
> Eye example: eye can be broken only when taking occurs.
![Eye example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p6.png>
![Eye example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p7.png>

1. Real eye
> An eye is contained by connected chesses. A typical feature is that the eye can only be broken when all these chesses are surrounded by another chess type.
> real eye example
![Real eye example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p8.png>
> Break real eye
![Break real eye example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p9.png>
![Break real eye example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p10.png>

2. Falsy eye
> An eye can be broken when part of the container chess are token<not all>.
> Falsy eye example
![Falsy eye example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p6.png>
![Falsy eye example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p7.png>

> The difference between real eye and falsy eye includes whether container chesses are all connected and whether container chesses can be token all together or only part of them. 

## Alive or dead
> If a chess block has at least two real eyes, it can be considered as alive. Otherwise, this block can be considered as dead. In other words, these chesses cannot be token from chessboard via any methods.
> Alive example
![Alive example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p11.png>

> Dead example and take dead blocks
![Dead example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p12.png>
![Dead example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p13.png>
![Dead example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p14.png>
![Dead example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p15.png>

## Forbidden KO case
> One take case is forbidden when black and white are all surrounded by the other. Both chess type can only take one chess periodically.
> First "X" takes one "O", then "X" can choose to take one "O", this will lead to no ending.
![KO example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p16.png>
![KO example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p17.png>
![KO example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p18.png>
![KO example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p19.png>
![KO example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p20.png>
![KO example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p21.png>

## Symbiosis

> One special case is symbiosis: look at the following example
![Symbiosis example]
<https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p22.png>
