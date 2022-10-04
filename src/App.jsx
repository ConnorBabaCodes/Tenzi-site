import { useState, useEffect } from "react";
import Die from "./assets/components/Die";
import Confetti from "react-confetti";

function App() {
  const [dieState, setDieState] = useState(allNumbers());
  const [tenzi, setTenzi] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const winCondition1 = dieState.every((die) => die.isHeld);
    if (winCondition1) {
      const win = dieState[0].value;

      const WinCondition2 = dieState.every((die) => die.value === win);
      setTenzi(true);
    }
  }, [dieState]);

  function allNumbers() {
    let numberArray = [];
    for (let i = 1; i < 11; i++) {
      const numberObject = { isHeld: false, id: i };
      numberObject.value = Math.ceil(Math.random() * 6);
      numberArray.push(numberObject);
    }
    return numberArray;
  }

  function reRoll() {
    setDieState((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 7) };
      })
    );
    setCount(count + 1);
  }

  function holdDice(id) {
    setDieState((prevState) =>
      prevState.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function reset() {
    setTenzi(false);
    setDieState(allNumbers);
    setCount(0);
  }

  const diceArray = dieState.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="App">
      {tenzi && <Confetti />}
      <div className="main-container">
        <div className="text-container">
          <h1 className="title">Tenzi</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at
            it's current value between rolls.
          </p>
          <p>Current number of rolls: {count}</p>
        </div>
        <div className="die-container">{diceArray}</div>
        <div className="button-container">
          <button className="roll" onClick={tenzi ? reset : reRoll}>
            {tenzi ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
