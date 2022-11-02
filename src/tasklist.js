function displayTasks(taskList) {
  const listEl = document.querySelector('.tasks');
  listEl.innerHTML = '';

  taskList.forEach((task) => {
    // Creat a new task element for display
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');

    // Create the task focus element
    const focusEl = document.createElement('div');
    taskEl.classList.add('task-focus');
    focusEl.innerText = task.focus === true ? '🔆' : '\u25cc';
    taskEl.appendChild(focusEl);
    // Make the task focus element toggle on click
    focusEl.addEventListener('click', () => {
      task.focus = !task.focus;
      focusEl.innerText = task.focus === true ? '🔆' : '\u25cc';
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
      task.state = stateEl.selectedIndex;
    });

    // Create the task description input element
    const descriptionEl = document.createElement('input');
    descriptionEl.classList.add('task-task');
    descriptionEl.setAttribute('type', 'text');
    descriptionEl.value = task.description;
    taskEl.appendChild(descriptionEl);
    // Allow user to change task description
    descriptionEl.addEventListener('change', () => {
      task.description = descriptionEl.value;
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
    startDateEl.value = task.startDate;
    taskEl.appendChild(startDateEl);
    // Allow user the change the start date
    startDateEl.addEventListener('change', () => {
      task.startDate = startDateEl.value;
    });

    // Create the task due date element
    const dueDateEl = document.createElement('input');
    dueDateEl.classList.add('task-item');
    dueDateEl.setAttribute('type', 'date');
    dueDateEl.value = task.dueDate;
    taskEl.appendChild(dueDateEl);
    // Allow user to change the due date
    dueDateEl.addEventListener('change', () => {
      task.dueDate = dueDateEl.value;
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
      taskList.splice(taskList.indexOf(task), 1);
      listEl.removeChild(taskEl);
    });

    // Add the task to display
    listEl.appendChild(taskEl);
  });
}

export default displayTasks;
