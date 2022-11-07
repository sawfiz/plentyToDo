// CRUD functions
import tasksManager from './tasks-manager';
import groupsManager from './groups-manager';

// Click handlers
import setHideCompletedTasks from './dom-settings';
import helpPanel from './dom-help';
import addNewTask from './dom-add-task';
import getCurrentview from './dom-views';
import sortTasks from './dom-sorts';
import addNewGroup from './dom-add-group'

// Display update functions
import updateTasksDisplay from './dom-update-tasks';
import updateGroupsDisplay from './dom-update-groups';

// Run the app
updateTasksDisplay(tasksManager.getFilteredList());
console.log(groupsManager.groupList);
updateGroupsDisplay(groupsManager.groupList);
