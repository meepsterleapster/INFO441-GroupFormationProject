import React, { useState } from 'react';

export function MyProjects({resourceData}){

    const Allprojects = resourceData.map((project) => {
            const allrequest = project.request.map((requestStu) => {
                return (
                    <div className="request" key={requestStu}>
                        <span>
                        <a href="other_pro.html">{requestStu}</a> wants to join
                        </span>
                        <div className="a_d_button">
                        <button className="accept">Accept</button>
                        <button className="decline">Decline</button>
                        </div>
                    </div>
                  );
            })

            return (
                <div className="project_request" key={project.projectName}>
                <div className="project">
                    <div className="project_name">
                        <h2>
                        <a href="my_project.html">{project.projectName}</a>
                        </h2>
                    </div>
                    <div className="project_member">
                        <h4>Starter: {project.starter}</h4>
                        <h4>Member:</h4>
                        <p>{project.members.join(", ")}</p>
                    </div>
                    <div className="memeber_count">
                        <span>{project.count}</span>
                    </div>
                    <div>
                        <button className="delete_button">Delete</button>
                    </div>
                </div>
                {allrequest}
            </div>
            );
    });

    return (
        <div className="my_projects">
            {Allprojects}
        </div>
    );
}
