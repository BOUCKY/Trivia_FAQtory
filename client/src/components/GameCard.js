import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

function GameCard({id, round1, round2, round3, round4, hidden, player, final, removeCard}){
    
    function handleDelete(){
        fetch(`http://127.0.0.1:5555/game/${id}`,
        {method: "DELETE",})
        .then(() => removeCard(id))
    }
    
    const trash = <FontAwesomeIcon icon={faTrashCan} style={{color: "#204c73",}} size='sm' />

    return(
        <div className="trivia-card-content">
            <p className="trivia-card-title">Round 1: <p className="info">{round1}</p></p>
            <p className="trivia-card-title">Round 2: <p className="info">{round2}</p></p>
            <p className="trivia-card-title">Hidden Theme Round: <p className="info">{hidden}</p></p>
            <p className="trivia-card-title">Player Chosen Round: <p className="info">{player}</p></p>
            <p className="trivia-card-title">Round 3: <p className="info">{round3}</p></p>
            <p className="trivia-card-title">Round 4: <p className="info">{round4}</p></p>
            <p className="trivia-card-title">Final Wager Question: <p className="info">{final}</p></p>
            <div className="edit-and-delete-buttons">
                <button className='delete-button' onClick={handleDelete}>{trash}</button>
            </div>
        </div>
    )

}

export default GameCard