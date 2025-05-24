import { useParams } from "react-router-dom";
import img from '../data/img/person.png';


export function StudentDetail({resourceData}){
    const { studentKey } = useParams();
    console.log(studentKey);
    //let student = resourceData.find(item => item.firebaseKey === studentKey);
    const student = resourceData.find(profile => profile._id === studentKey)
    if (!student) {
        return <h2>Student not found</h2>;
    }
      const roleElements = student.roles.map((role) => (
        <span key={role}>{role}</span>
    ));

    return (
        <div className="overall_info">
        <img src={student.picture || img} alt={student.name || "Profile"} />
        <div className="description">
            <h2>{student.name}</h2>
            <p>{student.email}</p>
            <p>{student.phone}</p>
            <div className="jobs">
            {roleElements}
            </div>
            <p>
            {student.intro}
            </p>
        </div>
        </div>
    );
}