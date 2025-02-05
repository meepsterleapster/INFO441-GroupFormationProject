import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import PRO_DATA from "../data/projectdata.json";
import { Project } from "./SingleProject";
import { getDatabase, ref, onValue } from "firebase/database";

export function ProjectsPanel() {
    const [projects, setProjects] = useState(PRO_DATA); //local data
    const [searchInput, setSearchInput] = useState("");

    //Firebase 数据
    useEffect(() => {
        const db = getDatabase();
        const projectRef = ref(db, "Projects");

        onValue(projectRef, (snapshot) => {
            console.log("New Firebase Data:", snapshot.val()); 
        });
    }, []);

    const handleSearch = (event) => {
        setSearchInput(event.target.value.toLowerCase());
    };

    const filteredProjects = projects.filter(project =>
        project.projectName.toLowerCase().includes(searchInput) ||
        project.members.some(member => member.toLowerCase().includes(searchInput))
    );

    return (
        <div>
            <main>
                <div className="search_create">
                    <div className="pro_search">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchInput}
                            onChange={handleSearch}
                        />
                    </div>
                    <div>
                        <Link className="create_button" to="/create-project">Create a Project</Link>
                    </div>
                </div>

                <div className="projects">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <Project key={index} projectData={project} />
                        ))
                    ) : (
                        <p>No projects found.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
