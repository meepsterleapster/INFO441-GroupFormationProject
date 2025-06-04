import React, { useEffect, useState } from "react";
import '../index.css'; 
import {SingleStudent} from './StudentCard.js';

export function CardsPanel(props){
        const [username, setUsername] = useState(null);
        const { resourceData } = props;

        useEffect(() =>  {
            async function fetchUsername() {
                        // const { refreshList = () => { } } = props;
                try {
                    const res = await fetch('/profile/', {
                        method: 'GET',              
                        credentials: 'include',     //
                    });
                    const { username } = await res.json()
                    setUsername(username)
                } catch(error) {
                    console.error('Failed to fetch session username: ', error)
                }
            }

            fetchUsername();
        }, []);

    const AllCards = resourceData.map((student)=>{
        return <SingleStudent key={student.email} studentData={student}></SingleStudent>
    });

    return (
        <div className="student_cards">
        {AllCards}
        </div>
    );
}