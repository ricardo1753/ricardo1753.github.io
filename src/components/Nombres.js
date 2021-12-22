import React, { useContext } from 'react'
import { TableroContext } from './App'
import { ButtonGroup, Button } from 'react-bootstrap'

function Nombres() {
  
  let {
    jugadorUno, 
    jugadorDos, 
    handleChange,
    handleClick,
  } = useContext(TableroContext)

  return (
    <div>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text font-link" id="uno">Player #1:</span>
        <input 
          type="text" 
          className="form-control font-link" 
          aria-label="Sizing example input" 
          aria-describedby="inputGroup-sizing-sm"
          value={jugadorUno}
          name = 'jugadorUno'
          onChange={handleChange}
        />
      </div>      
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text font-link" id="Dos">Player #2:</span>
        <input 
          type="text" 
          className="form-control font-link" 
          aria-label="Sizing example input" 
          aria-describedby="inputGroup-sizing-sm"
          value={jugadorDos}
          name = 'jugadorDos'
          onChange={handleChange}
        />
      </div>      
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary" onClick={handleClick} >Game</Button>
      </ButtonGroup>
      
    </div>
  )
}

export default Nombres
