import React, { useState } from 'react';
import '../index.css'; 
import {HeaderBar} from './GenerateHeader.js';
import {SearchBar} from './StudentSearch.js';

export default function App() {
    return (
        <>
        <HeaderBar></HeaderBar>
        <main>
            <SearchBar></SearchBar>
        </main>
        </>
    );
}