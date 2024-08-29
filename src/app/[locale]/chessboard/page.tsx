'use client';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, type Move, type Square } from 'chess.js';

export default function PlayRandomMoveVsPlayer() {
	const [game, setGame] = useState(new Chess());

	function makeAMove(move: string | { from: Square; to: Square; promotion: string }): Move | null {
		console.log('makeAMove', move);
		const gameCopy = new Chess(game.fen());
		try {
			const result = gameCopy.move(move);
			setGame(gameCopy);
			return result;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	function makeRandomMove() {
		const possibleMoves = game.moves();
		if (possibleMoves.length === 0) return;
		const randomIndex = Math.floor(Math.random() * possibleMoves.length);
		makeAMove(possibleMoves[randomIndex] as string);
	}

	function onDrop(sourceSquare: Square, targetSquare: Square): boolean {
		const move = { from: sourceSquare, to: targetSquare, promotion: 'q' };
		const result = makeAMove(move);
		if (result) setTimeout(makeRandomMove, 1000);
		return !!result;
	}

	const boardStyle = {
		width: '40%',
		height: 'auto',
		marginTop: '8%',
		marginLeft: '4%',
		marginRight: 'auto',
	};

	return (
		<div style={boardStyle}>
			<Chessboard position={game.fen()} onPieceDrop={onDrop} />
		</div>
	);
}
