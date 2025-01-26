async function getProjects() {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/projects`, {
      // Add cache control for static generation
      cache: 'no-store', // or 'force-cache' if you want to cache the response
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return an empty array or fallback data to prevent build failure
    return [];
  }
}

export async function ProjectList() {
  const projects = await getProjects();

  if (!projects.length) {
    return <div>No projects found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}