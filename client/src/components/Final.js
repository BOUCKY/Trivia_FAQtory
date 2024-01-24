import React, {useState, useEffect}from "react"
import FinalCard from './FinalCard'
import FinalForm from "./FinalForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDice} from '@fortawesome/free-solid-svg-icons'
import '../styling/Home.css'
import Logo from '../logo.png'

function Final(){

    // -----PAGE TITLE-----
    useEffect(() => {
        document.title="Trivia FAQtory | Wager Questions"
    }, [])

    const dice = <FontAwesomeIcon icon={faDice} />

    // -----STATES-----
    const [trivia, setTrivia] = useState([])
    const [search, setSearch] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('question')
    const [click, setClick] = useState(false)
    const [randomQuestion, setRandomQuestion] = useState(null)

    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('https://triviafaqtory-super-secret-backend.onrender.com/final')
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
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/final/${cardId}`, {
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
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/final/${cardId}`, {
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

        // Generate A Random Question
        const handleGetRandomQuestion = () => {
            // Check if there are questions available
            if (trivia.length > 0) {
              // Get a random index
              const randomIndex = Math.floor(Math.random() * trivia.length);
              // Set the random question
              setRandomQuestion(trivia[randomIndex]);
            }
        }

    return(
        click ? 
        (<div className="test">
            <FinalForm addNewTrivia={addNewTrivia} setClick={setClick} />
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
                        <button className="get-random-question" onClick={handleGetRandomQuestion}>{dice}</button>
                    </div>
                </div>
                <div className="trivia-body">
                {/* Display the randomly selected question */}
                {randomQuestion && (
                    <div className="random-question-box">
                    <p className="random-question-title">Random Question:</p>
                    <div className="random-question">
                        <FinalCard
                            key={randomQuestion.id}
                            id={randomQuestion.id}
                            question={randomQuestion.question}
                            answer={randomQuestion.answer}
                            setQuestion={newQuestion => updateQuestion(randomQuestion.id, newQuestion)}
                            setAnswer={newAnswer => updateAnswer(randomQuestion.id, newAnswer)}
                            removeCard={() => removeCard(randomQuestion.id)}
                        />
                    </div>
                    </div>
                )}
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