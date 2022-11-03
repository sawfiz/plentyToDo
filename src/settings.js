import { tasksDisplay, sortTasks } from './tasksDisplay';

const setHideCompletedTasks = (() => {
  const hideCompletedEl = document.querySelector('#hide-completed');
  let hideCompletedTasks = JSON.parse(
    localStorage.getItem('hideCompletedTasks')
  );

  if (hideCompletedTasks === null) {
    hideCompletedTasks = hideCompletedEl.checked;
    localStorage.setItem('hideCompletedTasks', hideCompletedTasks);
  } else {
    hideCompletedEl.checked = hideCompletedTasks;
  }

  hideCompletedEl.addEventListener('change', () => {
    hideCompletedTasks = hideCompletedEl.checked;
    localStorage.setItem('hideCompletedTasks', hideCompletedTasks);
    tasksDisplay.represhTasksDisplay();
  });
})();

export default setHideCompletedTasks;
