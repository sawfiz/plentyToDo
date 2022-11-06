import tasksList from './tasks-manager';

// Function for the hide completed tasks setting
const setHideCompletedTasks = (() => {
  const hideCompletedEl = document.querySelector('#hide-completed');
  hideCompletedEl.addEventListener('change', () => {
    tasksList.setHideCompletedTasks(hideCompletedEl.checked);
    updateTasksDisplay(tasksList.getFilteredList());
  });
})();

export default setHideCompletedTasks;
