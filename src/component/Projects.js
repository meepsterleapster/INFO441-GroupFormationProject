import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";

export function Projects({resourceData}) {
    console.log(resourceData);
    const [projects, setProjects] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        setProjects(storedProjects);
    }, []);

    const handleSearch = (event) => {
        setSearchInput(event.target.value.toLowerCase());
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchInput) ||
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
                        <button className="search_pro_button">Search</button>
                    </div>
                    <div>
                        <Link className="create_button" to="/create-project">Create a Project</Link>
                    </div>
                </div>

                <div className="projects">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <div key={index} className="project">
                                <div className="project_name">
                                    <h2>{project.name}</h2>
                                </div>
                                <div className="project_member">
                                    <h4>Starter: {project.starter}</h4>
                                    <h4>Members:</h4>
                                    <p>{project.members.join(", ")}</p>
                                </div>
                                <div className="memeber_count">
                                    <span>{project.progress}</span>
                                </div>
                                <div>
                                    <button className="join_button">Join</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No projects found.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
