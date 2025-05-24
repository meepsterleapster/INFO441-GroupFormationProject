import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";


export function Project({ projectData }){
    
        return (
        <div className="project">
            <div className="project_name">
                <h2>
                <Link to={`/projects/${projectData.firebaseKey}`}>
                    {projectData.projectName}
                </Link>
                </h2>
            </div>
            <div className="project_member">
                <h4>
                Starter: {projectData.starter}
                </h4>
                <h4>Members:</h4>
                <p>
                    {projectData.members.join(", ")}
                </p>
            </div>
            <div className="memeber_count">
                <span>
                   1
                </span>
            </div>
            <div>
                <button className="join_button">Join</button>
            </div>
        </div>
        )
    }