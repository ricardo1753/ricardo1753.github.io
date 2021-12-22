import React, { useState, useEffect, useContext } from 'react'
import { cloneDeep } from 'lodash'
import { TableroContext } from './App'
import { ButtonGroup, Button } from 'react-bootstrap' 

function Tablero() {
  const [tablero, setTablero] = useState([])
  let [cerroCuadro, setCerroCuadro] = useState(false)
  
  let { 
    numeroCubosEnUnaFila, 
    setNumeroCubosEnUnaFila,
    jugadorUno, 
    jugadorDos, 
    quienJuega,
    setQuienJuega, 
    scoreUno,
    setScoreUno,
    scoreDos,
    setScoreDos,
    getRandomInt,
  } = useContext(TableroContext)



  const creaTablero = (sizeTablero)=> {
    const tablero = []
    for (let row=0; row<sizeTablero; row++){
      const fila = {orientacion:'', lados:[]}
        //horizontales
        if (row % 2 === 0){
          fila.orientacion='horizontal'
          for (let column=0; column<sizeTablero; column++){
            if (column % 2 === 0){
              fila.lados.push(null)
            } else {
              fila.lados.push(0)
            }
          }
        } else {
          //verticales
          fila.orientacion='vertical'
          for (let column=0; column<sizeTablero; column++){
            if (column % 2 === 0){
              fila.lados.push(0)
            } else {
              fila.lados.push(null)
            }
          }
        }
      tablero.push(fila)
    }
    //console.log('mi tablero ' + {tablero})
    setTablero(tablero)
  }

  const calculaLados = (numCubos)=> {
    return 2*numCubos+1
  }

  function seleccionarLado(ridx, cidx, orientacion){
    const tableroCopy = cloneDeep(tablero)
    const row = tableroCopy[ridx]
    row.lados[cidx] = 1
    setTablero(tableroCopy)
    validacionClic(ridx, cidx, tableroCopy, orientacion)
  }

  const validacionClic = (ridx, cidx, tableroCopy, orientacion) => {
    let row = ridx
    let max = calculaLados(numeroCubosEnUnaFila)-1

    const esVerdad = (fila, columna) => {
      let row = tableroCopy[fila]
      if (row.lados[columna] === 1){
        return true
      }
    }

    const scoreAdd = () => {
      if (quienJuega){
        setScoreUno(scoreUno+100)
      } else {
        setScoreDos(scoreDos+100)
      }
      setCerroCuadro(cerroCuadro = true)
    }

    if (orientacion === 'vertical'){
      if (cidx > 0){  //busca izquierda
        if (esVerdad(ridx+1, cidx-1)){
          if (esVerdad(ridx, cidx-2)){
            if (esVerdad(ridx-1, cidx-1)){
              scoreAdd()
              row = tableroCopy[ridx]
              row.lados[cidx-1] = 2
              setTablero(tableroCopy)
            }
          }
        }
      } 
      if (cidx < max){  //busca derecha
        if (esVerdad(ridx+1, cidx+1)){
          if (esVerdad(ridx, cidx+2)){
            if (esVerdad(ridx-1, cidx+1)){
              scoreAdd()
              row = tableroCopy[ridx]
              row.lados[cidx+1] = 2
              setTablero(tableroCopy)
            }
          }
        }
      }
    } else if (orientacion === 'horizontal'){
      if (ridx > 0){  //busca arriba
        if (esVerdad(ridx-1, cidx-1)){
          if (esVerdad(ridx-2, cidx)){
            if (esVerdad(ridx-1, cidx+1)){
              scoreAdd()
              row = tableroCopy[ridx-1]
              row.lados[cidx] = 2
              setTablero(tableroCopy)
            }
          }
        }
      } 
      if (ridx < max){  //busca abajo
        if (esVerdad(ridx+1, cidx-1)){
          if (esVerdad(ridx+2, cidx)){
            if (esVerdad(ridx+1, cidx+1)){
              scoreAdd()
              row = tableroCopy[ridx+1]
              row.lados[cidx] = 2
              setTablero(tableroCopy)
            }
          }
        }
      }
    }
  }

  const masCubos = () => {
    if (numeroCubosEnUnaFila === 7) setNumeroCubosEnUnaFila(numeroCubosEnUnaFila = 0)
    setNumeroCubosEnUnaFila(numeroCubosEnUnaFila+1)
    creaTablero(calculaLados(numeroCubosEnUnaFila+1))
  }

  useEffect(() => {
    const numero = getRandomInt(10)
    if (numero < 6) {
      setQuienJuega(true)
    } else {
      setQuienJuega(false)
    }
    creaTablero(calculaLados(numeroCubosEnUnaFila))
  },[numeroCubosEnUnaFila])

  let anchoMayor = '80px'
  let anchoMenor = '10px'
  let alturaMayor = '80px'
  let alturaMenor = '10px'
  
  const valMayor = [null,'80px','80px','80px','70px', '60px', '50px', '40px', '40px']
  const valMenor = [null,'10px', '10px', '10px', '8px','7px','6px','6px','6px']

  anchoMayor = valMayor[numeroCubosEnUnaFila]
  anchoMenor = valMenor[numeroCubosEnUnaFila]
  alturaMayor = valMayor[numeroCubosEnUnaFila]
  alturaMenor = valMenor[numeroCubosEnUnaFila]

  //console.log('num cubos ' + numeroCubosEnUnaFila)
  //console.log('anchoMayor ' + anchoMayor)

  return (
    <div>
      {tablero.map((row, ridx)=>{ 
        let {color, lados, orientacion} = row
        return(
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}} key={`row ${ridx}${orientacion}`}>
            {lados.map((column, cidx)=>{
              //colores = fondo = #747474   lados = #ffe400   lados clicked = #ff652f
              let width = '5px'
              let height = '5px'
              if (orientacion === 'horizontal'){
                if (column === null){
                  color = '#747474' //fondo
                  width =  anchoMenor //'5px'
                  height = alturaMenor //'5px'
                } else if (column === 0){
                  color = '#ffe400' //lados
                  width = anchoMayor //'50px'
                  height = alturaMenor //'5px'
                } else if (column === 1){
                  color = '#ff652f'
                  width =  anchoMayor //'50px'
                  height = alturaMenor //'5px'
                } else if (column === 2){
                  color = 'crimson' 
                  width = '50px'
                  height = '50px'
                }
              } else if (orientacion === 'vertical'){
                if (column === 0){
                  color = '#ffe400'
                  width = anchoMenor //'5px'
                  height = alturaMayor  //'50px'
                } else if (column === null){
                  color = '#747474'
                  width = anchoMayor //'50px'
                  height = alturaMayor //'50px'
                } else if (column === 1){
                  color = '#ff652f'
                  width = anchoMenor //'5px'
                  height = alturaMayor //'50px'
                } else if (column === 2){
                  color = 'crimson'
                  width = anchoMayor //'50px'
                  height = alturaMayor //'50px'
                }
              }
              //==========================
              const handleClick = (e) => {
                e.preventDefault()
                if (lados[cidx] === 0) {
                  seleccionarLado(ridx, cidx, orientacion)
                  if (!cerroCuadro) {
                    setQuienJuega(!quienJuega)
                  } else {
                    setCerroCuadro(cerroCuadro = false)
                  }
                }
              }            
              //==========================
              return <div
                onClick={handleClick}
                style={{backgroundColor: color, width, height,
                  cursor: column === 0 ? 'pointer' : 'initial'}}
                  key={`column ${ridx}${cidx}${orientacion}`}
                />
              //==========================
            })}
          </div>
        )
      }) }  {/* FIN DE DIBUJA TABLERO ============================================== */}

      <div className='jugadorUno font-link' style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: quienJuega ? 'yellow' : 'white', 
        paddingLeft: '40px',
        paddingTop: '40px' }}>
        {jugadorUno}{'  '}{scoreUno}
      </div> 
      <div className='jugadorDos font-link' style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: quienJuega ? 'white' : 'yellow', 
        paddingLeft: '40px',
        paddingTop: '40px' }}>
        {jugadorDos}{'  '}{scoreDos}
      </div> 
      <div style={{paddingTop: '30px', paddingLeft:'40px'}}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" onClick={masCubos}>Game</Button>
          {/* <Button variant="secondary">Middle</Button> */}
          <Button variant="danger">Exit</Button>
        </ButtonGroup>
      </div>

    </div>
  )

}

export default Tablero
