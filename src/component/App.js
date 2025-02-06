import React, { useState, useEffect } from 'react';
import '../index.css'; 
import {HeaderBar} from './GenerateHeader.js';
import { StudentPool } from './Index.js';
import { Routes, Route, Navigate } from "react-router-dom";
import { getDatabase, onValue, ref} from 'firebase/database';
import { ProjectsPanel } from "./ProjectsPanel.js";
import { CreateProject } from "./CreateProject";
import { UploadProfile } from './Profile.js';
import { MyProjects } from './MyProjects.js';
import { StudentDetail } from './StudentDetail.js';
import { ProjectDetail } from './ProjectDetail.js';

// import INITIAL_DATA from '../data/studentdata.json';
import PRO_DATA from '../data/projectdata.json';

export default function App() {
    const [currentInput, setcurrentInput] = useState('');
    const [allStudents, setAllStudents] = useState([]);
    const [projects, setProjects] = useState('');

    const filterStudents = (SearchInfo) =>{
        setcurrentInput(SearchInfo);
    }

    const filteredStudents = allStudents.filter(student => 
        student.name.toLowerCase().includes(currentInput.toLowerCase()) ||
        student.roles.some(role => role.toLowerCase().includes(currentInput.toLowerCase())) ||
        student.email.toLowerCase().includes(currentInput.toLowerCase())
    );


    useEffect(() => {
        const db = getDatabase();
        const studentRef = ref(db, 'Students');
    
        onValue(studentRef, (snapshot) => {
          const allstudentObj = snapshot.val();
          if (allstudentObj) {
            const keyArray = Object.keys(allstudentObj);
            const allstudentArray = keyArray.map((key) => {
              const transformed = allstudentObj[key];
              transformed.firebaseKey = key;
              return transformed;
            });
            setAllStudents(allstudentArray);
          } else {
            setAllStudents([]); 
          }
        });
      }, []);

      useEffect(() => {
        const db = getDatabase();
        const projectRef = ref(db, "Projects");

        onValue(projectRef, (snapshot) => {
            const firebaseProjects = snapshot.val();
            if (firebaseProjects) {
              const keyArray = Object.keys(firebaseProjects);
                const allprojectData = keyArray.map((key) => {
                  const transformed = firebaseProjects[key];
                  transformed.firebaseKey = key;
                  return transformed;
                });
                setProjects(allprojectData);
            } else {
                setProjects([]);
            }
        });
      }, []);

    return (
        <>
            <HeaderBar></HeaderBar>
            <main>
                <Routes>
                    <Route path="/" element={<StudentPool resourceData={filteredStudents} filterStudents={filterStudents}/>} />
                    <Route path="student/:studentKey" element={<StudentDetail resourceData={filteredStudents}/>} />
                    <Route path="/projects" element={<ProjectsPanel resourceData={projects}/>} />
                    <Route path="projects/:projectKey" element={<ProjectDetail resourceData={projects}/>} />
                    <Route path="/create-project" element={<CreateProject />} />
                    <Route path="/profile" element={<UploadProfile />} />
                    <Route path="/myProjects" element={<MyProjects resourceData={PRO_DATA}/>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </>
    );
}