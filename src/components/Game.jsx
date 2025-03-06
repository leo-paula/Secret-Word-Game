import React, { useState, useRef } from 'react'
import './Game.css'


const Game = ({verifyLetter, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {
  
  
  const [saidLetter, setSaidLetter] = useState("")
  const letterInputRef = useRef(null)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    verifyLetter(saidLetter)

    setSaidLetter("")
    letterInputRef.current.focus()
  }

  return (
    <div className='game'>
      <h3 className='points'>Pontuação: {score}</h3>
      <h1>Adivinhe a Palavra!</h1>
      <h3 className='tip'>Dica sobre a palavra: {pickedCategory}</h3>
      <div className="gameContainer">
      {letters.map ((letter, i) => (
          guessedLetters.includes(letter) ? 
          (<span key={i} className='letter'>{letter}</span>) : (<span key={i} className='blankSquare'></span>)
        ))}      
      </div>
      <div className='letterContainer'>
        <p>Tente adivinhar uma letra da palavra</p>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name='letter' maxLength="1" required onChange={(e) => setSaidLetter(e.target.value)} 
          ref={letterInputRef} value={saidLetter} />
          <button className='btn-jgr '>
            Jogar
          </button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas: {wrongLetters}</p>
        {wrongLetters.map((letters, i) => (
          <span key={i}> {letters} </span>
        ))}
      </div>
      <p>Você ainda tem {guesses} tentativas</p>
    </div>
  )
}

export default Game

