import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen/StartScreen'
import PlayGame from './components/PlayGame/PlayGame'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={ <StartScreen />} />
        <Route path='/start' element={ <PlayGame />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App
