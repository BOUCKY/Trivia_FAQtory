import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

function GameCard({id, name, date, letter, round1, round2, round3, round4, hidden, player, final, removeCard}){
    
    function handleDelete(){
        fetch(`http://127.0.0.1:5555/game/${id}`,
        {method: "DELETE",})
        .then(() => removeCard(id))
    }
    
    const trash = <FontAwesomeIcon icon={faTrashCan} style={{color: "#204c73",}} size='sm' />
    const print = <FontAwesomeIcon icon={faPrint} style={{color: "#204c73",}} size='sm' />

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
    


    return(
        <div className="trivia-card-container">
            <div className="trivia-card">
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
                    <div className="edit-and-delete-buttons">
                        <button className="print-button" onClick={handlePrint}>{print}</button>
                        <button className='delete-button' onClick={handleDelete}>{trash}</button>
                    </div>
                </div>
            </div>
        </div>
            
        
    )

}

export default GameCard
