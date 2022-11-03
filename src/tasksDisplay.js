import { getToday, get7Days } from './util';

const tasksDisplay = (() => {
  function displayTasks(taskList) {
    // Get currentView and hideCompletedTasks from localStorage
    const view = localStorage.getItem('currentView');
    let hideCompletedTasks = JSON.parse(localStorage.getItem('hideCompletedTasks'));
    
    const listEl = document.querySelector('.tasks');
    listEl.innerHTML = '';
    let filteredList;

    switch (view) {
      case 'Today':
        filteredList = taskList.filter(
          (task) =>
            (task.startDate <= getToday() || task.dueDate <= getToday()) &&
            task.startDate !== '' &&
            task.dueDate !== ''
        );
        break;
      case 'Next-7-Days':
        filteredList = taskList.filter(
          (task) =>
            (task.startDate > getToday() && task.startDate <= get7Days()) ||
            (task.dueDate > getToday() && task.dueDate <= get7Days())
        );
        break;
      case 'All':
        // hideCompletedTasks = false;
        filteredList = taskList;
        break;
      case 'No-Date':
        filteredList = taskList.filter(
          (task) => task.startDate === '' && task.dueDate === ''
        );
        break;
      case 'Done':
        filteredList = taskList.filter((task) => task.state === 3);
        hideCompletedTasks = false;

        // console.log('a', filteredList);
        break;

      default:
        // filteredList = taskList;
        break;
    }

    // Hide completed tasks based on setting
    console.log(hideCompletedTasks);
    if (hideCompletedTasks === true) {
      filteredList = filteredList.filter((task) => task.state !== 3);
    }
    console.log('List to print', filteredList);

    filteredList.forEach((task) => {
      // Creat a new task element for display
      const taskEl = document.createElement('div');
      taskEl.classList.add('task');

      // Create the task focus element
      const focusEl = document.createElement('div');
      taskEl.classList.add('task-focus');
      focusEl.innerText = task.focus === true ? '🔆' : '🫥';
      taskEl.appendChild(focusEl);
      // Make the task focus element toggle on click
      focusEl.addEventListener('click', () => {
        task.focus = !task.focus;
        focusEl.innerText = task.focus === true ? '🔆' : '🫥';
        localStorage.tasks = JSON.stringify(taskList);
        location.reload();
      });

      // Create the task status element, make it a drop down list
      const stateEl = document.createElement('select');
      stateEl.classList.add('task-item');
      // Add option 0 - Not Started️
      const toDoEl = document.createElement('option');
      let t = document.createTextNode('⭕️');
      toDoEl.appendChild(t);
      stateEl.appendChild(toDoEl);
      // Add option 1 - Doing ️
      const doingEl = document.createElement('option');
      t = document.createTextNode('🌗');
      doingEl.appendChild(t);
      stateEl.appendChild(doingEl);
      // Add option 2 - Waiting for other, need to follow up
      const awaitEl = document.createElement('option');
      t = document.createTextNode('⏳');
      awaitEl.appendChild(t);
      stateEl.appendChild(awaitEl);
      // Add option 3 - Done
      const doneEl = document.createElement('option');
      t = document.createTextNode('✅');
      doneEl.appendChild(t);
      stateEl.appendChild(doneEl);
      // Display current task status
      stateEl.selectedIndex = task.state;
      taskEl.appendChild(stateEl);
      // Allow user to change task staus
      stateEl.addEventListener('change', () => {
        task.state = stateEl.selectedIndex;
        localStorage.tasks = JSON.stringify(taskList);
        if (hideCompletedTasks === true && task.state === 3) {
          listEl.removeChild(taskEl);
        }
        location.reload();
      });

      // Create the task description input element
      const descriptionEl = document.createElement('textarea');
      descriptionEl.classList.add('task-task');
      if (task.startDate < getToday() && task.startDate !== '') {
        descriptionEl.classList.add('overstart');
      }
      if (task.dueDate < getToday() && task.dueDate !== '') {
        descriptionEl.classList.remove('overstart');
        descriptionEl.classList.add('overdue');
      }
      descriptionEl.value = task.description;
      taskEl.appendChild(descriptionEl);
      // Allow user to change task description
      descriptionEl.addEventListener('keyup', (e) => {
        let scHeight = e.target.scrollHeight;
        descriptionEl.style.height = `${scHeight}px`;
      });
      descriptionEl.addEventListener('change', () => {
        task.description = descriptionEl.value;
        localStorage.tasks = JSON.stringify(taskList);
      });

      // TO DO
      const projectEl = document.createElement('div');
      projectEl.classList.add('task-item');
      projectEl.innerText = task.project;
      taskEl.appendChild(projectEl);

      // Create the task start date element
      const startDateEl = document.createElement('input');
      startDateEl.classList.add('task-item');
      startDateEl.setAttribute('type', 'date');
      startDateEl.setAttribute('required', '');
      if (task.startDate < getToday() && task.startDate !== '') {
        startDateEl.classList.add('overstart');
      }
      startDateEl.value = task.startDate;
      taskEl.appendChild(startDateEl);
      // Allow user the change the start date
      startDateEl.addEventListener('change', () => {
        task.startDate = startDateEl.value;
        localStorage.tasks = JSON.stringify(taskList);
        location.reload();
      });

      // Create the task due date element
      const dueDateEl = document.createElement('input');
      dueDateEl.classList.add('task-item');
      dueDateEl.setAttribute('type', 'date');
      dueDateEl.setAttribute('required', '');
      if (task.dueDate < getToday() && task.dueDate !== '') {
        dueDateEl.classList.add('overdue');
      }
      dueDateEl.value = task.dueDate;
      taskEl.appendChild(dueDateEl);
      // Allow user to change the due date
      dueDateEl.addEventListener('change', () => {
        task.dueDate = dueDateEl.value;
        localStorage.tasks = JSON.stringify(taskList);
        location.reload();
      });

      // TO DO
      const recurEl = document.createElement('div');
      recurEl.classList.add('task-item', 'mdi', 'mdi-repeat');
      taskEl.appendChild(recurEl);

      // Create the task delete element
      const deleteEl = document.createElement('div');
      deleteEl.innerText = '⌫';
      taskEl.appendChild(deleteEl);
      // Allow user to delete a task
      deleteEl.addEventListener('click', () => {
        taskList.splice(taskList.indexOf(task), 1);
        listEl.removeChild(taskEl);
        localStorage.tasks = JSON.stringify(taskList);
      });

      // Add the task to display
      listEl.appendChild(taskEl);
    });
  }
  return { displayTasks };
})();

