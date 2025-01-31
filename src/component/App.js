import React, { useState } from 'react';
import '../index.css'; 
import {HeaderBar} from './GenerateHeader.js';
import {SearchBar} from './StudentSearch.js';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Projects } from "./Projects";
import { CreateProject } from "./CreateProject";
import { Profile } from "./Profile";

export default function App() {
    return (
        <Router>
            <HeaderBar></HeaderBar>
            <ConditionalSearchBar />
            <main>
                <Routes>
                    <Route path="/" element={<Projects />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/create-project" element={<CreateProject />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>
        </Router>
    );
}


function ConditionalSearchBar() {
    const location = useLocation();
    const hiddenRoutes = ["/projects", "/create-project"]; // 这里列出不想显示 SearchBar 的页面

    if (hiddenRoutes.includes(location.pathname)) {
        return null; 
    }

    return <SearchBar />;
}