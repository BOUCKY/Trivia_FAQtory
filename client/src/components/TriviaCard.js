import React, {useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'

function TriviaCard({id, round, song, question, answer, removeCard, setRound, setSong, setQuestion, setAnswer}){

    function handleDelete(){
        fetch(`http://127.0.0.1:5555/trivia/${id}`,
        {method: "DELETE",})
        .then(() => removeCard(id))
        
    }

    const trash = <FontAwesomeIcon icon={faTrashCan} style={{color: "#204c73",}} size='sm' />
    const edit = <FontAwesomeIcon icon={faPenToSquare} style={{color: "#204c73",}} size='sm' />


    const [editing, setEditing] = useState(false); // Add state for editing mode
    const [editedQuestion, setEditedQuestion] = useState(question)
    const [editedAnswer, setEditedAnswer] = useState(answer)
    const [editedSong, setEditedSong] = useState(song)
    const [editedRound, setEditedRound] = useState(round)
  
    const handleEdit = () => {
      setEditing(true);
    }

    const handleSave = () => {
        fetch(`http://127.0.0.1:5555/trivia/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ round: editedRound, song: editedSong, question: editedQuestion, answer: editedAnswer }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedCard => {
            setRound(updatedCard.round);
            setSong(updatedCard.song);
            setQuestion(updatedCard.question);
            setAnswer(updatedCard.answer);
            setEditing(false); // Exit editing mode after saving
        })

        .catch(error => {
            console.error('There was an error updating the card:', error);
        })
    }
    
  
      const cancel = () =>{
          setEditing(false)
      }



    return(
        <div className="trivia-card-container">
            <div className="trivia-card">
                {editing ? (
                    <div className="edit-mode">
                    <label htmlFor="round">Round:
                    <input
                      value={editedRound}
                      onChange={e => setEditedRound(e.target.value)}
                    />
                    </label>
                    <label htmlFor="song">Song:
                    <input
                      value={editedSong}
                      onChange={e => setEditedSong(e.target.value)}
                    />
                    </label>
                    <label htmlFor="question">Question:
                    <textarea
                      value={editedQuestion}
                      onChange={e => setEditedQuestion(e.target.value)}
                    />
                    </label>
                    <label htmlFor="answer">Answer:
                    <textarea
                      value={editedAnswer}
                      onChange={e => setEditedAnswer(e.target.value)}
                    />
                    </label>
                    <div className="edit-and-delete-buttons">
                        <button className='save'onClick={handleSave}>Save</button>
                        <button className='save'onClick={cancel}>Cancel</button>
                    </div>
                  </div>
                ):(
                    <div className="trivia-card-content">
                    <p className="trivia-card-round">{round}</p>
                    <p className="trivia-card-title">Song: <p className="info">{song}</p></p>
                    <p className="trivia-card-title">Question: <p className="info">{question}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer}</p></p>
                    <div className="edit-and-delete-buttons">
                        <button className='edit-button'onClick={handleEdit} >{edit}</button>
                        <button className='delete-button' onClick={handleDelete}>{trash}</button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default TriviaCard