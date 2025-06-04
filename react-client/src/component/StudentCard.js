import React, { useState } from "react";
import "../index.css";
import { Link } from 'react-router-dom';
import img from '../data/img/person.png';

export function SingleStudent({ studentData }){
    const {
        _id, 
        name, 
        email, 
        phone, 
        picture,
        roles = [], 
        description
    } = studentData;


    // const roleElements = studentData.roles.map((role) => (
    //     <span key={role}>{role}</span>
    // ));

    const roleElements = roles.map((role) => (
        <span key={role}>{role}</span>
    ));


    return(
        <div className="card">
        <img
            src={picture || img}
            alt="default"
        />
        <div className="introduction">
            <h2>{name}</h2>
            {roleElements}
        </div>

        <Link to={`/student/${_id}`}>
        <button className="button">
            more
        </button>
        </Link>
        </div>
    );
}