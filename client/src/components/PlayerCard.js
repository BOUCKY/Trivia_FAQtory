import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'

function PlayerCard({id, theme, song1, question1, answer1, song2, question2, answer2, song3, question3, answer3, removeCard, setTheme, setSong1, setSong2, setSong3, setQuestion1, setQuestion2, setQuestion3, setAnswer1, setAnswer2, setAnswer3}){

    function handleDelete(){
        fetch(`http://127.0.0.1:5555/player/${id}`,
        {method: "DELETE",})
        .then(() => removeCard(id))
        
    }

    const trash = <FontAwesomeIcon icon={faTrashCan} style={{color: "#204c73",}} size='sm' />
    const edit = <FontAwesomeIcon icon={faPenToSquare} style={{color: "#204c73",}} size='sm' />

    const [editing, setEditing] = useState(false); // Add state for editing mode
    const [editedTheme, setEditedTheme] = useState(theme)
    const [editedSong1, setEditedSong1] = useState(song1)
    const [editedSong2, setEditedSong2] = useState(song2)
    const [editedSong3, setEditedSong3] = useState(song3)
    const [editedQuestion1, setEditedQuestion1] = useState(question1)
    const [editedAnswer1, setEditedAnswer1] = useState(answer1)
    const [editedQuestion2, setEditedQuestion2] = useState(question2)
    const [editedAnswer2, setEditedAnswer2] = useState(answer2)
    const [editedQuestion3, setEditedQuestion3] = useState(question3)
    const [editedAnswer3, setEditedAnswer3] = useState(answer3)
  
    const handleEdit = () => {
      setEditing(true)
    }

    const handleSave = () => {
        fetch(`http://127.0.0.1:5555/player/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ theme: editedTheme, song1: editedSong1, song2: editedSong2, song3: editedSong3, question1: editedQuestion1, question2: editedQuestion2, question3: editedQuestion3, answer1: editedAnswer1, answer2: editedAnswer2, answer3: editedAnswer3 }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedCard => {
            console.log(updatedCard)
            setTheme(updatedCard.theme)
            setSong1(updatedCard.song1)
            setSong2(updatedCard.song2)
            setSong3(updatedCard.song3)
            setQuestion1(updatedCard.question1)
            setQuestion2(updatedCard.question2)
            setQuestion3(updatedCard.question3)
            setAnswer1(updatedCard.answer1)
            setAnswer2(updatedCard.answer2)
            setAnswer3(updatedCard.answer3)
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
                    <label htmlFor="theme">Theme:
                    <input
                      value={editedTheme}
                      onChange={e => setEditedTheme(e.target.value)}
                    />
                    </label>
                    <label htmlFor="song1">Song:
                    <input
                      value={editedSong1}
                      onChange={e => setEditedSong1(e.target.value)}
                    />
                    </label>
                    <label htmlFor="question1">Question:
                    <textarea
                      value={editedQuestion1}
                      onChange={e => setEditedQuestion1(e.target.value)}
                    />
                    </label>
                    <label htmlFor="answer1">Answer:
                    <textarea
                      value={editedAnswer1}
                      onChange={e => setEditedAnswer1(e.target.value)}
                    />
                    </label>
                    <label htmlFor="song2">Song:
                    <input
                      value={editedSong2}
                      onChange={e => setEditedSong2(e.target.value)}
                    />
                    </label>
                    <label htmlFor="question2">Question:
                    <textarea
                      value={editedQuestion2}
                      onChange={e => setEditedQuestion2(e.target.value)}
                    />
                    </label>
                    <label htmlFor="answer2">Answer:
                    <textarea
                      value={editedAnswer2}
                      onChange={e => setEditedAnswer2(e.target.value)}
                    />
                    </label>
                    <label htmlFor="song3">Song:
                    <input
                      value={editedSong3}
                      onChange={e => setEditedSong3(e.target.value)}
                    />
                    </label>
                    <label htmlFor="question3">Question:
                    <textarea
                      value={editedQuestion3}
                      onChange={e => setEditedQuestion3(e.target.value)}
                    />
                    </label>
                    <label htmlFor="answer3">Answer:
                    <textarea
                      value={editedAnswer3}
                      onChange={e => setEditedAnswer3(e.target.value)}
                    />
                    </label>
                    <div className="edit-and-delete-buttons">
                        <button className='save'onClick={handleSave}>Save</button>
                        <button className='save'onClick={cancel}>Cancel</button>
                    </div>
                  </div>
                ):(
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

export default PlayerCard