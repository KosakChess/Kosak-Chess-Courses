'use client';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, type Move, type Square } from 'chess.js';

export default function PlayRandomMoveVsPlayer() {
	const [game, setGame] = useState(new Chess());

	function makeAMove(
		move: string | { from: Square; to: Square; promotion: string | undefined },
	): Move | null {
		const gameCopy = new Chess(game.fen());
		try {
			const result = gameCopy.move(move);
			setGame(gameCopy);
			// player's move is done, now it's time for the computer to play
			// TODO: here move should be imported from PGN provided by the user
			const possibleMoves = gameCopy.moves();
			if (possibleMoves.length === 0) return result;
			const randomIndex = Math.floor(Math.random() * possibleMoves.length);
			const randomMove = possibleMoves[randomIndex] as string;
			const randomResult = gameCopy.move(randomMove);
			setGame(gameCopy);
			return randomResult;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	function onDrop(sourceSquare: Square, targetSquare: Square, piece: string): boolean {
		// piece is either wP, wN, wB, wR, wQ, wK, bP, bN, bB, bR, bQ, bK
		// if it is a ptomotion, piece will be wQ, wR, wB, wN, bQ, bR, bB, bN
		// promotion takes just Q, R, B, N, so we need to remove the first character and then convert to lowercase
		let promotionPiece: string | undefined = 'q';
		if (piece.length === 2) promotionPiece = piece[1]?.toLocaleLowerCase();
		const move = { from: sourceSquare, to: targetSquare, promotion: promotionPiece };
		const result = makeAMove(move);
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
