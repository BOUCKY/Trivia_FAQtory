import React, {useState}from "react"

function FinalForm({addNewTrivia, setClick}){

    const [formData, setFormData] = useState({question:'', answer:''})

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/final`, {
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
                addNewTrivia(data)
            })

        resetForm()
        setClick(false)

    }

    const resetForm = () => {
        setFormData({ question: '', answer: '' });
    }

    const cancel = () =>{
        resetForm()
        setClick(false)
    }


    return(
        <div className="add-mode">
            <div className="form-box">
                <div className="form-heading">
                    <p>Add A Final Wager Question!</p>
                </div>
                <label htmlFor="question">Question:
                    <textarea
                        onChange={(e) => {setFormData({...formData, question: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.question}
                    />
                </label>
                <label htmlFor="answer">Answer:
                    <textarea
                        onChange={(e) => {setFormData({...formData, answer: e.target.value})}}
                        type='text'
                        placeholder=". . ."
                        className="input-text"
                        value={formData.answer}
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

export default FinalForm