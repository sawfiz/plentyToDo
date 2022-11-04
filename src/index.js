import taskFactory from './task';
import helpPanel from './help';
import { getToday } from './util';
import tasksList from './tasksList';
import stateDone from './constants';

// Function to refresh the tasks list dispalay
function updateTasksDisplay(list) {
  // Initialize tasks list display
  const listEl = document.querySelector('.tasks');
  listEl.innerHTML = '';

  // Add filtered list of tasks onto the webpage
  list.forEach((task) => {
    // Creat a new task element for display
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');

    // Create the task focus element
    const focusEl = document.createElement('div');
    taskEl.classList.add('task-focus');
    focusEl.innerText = task.focus === true ? '🔆' : '🫥';
    taskEl.appendChild(focusEl);
    // Make the task focus element toggle on click
    focusEl.addEventListener('click', () => {
      task.focus = !task.focus;
      focusEl.innerText = task.focus === true ? '🔆' : '🫥';
      tasksList.updateTask(task.number, 'focus', task.focus);
    });

    // Create the task status element, make it a drop down list
    const stateEl = document.createElement('select');
    stateEl.classList.add('task-item');
    // Add option 0 - Not Started️
    const toDoEl = document.createElement('option');
    let t = document.createTextNode('⭕️');
    toDoEl.appendChild(t);
    stateEl.appendChild(toDoEl);
    // Add option 1 - Doing ️
    const doingEl = document.createElement('option');
    t = document.createTextNode('🌗');
    doingEl.appendChild(t);
    stateEl.appendChild(doingEl);
    // Add option 2 - Waiting for other, need to follow up
    const awaitEl = document.createElement('option');
    t = document.createTextNode('⏳');
    awaitEl.appendChild(t);
    stateEl.appendChild(awaitEl);
    // Add option 3 - Done
    const doneEl = document.createElement('option');
    t = document.createTextNode('✅');
    doneEl.appendChild(t);
    stateEl.appendChild(doneEl);
    // Display current task status
    stateEl.selectedIndex = task.state;
    taskEl.appendChild(stateEl);
    // Allow user to change task staus
    stateEl.addEventListener('change', () => {
      tasksList.updateTask(task.number, 'state', stateEl.selectedIndex);
      if (
        tasksList.hideCompletedTasks === true &&
        stateEl.selectedIndex === stateDone
      ) {
        listEl.removeChild(taskEl);
      }
      if (
        (tasksList.currentView =
          'view-Done' && stateEl.selectedIndex !== stateDone)
      ) {
        listEl.removeChild(taskEl);
      }
    });

    // Create the task description input element
    const descriptionEl = document.createElement('textarea');
    descriptionEl.classList.add('task-task');
    if (task.startDate < getToday() && task.startDate !== '') {
      descriptionEl.classList.add('overstart');
    }
    if (task.dueDate < getToday() && task.dueDate !== '') {
      descriptionEl.classList.remove('overstart');
      descriptionEl.classList.add('overdue');
    }
    descriptionEl.value = task.description;
    taskEl.appendChild(descriptionEl);
    // Allow user to change task description
    descriptionEl.addEventListener('keyup', (e) => {
      let scHeight = e.target.scrollHeight;
      descriptionEl.style.height = `${scHeight}px`;
    });
    descriptionEl.addEventListener('change', () => {
      tasksList.updateTask(task.number, 'description', descriptionEl.value);
    });

    // TO DO
    const projectEl = document.createElement('div');
    projectEl.classList.add('task-item');
    projectEl.innerText = task.project;
    taskEl.appendChild(projectEl);

    // Create the task start date element
    const startDateEl = document.createElement('input');
    startDateEl.classList.add('task-item');
    startDateEl.setAttribute('type', 'date');
    startDateEl.setAttribute('required', '');
    if (task.startDate < getToday() && task.startDate !== '') {
      startDateEl.classList.add('overstart');
    }
    startDateEl.value = task.startDate;
    taskEl.appendChild(startDateEl);
    // Allow user the change the start date
    startDateEl.addEventListener('change', () => {
      tasksList.updateTask(task.number, 'startDate', startDateEl.value);
      if (task.startDate < getToday() && task.startDate !== '') {
        startDateEl.classList.add('overstart');
        descriptionEl.classList.add('overstart');
      } else {
        startDateEl.classList.remove('overstart');
        descriptionEl.classList.remove('overstart');
      }
    });

    // Create the task due date element
    const dueDateEl = document.createElement('input');
    dueDateEl.classList.add('task-item');
    dueDateEl.setAttribute('type', 'date');
    dueDateEl.setAttribute('required', '');
    if (task.dueDate < getToday() && task.dueDate !== '') {
      dueDateEl.classList.add('overdue');
    }
    dueDateEl.value = task.dueDate;
    taskEl.appendChild(dueDateEl);
    // Allow user to change the due date
    dueDateEl.addEventListener('change', () => {
      tasksList.updateTask(task.number, 'dueDate', dueDateEl.value);
      if (task.dueDate < getToday() && task.dueDate !== '') {
        dueDateEl.classList.add('overdue');
        descriptionEl.classList.add('overdue');
      } else {
        dueDateEl.classList.remove('overdue');
        descriptionEl.classList.remove('overdue');
      }
    });

    // TO DO
    const recurEl = document.createElement('div');
    recurEl.classList.add('task-item', 'mdi', 'mdi-repeat');
    taskEl.appendChild(recurEl);

    // Create the task delete element
    const deleteEl = document.createElement('div');
    deleteEl.innerText = '⌫';
    taskEl.appendChild(deleteEl);
    // Allow user to delete a task
    deleteEl.addEventListener('click', () => {
      tasksList.deleteTask(task.number);
      listEl.removeChild(taskEl);
    });

    // Add the task to display
    listEl.appendChild(taskEl);
  });
}

