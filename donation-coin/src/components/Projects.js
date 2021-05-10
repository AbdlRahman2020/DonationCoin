import Project from './Project';
import { useState, useEffect } from 'react';


const Projects = ({ currentCat }) => {

    const [projects, setProjects] = useState([ ]);

    useEffect(() => {
        setProjects([{
            name: 'DWB',
            address: 1,
            category: 'Medical'
          },
          {
            name: 'Gates Foundation',
            address: 2,
            category: 'Education'
          },
          {
            name: 'WWF',
            address: 3,
            category: 'Wildlife'
          }]) 
    })

    const filteredProjects = projects.filter(project => project.category.includes(currentCat));

    return (
        <div className="projectList">
            {filteredProjects.map(project => (<Project key={project.address} project={project} />))}
        </div>
    )

}


export default Projects