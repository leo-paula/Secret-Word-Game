import { useCallback, useEffect, useState } from 'react'
import './App.css'
import StartScreen from './components/StartScreen'
import { Words } from './data/Words'
import Game from './components/Game'
import GameOver from './components/GameOver'

function App() {

  // ---------------------------------------------------------------------------------------------------

  
  
  //States
  
  const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3 , name: "end"}]

  
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)
  



    // sub-functions utilized

    const pickWordAndCategory = useCallback(() => {
      const allCategories = Object.keys(Words)
      const chosenCategory = allCategories[Math.floor(Math.random() * allCategories.length) ]
      const chosenWord = Words[chosenCategory][Math.floor(Math.random() * Words[chosenCategory].length) ]

      return {chosenWord, chosenCategory}
    }, [Words])
    
    // Game managment

  const startGame = useCallback(() => {
    const {chosenWord, chosenCategory} = pickWordAndCategory()
    
    clearLetterStates()
    setGameStage(stages[1].name)
    let wordLetters = chosenWord.split("")
    wordLetters.map((i) => i.toLowerCase())
    setLetters(wordLetters)
    setPickedCategory(chosenCategory)
    setPickedWord(chosenWord)
    setGuesses(3)
    
  },[pickWordAndCategory])

  const verifyLetter = (saidLetter) => {
    if (guessedLetters.includes(saidLetter) || wrongLetters.includes(saidLetter)) {
      return;
    }
    
    if (letters.includes(saidLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, saidLetter
      ]);

      setScore((actualScore) => actualScore + 10)



    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, saidLetter
      ]);
      setGuesses(actualGuesses => (actualGuesses - 1))
    }

  }; 

  const clearLetterStates = () =>{
    setGuessedLetters([])
    setWrongLetters([])
  } 
 
  useEffect(() => {
    if (guesses <= 0) {
      setGameStage(stages[2].name)
      
    }
  }, [guesses])

  useEffect(() => {
    if (gameStage === "game") {
      const uniqueLetters = [...new Set(letters)]
      console.log(uniqueLetters);
      console.log(guessedLetters);
      console.log("teste?");
      
      
      if(guessedLetters.length === uniqueLetters.length) {
        startGame()
      }
      
    }    
    

  }, [guessedLetters, letters, startGame])
  

  const retryGame = () => {
    setGameStage(stages[0].name);
    setGuesses(3);
    setScore(0);
    setGuessedLetters([]);
    setWrongLetters([]);
    setPickedWord("");
    setPickedCategory("");
    setLetters([]);
  };



  return (
    
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && 
      <Game 
      verifyLetter={verifyLetter}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters} 
      wrongLetters={wrongLetters} 
      guesses={guesses}
      score={score} />}

      {gameStage === 'end' && <GameOver  retryGame={retryGame} score={score}/>}
      
    </div>

  )
}

export default App
