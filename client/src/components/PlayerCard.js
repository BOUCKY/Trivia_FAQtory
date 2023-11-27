import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'

function PlayerCard({theme, song1, question1, answer1, song2, question2, answer2, song3, question3, answer3}){

    return(
        <div className="trivia-card-container">
            <div className="trivia-card">
                <div className="trivia-card-content">
                    <p className="trivia-card-round">{theme}</p>
                    <p className="trivia-card-title">Song: <p className="info">{song1}</p></p>
                    <p className="trivia-card-title">Question: <p className="info">{question1}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer1}</p></p>
                    <p className="trivia-card-title">Song: <p className="info">{song2}</p></p>
                    <p className="trivia-card-title">Question: <p className="info">{question2}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer2}</p></p>
                    <p className="trivia-card-title">Song: <p className="info">{song3}</p></p>
                    <p className="trivia-card-title">Question: <p className="info">{question3}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer3}</p></p>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard