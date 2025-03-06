import React from 'react'
import './GameOver.css'

const GameOver = ({retryGame, score}) => {
  return (
    <div>
      <h1>
        Fim de jogo!
      </h1>
      <h3>
        Sua pontuação foi de {score}
      </h3>
      <button className='fim' onClick={retryGame}>
          Tentar Novamente
      </button>
    </div>
  )
}

export default GameOver