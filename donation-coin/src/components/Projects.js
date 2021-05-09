import Project from './Project';


const Projects = ({ projects }) => {
    return (
        <div className="projectList">
            {projects.map(project => (<Project key={project.address} project={project} />))}
        </div>
    )

}


export default Projects