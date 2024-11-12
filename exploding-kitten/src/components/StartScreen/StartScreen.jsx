import React, { useEffect, useState } from 'react'
import Bg_Screen from '../../assets/Bg-Screen.jpg'
import Play from '../../assets/Play.png'
import Cat_card from '../../assets/cat-card.jpg'
import Defuse_card from '../../assets/defuse-card.jpg'
import Shuffle_card from '../../assets/shuffle-card.jpg'
import Exploding_card from '../../assets/exploding-card.jpg'
import Start_button from '../../assets/start-button.jpeg'
import { useSelector, useDispatch } from 'react-redux';
import { startGame, fetchLeaderboardFromBackend } from '../../features/gameSlice'
import { useNavigate } from 'react-router-dom'

export default function StartScreen() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const leaderboard = useSelector((state) => state.game.leaderboard);
    const userName = useSelector((state) => state.game.username);
    const [username, setUsername] = useState(userName);

    const handleStartGame = () => {
        dispatch(startGame(username || ''));
        navigate('/start')
    };

    const handleusernameChange = (e) => {
        setUsername(e.target.value);
    }

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try{
                dispatch(fetchLeaderboardFromBackend());
            }
            catch (error){
                console.log('Failed to fetch data:', error);
            }
        };

        fetchLeaderboard();

    }, [dispatch])

    return (
        <div>
            <div>
                <img
                    src={Bg_Screen}
                    alt='bg-screen'
                    className='bg-cover bg-center h-screen w-screen absolute z-0'
                />
            </div>
            <div className='flex z-10 relative'>
                <div className=' flex w-48 ml-5 pt-4'>
                    <div className='flex justify-center items-center'>
                        <img src={Play} alt='play-btn' className='w-[80px]' />
                    </div>
                    <h1 className='text-white text-3xl ml-3 font-display'>Exploding Kitten</h1>
                </div>
                <div className='flex items-center justify-center w-[74%]'>
                    <p className='text-white text-6xl font-display'>Game Started</p>
                </div>
            </div>
            <div className='flex justify-center w-screen mt-20 mb-14'>
                <div className='flex relative z-10 justify-center items-center -space-x-4'>
                    <img src={Cat_card} alt='cat-card' className='w-52 h-64 rounded-xl mix-blend-normal -rotate-[9deg] border-4 border-green-200 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] transition ease-in-out duration-150 hover:scale-105 cursor-pointer' />
                    <img src={Defuse_card} alt='defuse-card' className='w-52 h-64 rounded-xl z-30 mix-blend-normal relative bottom-5 -rotate-2 border-4 border-black shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] transition ease-in-out duration-150 hover:scale-105 cursor-pointer' />
                    <img src={Shuffle_card} alt='shuffle-card' className='w-52 h-64 rounded-xl z-20 mix-blend-normal relative bottom-5 rotate-3 border-4 border-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] transition ease-in-out duration-150 hover:scale-105 cursor-pointer' />
                    <img src={Exploding_card} alt='exploding-card' className='w-52 h-64 rounded-3xl mix-blend-normal rotate-[10deg] border-4 border-blue-50 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] transition ease-in-out duration-150 hover:scale-105 cursor-pointer' />
                </div>
            </div>
            <div className='mx-4 px-4 w-60 h-80 bottom-24 absolute z-10 rounded-lg bg-gradient-to-b from-gray-200/75 to-slate-400/75 overflow-hidden'>
                <p className='text-2xl text-sky-900 mt-2 text-center font-display font-semibold'>Score Board</p>
                <div className='flex justify-around mt-4 mb-4 text-base'>
                    <p>S.NO</p>
                    <p>Name</p>
                    <p>Score</p>
                </div>
                {leaderboard.length > 0 && leaderboard[0].length > 0 ? (
                    leaderboard[0].map((entry, index) => (
                        <div key={index} className='flex justify-around mt-2 mb-2 text-base'>
                            <p>{index + 1}</p>
                            <p>{entry.username}</p>
                            <p>{entry.score}</p>
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
            <div className='flex justify-center mb-12 relative z-10'>
                <input
                    type='text'
                    placeholder='Enter Username'
                    value={username}
                    onChange={handleusernameChange}
                    className='px-2 py-2 w-60 text-sky-700 font-display font-semibold border-2 border-black rounded-full outline-none shadow-[0_6px_5px_0_rgba(12,74,110,0.5)]'
                />
            </div>
            <div className='flex justify-center items-center relative z-10'>
                <img
                    src={Start_button}
                    alt='start-btn'
                    onClick={handleStartGame}
                    className='w-72 rounded-full transition ease-in-out duration-150 hover:scale-105 cursor-pointer'
                />
                <button className='bg-gradient-to-t from-sky-300 to-sky-100 px-4 py-2 text-2xl text-sky-900 font-semibold font-display rounded-3xl ml-4 border-2 border-black shadow-[0_6px_5px_0_rgba(0,0,0,0.8)] transition ease-in-out duration-150 hover:scale-105 cursor-pointer'>SCORE</button>
            </div>
        </div>
    )
}
