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
> If one chess is contained by chesses with different color or border. Or all connected chess block with same color is contained by different color or border. These contained chess should be removed from chessboard.<br />
> Take example one<br />
>> ![Take example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p1.png)<br />
>> ![Take example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p2.png)<br />
> Take example two<br />
>> ![Take example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p3.png)<br />
>> ![Take example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p4.png)

## Eye
> The area chess contained can be considered as eye. Eye can not be filled chesses with different color. For instance, <br />
> Eye example<br />
>> ![Eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p5.png)<br />
> Generally, "O" cannot get into the eye of "X", but when take occurs, this will not be forbidden.<br />
> Eye example: eye can be broken only when taking occurs.<br />
>> ![Eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p6.png)<br />
>> ![Eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p7.png)<br />

1. Real eye
> An eye is contained by connected chesses. A typical feature is that the eye can only be broken when all these chesses are surrounded by another chess type.<br />
> real eye example<br />
>> ![Real eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p8.png)<br />
> Break real eye<br />
>> ![Break real eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p9.png)<br />
>> ![Break real eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p10.png)<br />

2. Falsy eye
> An eye can be broken when part of the container chess are token(not all).<br />
> Falsy eye example<br />
>> ![Falsy eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p6.png)<br />
>> ![Falsy eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p7.png)<br />
> The difference between real eye and falsy eye includes whether container chesses are all connected and whether container chesses can be token all together or only part of them. 

## Alive or dead
> If a chess block has at least two real eyes, it can be considered as alive. Otherwise, this block can be considered as dead. In other words, these chesses cannot be token from chessboard via any methods.<br />
> Alive example<br />
>> ![Alive example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p11.png)<br />
> Dead example and take dead blocks<br />
>> ![Dead example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p12.png)<br />
>> ![Dead example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p13.png)<br />
>> ![Dead example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p14.png)<br />
>> ![Dead example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p15.png)

## Forbidden KO case
> One take case is forbidden when black and white are all surrounded by the other. Both chess type can only take one chess periodically.<br />
> First "X" takes one "O", then "X" can choose to take one "O", this will lead to no ending.<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p16.png)<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p17.png)<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p18.png)<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p19.png)<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p20.png)<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p21.png)

## Symbiosis
> One special case is symbiosis: look at the following example<br />
>> ![Symbiosis example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p22.png)
