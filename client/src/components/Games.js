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

