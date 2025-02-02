import React, { useState } from "react";
import "../index.css";
import img from '../data/img/QkjX5_5c.jpg'

export function SingleStudent({ studentData }){

    const roleElements = studentData.roles.map((role, index) => (
        <span key={index}>{role}</span>
    ));

    return(
        <div className="card">
        <img
            src={img}
            alt="person"
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