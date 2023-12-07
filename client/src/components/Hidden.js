import React, {useState, useEffect}from "react"
import HiddenCard from './HiddenCard'
import HiddenForm from "./HiddenForm"
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
    const [click, setClick] = useState(false)

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


     // Delete function
     const removeCard = (id) => {
        setHidden((currentCard) => 
            currentCard.filter((card) => card.id !== id)
        )
    }

    // Edit funcitons
    // QUESTIONS   
    const updateQuestion1 = (cardId, newQuestion) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, question1: updatedCard.question1 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the question:', error)
        })
    }

    const updateQuestion2 = (cardId, newQuestion) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, question2: updatedCard.question2 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the question:', error)
        })
    }

    const updateQuestion3 = (cardId, newQuestion) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, question3: updatedCard.question3 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the question:', error)
        })
    }

    const updateQuestion4 = (cardId, newQuestion) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, question4: updatedCard.question4 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the question:', error)
        })
    }

    const updateQuestion5 = (cardId, newQuestion) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, question5: updatedCard.question5 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the question:', error)
        })
    }

    // ANSWERS
    const updateAnswer1 = (cardId, newAnswer) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, answer1: updatedCard.answer1 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the answer:', error)
        })
    }

    const updateAnswer2 = (cardId, newAnswer) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, answer2: updatedCard.answer2 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the answer:', error)
        })
    }

    const updateAnswer3 = (cardId, newAnswer) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, answer3: updatedCard.answer3 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the answer:', error)
        })
    }

    const updateAnswer4 = (cardId, newAnswer) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, answer4: updatedCard.answer4 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the answer:', error)
        })
    }

    const updateAnswer5 = (cardId, newAnswer) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, answer5: updatedCard.answer5 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the answer:', error)
        })
    }

    // SONGS
    const updateSong1 = (cardId, newSong) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, song1: updatedCard.song1 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the song:', error);
        })
    }

    const updateSong2 = (cardId, newSong) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, song2: updatedCard.song2 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the song:', error);
        })
    }

    const updateSong3 = (cardId, newSong) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, song3: updatedCard.song3 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the song:', error);
        })
    }

    const updateSong4 = (cardId, newSong) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
                prevTrivia.map(card => (card.id === cardId ? { ...card, song4: updatedCard.song4 } : card))
            )
        })
        .catch(error => {
            console.error('There was an error updating the song:', error);
        })
    }
    
    // THEME
    const updateTheme = (cardId, newTheme) => {
        fetch(`http://127.0.0.1:5555/hidden/${cardId}`, {
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
            setHidden(prevTrivia =>
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

    const addNewHidden = (newHidden) => {
        setHidden([...hidden, newHidden])
    }



    return(
        click ? 
        (<div className="test">
            <HiddenForm addNewHidden={addNewHidden} handleAddQuestion={handleAddQuestion} />
        </div>) 
        :
        (<div className="trivia-list">
            <div className="logo-box">
                <img className="big-logo" src={Logo} alt='Logo' />
            </div>
            <div className="trivia-heading">
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
                <div className="add">
                    <button className="add-questions" onClick={handleAddQuestion}>Add A Question</button>
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
                                    id={filtered_hidden.id}
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
                                    removeCard={removeCard}
                                    setTheme={newTheme => updateTheme(filtered_hidden.id, newTheme)}
                                    setSong1={newSong => updateSong1(filtered_hidden.id, newSong)}
                                    setSong2={newSong => updateSong2(filtered_hidden.id, newSong)}
                                    setSong3={newSong => updateSong3(filtered_hidden.id, newSong)}
                                    setSong4={newSong => updateSong4(filtered_hidden.id, newSong)}
                                    setQuestion1={newQuestion => updateQuestion1(filtered_hidden.id, newQuestion)}
                                    setQuestion2={newQuestion => updateQuestion2(filtered_hidden.id, newQuestion)}
                                    setQuestion3={newQuestion => updateQuestion3(filtered_hidden.id, newQuestion)}
                                    setQuestion4={newQuestion => updateQuestion4(filtered_hidden.id, newQuestion)}
                                    setQuestion5={newQuestion => updateQuestion5(filtered_hidden.id, newQuestion)}
                                    setAnswer1={newAnswer => updateAnswer1(filtered_hidden.id, newAnswer)}
                                    setAnswer2={newAnswer => updateAnswer2(filtered_hidden.id, newAnswer)}
                                    setAnswer3={newAnswer => updateAnswer3(filtered_hidden.id, newAnswer)}
                                    setAnswer4={newAnswer => updateAnswer4(filtered_hidden.id, newAnswer)}
                                    setAnswer5={newAnswer => updateAnswer5(filtered_hidden.id, newAnswer)}
                                />
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>)
    )
}

export default Hidden