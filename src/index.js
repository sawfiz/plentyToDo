import taskFactory from './task';
import help from './help';
import { tasksDisplay, sortTasks } from './tasksDisplay';
import { getToday } from './util';
import setHideCompletedTasks from './settings'

tasksDisplay.represhTasksDisplay();
// Active help section in the sidebar
help.toggleHelp();

// Activate the sort buttons
sortTasks.sortFocus();
sortTasks.sortStatus();
sortTasks.sortDescription();
sortTasks.sortStartDate();
sortTasks.sortDueDate();

// Active big add button
const toDoApp = (() => {
  const bigAddBtn = document.querySelector('.big-add');

  // Allow user to add a new task
  bigAddBtn.addEventListener('click', () => {
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
    tasksDisplay.allTasks.unshift(newTask);
    localStorage.tasks = JSON.stringify(allTasks);
    tasksDisplay.displayTasks(allTasks);
    // Focus the cursor on the new task's description input field
    document.querySelector('.task-task').focus();
  });
})();
