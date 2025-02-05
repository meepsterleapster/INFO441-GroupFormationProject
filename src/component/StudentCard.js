import React, { useState } from "react";
import "../index.css";
import { Link } from 'react-router-dom';
import img from '../data/img/person.png';

export function SingleStudent({ studentData }){

    const roleElements = studentData.roles.map((role) => (
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

        <Link to={`/student/${studentData.firebaseKey}`}>
        <button className="button">
            more
        </button>
        </Link>
        </div>
    );
}