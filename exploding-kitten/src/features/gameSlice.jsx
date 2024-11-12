import { createSlice } from '@reduxjs/toolkit';
import catCard from '../assets/cat-card.jpg';
import defuseCard from '../assets/defuse-card.jpg';
import shuffleCard from '../assets/shuffle-card.jpg';
import explodingCard from '../assets/exploding-card.jpg';
import axios from 'axios';

const initialState = {
  deck: [],
  drawnCards: [],
  gameStatus: 'idle',
  defuseCardAvailable: false,
  shuffleMessage: '',
  score: 0,
  leaderboard: [],
  username: '',
};

const generateRandomUsername = () => {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `Player${randomDigits}`;
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action) => {
      
      state.deck = shuffleDeck([
        { type: 'Cat', image: catCard },
        { type: 'Defuse', image: defuseCard },
        { type: 'Shuffle', image: shuffleCard },
        { type: 'Exploding Kitten', image: explodingCard },
        { type: 'Cat', image: catCard },
      ]);
      state.drawnCards = [];
      state.gameStatus = 'playing';
      state.defuseCardAvailable = false;
      state.shuffleMessage = ''
      state.score = 0;
      state.username = action.payload || generateRandomUsername();
    },
    drawCard: (state) => {
      if (state.gameStatus !== 'playing') return; 
      const card = state.deck.pop(); 
      if (card) {
        state.drawnCards.push(card);

        if (card.type === 'Exploding Kitten') {
          if (state.defuseCardAvailable) {
            state.defuseCardAvailable = false; 
            state.shuffleMessage = '';
            state.score += 1;
          } else {
            state.gameStatus = 'lost';
            return; 
          }
        } else if (card.type === 'Defuse') {
          state.defuseCardAvailable = true;
          state.shuffleMessage = '';
          state.score += 1;
        } else if (card.type === 'Shuffle') {
          
          state.deck = shuffleDeck([
            { type: 'Cat', image: catCard },
            { type: 'Defuse', image: defuseCard },
            { type: 'Shuffle', image: shuffleCard },
            { type: 'Exploding Kitten', image: explodingCard },
            { type: 'Cat', image: catCard },
          ]);
          state.drawnCards = [];
          state.gameStatus = 'playing';
          state.defuseCardAvailable = false;
          state.shuffleMessage = 'Drawn a Shuffle Card - Desk Reset'
          state.score += 1;
        }
        else {
          state.shuffleMessage = '';
          state.score += 1;
        }

        if (state.deck.length === 0) {
          state.gameStatus = 'won';
        }
      }
    },
    updateLeaderboard: (state, action) => {
      state.leaderboard.push(action.payload);
    },
    exitGame: (state) => {
      state.deck = [];
      state.drawnCards = [];
      state.gameStatus = 'idle';
      state.defuseCardAvailable = false;
      state.shuffleMessage = '';
      state.score = 0;
    }
  },
});

function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}

export const { startGame, drawCard, updateLeaderboard, exitGame } = gameSlice.actions;

export const sendScoreToBackend = (username, score) => async dispatch => {
  try {
    const payload = { username:username, score:score };

    // console.log("Sending payload:", payload);

    await axios.post('http://localhost:8080/api/leaderboard', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    dispatch(fetchLeaderboardFromBackend());
  } catch (error) {
    console.error("Error sending score to backend:", error.response || error.message);
  }
};

export const fetchLeaderboardFromBackend = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:8080/api/leaderboard');

    dispatch(updateLeaderboard(response.data));

  } catch (error) {
    console.error("Error fetching leaderboard from backend:", error);
  }
};

export default gameSlice.reducer;
