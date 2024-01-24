import React, {useState, useEffect}from "react"
import TriviaCard from "./TriviaCard"
import TriviaForm from "./TriviaForm"
import '../styling/Home.css'
import Logo from '../logo.png'


function Home(){

    // -----PAGE TITLE-----
    useEffect(() => {
        document.title="Trivia FAQtory | Home"
    }, [])


    // -----STATES-----
    const [trivia, setTrivia] = useState([])
    const [search, setSearch] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('letter')
    const [click, setClick] = useState(false)


    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('https://triviafaqtory-super-secret-backend.onrender.com/trivia')
        .then(r => r.json())
        .then(data => setTrivia(data))
    },[])
    

    // ----- FUNCTIONALITY-----
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value)
    }

    const letters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]    

    // Function to filter trivia based on the starting letter
    const filterTriviaByLetterAndSearch = (letter) => {
        return trivia.filter(trivia_question =>
            trivia_question.letter && 
            trivia_question.letter.toLowerCase() === letter.toLowerCase() &&
            (trivia_question[selectedFilter] && trivia_question[selectedFilter].toLowerCase().includes(search.toLowerCase()))
        )
    }

    // Function to check if there are filtered trivia items for each letter
    const getFilteredLetters = () => {
        const filteredLetters = {}
        letters.forEach(letter => {
            const filteredTrivia = filterTriviaByLetterAndSearch(letter);
            if (filteredTrivia.length > 0) {
                filteredLetters[letter] = true
            }
        })
        return filteredLetters
    }

    const filteredLetters = getFilteredLetters();

    // Delete function
    const removeCard = (id) => {
        setTrivia((currentCard) => 
            currentCard.filter((card) => card.id !== id)
        )
    }

    // Edit funcitons
    const updateQuestion = (cardId, newQuestion) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/trivia/${cardId}`, {
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
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/trivia/${cardId}`, {
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

    const updateSong = (cardId, newSong) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/trivia/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ song: newSong }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedCard => {
            setTrivia(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, song: updatedCard.song } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the song:', error);
        })
    }
    
    const updateRound = (cardId, newRound) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/trivia/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ round: newRound }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(updatedCard => {
            setTrivia(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, round: updatedCard.round } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the round:', error)
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
            <TriviaForm addNewTrivia={addNewTrivia} handleAddQuestion={handleAddQuestion} setClick={setClick} />
        </div>) 
        :
        ( <div className="trivia-list">
            <div className="logo-box">
                <img className="big-logo" src={Logo} alt='Logo' />
            </div>
            <div className="trivia-heading">
                <div className="trivia-search">
                    <select className="search-select" value={selectedFilter} onChange={handleFilterChange}>
                        <option value="letter">Search By: Letter</option>
                        <option value="round">Search By: Round</option>
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
                {letters.map(letter => (
                    filteredLetters[letter] && (
                        <div className="body-box" key={letter}>
                            <p className="letter-heading">{letter}</p>
                            {filterTriviaByLetterAndSearch(letter).sort((a, b) => a.round.localeCompare(b.round)).map(filtered_trivia => (
                                <TriviaCard
                                    key={filtered_trivia.id}
                                    id={filtered_trivia.id}
                                    letter={filtered_trivia.letter}
                                    round={filtered_trivia.round}
                                    song={filtered_trivia.song}
                                    question={filtered_trivia.question}
                                    answer={filtered_trivia.answer}
                                    removeCard={removeCard}
                                    setRound={newRound => updateRound(filtered_trivia.id, newRound)}
                                    setSong={newSong => updateSong(filtered_trivia.id, newSong)}
                                    setQuestion={newQuestion => updateQuestion(filtered_trivia.id, newQuestion)}
                                    setAnswer={newAnswer => updateAnswer(filtered_trivia.id, newAnswer)}
                                />
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>) 
    )
}

export default Home