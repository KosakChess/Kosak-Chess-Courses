'use client';
import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, type Move, type Square } from 'chess.js';

export default function PlayWithLoadedPGN() {
	// `game` is used for storing the PGN and move history
	const [game, setGame] = useState(new Chess());

	// `chessboardGame` is used for managing the current state of the chessboard
	const [chessboardGame, setChessboardGame] = useState(new Chess());

	const [myMoveNumber, setMyMoveNumber] = useState(0);

	const [comment, setComment] = useState('default comment');

	const [moveMark, setMoveMark] = useState('default move mark');

	// Example PGN to load
	const pgn = `[Event "Endgames: Introduction"]
[Site "https://lichess.org/study/vMmllPNw/Iy7ACzLV"]
[Result "*"]
[Variant "Standard"]
[ECO "?"]
[Opening "?"]
[Annotator "https://lichess.org/@/jomega"]
[FEN "8/8/8/8/6K1/6Q1/2p5/3k4 w - - 0 1"]
[SetUp "1"]
[UTCDate "2018.12.03"]
[UTCTime "15:29:27"]

{ [Last Modified: 8/25/2020]
This study is a top level study for endgames.

The material is organized by type to help you find what you are looking for. It is *not* the order in which you would necessarily want to learn the material. See the next chapter for advice on that.

This study is linked from the studies:

Beginner: Curriculum <--- START HERE: The Endgame
Chapter: The Endgame
https://lichess.org/study/Ztgx3vJq/Vooa3887

Intermediate: Curriculum: Endgame
Chapter: The Endgame
https://lichess.org/study/QjfpcMCD/S61IdQSQ

Endgame practice is here:
https://lichess.org/study/dWUwAWzA

The position is Lolli (1763) as presented in Irving Chernev's book "Practical Chess Endings".

As we will see later, the endgame Queen and King versus advance Bishop-pawn and King is a special case. Black is threatening to get a Queen and draw. What should White do? I'll put the solution here for completeness.
- }
1. Qb3 { Fastest. White wants to do two things 1) stop Black from getting a draw by queening, 2) stop Black from getting a draw by reaching the corner. } (1. Qd3+ { Here is a line presented to show what could happen if White is unaware of the danger. } 1... Kc1 2. Kf3 { White hopes to attack the pawn with the King and Queen, thereby winning it. } 2... Kb2! 3. Qd2 { Pinning the pawn so it cannot queen. } 3... Kb1! (3... Ka1? 4. Ke3 Kb2 5. Kd3 Ka1 6. Kxc2 $18 { Winning. }) 4. Qb4+ Ka1 5. Qc3+ Kb1 6. Qb3+ Ka1 7. Qxc2 { Stalemate! }) 1... Kd2 2. Qb2 Kd1 { Clearly Black does not want White's Queen to reach c1. } 3. Kf3! { What's this? Allowing Black to queen? } 3... Kd2 { Black sees that queening would allow a mate in one. } (3... c1=Q 4. Qe2#) (3... c1=N { Underpromoting does not help Black. } 4. Ke3 { Threatening Qd2#. } 4... Nb3 (4... Ke1 5. Qxc1#) 5. Qc3! Nc1 6. Qd2#) (3... c1=R 4. Qe2#) 4. Kf2 Kd1 (4... Kd3 5. Qb3+ Kd2 6. Qe3+ Kd1 7. Qe1#) 5. Qd4+ Kc1 6. Qb4 Kd1 7. Qe1# *
`;

	// Load PGN into the `game` instance (PGN manager)
	useEffect(() => {
		game.loadPgn(pgn);
		setGame(game);
		console.log('game history: ', game.history({ verbose: true }));
		const tmpGame = new Chess();

		const startingFen = getFenForMoveNumber(myMoveNumber, true);
		tmpGame.load(startingFen);
		setComment(getCommentForFen(startingFen));
		setChessboardGame(tmpGame);
		setMoveMark('!');
	}, []); // Only load PGN once on mount

	function makeAMove(
		move: string | { from: Square; to: Square; promotion: string | undefined },
	): Move | null {
		const gameCopy = new Chess(chessboardGame.fen());
		try {
			const result = gameCopy.move(move);
			// if this is the correct move (from the PGN), update the chessboard state. otherwise, alert the user "Invalid Move"
			// console.log('gamecopy fen:', myMoveNumber, ' ', gameCopy.fen());
			if (gameCopy.fen() === getFenForMoveNumber(myMoveNumber, false)) {
				setChessboardGame(new Chess(getFenForMoveNumber(myMoveNumber + 1, false)));

				//COMMENTS
				//comment to the move white just made.
				const whiteComment = getCommentForFen(getFenForMoveNumber(myMoveNumber + 1, true));
				if (whiteComment != '') {
					alert(whiteComment);
				}

				setComment(getCommentForFen(getFenForMoveNumber(myMoveNumber + 1, false)));
				setMyMoveNumber(myMoveNumber + 2);
			} else {
				alert('Not the right move!');
			}
			return result;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	function onDrop(sourceSquare: Square, targetSquare: Square, piece: string): boolean {
		// Handle promotions
		let promotionPiece: string | undefined = 'q';
		if (piece.length === 2) promotionPiece = piece[1]?.toLocaleLowerCase();

		const move = { from: sourceSquare, to: targetSquare, promotion: promotionPiece };
		const result = makeAMove(move);
		return !!result;
	}

	function getFenForMoveNumber(moveNumber: number, isBefore: boolean): string {
		const history = game.history({ verbose: true });
		if (history[moveNumber]) {
			if (isBefore) {
				// console.log('white to move: ', myMoveNumber, ' ', history[moveNumber].before);
				return history[moveNumber].before; // Return FEN before the move was made
			} else {
				// console.log('black to move: ', myMoveNumber, ' ', history[moveNumber].after);
				return history[moveNumber].after;
			}
		}
		alert('Puzzle solved!');
		const tmpGame = new Chess();
		return tmpGame.fen(); // Return FEN for the starting position
	}

	function getCommentForFen(myFen: string): string {
		const comments = game.getComments();
		console.log('AAA MYFEN', myFen);
		for (let i = 0; i < comments.length; i++) {
			console.log('comments', i, comments[i]);
			if (comments[i]?.fen === myFen) {
				const tmp = comments[i]?.comment;
				if (tmp === undefined) {
					return '';
				} else {
					return tmp;
				}
			}
		}
		return '';
	}

	const boardStyle = {
		width: '40%',
		height: 'auto',
		marginTop: '8%',
		marginLeft: '4%',
		marginRight: 'auto',
	};

	const rightPaneStyle = {
		display: 'flex',
		flexDirection: 'column' as const,
		width: '40%',
		marginTop: '10%',
		marginRight: '10%',
	};

	const displayBoxStyle = {
		width: '100%',
		height: '300px',
		fontSize: '14px',
		overflowY: 'auto' as const,
		backgroundColor: '#f0f0f0',
		padding: '10px',
	};

	return (
		<div style={{ display: 'flex' }}>
			{/* Chessboard */}
			<div style={boardStyle}>
				<Chessboard position={chessboardGame.fen()} onPieceDrop={onDrop} />
				<div>Move Number: {chessboardGame.moveNumber()}</div>
				<div>FEN for Current Move: {chessboardGame.fen()}</div>
			</div>

			{/* Right pane with input box and large display box */}
			<div style={rightPaneStyle}>
				<text>{moveMark}</text>
				<div style={displayBoxStyle}>{comment}</div>
			</div>
		</div>
	);
}
