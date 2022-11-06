import tasksManager from './tasks-manager';

// Click handler for the big add button
const addNewTask = (() => {
  const bigAddBtn = document.querySelector('.big-add');
  bigAddBtn.addEventListener('click', () => {
    tasksManager.createTask();

    // No matter which view the app is in, switch to the Inbox view
    tasksManager.setCurrentView('view-Today');
    updateTasksDisplay(tasksManager.getFilteredList());

    // Style "Today" to active
    const viewsEls = Array.from(document.querySelectorAll('.view'));
    viewsEls.forEach((El) => {
      El.classList.remove('active');
    });
    document.querySelector('#view-Today').classList.add('active');

    // Focus the cursor on the new task's description input field
    // Find all the task descriptions
    const descriptionEls = Array.from(document.querySelectorAll('.task-task'));
    // Filter the list for tasks with empty description
    const emptyEls = descriptionEls.filter((task) => task.value === '');
    // Focus on the first task with empty description to make it easier for user to start entering details
    emptyEls[0].focus();
  });
})();

export default addNewTask;
