import React, {useState}from "react"

function TriviaForm({addNewTrivia, handleAddQuestion}){

    const [formData, setFormData] = useState({letter:'', round:'', song:'', question:'', answer:''})
    // eslint-disable-next-line
    const [adding, setAdding] = useState(true)

    console.log('handleAddQuestion prop:', handleAddQuestion)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:5555/trivia`, {
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

            .then(newTrivia => addNewTrivia(newTrivia))
                resetForm()
                setAdding(false)

            .catch(error => {
                console.error('There was an error updating the card:', error)
                // Provide feedback to the user about the error if needed
            })
    }

    const resetForm = () => {
        setFormData({ letter: '', round: '', song: '', question: '', answer: '' });
    }

    const cancel = () =>{
        resetForm()
        setAdding(false)
        handleAddQuestion()
    }


    return(
        <div className="add-mode">
            <label htmlFor="letter">Letter:
                <input
                    onChange={(e) => {setFormData({...formData, letter: e.target.value})}}
                    type='text'
                    placeholder="Letter . . ."
                    className="input-text"
                    value={formData.letter}
                />
            </label>
            <label htmlFor="round">Round:
                <input
                    onChange={(e) => {setFormData({...formData, round: e.target.value})}}
                    type='text'
                    placeholder="Round . . ."
                    className="input-text"
                    value={formData.round}
                />
            </label>
            <label htmlFor="song">Song:
                <input
                    onChange={(e) => {setFormData({...formData, song: e.target.value})}}
                    type='text'
                    placeholder="Song . . ."
                    className="input-text"
                    value={formData.song}
                />
            </label>
            <label htmlFor="question">Question:
                <textarea
                    onChange={(e) => {setFormData({...formData, question: e.target.value})}}
                    type='text'
                    placeholder="Question . . ."
                    className="input-text"
                    value={formData.question}
                />
            </label>
            <label htmlFor="answer">Answer:
                <textarea
                    onChange={(e) => {setFormData({...formData, answer: e.target.value})}}
                    type='text'
                    placeholder="Answer . . ."
                    className="input-text"
                    value={formData.answer}
                />
            </label>
            <div className="submit-and-cancel-buttons">
                <button className='save'onClick={handleSubmit}>Save</button>
                <button className='save'onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}

export default TriviaForm