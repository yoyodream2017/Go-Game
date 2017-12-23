# Go-Game
This code is mainly copied from react official website with some refactors.
The React website provides a simple tic tac toe and we released the code in release one.
Then we did some refactors and provided a gobang and a go game by extending the existing components.

# Basic Operations
- npm (run) start: open the app locally under eslint
- npm (run) test: run test on src and see the test coverage
- npm run stylefmt: do the style format
- npm run stylelint: do the style lint

# Go game training
## Sequence
> Black stone is placed first and then white, and each move one stone is placed. Our game uses "X" to represent black stone and "O" to white.

## Capture
> If a stone or group of stone is surrounded by the opponent or the side of the board on all orthogonally-adjacent points, in other words, losing last liberty, these stones should be removed from board.<br />
#### Capture example one
>> ![Capture example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p1.png)<br />
>> ![Capture example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p2.png)<br />
#### Capture example two
>> ![Capture example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p3.png)<br />
>> ![Capture example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p4.png)

## Liberty and eye 
> The open points that stone bordering are called 'liberty'. Enclosed liberty is referred to as an 'eye'. Generally, single-point eye cannot be filled by opponent stones. For instance, <br />
#### Eye example
>> ![Eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p5.png)<br />
> However, when capture occurs, such move is not forbidden.<br />
#### Eye example: eye can be filled only when capture occurs.
>> ![Eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p6.png)<br />
>> ![Eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p7.png)<br />

1. Real eye
> An eye is enclosed by connected stones. A typical feature is that the eye can only be filled when all group of stones are surrounded by opponent stones.<br />
#### Real eye example
>> ![Real eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p8.png)<br />
#### Filling real eye example
>> ![Filling real eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p9.png)<br />
>> ![Filling real eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p10.png)<br />

2. False eye
> An eye can be filled when part of the enclosed stones are captured(not all).<br />
#### False eye example
>> ![False eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p6.png)<br />
>> ![False eye example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p7.png)<br />
> The difference between real eye and false eye includes whether enclosed stones are all connected or not and whether all enclosed stones can be captured one time or only part of them. 

## Alive or dead
> If a stone group has at least two real eyes, it can be considered as alive. Otherwise, it can be considered as dead. In other words, alive stones cannot be captured by all means.<br />
#### Alive example<br />
>> ![Alive example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p11.png)<br />
#### Dead example and capture dead group stones
>> ![Dead example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p12.png)<br />
>> ![Dead example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p13.png)<br />
>> ![Dead example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p14.png)<br />
>> ![Dead example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p15.png)

## Forbidden KO
> One capture case is forbidden when black and white stone are mutually surrounded and repeat a previous position to fill a false eye to capture a single stone.<br />
> For example, first "X" can capture one "O", and then "X" can capture one "O". Then "X" can repeat to capture "O" and vice versa. This will lead to no end.<br />
#### KO example
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p16.png)<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p17.png)<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p18.png)<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p19.png)<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p20.png)<br />
>> ![KO example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p21.png)

## Seki
> One special case is Seki. Seki is that both stones do not have enough eyes for life and cannot capture the opponent in the meanwhile. Look at the following example:<br />
#### Seki example
>> ![Seki example](https://raw.githubusercontent.com/yoyodream2017/Go-Game/master/go-game-training/p22.png)
