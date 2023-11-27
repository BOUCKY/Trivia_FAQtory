function TriviaCard({round, song, question, answer}){
    return(
        <div className="trivia-card-container">
            <div className="trivia-card">
                <div className="trivia-card-content">
                    <p className="trivia-card-round">{round}</p>
                    <p className="trivia-card-title">Song: <p className="info">{song}</p></p>
                    <p className="trivia-card-title">Question: <p className="info">{question}</p></p>
                    <p className="trivia-card-title">Answer: <p className="info">{answer}</p></p>
                </div>
            </div>
        </div>
    )
}

export default TriviaCard