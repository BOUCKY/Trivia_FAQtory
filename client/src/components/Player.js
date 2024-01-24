import React, {useState, useEffect}from "react"
import PlayerCard from "./PlayerCard"
import PlayerForm from "./PlayerForm"
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
    const [click, setClick] = useState(false)


    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('https://triviafaqtory-super-secret-backend.onrender.com/player')
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

    // Delete function
    const removeCard = (id) => {
        setPlayer((currentCard) => 
            currentCard.filter((card) => card.id !== id)
        )
    }

    // Edit funcitons
    // QUESTIONS   
    const updateQuestion1 = (cardId, newQuestion) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/player/${cardId}`, {
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
            setPlayer(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, question1: updatedCard.question1 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the question:', error)
        })
    }

    const updateQuestion2 = (cardId, newQuestion) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/player/${cardId}`, {
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
            setPlayer(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, question2: updatedCard.question2 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the question:', error)
        })
    }

    const updateQuestion3 = (cardId, newQuestion) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/player/${cardId}`, {
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
            setPlayer(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, question3: updatedCard.question3 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the question:', error)
        })
    }

    // ANSWERS
    const updateAnswer1 = (cardId, newAnswer) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/player/${cardId}`, {
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
            setPlayer(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, answer1: updatedCard.answer1 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the answer:', error)
        })
    }

    const updateAnswer2 = (cardId, newAnswer) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/player/${cardId}`, {
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
            setPlayer(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, answer2: updatedCard.answer2 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the answer:', error)
        })
    }

    const updateAnswer3 = (cardId, newAnswer) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/player/${cardId}`, {
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
            setPlayer(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, answer3: updatedCard.answer3 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the answer:', error)
        })
    }

    // SONGS
    const updateSong1 = (cardId, newSong) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/player/${cardId}`, {
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
            setPlayer(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, song1: updatedCard.song1 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the song:', error);
        })
    }

    const updateSong2 = (cardId, newSong) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/player/${cardId}`, {
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
            setPlayer(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, song2: updatedCard.song2 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the song:', error);
        })
    }

    const updateSong3 = (cardId, newSong) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/player/${cardId}`, {
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
            setPlayer(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, song3: updatedCard.song3 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the song:', error);
        })
    }
    
    // THEME
    const updateTheme = (cardId, newTheme) => {
        fetch(`https://triviafaqtory-super-secret-backend.onrender.com/player/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ theme: newTheme }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(updatedCard => {
            setPlayer(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, theme: updatedCard.theme } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the theme:', error)
        })
    }

    // Add A Question Button Functionality
    const handleAddQuestion = () => {
        setClick(prevClick => !prevClick)
    }

    const addNewPlayer = (newPlayer) => {
        setPlayer([...player, newPlayer])
    }


    return(
        click ? 
        (<div className="test">
            <PlayerForm addNewPlayer={addNewPlayer} setClick={setClick} />
        </div>) 
        :
        (<div className="trivia-list">
            <div className="logo-box">
                <img className="big-logo" src={Logo} alt='Logo' />
            </div>
            <div className="trivia-heading">
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
                <div className="add">
                    <button className="add-questions" onClick={handleAddQuestion}>Add A Question</button>
                </div>
            </div>
            <div className="trivia-body">
                {letters.map(letter => (
                    filteredLetters[letter] && (
                        <div className="body-box" key={letter}>
                            <p className="letter-heading">{letter}</p>
                            {filterTriviaByLetterAndSearch(letter).sort((a, b) => a.theme.localeCompare(b.theme)).map(filtered_player => (
                                <PlayerCard
                                    key={filtered_player.id}
                                    id={filtered_player.id}
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
                                    removeCard={removeCard}
                                    setTheme={newTheme => updateTheme(filtered_player.id, newTheme)}
                                    setSong1={newSong => updateSong1(filtered_player.id, newSong)}
                                    setSong2={newSong => updateSong2(filtered_player.id, newSong)}
                                    setSong3={newSong => updateSong3(filtered_player.id, newSong)}
                                    setQuestion1={newQuestion => updateQuestion1(filtered_player.id, newQuestion)}
                                    setQuestion2={newQuestion => updateQuestion2(filtered_player.id, newQuestion)}
                                    setQuestion3={newQuestion => updateQuestion3(filtered_player.id, newQuestion)}
                                    setAnswer1={newAnswer => updateAnswer1(filtered_player.id, newAnswer)}
                                    setAnswer2={newAnswer => updateAnswer2(filtered_player.id, newAnswer)}
                                    setAnswer3={newAnswer => updateAnswer3(filtered_player.id, newAnswer)}
                                />
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>)
    )
}

export default Player