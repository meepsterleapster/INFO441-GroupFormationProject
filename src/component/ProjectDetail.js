import { useParams } from "react-router-dom";

export function ProjectDetail({ resourceData }){
    const { projectKey } = useParams();
    console.log(projectKey);
    let project = resourceData.find(item => item.firebaseKey === projectKey);
    if (!project) {
        return <h2>Project not found</h2>;
    }
    return (
        <h1>TBD</h1>
    );
}