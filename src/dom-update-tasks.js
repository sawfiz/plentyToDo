import stateDone from './constants';
import tasksManager from './tasks-manager';
import { getToday, createElement } from './utils';

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
      tasksManager.updateTask(task.number, 'focus', task.focus);
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
      tasksManager.updateTask(task.number, 'state', stateEl.selectedIndex);
      if (
        tasksManager.hideCompletedTasks === true &&
        stateEl.selectedIndex === stateDone
      ) {
        listEl.removeChild(taskEl);
      } else if (
        tasksManager.currentView === 'view-Done' &&
        stateEl.selectedIndex !== stateDone
      ) {
        listEl.removeChild(taskEl);
      }
    });

    // Create the task description input element
    const descriptionEl = createElement('textarea', ['task-task'], {});
    descriptionEl.value = task.description;
    taskEl.appendChild(descriptionEl);
    // Allow user to change task description
    descriptionEl.addEventListener('keyup', (e) => {
      let scHeight = e.target.scrollHeight;
      descriptionEl.style.height = `${scHeight}px`;
    });
    descriptionEl.addEventListener('change', () => {
      tasksManager.updateTask(task.number, 'description', descriptionEl.value);
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
      descriptionEl.classList.add('overstart');
    }
    startDateEl.value = task.startDate;
    taskEl.appendChild(startDateEl);
    // Allow user the change the start date
    startDateEl.addEventListener('change', () => {
      tasksManager.updateTask(task.number, 'startDate', startDateEl.value);
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
      descriptionEl.classList.remove('overstart');
      descriptionEl.classList.add('overdue');
    }
    dueDateEl.value = task.dueDate;
    taskEl.appendChild(dueDateEl);
    // Allow user to change the due date
    dueDateEl.addEventListener('change', () => {
      tasksManager.updateTask(task.number, 'dueDate', dueDateEl.value);
      if (task.dueDate < getToday() && task.dueDate !== '') {
        dueDateEl.classList.add('overdue');
        descriptionEl.classList.remove('overstart');
        descriptionEl.classList.add('overdue');
      } else {
        dueDateEl.classList.remove('overdue');
        descriptionEl.classList.remove('overdue');
        if (task.startDate < getToday() && task.startDate !== '') {
          descriptionEl.classList.add('overstart');
        }
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
      tasksManager.deleteTask(task.number);
      listEl.removeChild(taskEl);
    });

    // Add the task to display
    listEl.appendChild(taskEl);
  });
}

export default updateTasksDisplay;
