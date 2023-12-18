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
    const [click, setClick] = useState(false)

    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('http://127.0.0.1:5555/game')
        .then(r => r.json())
        .then(data => setGame(data))
    }, [])

    // -----FUNCTIONALITY-----
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const letters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]  

    const getFilteredLetters = () => {
        const filteredLetters = {}
        letters.forEach(single_letter => {
            const filteredGames = game.filter(game_question =>
                game_question.letter.charAt(0).toUpperCase() === single_letter &&
                game_question.letter.toLowerCase().startsWith(search.toLowerCase())
            )
            if (filteredGames.length > 0) {
                filteredLetters[single_letter] = true
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
            <GameForm addNewGame={addNewGame} handleAddQuestion={handleAddQuestion} />
        </div>) 
        :
        ( <div className="trivia-list">
            <div className="logo-box">
                <img className="big-logo" src={Logo} alt='Logo' />
            </div>
            <div className="trivia-heading">
                <div className="trivia-search">
                    <select className="search-select" defaultValue="letter">
                        <option value="letter">Search By: Letter</option>
                    </select>
                    <input
                        className="search-input"
                        type="text"
                        placeholder={`Search by Letter`}
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
                        {game
                            .filter(game_question =>
                                game_question.letter.charAt(0).toUpperCase() === letter &&
                                game_question.letter.toLowerCase().includes(search.toLowerCase())
                            )
                            .sort((a, b) => a.letter.localeCompare(b.letter))
                            .map(filtered_game => (
                                <GameCard
                                    key={filtered_game.id}
                                    id={filtered_game.id}
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