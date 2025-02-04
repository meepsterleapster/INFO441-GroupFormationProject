import React, { useState } from "react";
import "../index.css";
import img from '../data/img/person.png'

export function SingleStudent({ studentData }){

    const roleElements = studentData.roles.map((role, index) => (
        <span key={role}>{role}</span>
    ));

    return(
        <div className="card">
        <img
            src={img}
            alt="default"
        />
        <div className="introduction">
            <h2>{studentData.name}</h2>
            {roleElements}
        </div>
        <a href="other_pro.html" className="button">
            more
        </a>
        </div>
    );
}