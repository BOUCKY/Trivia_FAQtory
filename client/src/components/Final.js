import React, {useState, useEffect}from "react"
import FinalCard from './FinalCard'
import '../styling/Home.css'
import Logo from '../logo.png'

function Final(){

    // -----PAGE TITLE-----
    useEffect(() => {
        document.title="Trivia FAQtory | Wager Questions"
    }, [])

    // -----STATES-----
    const [trivia, setTrivia] = useState([])
    const [search, setSearch] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('question')

    // -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('http://127.0.0.1:5555/final')
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

    const filterFinalBySearch = () => {
        return trivia.filter(final_card =>
            (final_card[selectedFilter] && final_card[selectedFilter].toLowerCase().includes(search.toLowerCase()))
        );
    }

    const filteredFinal = filterFinalBySearch()

    return(
        <div className="trivia-list">
            <div className="trivia-heading">
                <img className="big-logo" src={Logo} alt='Logo' />
                <div className="final-search">
                    <select className="search-select"value={selectedFilter} onChange={handleFilterChange}>
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
                {filteredFinal.map(filtered_trivia => (
                    <FinalCard
                        key={filtered_trivia.id}
                        question={filtered_trivia.question}
                        answer={filtered_trivia.answer}
                    />
                ))}
            </div>
        </div>
    )

}

export default Final