// Handle all the user clicks
const clickHandler = (() => {
  // Function for the hide completed tasks setting
  const setHideCompletedTasks = (() => {
    const hideCompletedEl = document.querySelector('#hide-completed');
    hideCompletedEl.addEventListener('change', () => {
      tasksList.setHideCompletedTasks(hideCompletedEl.checked);
      updateTasksDisplay(tasksList.getFilteredList());
    });
  })();

  // Active big add button
  const addNewTask = (() => {
    const bigAddBtn = document.querySelector('.big-add');
    // Allow user to add a new task
    bigAddBtn.addEventListener('click', () => {
      tasksList.createTask();
      updateTasksDisplay(tasksList.getFilteredList());
      // Focus the cursor on the new task's description input field
      document.querySelector('.task-task').focus();
    });
  })();

  // Active views section in the sidebar
  const getCurrentview = (() => {
    // Get currentView from localStorage.  Default to 'Today'
    let currentView = tasksList.currentView;
    if (currentView === null) currentView = 'view-Today';
    let currentViewEl = document.querySelector(`#${currentView}`);
    currentViewEl.classList.add('active');

    const viewsEls = Array.from(document.querySelectorAll('.view'));
    viewsEls.forEach((viewEl) => {
      viewEl.addEventListener('click', () => {
        viewsEls.forEach((El) => {
          El.classList.remove('active');
        });
        viewEl.classList.add('active');
        tasksList.setCurrentView(viewEl.id);
        updateTasksDisplay(tasksList.getFilteredList());
      });
    });

    return {};
  })();

  // Functions to sort the tasks
  const sortTasks = (() => {
    let focusSortAscend = true;
    let statusSortAscend = true;
    let descriptionSortAscend = true;
    let projectSortAscend = true;
    let startDatetSortAscend = true;
    let dueDatetSortAscend = true;

    const sortFoucsEl = document.querySelector('#focus-sort');
    sortFoucsEl.addEventListener('click', () => {
      console.log('sort');
      const sortedList = tasksList.sortList('focus', focusSortAscend);
      updateTasksDisplay(sortedList);
      focusSortAscend = !focusSortAscend;
    });

    const sortStatus = (() => {
      const sortStatusEl = document.querySelector('#status-sort');
      sortStatusEl.addEventListener('click', () => {
        const sortedList = tasksList.sortList('state', statusSortAscend);
        updateTasksDisplay(sortedList);
        statusSortAscend = !statusSortAscend;
      });
    })();

    const sortDescription = (() => {
      const sortDescriptionEl = document.querySelector('#description-sort');
      sortDescriptionEl.addEventListener('click', () => {
        const sortedList = tasksList.sortList(
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
        const sortedList = tasksList.sortList('project', projectSortAscend);
        updateTasksDisplay(sortedList);
        projectSortAscend = !projectSortAscend;
      });
    })();

    const sortStartDate = (() => {
      const sortStartDateEl = document.querySelector('#start-date-sort');
      sortStartDateEl.addEventListener('click', () => {
        const sortedList = tasksList.sortList(
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
        const sortedList = tasksList.sortList('dueDate', dueDatetSortAscend);
        updateTasksDisplay(sortedList);
        dueDatetSortAscend = !dueDatetSortAscend;
      });
    })();
  })();
})();

updateTasksDisplay(tasksList.getFilteredList());
