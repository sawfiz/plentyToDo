import projectFactory from './project';

const projectsManager = (() => {
    // Get stored index from localStorage
    let number = JSON.parse(localStorage.getItem('projectNumber'));
    if (number === null) number = 0;
    
    let projectList = JSON.parse(localStorage.getItem('projects'));
    if (projectList === null) projectList = [];

    function createProject(groupName) {
        const newProject = projectFactory(number, 'New Project', groupName);
        projectList.unshift(newProject);
        localStorage.projects = JSON.stringify(projectList);
        number++;
        localStorage.setItem('projectNumber', number);
      }

      function getProjectList(group) {
        const filteredList = projectList.filter((project) => project.group === group)
        return filteredList;
      }
    
      function updateProject(number, value) {
        const project = projectList.find((element) => element.number === number);
        project.name = value;
        localStorage.projects = JSON.stringify(projectList);
      }
    
      function deleteProject(number) {
        const project = projectList.find((element) => element.number === number);
        projectList.splice(projectList.indexOf(project), 1);
        localStorage.projects = JSON.stringify(projectList);
      }
    
      return { projectList, createProject, getProjectList, updateProject, deleteProject };


})();

export default projectsManager;
