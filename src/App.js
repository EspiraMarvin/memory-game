import './App.css';
import { useState } from 'react';


const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
]


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // shuffle cards
  //1. duplicate each card once, because we need each 2 cards for the game,so that a user can match them together
  //2. So we'll have an array of 12 cards instead of 6, 2 of each image
  //3. We're to randomize the order of the cards in the array using the sort() method
  //4. Finally, it applies a radom id to each of the 12 cards
  //5. And we'll use the id as a key for react when outputting them out in a list/grid

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffleCards)
    setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
}

export default App;
