import React, {useState, useEffect}from "react"
import FinalCard from './FinalCard'
import FinalForm from "./FinalForm"
import '../styling/Home.css'
import Logo from '../logo.png'

function Final(){

    // -----PAGE TITLE-----
    useEffect(() => {
        document.title="Trivia FAQtory | Wager Questions"
    }, [])

    // -----STATES-----
    const [trivia, setTrivia] = useState([])
    const [search, setSearch] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('question')
    const [click, setClick] = useState(false)

    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('http://127.0.0.1:5555/final')
        .then(r => r.json())
        .then(data => setTrivia(data))
    },[])

    // ----- FUNCTIONALITY-----
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    }

    const filterFinalBySearch = () => {
        return trivia.filter(final_card =>
            (final_card[selectedFilter] && final_card[selectedFilter].toLowerCase().includes(search.toLowerCase()))
        );
    }

    const filteredFinal = filterFinalBySearch()

    // Delete function
    const removeCard = (id) => {
        setTrivia((currentCard) => 
            currentCard.filter((card) => card.id !== id)
        )
    }

    // Edit funcitons
    const updateQuestion = (cardId, newQuestion) => {
        fetch(`http://127.0.0.1:5555/final/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: newQuestion }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(updatedCard => {
            setTrivia(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, question: updatedCard.question } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the question:', error)
        })
    }

    const updateAnswer = (cardId, newAnswer) => {
        fetch(`http://127.0.0.1:5555/final/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer: newAnswer }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(updatedCard => {
            setTrivia(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, answer: updatedCard.answer } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the answer:', error)
        })
    }

        // Add A Question Button Functionality
        const handleAddQuestion = () => {
            setClick(prevClick => !prevClick)
        }
    
        const addNewTrivia = (newTrivia) => {
            setTrivia([...trivia, newTrivia])
        }

    return(
        click ? 
        (<div className="test">
            <FinalForm addNewTrivia={addNewTrivia} handleAddQuestion={handleAddQuestion} />
        </div>) 
        :(
            <div className="trivia-list">
                 <div className="logo-box">
                    <img className="big-logo" src={Logo} alt='Logo' />
                </div>
                <div className="final-heading">
                    <div className="final-search">
                        <select className="search-select"value={selectedFilter} onChange={handleFilterChange}>
                            <option value="question">Search By: Question</option>
                            <option value="answer">Search By: Answer</option>
                        </select>
                        <input
                            className="search-input"
                            type="text"
                            placeholder={`Search by ${selectedFilter}`}
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="add">
                        <button className="add-questions" onClick={handleAddQuestion}>Add A Question</button>
                    </div>
                </div>
                <div className="trivia-body">
                    {filteredFinal.map(filtered_trivia => (
                        <FinalCard
                            key={filtered_trivia.id}
                            id={filtered_trivia.id}
                            question={filtered_trivia.question}
                            answer={filtered_trivia.answer}
                            setQuestion={newQuestion => updateQuestion(filtered_trivia.id, newQuestion)}
                            setAnswer={newAnswer => updateAnswer(filtered_trivia.id, newAnswer)}
                            removeCard={removeCard}
                        />
                    ))}
                </div>
            </div>
        )
    )

}

export default Final