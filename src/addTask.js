import taskFactory from './task';
import { tasksDisplay, sortTasks } from './tasksDisplay';
import { getToday, get7Days } from './util';

// Active big add button
const addTask = (() => {
  const bigAddBtn = document.querySelector('.big-add');

  // Allow user to add a new task
  bigAddBtn.addEventListener('click', () => {
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
    tasksDisplay.allTasks.unshift(newTask);
    localStorage.tasks = JSON.stringify(tasksDisplay.allTasks);
    tasksDisplay.represhTasksDisplay();

    // Focus the cursor on the new task's description input field
    document.querySelector('.task-task').focus();
  });
})();

export default addTask;
