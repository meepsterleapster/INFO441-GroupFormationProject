import React, { useState } from "react";
import "../index.css";
import { SearchBar } from './StudentSearch.js';
import { CardsPanel } from "./GenerateCards.js";

export function StudentPool({resourceData, filterStudents}){
    return (
        <>
        <SearchBar filterStudents = {filterStudents}></SearchBar>
        <CardsPanel resourceData = {resourceData}></CardsPanel>
        </>
    );
}