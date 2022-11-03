import taskFactory from './task';
import help from './help';
import { tasksDisplay } from './tasksDisplay';
import { getToday } from './util';
import setHideCompletedTasks from './settings';
import views from './views';
import addTask from './addTask';

// Show tasks list
tasksDisplay.represhTasksDisplay();
