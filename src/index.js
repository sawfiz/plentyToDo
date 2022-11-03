import taskFactory from './task';
import help from './help';
import tasksDisplay from './tasksDisplay';
// import views from './views';

let hideCompletedTasks = false;

const setHideCompletedTasks = (() => {
  const hideCompletedEl = document.querySelector('#hide-completed');
  hideCompletedTasks = hideCompletedEl.checked;
  console.log('MM', hideCompletedTasks);
  hideCompletedEl.addEventListener('change', () => {
    hideCompletedTasks = hideCompletedEl.checked;
    tasksDisplay.displayTasks(allTasks, hideCompletedTasks);
  });
  // return { hide };
})();

// Get allTasks from local storage
let allTasks = JSON.parse(localStorage.getItem('tasks'));
if (allTasks === null) allTasks = [];
console.log(allTasks);
tasksDisplay.displayTasks(allTasks, hideCompletedTasks);

// Active help section in the sidebar
help.toggleHelp();

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

function get7Days() {
  let date = new Date();
  date.setDate(date.getDate() + 7);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;

  let sevenDays = year + '-' + month + '-' + day;
  console.log(sevenDays);
  return sevenDays;
}

// Active views section in the sidebar
const views = (() => {
  const viewsEls = Array.from(document.querySelectorAll('.view'));

  viewsEls.forEach((viewEl) => {
    viewEl.addEventListener('click', () => {
      viewsEls.forEach((El) => {
        El.classList.remove('active');
      });
      viewEl.classList.add('active');
      switch (viewEl.innerText) {
        case ' Today':
          const todayList = allTasks.filter(
            (task) =>
              (task.startDate <= getToday() || task.dueDate <= getToday()) &&
              task.startDate !== '' &&
              task.dueDate !== ''
          );
          tasksDisplay.displayTasks(todayList, hideCompletedTasks);
          break;
        case ' Next 7 Days':
          console.log(viewEl.innerText);
          const next7List = allTasks.filter(
            (task) =>
              (task.startDate > getToday() && task.startDate <= get7Days()) ||
              (task.dueDate > getToday() && task.dueDate <= get7Days())
          );
          tasksDisplay.displayTasks(next7List, hideCompletedTasks);
          break;
        case ' All':
          tasksDisplay.displayTasks(allTasks, false);
          break;
        case ' No Date':
          console.log(viewEl.innerText);
          const noDateList = allTasks.filter(
            (task) => task.startDate === '' && task.dueDate === ''
          );
          tasksDisplay.displayTasks(noDateList, hideCompletedTasks);
          break;
        case ' Done':
          const doneList = allTasks.filter((task) => task.state === 3);
          tasksDisplay.displayTasks(doneList, false);
          break;

        default:
          break;
      }
    });
  });

  return {};
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
      tasksDisplay.displayTasks(taskList, hideCompletedTasks);
      focusSortAscend = !focusSortAscend;
    });
  }

  function sortStatus(taskList) {
    const sortStatusEl = document.querySelector('#status-sort');
    sortStatusEl.addEventListener('click', () => {
      sortByKey(taskList, 'state', statusSortAscend);
      tasksDisplay.displayTasks(taskList, hideCompletedTasks);
      statusSortAscend = !statusSortAscend;
    });
  }

  function sortDescription(taskList) {
    const sortDescriptionEl = document.querySelector('#description-sort');
    sortDescriptionEl.addEventListener('click', () => {
      sortByKey(taskList, 'description', descriptionSortAscend);
      console.log('ss', setHideCompletedTasks);
      tasksDisplay.displayTasks(taskList, hideCompletedTasks);
      descriptionSortAscend = !descriptionSortAscend;
    });
  }

  function sortProject(taskList) {
    const sortProjectEl = document.querySelector('#project-sort');
    sortProjectEl.addEventListener('click', () => {
      sortByKey(taskList, 'project', projectSortAscend);
      tasksDisplay.displayTasks(taskList);
      projectSortAscend = !projectSortAscend;
    });
  }

  function sortStartDate(taskList) {
    const sortStartDateEl = document.querySelector('#start-date-sort');
    sortStartDateEl.addEventListener('click', () => {
      sortByKey(taskList, 'startDate', startDatetSortAscend);
      tasksDisplay.displayTasks(taskList, hideCompletedTasks);
      startDatetSortAscend = !startDatetSortAscend;
    });
  }

  function sortDueDate(taskList) {
    const sortDueDateEl = document.querySelector('#due-date-sort');
    sortDueDateEl.addEventListener('click', () => {
      sortByKey(taskList, 'dueDate', dueDatetSortAscend);
      tasksDisplay.displayTasks(taskList, hideCompletedTasks);
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
    tasksDisplay.displayTasks(allTasks, hideCompletedTasks);
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
