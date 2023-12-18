import React, {useState}from "react"

function GameForm({addNewGame, handleAddQuestion}){

    const [formData, setFormData] = useState({letter:'', round1: '', round2: '', round3: '', round4: '',  hidden_round: '', player_round:'', final_wager:''})
    // eslint-disable-next-line
    const [adding, setAdding] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:5555/game`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...formData, }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            
            .then(data => {
                // Handle the data or provide feedback to the user if needed
                console.log('Data saved successfully:', data)
            })

            .then(newGame => addNewGame(newGame))
                resetForm()
                setAdding(false)

    }

    const resetForm = () => {
        setFormData({ letter:'', round1: '', round2: '', round3: '', round4: '',  hidden_round: '', player_round:'', final_wager:'' });
    }

    const cancel = () =>{
        resetForm()
        setAdding(false)
        handleAddQuestion()
    }


    return(
        <div className="add-mode">
            <div className="form-box">
                <div className="form-heading">
                    <p>Add A Game!</p>
                </div>
                <label htmlFor="letter">Letter:
                    <input
                        onChange={(e) => {setFormData({...formData, letter: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.letter}
                    />
                </label>
                <label htmlFor="round">Round 1:
                    <input
                        onChange={(e) => {setFormData({...formData, round1: e.target.value})}}
                        type='textarea'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.round1}
                    />
                </label>
                <label htmlFor="round">Round 2:
                    <input
                        onChange={(e) => {setFormData({...formData, round2: e.target.value})}}
                        type='textarea'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.round2}
                    />
                </label>
                <label htmlFor="round">Hidden Theme Round:
                    <input
                        onChange={(e) => {setFormData({...formData, hidden_round: e.target.value})}}
                        type='textarea'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.hidden_round}
                    />
                </label>
                <label htmlFor="round">Player Chosen Round:
                    <input
                        onChange={(e) => {setFormData({...formData, player_round: e.target.value})}}
                        type='textarea'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.player_round}
                    />
                </label>
                <label htmlFor="round">Round 3:
                    <input
                        onChange={(e) => {setFormData({...formData, round3: e.target.value})}}
                        type='textarea'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.round3}
                    />
                </label>
                <label htmlFor="round">Round 4:
                    <input
                        onChange={(e) => {setFormData({...formData, round4: e.target.value})}}
                        type='textarea'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.round4}
                    />
                </label>
                <label htmlFor="round">Final Wager Question:
                    <input
                        onChange={(e) => {setFormData({...formData, final_wager: e.target.value})}}
                        type='textarea'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.final_wager}
                    />
                </label>
                <div className="submit-and-cancel-buttons">
                    <button className='save'onClick={handleSubmit}>Save</button>
                    <button className='save'onClick={cancel}>Cancel</button>
                </div>
                </div>
        </div>
    )    


}

export default GameForm