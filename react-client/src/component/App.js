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


  const [searchResults, setSearchResults] = useState([]);

  const fetchProfiles = async () => {
    try {
      const response = await fetch('profile/profiles');
      const { profiles: data } = await response.json();

      const transformedProfiles = data.map(p => ({
        firebaseKey: p._id,
        name: p.name,
        email: p.email,
        phone: p.phone,
        picture: p.picture,
        roles: Array.isArray(p.role) ? p.role : (p.role ? [p.role] : []),
        description: p.description || '',
      }));

      setAllStudents(transformedProfiles);
      setSearchResults(transformedProfiles);
    } catch (error) {
      console.error('Failed to fetch student profiles:', error);
      setAllStudents([]);
    }
  };
  async function fetchProjects() {
    try {
      const response = await fetch('/projects');
      const { projects: data } = await response.json();
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


  useEffect(() => {
    fetchProfiles();
    fetchProjects();
  }, []);

  const filterStudents = (SearchInfo) => {
    const filtered = allStudents.filter(student =>
      student.name.toLowerCase().includes(SearchInfo.toLowerCase()) ||
      (student.roles && student.roles.some(role => role.toLowerCase().includes(SearchInfo.toLowerCase()))) ||
      student.email.toLowerCase().includes(SearchInfo.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <>
      <HeaderBar></HeaderBar>
      <main>
        <Routes>
          <Route path="/" element={<StudentPool resourceData={searchResults} filterStudents={filterStudents} />} />
          <Route path="/profile" element={<UploadProfile fetchProfiles={fetchProfiles} />} />
          <Route path="/student/:studentKey" element={<StudentDetail resourceData={allStudents} />} />
          <Route path="/projects" element={<ProjectsPanel resourceData={projects} />} />
          <Route path="/projects/:projectKey" element={<ProjectDetail resourceData={projects} />} />
          <Route path="/create-project" element={<CreateProject fetchProjects={fetchProjects} />} />
          <Route path="/myProjects" element={<MyProjects resourceData={PRO_DATA} />} />
        </Routes>
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </main>
    </>
  );
}