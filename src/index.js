import taskFactory from './task';
import helpPanel from './help';
import { getToday } from './util';
import tasksList from './tasksList';
import stateDone from './constants';
import createElement from './creatElement';

// Function to refresh the tasks list dispalay
function updateTasksDisplay(list) {
  // Initialize tasks list display
  const listEl = document.querySelector('.tasks');
  listEl.innerHTML = '';

  // Add filtered list of tasks onto the webpage
  list.forEach((task) => {
    // Creat a new task element for display
    const taskEl = createElement('div', ['task'], {});

    // Create the task focus element
    const focusEl = createElement('div', ['task-focus'], {});
    focusEl.innerText = task.focus === true ? '🔆' : '🫥';
    taskEl.appendChild(focusEl);
    // Make the task focus element toggle on click
    focusEl.addEventListener('click', () => {
      task.focus = !task.focus;
      focusEl.innerText = task.focus === true ? '🔆' : '🫥';
      tasksList.updateTask(task.number, 'focus', task.focus);
    });

    // Create the task status element, make it a drop down list
    const stateEl = createElement('select', ['task-item'], {});
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
      } else if (
        tasksList.currentView === 'view-Done' &&
        stateEl.selectedIndex !== stateDone
      ) {
        listEl.removeChild(taskEl);
      }
    });

    // Create the task description input element
    const descriptionEl = createElement('textarea', ['task-task'], {});
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
    const projectEl = createElement('div', ['task-item'], {});
    projectEl.innerText = task.project;
    taskEl.appendChild(projectEl);

    // Create the task start date element
    const startDateEl = createElement('input', ['task-item'], {
      type: 'date',
      required: '',
    });
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
    const dueDateEl = createElement('input', ['task-item'], {
      type: 'date',
      required: '',
    });
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
    const recurEl = createElement(
      'div',
      ['task-item', 'mdi', 'mdi-repeat'],
      {}
    );
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

  // Click handler for the big add button
  const addNewTask = (() => {
    const bigAddBtn = document.querySelector('.big-add');
    bigAddBtn.addEventListener('click', () => {
      tasksList.createTask();

      // No matter which view the app is in, switch to the Inbox view
      tasksList.setCurrentView('view-Today');
      updateTasksDisplay(tasksList.getFilteredList());

      // Style "Today" to active
      const viewsEls = Array.from(document.querySelectorAll('.view'));
      viewsEls.forEach((El) => {
        El.classList.remove('active');
      });
      document.querySelector('#view-Today').classList.add('active');

      // Focus the cursor on the new task's description input field
      // Find all the task descriptions
      const descriptionEls = Array.from(
        document.querySelectorAll('.task-task')
      );
      // Filter the list for tasks with empty description
      const emptyEls = descriptionEls.filter((task) => task.value === '');
      // Focus on the first task with empty description to make it easier for user to start entering details
      emptyEls[0].focus();
    });
  })();

  // Click handler for the views section in the sidebar
  const getCurrentview = (() => {
    // Get currentView from localStorage.  Default to 'Today'
    let currentView = tasksList.currentView;
    if (currentView === null) currentView = 'view-Today';
    // Style currentView to active
    document.querySelector(`#${currentView}`).classList.add('active');

    const viewsEls = Array.from(document.querySelectorAll('.view'));
    viewsEls.forEach((viewEl) => {
      viewEl.addEventListener('click', () => {
        // Style the clicked view active
        viewsEls.forEach((El) => {
          El.classList.remove('active');
        });
        viewEl.classList.add('active');
        // Update display to clicked view
        tasksList.setCurrentView(viewEl.id);
        updateTasksDisplay(tasksList.getFilteredList());
      });
    });

    return {};
  })();

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
