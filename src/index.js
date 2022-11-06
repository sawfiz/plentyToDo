// CRUD functions
import tasksManager from './tasks-manager';

// Click handlers
import setHideCompletedTasks from './dom-settings';
import helpPanel from './dom-help';
import addNewTask from './dom-add-task';
import getCurrentview from './dom-views';
import sortTasks from './dom-sorts';

// Display update functions
import updateTasksDisplay from './dom-update-tasks';

// Run the app
updateTasksDisplay(tasksManager.getFilteredList());
