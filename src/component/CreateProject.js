import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push } from "firebase/database";

export function CreateProject() {
    const [projectName, setProjectName] = useState("");
    const [starter, setStarter] = useState("");
    const [members, setMembers] = useState(["", "", ""]);
    const [projectDetail, setProjectDetail] = useState("");
    const navigate = useNavigate();

    const handleMemberChange = (index, value) => {
        const newMembers = [...members];
        newMembers[index] = value;
        setMembers(newMembers);
    };

    const handleSubmit = async () => {
        const filteredMembers = members.filter(member => member.trim() !== "");
        const totalMembers = filteredMembers.length + 1; // Includes starter
        const maxMembers = 4;

        const newProject = {
            projectName,
            starter,
            members: filteredMembers,
            projectDetail,
            count: `${totalMembers} / ${maxMembers}`,
            request: [],
        };

        try {
            const db = getDatabase();
            const projectRef = ref(db, "Projects");
            await push(projectRef, newProject);
            console.log("Project added to Firebase");

            navigate("/projects");
        } catch (error) {
            console.error("Error adding project to Firebase: ", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Create a Project</h2>
            <form>
                <label>Project Name:</label>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />

                <label>Starter:</label>
                <input
                    type="text"
                    value={starter}
                    onChange={(e) => setStarter(e.target.value)}
                    required
                />

                <label>Members (Up to 3):</label>
                {members.map((member, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Member ${index + 1}`}
                        value={member}
                        onChange={(e) => handleMemberChange(index, e.target.value)}
                    />
                ))}

                <label>Project Detail:</label>
                <textarea
                    value={projectDetail}
                    onChange={(e) => setProjectDetail(e.target.value)}
                    rows="4"
                    required
                />

                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
