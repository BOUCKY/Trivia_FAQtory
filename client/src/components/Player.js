import React, {useState, useEffect}from "react"
import PlayerCard from "./PlayerCard"
import '../styling/Home.css'
import Logo from '../logo.png'


function Player(){

    // -----PAGE TITLE-----
    useEffect(() => {
        document.title="Trivia FAQtory | Player Chosen"
    }, [])


    // -----STATES-----
    const [player, setPlayer] = useState([])
    const [search, setSearch] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('theme')

    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('http://127.0.0.1:5555/player')
        .then(r => r.json())
        .then(data => setPlayer(data))
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

    const concatenateQuestions = (playerData) => {
        const questionsArray = [
          playerData.question1,
          playerData.question2,
          playerData.question3,
        ]
        return questionsArray.join(' '); // Concatenate all questions into a single string
      }

      const concatenateAnswers = (playerData) => {
        const answersArray = [
          playerData.answer1,
          playerData.answer2,
          playerData.answer3,
        ]
        return answersArray.join(' '); // Concatenate all answers into a single string
      }

      const filterTriviaByLetterAndSearch = (letter) => {
        return player.filter((trivia_question) => {
          let selectedAttribute;
          if (selectedFilter === 'question') {
            selectedAttribute = concatenateQuestions(trivia_question);
          } else if (selectedFilter === 'answer') {
            selectedAttribute = concatenateAnswers(trivia_question);
          } else {
            selectedAttribute = trivia_question[selectedFilter];
          }
    
          return (
            trivia_question.theme &&
            trivia_question.theme.toLowerCase().startsWith(letter.toLowerCase()) &&
            selectedAttribute &&
            selectedAttribute.toLowerCase().includes(search.toLowerCase())
          )
        })
      }

    // Function to check if there are filtered trivia items for each letter
    const getFilteredLetters = () => {
        const filteredLetters = {}
        letters.forEach(letter => {
            const filteredTrivia = filterTriviaByLetterAndSearch(letter)
            if (filteredTrivia.length > 0) {
                filteredLetters[letter] = true
            }
        })
        return filteredLetters;
    }

    const filteredLetters = getFilteredLetters()


    return(
        <div className="trivia-list">
            <div className="trivia-heading">
                <img className="big-logo" src={Logo} alt='Logo' />
                <div className="trivia-search">
                    <select className="search-select"value={selectedFilter} onChange={handleFilterChange}>
                        <option value="theme">Search By: Theme</option>
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
                            {filterTriviaByLetterAndSearch(letter).sort((a, b) => a.theme.localeCompare(b.theme)).map(filtered_player => (
                                <PlayerCard
                                    key={filtered_player.id}
                                    theme={filtered_player.theme}
                                    song1={filtered_player.song1}
                                    question1={filtered_player.question1}
                                    answer1={filtered_player.answer1}
                                    song2={filtered_player.song2}
                                    question2={filtered_player.question2}
                                    answer2={filtered_player.answer2}
                                    song3={filtered_player.song3}
                                    question3={filtered_player.question3}
                                    answer3={filtered_player.answer3}
                                />
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default Player