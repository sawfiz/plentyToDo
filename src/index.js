import taskFactory from './task';
import help from './sidebar';
import displayTasks from './tasklist';

// Activate help
help.toggleHelp();

// Get allTasks from local storage
let allTasks = JSON.parse(localStorage.getItem('tasks'));
if (allTasks === null) allTasks = [];
displayTasks(allTasks);

const toDoApp = (() => {
  const bigAddBtn = document.querySelector('.big-add');
  const overlayEl = document.querySelector('.overlay');
  const addTaskDialog = document.querySelector('#add-task-dialog');
  const focusInput = document.querySelector('#focus');
  const completeInput = document.querySelector('#complete');
  const stateInput = document.querySelector('#state');
  const descriptionInput = document.querySelector('#description');
  const groupInput = document.querySelector('#group');
  const projectInput = document.querySelector('#task-project');
  const startDateInput = document.querySelector('#start-date');
  const dueDateInput = document.querySelector('#due-date');

  const addTaskSubmitBtn = document.querySelector('#add-task-submit');

  function getToday() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let today = year + '-' + month + '-' + day;
    return today;
  }

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
    displayTasks(allTasks);
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
