import taskFactory from './task';

const allTasks = [];

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

  // Modal functions
  function openModal(modal) {
    if (modal === null) return;
    modal.classList.add('active');
    overlayEl.classList.add('active');
  }

  function closeModal(modal) {
    if (modal === null) return;
    modal.classList.remove('active');
    overlayEl.classList.remove('active');
  }

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

  // Open the add a new task modal
  bigAddBtn.addEventListener('click', () => {
    initInputs();
    openModal(addTaskDialog)
  });

  addTaskSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newTask = taskFactory(
      focusInput.checked,
      completeInput.checked,
      stateInput.value,
      descriptionInput.value,
      groupInput.value,
      projectInput.value,
      startDateInput.value,
      dueDateInput.value
    );
    console.log(newTask);
    closeModal(addTaskDialog);
    allTasks.push(newTask);
    console.log(allTasks);
  });

  // Click outside of a popup closes the popup
  overlayEl.addEventListener('click', () => {
    const modalsEl = document.querySelectorAll('.modal.active');
    modalsEl.forEach((modal) => {
      closeModal(modal);
    });
  });
})();
