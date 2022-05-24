import React, { useState } from 'react'
import UserOnboarding from 'react-user-onboarding'
import 'react-user-onboarding/dist/index.css'
import './OnBoarding.css'

export default function OnBoarding( { handleCloseOnBoarding, elem1 } ) {
    
    const [isVisible, setIsVisible] = useState(true)

    const story = [
        {
          component: 'modal',
          intro: true,
          children: (
            <div style={{ color: 'black'}}>   
                    <p>
            <b>Hi there</b>{" "}
            <span role="img" aria-label="hello">
              👋
            </span>
          </p>

          <p>
            Welcome to MAGIC MEMORY GAME App.
          </p>

          <p>
            Would you like to have a tour to see how it works? (If you skip, you
            can click the "How to Play" button to get started again)
          </p></div>
          )
        },
        {
          component: 'tooltip',
          ref: elem1,
          children: (
            <div>
            <p>Click/ Select 2 CARDS. <br /> If BOTH MATCH you move to the next matching cards until all cards are selected.
            <br />
            The shorter Turns you take to complete the game, the GURU you become!
            </p>
          </div>
          )
        },
        // {
        //   component: 'speech-bubble',
        //   ref: elem2,
        //   children: (
        //       <div>Three</div>
        //   )
        // },
        {
          component: 'modal',
          intro: false,
          children: (
            <div style={{color: 'black'}}>
            <p>Tour Completed. Now Enjoy the Game!</p>
          </div>
          )
        }
      ]

      const handleClose = () => {
        handleCloseOnBoarding()
      }

  return (
    <div>
      <UserOnboarding 
        story={story} 
        isVisible={isVisible}
        onClose={() => {
           handleClose()
            setIsVisible(false)
        }} 
      />

    </div>
  )
}
