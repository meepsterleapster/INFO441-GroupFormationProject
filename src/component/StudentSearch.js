import '../index.css';
import React, { useState } from "react";

export function SearchBar({}){

    const [searchInput, setsearchInput] = useState('');
    
    const handleInputChange = (event) => {
        setsearchInput(event.target.value);
    };

    const handleSearchClick = () => {
        return;
    }
    return (
        <div className="search">
        <input
            type="text"
            placeholder="Search by name or role..."
            value={searchInput}
            onChange={handleInputChange}
        />
        <button className="search_button" onClick={handleSearchClick}>
            search
        </button>
        </div>
    );
}