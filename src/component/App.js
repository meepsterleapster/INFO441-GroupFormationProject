import React, { useState } from 'react';
import '../index.css'; 
import {HeaderBar} from './GenerateHeader.js';
import { StudentPool } from './Index.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProjectsPanel } from "./ProjectsPanel.js";
import { CreateProject } from "./CreateProject";
import { UploadProfile } from './Profile.js';
import { MyProjects } from './MyProjects.js';

import INITIAL_DATA from '../data/studentdata.json';
import PRO_DATA from '../data/projectdata.json';

export default function App() {
    const [currentInput, setcurrentInput] = useState('');

    const filterStudents = (SearchInfo) =>{
        setcurrentInput(SearchInfo);
    }

    const filteredStudents = INITIAL_DATA.filter(student => 
        student.name.toLowerCase().includes(currentInput.toLowerCase()) ||
        student.roles.some(role => role.toLowerCase().includes(currentInput.toLowerCase())) ||
        student.email.toLowerCase().includes(currentInput.toLowerCase())
    );

    return (
        <>
            <HeaderBar></HeaderBar>
            <main>
                <Routes>
                    <Route path="/" element={<StudentPool resourceData={filteredStudents} filterStudents={filterStudents}/>} />
                    <Route path="/projects" element={<ProjectsPanel resourceData={PRO_DATA}/>} />
                    <Route path="/create-project" element={<CreateProject />} />
                    <Route path="/profile" element={<UploadProfile />} />
                    <Route path="/myProjects" element={<MyProjects resourceData={PRO_DATA}/>} />
                </Routes>
            </main>
        </>
    );
}