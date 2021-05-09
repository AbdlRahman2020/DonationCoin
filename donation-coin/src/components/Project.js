const Project = ( { project }) => {
    return (
        <div className="singleProject">
            <h3>{project.name}</h3>
            <p>{project.category}</p>
        </div>
    )

}

export default Project