// Functions to sort the tasks
const sortTasks = (() => {
  let focusSortAscend = true;
  let statusSortAscend = true;
  let descriptionSortAscend = true;
  let projectSortAscend = true;
  let startDatetSortAscend = true;
  let dueDatetSortAscend = true;

  function sortByKey(array, key, sortAscend) {
    return array.sort((a, b) => {
      if (sortAscend) {
        return a[key] < b[key] ? -1 : 1;
      }
      return a[key] > b[key] ? -1 : 1;
    });
  }

  function sortFocus(taskList) {
    const sortFoucsEl = document.querySelector('#focus-sort');
    sortFoucsEl.addEventListener('click', () => {
      sortByKey(taskList, 'focus', focusSortAscend);
      const currentView = localStorage.getItem('currentView');
      const hideCompletedTasks = localStorage.getItem('hideCompletedTasks');
      tasksDisplay.displayTasks(taskList, currentView, hideCompletedTasks);
      focusSortAscend = !focusSortAscend;
    });
  }

  function sortStatus(taskList) {
    const sortStatusEl = document.querySelector('#status-sort');
    sortStatusEl.addEventListener('click', () => {
      sortByKey(taskList, 'state', statusSortAscend);
      const currentView = localStorage.getItem('currentView');
      const hideCompletedTasks = localStorage.getItem('hideCompletedTasks');
      tasksDisplay.displayTasks(taskList, currentView, hideCompletedTasks);
      statusSortAscend = !statusSortAscend;
    });
  }

  function sortDescription(taskList) {
    const sortDescriptionEl = document.querySelector('#description-sort');
    sortDescriptionEl.addEventListener('click', () => {
      sortByKey(taskList, 'description', descriptionSortAscend);
      const currentView = localStorage.getItem('currentView');
      const hideCompletedTasks = localStorage.getItem('hideCompletedTasks');
      tasksDisplay.displayTasks(taskList, currentView, hideCompletedTasks);
      descriptionSortAscend = !descriptionSortAscend;
    });
  }

  function sortProject(taskList) {
    const sortProjectEl = document.querySelector('#project-sort');
    sortProjectEl.addEventListener('click', () => {
      sortByKey(taskList, 'project', currentView, projectSortAscend);
      const currentView = localStorage.getItem('currentView');
      const hideCompletedTasks = localStorage.getItem('hideCompletedTasks');
      tasksDisplay.displayTasks(taskList, currentView, hideCompletedTasks);
      projectSortAscend = !projectSortAscend;
    });
  }

  function sortStartDate(taskList) {
    const sortStartDateEl = document.querySelector('#start-date-sort');
    sortStartDateEl.addEventListener('click', () => {
      sortByKey(taskList, 'startDate', startDatetSortAscend);
      const currentView = localStorage.getItem('currentView');
      const hideCompletedTasks = localStorage.getItem('hideCompletedTasks');
      tasksDisplay.displayTasks(taskList, currentView, hideCompletedTasks);
      startDatetSortAscend = !startDatetSortAscend;
    });
  }

  function sortDueDate(taskList) {
    const sortDueDateEl = document.querySelector('#due-date-sort');
    sortDueDateEl.addEventListener('click', () => {
      sortByKey(taskList, 'dueDate', dueDatetSortAscend);
      const currentView = localStorage.getItem('currentView');
      const hideCompletedTasks = localStorage.getItem('hideCompletedTasks');
      tasksDisplay.displayTasks(taskList, currentView, hideCompletedTasks);
      dueDatetSortAscend = !dueDatetSortAscend;
    });
  }

  return {
    sortFocus,
    sortStatus,
    sortDescription,
    sortProject,
    sortStartDate,
    sortDueDate,
  };
})();

export { tasksDisplay, sortTasks };
