import React, { useState, useEffect } from 'react';
import '../index.css';
import { HeaderBar } from './GenerateHeader.js';
import { StudentPool } from './Index.js';
import { Routes, Route, Navigate } from "react-router-dom";
import { getDatabase, onValue, ref } from 'firebase/database';
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
  console.log('All students state:', allStudents);

  const [projects, setProjects] = useState('');

  const filterStudents = (SearchInfo) => {
    setcurrentInput(SearchInfo);
  }

  const filteredStudents = allStudents.filter(student =>
    student.name.toLowerCase().includes(currentInput.toLowerCase()) ||
    student.roles.some(role => role.toLowerCase().includes(currentInput.toLowerCase())) ||
    student.email.toLowerCase().includes(currentInput.toLowerCase())
  );

  console.log('Filtered students:', filteredStudents);


  useEffect(() => {

    async function fetchProjects() {
      try {
        const response = await fetch('/projects');
        const { projects: data } = await response.json();
        // Optional transformation: rename _id to firebaseKey to match legacy structure
        const transformedProjects = data.map(p => ({
          firebaseKey: p._id,
          projectName: p.projectName,
          projectDescription: p.projectDescription,
          starter: p.projectStarter ?? '',
          members: Array.isArray(p.projectMembers) ? p.projectMembers : [],
          count: Array.isArray(p.projectMembers) ? p.projectMembers.length : 0,
        }));
        setProjects(transformedProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
      }
    }

    async function fetchProfiles() {
      try {
        const response = await fetch('profile/profiles');
        const { profiles: data } = await response.json();
        // Optional transformation: rename _id to firebaseKey to match legacy structure
        const transformedProfiles = data.map(p => ({
          // firebaseKey: p._id,
          // projectName: p.projectName,
          // projectDescription: p.projectDescription,
          // starter: p.projectStarter ?? '',
          // members: Array.isArray(p.projectMembers) ? p.projectMembers : [],
          // count: Array.isArray(p.projectMembers) ? p.projectMembers.length : 0,
          //username: String,
          firebaseKey: p._id,
          name: p.name,
          email: p.email,
          phone: p.phone,
          picture: p.picture,
          role: Array.isArray(p.roles) ? p.roles : [],
          description: p.intro
        }));
        setAllStudents(transformedProfiles);
      } catch (error) {
        console.error('Failed to fetch student profiles:', error);
        setAllStudents([]);
      }
    }
    fetchProjects();
    fetchProfiles();
  }, []);

  // fetch version

  // fetch('/profile/profiles')
  //   .then(res => res.json())
  //   .then(data => {
  //     setAllStudents(data);
  //   })
  //   .catch(err => {
  //     console.error("Failed to load profiles from MongoDB", err)
  //   })

  // }, []);


  return (
    <>
      <HeaderBar></HeaderBar>
      <main>
        <Routes>
          <Route path="/" element={<StudentPool resourceData={filteredStudents} filterStudents={filterStudents} />} />
          <Route path="student/:studentKey" element={<StudentDetail resourceData={filteredStudents} />} />
          <Route path="/projects" element={<ProjectsPanel resourceData={projects} />} />
          <Route path="projects/:projectKey" element={<ProjectDetail resourceData={projects} />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/profile" element={<UploadProfile />} />
          {<Route path="/myProjects" element={<MyProjects resourceData={PRO_DATA} />} />}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </main>
    </>
  );
}