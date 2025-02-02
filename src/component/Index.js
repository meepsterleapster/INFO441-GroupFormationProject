import React, { useState } from "react";
import "../index.css";
import { SearchBar } from './StudentSearch.js';
import { CardsPanel } from "./GenerateCards.js";

export function StudentPool({resourceData}){
    return (
        <>
        <SearchBar></SearchBar>
        <CardsPanel resourceData = {resourceData}></CardsPanel>
        </>
    );
}