import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startGame, drawCard } from '../features/gameSlice';

export default function GameBoard() {

    const dispatch = useDispatch();
    const deck = useSelector((state) => state.game.deck);
    const drawnCards = useSelector((state) => state.game.drawnCards);
    const gameStatus = useSelector((state) => state.game.gameStatus);
    
    console.log(deck);
    
    const handleStartGame = () => {
      dispatch(startGame());
    };
  
    const handleDrawCard = () => {
      dispatch(drawCard());
    };

    return (
        <div>
            <h1>Exploding Kitten</h1>
            {gameStatus === 'idle' && <button onClick={handleStartGame}>Start Game</button>}
            {gameStatus === 'playing' && (
                <div>
                    <button onClick={handleDrawCard}>Draw Card</button>
                    <div>
                        <h3>Drawn Cards:</h3>
                        <ul>
                            {drawnCards.map((card, index) => (
                                <li key={index}>
                                    <img src={card.image} alt={`${card.type} card`} width="100" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {gameStatus === 'won' && <h2>Congratulations! You won!</h2>}
            {gameStatus === 'lost' && <h2>Game Over! You lost!</h2>}
        </div>
    )
}
