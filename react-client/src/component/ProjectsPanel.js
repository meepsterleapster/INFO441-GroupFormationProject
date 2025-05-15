import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
// import PRO_DATA from "../data/projectdata.json";
import { Project } from "./SingleProject";

export function ProjectsPanel( {resourceData} ) {
    // console.log(resourceData);
    const [searchInput, setSearchInput] = useState("");
    const [filteredProjects, setFilteredProjects] = useState(resourceData);

    useEffect(() => {
        setFilteredProjects(resourceData);
    }, [resourceData]);

    const handleSearch = (event) => {
        setSearchInput(event.target.value.toLowerCase());
    };

    const handleSearchClick = () => {
        const filtered = resourceData.filter(project =>
            project.projectName.toLowerCase().includes(searchInput) ||
            project.members.some(member => member.toLowerCase().includes(searchInput)) ||
            project.starter.toLowerCase().includes(searchInput)
        );
        setFilteredProjects(filtered);
    };

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
                        <button className="search_pro_button" onClick={handleSearchClick}>Search</button>
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
                        // <p>No projects found.</p>
                        <p></p>
                    )}
                </div>
            </main>
        </div>
    );
}
