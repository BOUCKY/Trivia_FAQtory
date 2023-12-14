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
    const [trivia, setTrivia] = useState([])
    const [search, setSearch] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('letter')
    const [click, setClick] = useState(false)


    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('http://127.0.0.1:5555/game')
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

    const letters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 
        'Y', 'Z'
    ]    

    // Function to filter trivia based on the starting letter
    const filterGameByLetterAndSearch = (letter) => {
        return trivia.filter(trivia_question =>
            trivia_question.letter && 
            trivia_question.letter.toLowerCase() === letter.toLowerCase() &&
            (trivia_question[selectedFilter] && trivia_question[selectedFilter].toLowerCase().includes(search.toLowerCase()))
        );
    };

    // Function to check if there are filtered trivia items for each letter
    const getFilteredLetters = () => {
        const filteredLetters = {};
        letters.forEach(letter => {
            const filteredTrivia = filterGameByLetterAndSearch(letter);
            if (filteredTrivia.length > 0) {
                filteredLetters[letter] = true;
            }
        });
        return filteredLetters;
    };

    const filteredLetters = getFilteredLetters();

    // Delete function
    const removeCard = (id) => {
        setTrivia((currentCard) => 
            currentCard.filter((card) => card.id !== id)
        )
    }

    // Add A Question Button Functionality
    const handleAddQuestion = () => {
        setClick(prevClick => !prevClick)
    }

    const addNewGame = (newTrivia) => {
        setTrivia([...trivia, newTrivia])
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
                    <select className="search-select"value={selectedFilter} onChange={handleFilterChange}>
                        <option value="letter">Search By: Letter</option>
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
                        <div key={letter}>
                            <p className="letter-heading">{letter}</p>
                            {filterGameByLetterAndSearch(letter).sort((a, b) => a.letter.localeCompare(b.letter)).map(filtered_game => (
                                <GameCard
                                    key={filtered_game.id}
                                    id={filtered_game.id}
                                    letter={filtered_game.letter}
                                    round1={filtered_game.round1_id}
                                    round2={filtered_game.round2_id}
                                    round3={filtered_game.round3_id}
                                    round4={filtered_game.round4_id}
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