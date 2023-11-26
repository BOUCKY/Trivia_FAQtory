import { NavLink } from "react-router-dom";
import { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styling/Navbar.css'


function Navbar(){

    // Tab state + toggle
    const [currentTab, setCurrentTab] = useState("home")
    const handleTab = (tab) => {
        setCurrentTab(tab)
    }

    // Sense when a different tab is clicked
    const [navClick, setNavClick] = useState(false)
    const handleNavClick = () => {
        setNavClick(!navClick)
    }

    return(
        <div className="header">
            <div className="left-side-nav">
                <p>TRIVIA FAQTORY</p>
            </div>
            <div>
                <button className="mobile" onClick={handleNavClick}>
                    {navClick ? <FontAwesomeIcon icon={faTimes} size="2x" /> : <FontAwesomeIcon icon={faBars} size="2x" />}
                </button>
            </div>
            <div className={`nav-bar ${navClick ? 'active' : ''}`}>
                <li className="nav-bar-list"><NavLink className={`nav-bar-link ${currentTab === "home" ? 'underline' : ''}`} onClick={() => {handleNavClick(); handleTab('home');}} to="home">Home</NavLink></li>
                <li className="nav-bar-list"><NavLink className={`nav-bar-link ${currentTab === "games" ? 'underline' : ''}`} onClick={() => {handleNavClick(); handleTab('games');}} to="games">Games</NavLink></li>
                <li className="nav-bar-list"><NavLink className={`nav-bar-link ${currentTab === "hidden" ? 'underline' : ''}`} onClick={() => {handleNavClick(); handleTab('hidden');}} to="hidden">Hidden Theme</NavLink></li>
                <li className="nav-bar-list"><NavLink className={`nav-bar-link ${currentTab === "player" ? 'underline' : ''}`} onClick={() => {handleNavClick(); handleTab('player');}} to="player">Player Chosen</NavLink></li>
                <li className="nav-bar-list"><NavLink className={`nav-bar-link ${currentTab === "final" ? 'underline' : ''}`} onClick={() => {handleNavClick(); handleTab('final');}} to="final">Wager Questions</NavLink></li>

            </div>
        </div>
    )
}

export default Navbar