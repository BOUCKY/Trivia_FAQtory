import React, {useState}from "react"

function GameForm({addNewGame, setClick}){

    const [formData, setFormData] = useState({name: '', date: '', letter:'', round1: '', round2: '', round3: '', round4: '',  hidden_round: '', player_round:'', final_wager:''})

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/game`, {
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
                addNewGame(data)
            })

        resetForm()
        setClick(false)
    }

    const resetForm = () => {
        setFormData({ name: '', date: '', letter:'', round1: '', round2: '', round3: '', round4: '',  hidden_round: '', player_round:'', final_wager:'' });
    }

    const cancel = () =>{
        resetForm()
        setClick(false)
    }


    return(
        <div className="add-mode">
            <div className="form-box">
                <div className="form-heading">
                    <p>Add A Game!</p>
                </div>
                <label htmlFor="name">Name:
                    <input
                        onChange={(e) => {setFormData({...formData, name: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.name}
                    />
                </label>
                <label htmlFor="date">Date:
                    <input
                        onChange={(e) => {setFormData({...formData, date: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.date}
                    />
                </label>
                <label htmlFor="letter">Letter:
                    <input
                        onChange={(e) => {setFormData({...formData, letter: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        // Set maximum length to 1 char
                        value={formData.letter}
                    />
                </label>
                <label htmlFor="round">Round 1:
                    <textarea
                        onChange={(e) => {setFormData({...formData, round1: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.round1}
                    />
                </label>
                <label htmlFor="round">Round 2:
                    <textarea
                        onChange={(e) => {setFormData({...formData, round2: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.round2}
                    />
                </label>
                <label htmlFor="round">Hidden Theme Round:
                    <textarea
                        onChange={(e) => {setFormData({...formData, hidden_round: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.hidden_round}
                    />
                </label>
                <label htmlFor="round">Player Chosen Round:
                    <textarea
                        onChange={(e) => {setFormData({...formData, player_round: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.player_round}
                    />
                </label>
                <label htmlFor="round">Round 3:
                    <textarea
                        onChange={(e) => {setFormData({...formData, round3: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.round3}
                    />
                </label>
                <label htmlFor="round">Round 4:
                    <textarea
                        onChange={(e) => {setFormData({...formData, round4: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.round4}
                    />
                </label>
                <label htmlFor="round">Final Wager Question:
                    <textarea
                        onChange={(e) => {setFormData({...formData, final_wager: e.target.value})}}
                        type='text'
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