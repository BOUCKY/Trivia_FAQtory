import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'

function FinalCard({question, answer}){

    return(
        <div className="trivia-card-container">
            <div className="trivia-card">
                <div className="trivia-card-content">
                    <p className="trivia-card-title">Question: <p className="info">{question}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer}</p></p>
                </div>
            </div>
        </div>
    )
}

export default FinalCard