import taskFactory from './task';
import helpPanel from './help';
import { tasksDisplay, sortTasks } from './tasksDisplay';
import { getToday } from './util';
import setHideCompletedTasks from './settings';
import getCurrentView from './views';
import addNewTask from './addTask';

// Show tasks list
tasksDisplay.represhTasksDisplay();
