import React, { use, useState } from 'react';
import { Link } from 'react-router-dom';

export function UploadProfile(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [proImage, setProImage] = useState(null);
    const [intro, setIntro] = useState('');
    const [roles, setRoles] = useState([]);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !phone || !proImage || !intro || roles.length === 0) {
            setErrorMessage("Please fill out all required fields.");
            setSubmitStatus(null);
            return;
          }
        return;
    }

    const handleNameChange = (event)=> {
        setName(event.target.value);
    }
    const handleEmailChange = (event)=> {
        setEmail(event.target.value);
    }
    const handlePhoneChange = (event)=> {
        setPhone(event.target.value);
    }
    const handleImageChange = (event)=> {
        setProImage(event.target.value);
    }
    const handleDescriptionChange = (event)=> {
        setIntro(event.target.value);
    }
    const handleRoleChange = (event)=>{
        const { value, checked } = event.target;
        if(checked) {
            setRoles([...roles, value]);
        } else {
            setRoles(roles.filter((role) => role !== value));
        }
    }

    return (
        <>
        {/* Hello world */}
        <div className="form-container">
            <form onSubmit={handleSubmit}>
            {/* Existing form fields */}
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={handleNameChange}
                required=""
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleEmailChange}
                required=""
            />
            <label htmlFor="phone">Phone:</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                onChange={handlePhoneChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required=""
            />
            <small>Format: 123-456-7890</small>
            {/* upload profile picture */}
            <div className="upload-profile-picture">
                <legend>
                <strong>Upload Profile Picture:</strong>
                </legend>
                <input
                type="file"
                id="profile-picture"
                name="profile-picture"
                accept="image/*"
                onChange={handleImageChange}
                />
            </div>
            {/* Role Selection */}
            <div className="roles">
                <legend>Role (Select up to 3):</legend>
                <label>
                    <input type="checkbox" name="role" defaultValue="software-engineer" onChange={handleRoleChange}/>
                    <span>Software Engineer</span>
                </label>
                <label>
                    <input type="checkbox" name="role" defaultValue="designer" onChange={handleRoleChange}/>
                    <span>Designer</span>
                </label>
                <label>
                    <input type="checkbox" name="role" defaultValue="researcher" onChange={handleRoleChange}/>
                    <span>Researcher</span>
                </label>
                <label>
                    <input type="checkbox" name="role" defaultValue="storyteller" onChange={handleRoleChange}/>
                    <span>Storyteller</span>
                </label>
            </div>
            <div className="self-introduction">
                <legend>
                <strong>Self Introduction:</strong>
                </legend>
                <textarea
                id="self-introduction"
                name="self-introduction"
                rows={5}
                placeholder="Write about yourself..."
                defaultValue={""}
                onChange={handleDescriptionChange}
                />
            </div>
            {/* Submit Button */}
            <button type="submit">Submit</button>
            </form>
        </div>
        </>
    );
}
