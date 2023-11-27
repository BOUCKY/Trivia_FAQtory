import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'

function HiddenCard({theme, song1, song2, song3, song4, question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5}){

    return(
        <div className="trivia-card-container">
            <div className="trivia-card">
                <div className="trivia-card-content">
                    <p className="trivia-card-round">{theme}</p>
                    {song4? <p className="trivia-card-title">Songs: <p className="info">{song1}, {song2}, {song3}, {song4}</p></p> : <p className="trivia-card-title">Songs: <p className="info">{song1}, {song2}, {song3}</p></p>}
                    <p className="trivia-card-title">Question: <p className="info">{question1}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer1}</p></p>
                    <p className="trivia-card-title">Question: <p className="info">{question2}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer2}</p></p>
                    <p className="trivia-card-title">Question: <p className="info">{question3}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer3}</p></p>
                    <p className="trivia-card-title">Question: <p className="info">{question4}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer4}</p></p>
                    <p className="trivia-card-title">Question: <p className="info">{question5}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer5}</p></p>
                </div>
            </div>
        </div>
    )
}

export default HiddenCard