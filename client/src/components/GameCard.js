import { useRef, useState } from "react"
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPenToSquare, faCopy } from '@fortawesome/free-regular-svg-icons'
import { faPrint, faCheck } from '@fortawesome/free-solid-svg-icons'

function GameCard({id, name, date, letter, round1, round2, round3, round4, hidden, player, final, setName, setDate, setLetter, setRound1, setRound2, setRound3 ,setRound4, setHidden, setPlayer, setFinal, removeCard}){
    
    function handleDelete(){
        fetch(`http://127.0.0.1:5555/game/${id}`,
        {method: "DELETE",})
        .then(() => removeCard(id))
    }
    
    const edit = <FontAwesomeIcon icon={faPenToSquare} style={{color: "#204c73",}} size='sm' />
    const trash = <FontAwesomeIcon icon={faTrashCan} style={{color: "#204c73",}} size='sm' />
    const print = <FontAwesomeIcon icon={faPrint} style={{color: "#204c73",}} size='sm' />
    const copy = <FontAwesomeIcon icon={faCopy} style={{color: "#204c73",}} size='sm' />
    const check = <FontAwesomeIcon icon={faCheck} style={{color: "#204c73",}} size='sm' />

    const cardText =  `Name: ${name}\nDate: ${date}\nLetter: ${letter}\nRound 1: ${round1}\nRound 2: ${round2}\nHidden Theme Round: ${hidden}\nPlayer Chosen Round: ${player}\nRound 3: ${round3}\nRound 4: ${round4}\nFinal Wager Question: ${final}\n`


    const [editing, setEditing] = useState(false) // Add state for editing mode
    const [editedName, setEditedName] = useState(name)
    const [editedDate, setEditedDate] = useState(date)
    const [editedLetter, setEditedLetter] = useState(letter)
    const [editedRound1, setEditedRound1] = useState(round1)
    const [editedRound2, setEditedRound2] = useState(round2)
    const [editedRound3, setEditedRound3] = useState(round3)
    const [editedRound4, setEditedRound4] = useState(round4)
    const [editedHidden, setEditedHidden] = useState(hidden)
    const [editedPlayer, setEditedPlayer] = useState(player)
    const [editedFinal, setEditedFinal] = useState(final)
    // eslint-disable-next-line
    const [copied, setCopied] = useState(false)

    const handleEdit = () => {
      setEditing(true)
    }

    const handleSave = () => {
      fetch(`http://127.0.0.1:5555/game/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: editedName, date: editedDate, letter: editedLetter, round1: editedRound1, round2: editedRound2, round3: editedRound3, round4: editedRound4, hidden: editedHidden, player: editedPlayer, final: editedFinal }),
    })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(updatedCard => {
          console.log(updatedCard)
          setName(updatedCard.name)
          setDate(updatedCard.date)
          setLetter(updatedCard.letter)
          setRound1(updatedCard.round1)
          setRound2(updatedCard.round2)
          setRound3(updatedCard.round3)
          setRound4(updatedCard.round4)
          setHidden(updatedCard.hidden)
          setPlayer(updatedCard.player)
          setFinal(updatedCard.final)
          setEditing(false); // Exit editing mode after saving
      })

      .catch(error => {
          console.error('There was an error updating the card:', error)
      })
    }

    const cancel = () =>{
      setEditing(false)
  }

    const printableElementRef = useRef(null);

    const handlePrint = () => {
      const printableContent = printableElementRef.current.innerHTML;
      const printWindow = window.open("", "_blank");

      printWindow.document.write(`
        <html>
          <head>
            <title>Trivia Card</title>
            <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 14px; /* Adjust as needed for readability */
              margin: 20px; /* Add margins to give space around the content */
            }
          
            .trivia-card-content {
              /* Style the card content */
              padding: 10px;
              border: 1px solid #ccc;
              margin-bottom: 20px;
            }
          
            .trivia-card-title {
              font-weight: bold;
            }
          
            .info {
              /* Style info sections */
              color: #333; /* Ensure readability in black and white */
            }
          
            </style>
          </head>
          <body>${printableContent}</body>
        </html>
      `)

      printWindow.document.close();
      printWindow.print();
      printWindow.close();
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
                <label htmlFor="name">Name:
                  <input
                    value={editedName}
                    onChange={e => setEditedName(e.target.value)}
                  />
                </label>
                <label htmlFor="date">Date:
                  <input
                    value={editedDate}
                    onChange={e => setEditedDate(e.target.value)}
                  />
                </label>
                <label htmlFor="letter">Letter:
                  <input
                    value={editedLetter}
                    onChange={e => setEditedLetter(e.target.value)}
                  />
                </label>
                <label htmlFor="round1">Round1:
                  <textarea
                    value={editedRound1}
                    onChange={e => setEditedRound1(e.target.value)}
                  />
                </label>
                <label htmlFor="round2">Round2:
                  <textarea
                    value={editedRound2}
                    onChange={e => setEditedRound2(e.target.value)}
                  />
                </label>
                <label htmlFor="hidden">Hidden Theme Round:
                  <textarea
                    value={editedHidden}
                    onChange={e => setEditedHidden(e.target.value)}
                  />
                </label>
                <label htmlFor="player">Player Chosen Round:
                  <textarea
                    value={editedPlayer}
                    onChange={e => setEditedPlayer(e.target.value)}
                  />
                </label>
                <label htmlFor="round3">Round3:
                  <textarea
                    value={editedRound3}
                    onChange={e => setEditedRound3(e.target.value)}
                  />
                </label>
                <label htmlFor="round4">Round4:
                  <textarea
                    value={editedRound4}
                    onChange={e => setEditedRound4(e.target.value)}
                  />
                </label>
                <label htmlFor="final">Final Wager:
                  <textarea
                    value={editedFinal}
                    onChange={e => setEditedFinal(e.target.value)}
                  />
                </label>
                <div className="edit-and-delete-buttons">
                    <button className='save'onClick={handleSave}>Save</button>
                    <button className='save'onClick={cancel}>Cancel</button>
                </div>
              </div>  
            ) : (
              <div>
                <div ref={printableElementRef} className="trivia-card-content">
                  <p className="trivia-card-title">Name: <p className="info">{name}</p></p>
                  <p className="trivia-card-title">Date: <p className="info">{date}</p></p>
                  <p className="trivia-card-title">Letter: <p className="info">{letter}</p></p>
                  <p className="trivia-card-title">Round 1: <p className="info">{round1}</p></p>
                  <p className="trivia-card-title">Round 2: <p className="info">{round2}</p></p>
                  <p className="trivia-card-title">Hidden Theme Round: <p className="info">{hidden}</p></p>
                  <p className="trivia-card-title">Player Chosen Round: <p className="info">{player}</p></p>
                  <p className="trivia-card-title">Round 3: <p className="info">{round3}</p></p>
                  <p className="trivia-card-title">Round 4: <p className="info">{round4}</p></p>
                  <p className="trivia-card-title">Final Wager Question: <p className="info">{final}</p></p>
                </div>
                  <div className="edit-and-delete-buttons">
                      <CopyToClipboard text={cardText}>
                        <button className="copy-button" onClick={handleCopy}>{copied ? check : copy}</button>
                      </CopyToClipboard>
                      <button className="print-button" onClick={handlePrint}>{print}</button>
                      <button className='edit-button'onClick={handleEdit} >{edit}</button>
                      <button className='delete-button' onClick={handleDelete}>{trash}</button>
                  </div>
              </div>
            )}
            </div>
        </div>
    )

}

export default GameCard

