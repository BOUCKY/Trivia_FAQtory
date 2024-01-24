import React, { useState } from "react"
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan, faCopy } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


function HiddenCard({id, theme, song1, song2, song3, song4, question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5, removeCard, setTheme, setSong1, setSong2, setSong3, setSong4, setQuestion1, setQuestion2, setQuestion3, setQuestion4, setQuestion5, setAnswer1, setAnswer2, setAnswer3, setAnswer4, setAnswer5}){

    function handleDelete(){
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/hidden/${id}`,
        {method: "DELETE",})
        .then(() => removeCard(id))
        
    }

    const trash = <FontAwesomeIcon icon={faTrashCan} style={{color: "#204c73",}} size='sm' />
    const edit = <FontAwesomeIcon icon={faPenToSquare} style={{color: "#204c73",}} size='sm' />
    const copy = <FontAwesomeIcon icon={faCopy} style={{color: "#204c73",}} size='sm' />
    const check = <FontAwesomeIcon icon={faCheck} style={{color: "#204c73",}} size='sm' />

    const cardText =  `Round: ${theme}\nSongs: ${song1}${song2}${song3}${song4}\nQuestion: ${question1}\nAnswer: ${answer1}}\nQuestion: ${question2}\nAnswer: ${answer2}\nQuestion: ${question3}\nAnswer: ${answer3}\nQuestion: ${question4}\nAnswer: ${answer4}\nQuestion: ${question5}\nAnswer: ${answer5}`


    const [editing, setEditing] = useState(false) // Add state for editing mode
    const [editedTheme, setEditedTheme] = useState(theme)
    const [editedSong1, setEditedSong1] = useState(song1)
    const [editedSong2, setEditedSong2] = useState(song2)
    const [editedSong3, setEditedSong3] = useState(song3)
    const [editedSong4, setEditedSong4] = useState(song4)
    const [editedQuestion1, setEditedQuestion1] = useState(question1)
    const [editedAnswer1, setEditedAnswer1] = useState(answer1)
    const [editedQuestion2, setEditedQuestion2] = useState(question2)
    const [editedAnswer2, setEditedAnswer2] = useState(answer2)
    const [editedQuestion3, setEditedQuestion3] = useState(question3)
    const [editedAnswer3, setEditedAnswer3] = useState(answer3)
    const [editedQuestion4, setEditedQuestion4] = useState(question4)
    const [editedAnswer4, setEditedAnswer4] = useState(answer4)
    const [editedQuestion5, setEditedQuestion5] = useState(question5)
    const [editedAnswer5, setEditedAnswer5] = useState(answer5)
    // eslint-disable-next-line
    const [copied, setCopied] = useState(false)
  
    const handleEdit = () => {
      setEditing(true)
    }

    const handleSave = () => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/hidden/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ theme: editedTheme, song1: editedSong1, song2: editedSong2, song3: editedSong3, song4: editedSong4, question1: editedQuestion1, question2: editedQuestion2, question3: editedQuestion3, question4: editedQuestion4, question5: editedQuestion5, answer1: editedAnswer1, answer2: editedAnswer2, answer3: editedAnswer3, answer4: editedAnswer4, answer5: editedAnswer5 }),
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
            setSong4(updatedCard.song4)
            setQuestion1(updatedCard.question1)
            setQuestion2(updatedCard.question2)
            setQuestion3(updatedCard.question3)
            setQuestion4(updatedCard.question4)
            setQuestion5(updatedCard.question5)
            setAnswer1(updatedCard.answer1)
            setAnswer2(updatedCard.answer2)
            setAnswer3(updatedCard.answer3)
            setAnswer4(updatedCard.answer4)
            setAnswer5(updatedCard.answer5)
            setEditing(false); // Exit editing mode after saving
        })

        .catch(error => {
            console.error('There was an error updating the card:', error)
        })
    }
    
  
      const cancel = () =>{
          setEditing(false)
      }

      const handleCopy = () => {
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
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
                    <label htmlFor="song2">Song:
                    <input
                      value={editedSong2}
                      onChange={e => setEditedSong2(e.target.value)}
                    />
                    </label>
                    <label htmlFor="song3">Song:
                    <input
                      value={editedSong3}
                      onChange={e => setEditedSong3(e.target.value)}
                    />
                    </label>
                    <label htmlFor="song4">Song:
                    <input
                      value={editedSong4}
                      onChange={e => setEditedSong4(e.target.value)}
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
                    <label htmlFor="question4">Question:
                    <textarea
                      value={editedQuestion4}
                      onChange={e => setEditedQuestion4(e.target.value)}
                    />
                    </label>
                    <label htmlFor="answer4">Answer:
                    <textarea
                      value={editedAnswer4}
                      onChange={e => setEditedAnswer4(e.target.value)}
                    />
                    </label>
                    <label htmlFor="question5">Question:
                    <textarea
                      value={editedQuestion5}
                      onChange={e => setEditedQuestion5(e.target.value)}
                    />
                    </label>
                    <label htmlFor="answer5">Answer:
                    <textarea
                      value={editedAnswer5}
                      onChange={e => setEditedAnswer5(e.target.value)}
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
                    <div className="edit-and-delete-buttons">
                        <CopyToClipboard text={cardText}>
                            <button className="copy-button" onClick={handleCopy}>{copied ? check : copy}</button>
                        </CopyToClipboard>
                        <button className='edit-button'onClick={handleEdit} >{edit}</button>
                        <button className='delete-button' onClick={handleDelete}>{trash}</button>
                    </div>
                </div>
                )}
                
            </div>
        </div>
    )
}

export default HiddenCard