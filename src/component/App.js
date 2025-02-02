import React, { useState } from 'react';
import '../index.css'; 
import {HeaderBar} from './GenerateHeader.js';
import { StudentPool } from './Index.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Projects } from "./Projects";
import { CreateProject } from "./CreateProject";
import { UploadProfile } from './Profile.js';

import INITIAL_DATA from '../data/studentdata.json';
import PRO_DATA from '../data/projectdata.json';

export default function App() {
    return (
        <Router>
            <HeaderBar></HeaderBar>
            <main>
                <Routes>
                    <Route path="/" element={<StudentPool resourceData={INITIAL_DATA}/>} />
                    <Route path="/projects" element={<Projects resourceData={PRO_DATA}/>} />
                    <Route path="/create-project" element={<CreateProject />} />
                    <Route path="/profile" element={<UploadProfile />} />
                </Routes>
            </main>
        </Router>
    );
}