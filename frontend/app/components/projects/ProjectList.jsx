async function getProjects() {
    return await fetchApi('/projects')
  }

  export async function ProjectList() {
    const projects = await getProjects()

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    )
  }