import React, {useState}from "react"


function HiddenForm({addNewHidden, handleAddQuestion}){

    const [formData, setFormData] = useState({letter:'', theme:'', song1:'', song2:'', song3:'', song4:'', question1:'', question2:'', question3:'', question4:'', question5:'', answer1:'', answer2:'', answer3:'', answer4:'', answer5:''})
    // eslint-disable-next-line
    const [adding, setAdding] = useState(true)


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:5555/hidden`, {
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

            .then(newHidden => addNewHidden(newHidden))
                resetForm()
                setAdding(false)

            .catch(error => {
                console.error('There was an error updating the card:', error)
                // Provide feedback to the user about the error if needed
            })
    }

    const resetForm = () => {
        setFormData({etter:'', theme:'', song1:'', song2:'', song3:'', song4:'', question1:'', question2:'', question3:'', question4:'', question5:'', answer1:'', answer2:'', answer3:'', answer4:'', answer5:''});
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
                    <p>Add A Hidden Theme Round!</p>
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
                <label htmlFor="theme">Theme:
                    <input
                        onChange={(e) => {setFormData({...formData, theme: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.theme}
                    />
                </label>
                <label htmlFor="song1">Song:
                    <input
                        onChange={(e) => {setFormData({...formData, song1: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.song1}
                    />
                </label>
                <label htmlFor="song2">Song:
                    <input
                        onChange={(e) => {setFormData({...formData, song2: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.song2}
                    />
                </label>
                <label htmlFor="song3">Song:
                    <input
                        onChange={(e) => {setFormData({...formData, song3: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.song3}
                    />
                </label>
                <label htmlFor="song4">Song:
                    <input
                        onChange={(e) => {setFormData({...formData, song4: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.song4}
                    />
                </label>
                <label htmlFor="question1">Question 1:
                    <textarea
                        onChange={(e) => {setFormData({...formData, question1: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.question1}
                    />
                </label>
                <label htmlFor="answer1">Answer:
                    <textarea
                        onChange={(e) => {setFormData({...formData, answer1: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.answer1}
                    />
                </label>
                <label htmlFor="question2">Question 2:
                    <textarea
                        onChange={(e) => {setFormData({...formData, question2: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.question2}
                    />
                </label>
                <label htmlFor="answer2">Answer:
                    <textarea
                        onChange={(e) => {setFormData({...formData, answer2: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.answer2}
                    />
                </label>
                <label htmlFor="question3">Question 3:
                    <textarea
                        onChange={(e) => {setFormData({...formData, question3: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.question3}
                    />
                </label>
                <label htmlFor="answer3">Answer:
                    <textarea
                        onChange={(e) => {setFormData({...formData, answer3: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.answer3}
                    />
                </label>
                <label htmlFor="question4">Question 4:
                    <textarea
                        onChange={(e) => {setFormData({...formData, question4: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.question4}
                    />
                </label>
                <label htmlFor="answer4">Answer:
                    <textarea
                        onChange={(e) => {setFormData({...formData, answer4: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.answer4}
                    />
                </label>
                <label htmlFor="question5">Question 5:
                    <textarea
                        onChange={(e) => {setFormData({...formData, question5: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.question5}
                    />
                </label>
                <label htmlFor="answer5">Answer:
                    <textarea
                        onChange={(e) => {setFormData({...formData, answer5: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.answer5}
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

export default HiddenForm