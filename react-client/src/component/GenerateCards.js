import '../index.css'; 
import {SingleStudent} from './StudentCard.js';

export function CardsPanel(props){
    const {resourceData} = props;
    const AllCards = resourceData.map((student)=>{

        return <SingleStudent key={student.email} studentData={student}></SingleStudent>
    });

    return (
        <div className="student_cards">
        {AllCards}
        </div>
    );
}