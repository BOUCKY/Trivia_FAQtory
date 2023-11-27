import React, {useState, useEffect}from "react"
import HiddenCard from './HiddenCard'
import '../styling/Home.css'
import Logo from '../logo.png'


function Hidden(){

    // -----PAGE TITLE-----
    useEffect(() => {
        document.title="Trivia FAQtory | Hidden Theme"
    }, [])


    // -----STATES-----
    const [hidden, setHidden] = useState([])
    const [search, setSearch] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('letter')

    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('http://127.0.0.1:5555/hidden')
        .then(r => r.json())
        .then(data => setHidden(data))
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


    const concatenateQuestions = (hiddenData) => {
        const questionsArray = [
          hiddenData.question1,
          hiddenData.question2,
          hiddenData.question3,
          hiddenData.question4,
          hiddenData.question5,
        ]
        return questionsArray.join(' ') // Concatenate all questions into a single string
      }
    
    const concatenateAnswers = (hiddenData) => {
        const answersArray = [
          hiddenData.answer1,
          hiddenData.answer2,
          hiddenData.answer3,
          hiddenData.answer4,
          hiddenData.answer5,
        ]
        return answersArray.join(' ') // Concatenate all answers into a single string
      }


    // Function to filter trivia based on the starting letter
    const filterHiddenByLetterAndSearch = (letter) => {
        return hidden.filter((trivia_question) => {
          let selectedAttribute;
          if (selectedFilter === 'question') {
            selectedAttribute = concatenateQuestions(trivia_question);
          } else if (selectedFilter === 'answer') {
            selectedAttribute = concatenateAnswers(trivia_question);
          } else {
            selectedAttribute = trivia_question[selectedFilter];
          }
    
          return (
            trivia_question.letter &&
            trivia_question.letter.toLowerCase() === letter.toLowerCase() &&
            selectedAttribute &&
            selectedAttribute.toLowerCase().includes(search.toLowerCase())
          )
        })
      }

    // Function to check if there are filtered trivia items for each letter
    const getFilteredLetters = () => {
        const filteredLetters = {};
        letters.forEach(letter => {
            const filteredHidden = filterHiddenByLetterAndSearch(letter);
            if (filteredHidden.length > 0) {
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
                            {filterHiddenByLetterAndSearch(letter).sort((a, b) => a.theme.localeCompare(b.theme)).map(filtered_hidden => (
                                <HiddenCard
                                    key={filtered_hidden.id}
                                    letter={filtered_hidden.letter}
                                    theme={filtered_hidden.theme}
                                    song1={filtered_hidden.song1}
                                    song2={filtered_hidden.song2}
                                    song3={filtered_hidden.song3}
                                    song4={filtered_hidden.song4}
                                    question1={filtered_hidden.question1}
                                    answer1={filtered_hidden.answer1}
                                    question2={filtered_hidden.question2}
                                    answer2={filtered_hidden.answer2}
                                    question3={filtered_hidden.question3}
                                    answer3={filtered_hidden.answer3}
                                    question4={filtered_hidden.question4}
                                    answer4={filtered_hidden.answer4}
                                    question5={filtered_hidden.question5}
                                    answer5={filtered_hidden.answer5}
                                />
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default Hidden