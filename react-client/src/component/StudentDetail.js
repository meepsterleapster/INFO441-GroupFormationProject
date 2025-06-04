import { useParams } from "react-router-dom";
import img from '../data/img/person.png';

export function StudentDetail({ resourceData }) {
    const { studentKey } = useParams();

    if (!resourceData || resourceData.length === 0) {
        return <h2>Loading...</h2>;
    }

    let student = resourceData.find(item => item.firebaseKey === studentKey);

    if (!student) {
        console.error('Student not found with key:', studentKey);
        console.log('Available students:', resourceData);
        return (
            <div className="error-container">
                <h2>Student not found</h2>
                <p>Could not find student with ID: {studentKey}</p>
            </div>
        );
    }

    const roleElements = (student.role || []).map((aRole) => {
        console.log('Role:', aRole);
        return <span key={aRole} className="role-tag">{aRole}</span>;
    });


    return (
        <div className="overall_info">
            <img
                src={student.picture || img}
                alt={`Profile of ${student.name}`}
            />
            <div className="description">
                <h2>{student.name}</h2>
                <p>{student.email}</p>
                <p>{student.phone}</p>
                <div className="jobs">
                    {roleElements}
                </div>
                <p>{student.description}</p>
            </div>
        </div>
    );
}