import React, {useState, useEffect}from "react"
import TriviaCard from "./TriviaCard"
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

    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('http://127.0.0.1:5555/trivia')
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
    const filterTriviaByLetterAndSearch = (letter) => {
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
            const filteredTrivia = filterTriviaByLetterAndSearch(letter);
            if (filteredTrivia.length > 0) {
                filteredLetters[letter] = true;
            }
        });
        return filteredLetters;
    };

    const filteredLetters = getFilteredLetters();


    return(
        <div className="trivia-list">
            <div className="trivia-heading">
                <img className="big-logo" src={Logo} alt='Logo' />
                <div className="trivia-search">
                    <select className="search-select"value={selectedFilter} onChange={handleFilterChange}>
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
            </div>
            <div className="trivia-body">
                {letters.map(letter => (
                    filteredLetters[letter] && (
                        <div key={letter}>
                            <p className="letter-heading">{letter}</p>
                            {filterTriviaByLetterAndSearch(letter).map(filtered_trivia => (
                                <TriviaCard
                                    key={filtered_trivia.id}
                                    letter={filtered_trivia.letter}
                                    round={filtered_trivia.round}
                                    song={filtered_trivia.song}
                                    question={filtered_trivia.question}
                                    answer={filtered_trivia.answer}
                                />
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default Home