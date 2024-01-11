import React, {useState, useEffect}from "react"
import GameCard from "./GameCard"
import GameForm from "./GameForm"
import '../styling/Home.css'
import Logo from '../logo.png'

function Games(){

    // -----PAGE TITLE-----
    useEffect(() => {
        document.title="Trivia FAQtory | Games"
    }, [])

    // -----STATES-----
    const [game, setGame] = useState([])
    const [search, setSearch] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('letter')
    const [click, setClick] = useState(false)

    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('http://127.0.0.1:5555/game',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add any other necessary headers
        },
    })


        .then(r => r.json())
        .then(data => setGame(data))
        .catch(error => {
            console.error('Error during fetch:', error);
            // Handle the error or provide feedback to the user if needed
        })
    }, [])

    // -----FUNCTIONALITY-----
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
    const filterGameByLetterAndSearch = (letter) => {
        return game.filter(game_question =>
            game_question.letter && 
            game_question.letter.toLowerCase() === letter.toLowerCase() &&
            (game_question[selectedFilter] && game_question[selectedFilter].toLowerCase().includes(search.toLowerCase()))
        )
    }

    // Function to check if there are filtered trivia items for each letter
    const getFilteredLetters = () => {
        const filteredLetters = {}
        letters.forEach(letter => {
            const filteredTrivia = filterGameByLetterAndSearch(letter);
            if (filteredTrivia.length > 0) {
                filteredLetters[letter] = true
            }
        })
        return filteredLetters
    }

    const filteredLetters = getFilteredLetters()


    // Delete Function
    const removeCard = (id) => {
        setGame((currentCard) => currentCard.filter((card) => card.id !== id))
    }

    // Edit Functions
    // HEADINGS
    const updateName = (cardId, newName) => {
        fetch(`http://127.0.0.1:5555/game/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(updatedCard => {
            setGame(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, name: updatedCard.name } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the name:', error)
        })
    }

    const updateDate = (cardId, newDate) => {
        fetch(`http://127.0.0.1:5555/game/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: newDate }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(updatedCard => {
            setGame(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, date: updatedCard.date } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the round:', error)
        })
    }

    const updateLetter = (cardId, newLetter) => {
        fetch(`http://127.0.0.1:5555/game/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ letter: newLetter }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(updatedCard => {
            setGame(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, letter: updatedCard.letter } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the round:', error)
        })
    }


    // REGULAR ROUNDS   
    const updateRound1 = (cardId, newRound) => {
        fetch(`http://127.0.0.1:5555/game/${cardId}`, {
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
            setGame(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, round1: updatedCard.round1 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the round:', error)
        })
    }

    const updateRound2 = (cardId, newRound) => {
        fetch(`http://127.0.0.1:5555/game/${cardId}`, {
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
            setGame(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, round2: updatedCard.round2 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the round:', error)
        })
    }

    const updateRound3 = (cardId, newRound) => {
        fetch(`http://127.0.0.1:5555/game/${cardId}`, {
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
            setGame(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, round3: updatedCard.round3 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the round:', error)
        })
    }

    const updateRound4 = (cardId, newRound) => {
        fetch(`http://127.0.0.1:5555/game/${cardId}`, {
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
            setGame(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, round4: updatedCard.round4 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the round:', error)
        })
    }

    // HIDDEN THEME ROUND
    const updateHidden = (cardId, newHidden) => {
        fetch(`http://127.0.0.1:5555/game/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hidden: newHidden }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(updatedCard => {
            setGame(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, hidden: updatedCard.hidden } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the round:', error)
        })
    }

    // PLAYER CHOSEN ROUND
    const updatePlayer = (cardId, newPlayer) => {
        fetch(`http://127.0.0.1:5555/game/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player: newPlayer }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(updatedCard => {
            setGame(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, player: updatedCard.player } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the round:', error)
        })
    }

    // FINAL WAGER
    const updateFinal = (cardId, newFinal) => {
        fetch(`http://127.0.0.1:5555/game/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ final: newFinal }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(updatedCard => {
            setGame(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, final: updatedCard.final } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the round:', error)
        })
    }

    // Add a Game Functionality
    const handleAddQuestion = () =>{
        setClick(prevCLick => !prevCLick)
    }

    const addNewGame = (newGame) => {
        setGame([...game, newGame])
    }


    return(
        click ? 
        (<div className="test">
            <GameForm addNewGame={addNewGame} setClick={setClick} />
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
                        <option value="name">Search By: Name</option>
                        <option value="date">Search By: Date</option>
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
                    <button className="add-questions" onClick={handleAddQuestion}>Add A Game</button>
                </div>
            </div>
            <div className="trivia-body">
            {letters.map(letter => (
                filteredLetters[letter] && (
                    <div key={letter}>
                        <p className="letter-heading">{letter}</p>
                        {filterGameByLetterAndSearch(letter).sort((a, b) => a.round.localeCompare(b.round)).map(filtered_game => (
                                <GameCard
                                    key={filtered_game.id}
                                    id={filtered_game.id}
                                    name={filtered_game.name}
                                    date={filtered_game.date}
                                    letter={filtered_game.letter}
                                    round1={filtered_game.round1}
                                    round2={filtered_game.round2}
                                    round3={filtered_game.round3}
                                    round4={filtered_game.round4}
                                    hidden={filtered_game.hidden_round}
                                    player={filtered_game.player_round}
                                    final={filtered_game.final_wager}
                                    setName={newName => updateName(filtered_game.id, newName)}
                                    setDate={newDate => updateDate(filtered_game.id, newDate)}
                                    setLetter={newLetter => updateLetter(filtered_game.id, newLetter)}
                                    setRound1={newRound => updateRound1(filtered_game.id, newRound)}
                                    setRound2={newRound => updateRound2(filtered_game.id, newRound)}
                                    setRound3={newRound => updateRound3(filtered_game.id, newRound)}
                                    setRound4={newRound => updateRound4(filtered_game.id, newRound)}
                                    setHidden={newHidden => updateHidden(filtered_game.id, newHidden)}
                                    setPlayer={newPlayer=> updatePlayer(filtered_game.id, newPlayer)}
                                    setFinal={newFinal => updateFinal(filtered_game.id, newFinal)}
                                    removeCard={removeCard}
                                />
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>) 
    )
}

export default Games

