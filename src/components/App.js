import React, { useState } from "react";
import "../App.css";
import Tablero from "./Tablero";
import Nombres from "./Nombres";

export const TableroContext = React.createContext();

function App() {
  const [numeroCubosEnUnaFila, setNumeroCubosEnUnaFila] = useState(1);
  const [jugadorUno, setJugadorUno] = useState("");
  const [jugadorDos, setJugadorDos] = useState("");
  const [quienJuega, setQuienJuega] = useState(true);
  let [scoreUno, setScoreUno] = useState(0);
  let [scoreDos, setScoreDos] = useState(0);
  let [juega, setJuega] = useState(false);

  const getRandomInt = (max) => {
    Math.floor(Math.random() * max);
  };

  const handleClick = (e) => {
    setJuega((juega = true));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "jugadorUno") {
      setJugadorUno(value);
    } else if (name === "jugadorDos") {
      setJugadorDos(value);
    }
  };

  const tableroContextValue = {
    numeroCubosEnUnaFila,
    setNumeroCubosEnUnaFila,
    jugadorUno,
    setJugadorUno,
    jugadorDos,
    setJugadorDos,
    quienJuega,
    setQuienJuega,
    scoreUno,
    setScoreUno,
    scoreDos,
    setScoreDos,
    handleClick,
    handleChange,
    juega,
    setJuega,
    getRandomInt,
  };

  return (
    <div>
      <TableroContext.Provider value={tableroContextValue}>
        {!juega && <Nombres />}
        {juega && <Tablero />}
      </TableroContext.Provider>
    </div>
  );
}

export default App;
