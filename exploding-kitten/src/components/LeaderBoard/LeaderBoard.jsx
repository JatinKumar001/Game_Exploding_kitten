import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateLeaderboard } from '../../features/gameSlice';

export default function LeaderBoard() {

    const dispatch = useDispatch();
    const leaderboard = useSelector((state) => state.game.leaderboard);

    useEffect(() => {
        // Fetch leaderboard data from your backend and update Redux
        async function fetchLeaderboard() {
            const response = await fetch('/api/leaderboard');
            const data = await response.json();
            dispatch(updateLeaderboard(data));
        }
        fetchLeaderboard();
    }, [dispatch]);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.map((user, index) => (
                    <li key={index}>
                        {user.name}: {user.score} points
                    </li>
                ))}
            </ul>
        </div>
    )
}
