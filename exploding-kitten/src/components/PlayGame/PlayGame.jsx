import React, { useEffect } from 'react'
import Bg_greyimage from '../../assets/Bg-greyimage1.jpg'
import Restart from '../../assets/reload.png'
import Exit from '../../assets/exit.png'
import Menu_btn from '../../assets/Menu-btn.png'
import Card_back from '../../assets/pixelcut-export.jpeg'
import Exploding_card from '../../assets/exploding-card.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { startGame, drawCard, exitGame, sendScoreToBackend } from '../../features/gameSlice'
import { useNavigate } from 'react-router-dom';

export default function PlayGame() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const deck = useSelector((state) => state.game.deck);
    const drawnCards = useSelector((state) => state.game.drawnCards);
    const gameStatus = useSelector((state) => state.game.gameStatus);
    const shuffleMessage = useSelector((state) => state.game.shuffleMessage);
    const score = useSelector((state) => state.game.score);
    const username = useSelector((state) => state.game.username);

    const handleStartGame = () => {
        dispatch(startGame(username));
    };

    const handleDrawCard = () => {
        dispatch(drawCard());
    };

    const handleExitGame = () => {
        dispatch(exitGame());
        navigate('/');
        window.location.reload();
    }

    useEffect(() => {
        if (gameStatus === 'won' || gameStatus === 'lost') {
            dispatch(sendScoreToBackend(username, score));
        }
    }, [gameStatus, dispatch, username, score]);


    return (
        <div>
            <div className=''>
                <img src={Bg_greyimage} alt='red-bg' className='bg-cover bg-center h-screen w-screen absolute z-0' />
            </div>
            <div className='flex  justify-around items-center relative z-10'>
                <h1 className='text-3xl text-white font-display pt-5'>Exploding Kitten</h1>
                <p className='text-3xl text-white font-display pt-5'>Username : <span className='text-green-400'>{username}</span></p>
                <p className='text-2xl text-white font-display pt-5'>Score : <span className='text-red-300'>{score}</span></p>
                <div>
                    <img
                        src={Menu_btn}
                        alt='menu'
                        onClick={handleExitGame}
                        className='w-8 pt-5 m-auto cursor-pointer transition ease-in-out duration-150 hover:scale-105'
                    />
                </div>
            </div>
            <div className='absolute right-0 mr-16 mt-24 z-10'>
                <div>
                    <p className='text-base text-sky-200 font-display'>{shuffleMessage}</p>
                </div>
            </div>
            {gameStatus === 'playing' && (
                <div className='grid grid-cols-4 grid-flow-row gap-5 relative w-[50rem] mx-auto mt-24 mb-14 z-10'>
                    {drawnCards.map((dcard, id) => (
                        <div>
                            <img key={id} src={dcard.image} alt={`${dcard.type} card`} className='w-56 h-52 rounded-xl' />
                        </div>
                    ))}
                </div>
            )}
            <div className='flex justify-center relative z-10'>
                {gameStatus === 'won' && (
                    <div>
                        <h2 className='text-5xl text-black pt-40 pb-12 font-display'>Congratulations! You won!</h2>
                        <div>
                            <img
                                src={Restart}
                                alt='restart'
                                onClick={handleStartGame}
                                className='w-14 m-auto cursor-pointer transition ease-in-out duration-150 hover:scale-105'
                            />
                            <img
                                src={Exit}
                                alt='exit'
                                onClick={handleExitGame}
                                className='w-16 mt-3 m-auto cursor-pointer transition ease-in-out duration-150 hover:scale-105'
                            />
                        </div>
                    </div>
                )}
                {gameStatus === 'lost' && (
                    <div>
                        <div className='flex justify-center mt-24'>
                            <img src={Exploding_card} alt={'card'} className='w-56 h-52 rounded-xl' />
                        </div>
                        <h2 className='text-5xl text-black pt-8 pb-12 font-display'>Game Over! You lost!</h2>
                        <div>
                            <img
                                src={Restart}
                                alt='restart'
                                onClick={handleStartGame}
                                className='w-14 m-auto cursor-pointer transition ease-in-out duration-150 hover:scale-105'
                            />
                            <img
                                src={Exit}
                                alt='exit'
                                onClick={handleExitGame}
                                className='w-16 mt-3 m-auto cursor-pointer transition ease-in-out duration-150 hover:scale-105'
                            />
                        </div>
                    </div>
                )}
            </div>
            {gameStatus === 'playing' && (
                <div className='flex justify-center pt-8 relative z-10'>
                    {deck.map((card, index) => (
                        <div className='flex justify-center'>
                            <img
                                key={index}
                                src={card.image}
                                alt={`${card.type} card`}
                                onClick={handleDrawCard}
                                className='w-48 h-56 absolute rounded-xl cursor-pointer'
                            />
                            <img src={Card_back} alt='card-back' onClick={handleDrawCard} className='w-48 h-56 absolute rounded-xl transition ease-in-out duration-150 hover:scale-105 cursor-pointer' />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
