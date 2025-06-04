import { useParams } from "react-router-dom";
import img from '../data/img/person.png';


export function StudentDetail({resourceData}){
    const { studentKey } = useParams();
    console.log(studentKey);
    let student = resourceData.find(item => item._id === studentKey);
    if (!student) {
        return <h2>Student not found</h2>;
    }
      const roleElements = (student.role || []).map((role) => (
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
            {student.description}
            </p>
        </div>
        </div>
    );
}