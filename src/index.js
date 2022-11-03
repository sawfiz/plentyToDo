import taskFactory from './task';
import help from './help';
import { tasksDisplay, sortTasks } from './tasksDisplay';
import { getToday } from './util';

// Get currentView from localStorage.  Default to 'Today'
let currentView = localStorage.getItem('currentView');
if (currentView === null) currentView = 'Today';
let currentViewEl = document.querySelector(`#${currentView}`);
currentViewEl.classList.add('active');

// Get hideCompletedTasks
const setHideCompletedTasks = (() => {
  const hideCompletedEl = document.querySelector('#hide-completed');
  let hideCompletedTasks = JSON.parse(localStorage.getItem('hideCompletedTasks'));
  console.log(hideCompletedTasks);
  
  if (hideCompletedTasks === null) {
    hideCompletedTasks = hideCompletedEl.checked;
    localStorage.setItem('hideCompletedTasks', hideCompletedTasks);
  } else {
    hideCompletedEl.checked = hideCompletedTasks;
  }
  hideCompletedEl.addEventListener('change', () => {
    hideCompletedTasks = hideCompletedEl.checked;
    localStorage.setItem('hideCompletedTasks', hideCompletedTasks);
    tasksDisplay.displayTasks(allTasks);
  });
})();

// Get allTasks from local storage
let allTasks = JSON.parse(localStorage.getItem('tasks'));
if (allTasks === null) allTasks = [];
tasksDisplay.displayTasks(allTasks);

// Active help section in the sidebar
help.toggleHelp();

// Active views section in the sidebar
const views = (() => {
  const viewsEls = Array.from(document.querySelectorAll('.view'));

  viewsEls.forEach((viewEl) => {
    viewEl.addEventListener('click', () => {
      viewsEls.forEach((El) => {
        El.classList.remove('active');
      });
      viewEl.classList.add('active');
      // currentView = viewEl.innerText.trim();
      currentView = viewEl.id;
      localStorage.setItem('currentView', currentView);
      tasksDisplay.displayTasks(allTasks);
    });
  });

  return {};
})();

sortTasks.sortFocus(allTasks);
sortTasks.sortStatus(allTasks);
sortTasks.sortDescription(allTasks);
sortTasks.sortStartDate(allTasks);
sortTasks.sortDueDate(allTasks);

const toDoApp = (() => {
  const bigAddBtn = document.querySelector('.big-add');
  // const overlayEl = document.querySelector('.overlay');
  // const addTaskDialog = document.querySelector('#add-task-dialog');
  const focusInput = document.querySelector('#focus');
  const completeInput = document.querySelector('#complete');
  const stateInput = document.querySelector('#state');
  const descriptionInput = document.querySelector('#description');
  const groupInput = document.querySelector('#group');
  const projectInput = document.querySelector('#task-project');
  const startDateInput = document.querySelector('#start-date');
  const dueDateInput = document.querySelector('#due-date');

  const addTaskSubmitBtn = document.querySelector('#add-task-submit');

  function initInputs() {
    (focusInput.checked = false),
      (completeInput.checked = false),
      (stateInput.selectedIndex = '0'),
      (descriptionInput.value = ''),
      (groupInput.value = ''),
      (projectInput.value = 'Inbox'),
      (startDateInput.value = getToday()),
      (dueDateInput.value = getToday());
  }

  // Allow user to add a new task
  bigAddBtn.addEventListener('click', () => {
    initInputs();
    // openModal(addTaskDialog);
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
    tasksDisplay.displayTasks(allTasks);
    // Focus the cursor on the new task's description input field
    document.querySelector('.task-task').focus();
  });
})();

//   // Modal functions
//   function openModal(modal) {
//     if (modal === null) return;
//     modal.classList.add('active');
//     overlayEl.classList.add('active');
//   }

//   function closeModal(modal) {
//     if (modal === null) return;
//     modal.classList.remove('active');
//     overlayEl.classList.remove('active');
//   }

//   addTaskSubmitBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log(newTask);
//     closeModal(addTaskDialog);
//     console.log(allTasks);
//   });

//   // Click outside of a popup closes the popup
//   overlayEl.addEventListener('click', () => {
//     const modalsEl = document.querySelectorAll('.modal.active');
//     modalsEl.forEach((modal) => {
//       closeModal(modal);
//     });
//   });
