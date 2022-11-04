import taskFactory from './task';
import helpPanel from './help';
import { getToday } from './util';
import tasksList from './tasksList';

// Function to refresh the tasks list dispalay
function updateTasksDisplay(list) {
  // Initialize tasks list display
  const listEl = document.querySelector('.tasks');
  listEl.innerHTML = '';

  // Add filtered list of tasks onto the webpage
  list.forEach((task) => {
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
      localStorage.tasks = JSON.stringify(allTasks);
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
      localStorage.tasks = JSON.stringify(allTasks);
      if (hideCompletedTasks === true && task.state === 3) {
        listEl.removeChild(taskEl);
      }
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
      localStorage.tasks = JSON.stringify(allTasks);
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
      localStorage.tasks = JSON.stringify(allTasks);
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
      localStorage.tasks = JSON.stringify(allTasks);
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
      allTasks.splice(allTasks.indexOf(task), 1);
      listEl.removeChild(taskEl);
      localStorage.tasks = JSON.stringify(allTasks);
    });

    // Add the task to display
    listEl.appendChild(taskEl);
  });
}

// Handle all the user clicks
const clickHandler = (() => {
  // Function for the hide completed tasks setting
  const setHideCompletedTasks = (() => {
    const hideCompletedEl = document.querySelector('#hide-completed');
    hideCompletedEl.addEventListener('change', () => {
      tasksList.setHideCompletedTasks(hideCompletedEl.checked);
      updateTasksDisplay(tasksList.getFilteredList());
    });
  })();

  // Active big add button
  const addNewTask = (() => {
    const bigAddBtn = document.querySelector('.big-add');

    // Allow user to add a new task
    bigAddBtn.addEventListener('click', () => {
      tasksList.createTask();
      updateTasksDisplay(tasksList.getFilteredList());
      // Focus the cursor on the new task's description input field
      document.querySelector('.task-task').focus();
    });
  })();

  // Functions to sort the tasks
  const sortTasks = () => {
    const sortFoucsEl = document.querySelector('#focus-sort');

    sortFoucsEl.addEventListener('click', () => {
      const sortedList = taskList.sortByKey('focus', focusSortAscend);
      updateTasksDisplay(sortedList);
      focusSortAscend = !focusSortAscend;
    });

    let focusSortAscend = true;
  };
})();

updateTasksDisplay(tasksList.getFilteredList());
