import taskFactory from './task';
import { getToday, get7Days } from './util';

const tasksList = (() => {
  // Get stored variables from localStorage
  let allTasks = JSON.parse(localStorage.getItem('tasks'));
  if (allTasks === null) allTasks = [];

  // Get currentView from localStorage.  Default to 'Today'
  let currentView = localStorage.getItem('currentView');
  if (currentView === null) currentView = 'view-Today';

  // Get hideCompletedTasks from localStorage.  Default to 'true'
  let hideCompletedTasks = JSON.parse(
    localStorage.getItem('hideCompletedTasks')
  );
  if (hideCompletedTasks === null) hideCompletedTasks = true;

  function setHideCompletedTasks(setting) {
    hideCompletedTasks = setting;
    localStorage.setItem('hideCompletedTasks', hideCompletedTasks);
  }

  function setCurrentView(setting) {
    currentView = setting;
    localStorage.setItem('currentView', currentView);
  }

  function createTask() {
    const newTask = taskFactory(
      false,
      '0',
      '',
      '',
      'Inbox',
      getToday(),
      getToday()
    );
    // Insert the new task at the beginning of the allTasks list
    allTasks.unshift(newTask);
    localStorage.tasks = JSON.stringify(allTasks);
  }

  function updateDescription(index, description) {
    allTasks[index].description = description;
    localStorage.tasks = JSON.stringify(allTasks);
  }

  function updateStartDate(index, startDate) {
    allTasks[index].startDate = startDate;
    localStorage.tasks = JSON.stringify(allTasks);
  }

  function updateDueDate(index, dueDate) {
    allTasks[index].dueDate = dueDate;
    localStorage.tasks = JSON.stringify(allTasks);
  }


  function deleteTask(task) {
    allTasks.splice(allTasks.indexOf(task), 1);
    localStorage.tasks = JSON.stringify(allTasks);
  }

  // Function to filter tasks list based on currently selected view
  function getFilteredList() {
    let filteredList;
    let hide = hideCompletedTasks;

    switch (currentView) {
      case 'view-Today':
        filteredList = allTasks.filter(
          (task) =>
            (task.startDate <= getToday() && task.startDate !== '') ||
            (task.dueDate <= getToday() && task.dueDate !== '')
        );
        break;
      case 'view-Next-7-Days':
        filteredList = allTasks.filter(
          (task) =>
            (task.startDate > getToday() && task.startDate <= get7Days()) ||
            (task.dueDate > getToday() && task.dueDate <= get7Days())
        );
        break;
      case 'view-All':
        filteredList = allTasks;
        break;
      case 'view-No-Date':
        filteredList = allTasks.filter(
          (task) => task.startDate === '' && task.dueDate === ''
        );
        break;
      case 'view-Done':
        filteredList = allTasks.filter((task) => task.state === 3);
        hide = false;
        break;
      default:
        filteredList = allTasks;
        break;
    }

    // Filter out completed tasks based on user setting
    if (hide === true) {
      filteredList = filteredList.filter((task) => task.state !== 3);
    }

    return filteredList;
  }

  return {
    currentView,
    createTask,
    updateDescription,
    updateStartDate,
    updateDueDate,
    deleteTask,
    getFilteredList,
    setHideCompletedTasks,
    setCurrentView,
  };
})();

export default tasksList;
