import React, { useState } from "react";
import "../index.css";
import { getDatabase, ref, push } from "firebase/database";

export function CreateProject(props) {
    const { refreshList = () => { } } = props;
    const [projectName, setProjectName] = useState("");
    const [starter, setStarter] = useState("");
    const [members, setMembers] = useState(["", "", ""]);
    const [projectDetail, setProjectDetail] = useState("");
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleMemberChange = (index, value) => {
        const newMembers = [...members];
        newMembers[index] = value;
        setMembers(newMembers);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!projectName || !starter || !projectDetail) {
            setErrorMessage("Please fill out required fields *");
            setSubmitStatus(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

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
            // const db = getDatabase();
            // const projectRef = ref(db, "Projects");
            // await push(projectRef, newProject);
            // console.log("Project added to Firebase");
            const res = await fetch('/profile/posterName', {
                method: 'GET',              
                credentials: 'include',     //
            });
            const { username } = await res.json(); 



            await fetch("projects/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectName: projectName,
                    projectDescription: projectDetail,
                    projectMembers: members,
                    projectStarter: username ?? '',
                })
            })

            await refreshList();

            setProjectName('');
            setStarter('');
            setMembers(["", "", ""]);
            setProjectDetail('');
            setSubmitStatus("success");
            setErrorMessage("");

        } catch (error) {
            console.error("Error submitting data: ", error);
            setSubmitStatus("error");
            setErrorMessage("Error submitting data, please try again.");
        }
    };

    return (
        <div className="form-container">
            <form>
                {submitStatus === "success" && (
                    <div className="alert_success">
                        Data submitted successfully!
                    </div>
                )}

                {(submitStatus === "error" || errorMessage) && (
                    <div className="alert_message">
                        {errorMessage}
                    </div>
                )}

                <label>Project Name <span style={{ color: "red" }}>*</span></label>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />

                <label>Starter <span style={{ color: "red" }}>*</span></label>
                <input
                    type="text"
                    value={starter}
                    onChange={(e) => setStarter(e.target.value)}
                    required
                />

                <label>Members (Up to 3)</label>
                {members.map((member, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Member ${index + 1}`}
                        value={member}
                        onChange={(e) => handleMemberChange(index, e.target.value)}
                    />
                ))}

                <label>Project Detail <span style={{ color: "red" }}>*</span></label>
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
