function searchProjects() {
    const searchInput = document.getElementById('projectSearchInput').value.toLowerCase();
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        const projectName = project.dataset.name.toLowerCase();
        const projectMembers = project.dataset.member.toLowerCase();
        if (projectName.includes(searchInput) || projectMembers.includes(searchInput)) {
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
        }
    });
}
