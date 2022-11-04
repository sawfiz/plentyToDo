import taskFactory from './task';
import { getToday, get7Days } from './util';

const tasksList = (() => {
  // Get stored index from localStorage
  let number = JSON.parse(localStorage.getItem('number'));
  if (number === null) number = 0;

  // Get stored tasks from localStorage
  let allTasks = JSON.parse(localStorage.getItem('allTasks'));
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
      number,
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
    localStorage.allTasks = JSON.stringify(allTasks);
    number++;
    localStorage.setItem('number', number);
  }

  function updateTask(number, attr, value) {
      const task = allTasks.find(element => element.number === number);
      switch (attr) {
        case 'focus':
            task.focus = value; 
            break;
        case 'state':
            task.state = value; 
            break;
        case 'description':
            task.description = value; 
            break;
        case 'startDate':
            task.startDate = value; 
            break;
        case 'dueDate':
            task.dueDate = value; 
            break;
        case 'delete':
            allTasks.splice(allTasks.indexOf(task), 1);
            break;
      
        default:
            break;
      }
      localStorage.allTasks = JSON.stringify(allTasks);
  }

  function updateStartDate(index, startDate) {
    allTasks[index].startDate = startDate;
    localStorage.allTasks = JSON.stringify(allTasks);
  }

  function updateDueDate(index, dueDate) {
    allTasks[index].dueDate = dueDate;
    localStorage.allTasks = JSON.stringify(allTasks);
  }

  // Function to filter tasks list based on currently selected view
  function getFilteredList() {
    // Get stored variables from localStorage
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
    console.log(filteredList);
    return filteredList;
  }

  return {
    hideCompletedTasks,
    currentView,
    createTask,
    updateTask,
    getFilteredList,
    setHideCompletedTasks,
    setCurrentView,
  };
})();

export default tasksList;
