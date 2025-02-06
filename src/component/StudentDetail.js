import { useParams } from "react-router-dom";
import img from '../data/img/person.png';


export function StudentDetail({resourceData}){
    const { studentKey } = useParams();
    console.log(studentKey);
    let student = resourceData.find(item => item.firebaseKey === studentKey);
    if (!student) {
        return <h2>Student not found</h2>;
    }
      const roleElements = student.roles.map((role) => (
        <span key={role}>{role}</span>
    ));

    return (
        <div className="overall_info">
        <img src={img} alt="ding_zhen" />
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