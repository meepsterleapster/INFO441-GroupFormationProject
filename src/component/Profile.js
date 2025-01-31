import React, { useState } from "react";
import "../index.css";

export function Profile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        profilePicture: null,
        selfIntroduction: "",
        roles: [],
        customRole: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setProfile((prev) => ({
                ...prev,
                roles: checked
                    ? [...prev.roles, value]
                    : prev.roles.filter((role) => role !== value),
            }));
        } else if (type === "file") {
            setProfile((prev) => ({
                ...prev,
                profilePicture: files[0],
            }));
        } else {
            setProfile((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Profile submitted:", profile);
    };

    return (
        <div className="form-container">
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                />

                {/* Email */}
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                />

                {/* Phone */}
                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={profile.phone}
                    onChange={handleChange}
                    required
                />
                <small>Format: 123-456-7890</small>

                {/* Upload Profile Picture */}
                <div className="upload-profile-picture">
                    <legend><strong>Upload Profile Picture:</strong></legend>
                    <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
                </div>

                {/* Self Introduction */}
                <div className="self-introduction">
                    <legend><strong>Self Introduction:</strong></legend>
                    <textarea
                        id="self-introduction"
                        name="selfIntroduction"
                        rows="5"
                        placeholder="Write about yourself..."
                        value={profile.selfIntroduction}
                        onChange={handleChange}
                    />
                </div>

                {/* Role Selection */}
                <div className="roles">
                    <legend>Role (Select up to 3):</legend>
                    {["Software Engineer", "Promoter", "Designer", "Presenter", "Storyteller"].map((role) => (
                        <label key={role}>
                            <input
                                type="checkbox"
                                name="role"
                                value={role}
                                checked={profile.roles.includes(role)}
                                onChange={handleChange}
                                disabled={profile.roles.length >= 3 && !profile.roles.includes(role)}
                            />
                            <span>{role}</span>
                        </label>
                    ))}
                </div>

                {/* Customize Role */}
                <div className="customize-role">
                    <legend><strong>Customize Role:</strong></legend>
                    <input
                        type="text"
                        id="custom-role"
                        name="customRole"
                        placeholder="Enter your custom role"
                        value={profile.customRole}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
