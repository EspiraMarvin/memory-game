import { useState, useEffect, useRef } from 'react';
import './App.css';
import OnBoarding from './components/OnBoarding';
import SingleCard from './components/SingleCard'
import TotalScore from './components/TotalScore';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png" ,matched: false },
  { "src": "/img/sword-1.png", matched: false }
]


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [onBoarding, setOnBoarding] = useState(JSON.parse(localStorage.getItem('onBoarded')))
  const [showOnBoarding, setShowOnBoarding] = useState(false)
  const elem1  = useRef()


  // shuffle cards
  //1. duplicate each card once, because we need 2 cards of each (card/image) for the game,so that a user can match them together
  //2. So we'll have an array of 12 cards instead of 6, 2 of each image
  //3. Next we randomize the order of the cards in the array using the sort() method
  // we sort with a random number if the number < 0 (negative number) the items its comparing will remain the same order
  // when the number > 0 (positive number) its going to switch the order around
  //4. Finally, it applies a random id to each of the 12 cards
  //5. And we'll use the id as a key for react when outputting them out in a list/grid

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
    // reset choices incase they were selected
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  // handle a choice
  const handleChoice = (card) => {
    // console.log('handleChoice card', card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // handle completing/closing onboarding 
  const handleCloseOnBoarding = () => {
    setOnBoarding(localStorage.setItem('onBoarded', JSON.stringify(true)))
    setShowOnBoarding(false)
  }


  const handleShowOnBoarding = () => {
    setOnBoarding(localStorage.setItem('onBoarded', JSON.stringify(false)))
    setShowOnBoarding(true)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

// compare 2 selected cards
  useEffect(()  => {
 
 if (choiceOne && choiceTwo) {
  setDisabled(true)

  if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
      // console.log('prev Cards', prevCards)
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    }
    else {
      setTimeout(() => resetTurn(), 800)
    }

  }
  
  }, [choiceOne, choiceTwo])


// start the game automatically
useEffect(() => {
  shuffleCards()
}, [])

  return (
  <>
      { !onBoarding && 
        <OnBoarding
          showOnBoarding={showOnBoarding}
          handleCloseOnBoarding={handleCloseOnBoarding}
          style={{ width: '100%'}} elem1={elem1}
        />
       }
    <div className="App">
       <h2>Magic Memory Game</h2> 
       <div style={{ marginTop: '10px', marginBottom: '-100px'}}>
       <button 
         onClick={shuffleCards}
         className="button-start"
         style={{ marginRight: '8px'}}
        >
          Restart Game</button>
       <button 
          onClick={handleShowOnBoarding}
          className="button-start"
       >
         How to Play
          </button>
       </div>
  

      <div className="card-grid" ref={elem1}>
        {cards.map(card => (
        <SingleCard
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched }
          disabled={disabled}
         />
        ))}
       
      </div>
      {  <p className={cards.every(card => card.matched === true) ? 'hide-turns' : 'show-turns'}>Turns: { turns }</p> }
      {  cards.every(card => card.matched === true) && <TotalScore turns={turns} /> }

      <p style={{fontSize: '20px'}}>Developed by &nbsp;
      <a href="https://www.linkedin.com/in/marvin-espira/"  rel="noreferrer" target="_blank">Marvin Espira</a>
      </p>
    </div>
    </>
  );
}

export default App;
