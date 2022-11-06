import tasksManager from './tasks-manager';

// Click handlers for the sort buttons
const sortTasks = (() => {
  let focusSortAscend = true;
  let statusSortAscend = true;
  let descriptionSortAscend = true;
  let projectSortAscend = true;
  let startDatetSortAscend = true;
  let dueDatetSortAscend = true;

  const sortFoucsEl = document.querySelector('#focus-sort');
  sortFoucsEl.addEventListener('click', () => {
    const sortedList = tasksManager.sortList('focus', focusSortAscend);
    updateTasksDisplay(sortedList);
    focusSortAscend = !focusSortAscend;
  });

  const sortStatus = (() => {
    const sortStatusEl = document.querySelector('#status-sort');
    sortStatusEl.addEventListener('click', () => {
      const sortedList = tasksManager.sortList('state', statusSortAscend);
      updateTasksDisplay(sortedList);
      statusSortAscend = !statusSortAscend;
    });
  })();

  const sortDescription = (() => {
    const sortDescriptionEl = document.querySelector('#description-sort');
    sortDescriptionEl.addEventListener('click', () => {
      const sortedList = tasksManager.sortList(
        'description',
        descriptionSortAscend
      );
      updateTasksDisplay(sortedList);
      descriptionSortAscend = !descriptionSortAscend;
    });
  })();

  const sortProject = (() => {
    const sortProjectEl = document.querySelector('#project-sort');
    sortProjectEl.addEventListener('click', () => {
      const sortedList = tasksManager.sortList('project', projectSortAscend);
      updateTasksDisplay(sortedList);
      projectSortAscend = !projectSortAscend;
    });
  })();

  const sortStartDate = (() => {
    const sortStartDateEl = document.querySelector('#start-date-sort');
    sortStartDateEl.addEventListener('click', () => {
      const sortedList = tasksManager.sortList(
        'startDate',
        startDatetSortAscend
      );
      updateTasksDisplay(sortedList);
      startDatetSortAscend = !startDatetSortAscend;
    });
  })();

  const sortDueDate = (() => {
    const sortDueDateEl = document.querySelector('#due-date-sort');
    sortDueDateEl.addEventListener('click', () => {
      const sortedList = tasksManager.sortList('dueDate', dueDatetSortAscend);
      updateTasksDisplay(sortedList);
      dueDatetSortAscend = !dueDatetSortAscend;
    });
  })();
})();

export default sortTasks;
