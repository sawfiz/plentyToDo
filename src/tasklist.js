function displayTasks(taskList) {
  const listEl = document.querySelector('.tasks');
  listEl.innerHTML = '';

  taskList.forEach((task) => {
    const taskEl = document.createElement('div');
    taskEl.classList.add('task')

    const focusEl = document.createElement('div');
    focusEl.classList.add('mdi', 'mdi-flare');
    taskEl.appendChild(focusEl);

    const completeEl = document.createElement('div');
    completeEl.classList.add('mdi', 'mdi-checkbox-blank-outline');
    taskEl.appendChild(completeEl);

    const stateEl = document.createElement('div');
    stateEl.innerText = task.state;
    taskEl.appendChild(stateEl);

    const descriptionEl = document.createElement('div');
    descriptionEl.innerText = task.description;
    taskEl.appendChild(descriptionEl);

    const projectEl = document.createElement('div');
    projectEl.innerText = task.project;
    taskEl.appendChild(projectEl);

    const startDateEl = document.createElement('div');
    startDateEl.innerText = task.startDate;
    taskEl.appendChild(startDateEl);

    const dueDateEl = document.createElement('div');
    dueDateEl.innerText = task.dueDate;
    taskEl.appendChild(dueDateEl);

    const recurEl = document.createElement('div');
    recurEl.classList.add('mdi', 'mdi-repeat');
    taskEl.appendChild(recurEl);

    const editEl = document.createElement('div');
    editEl.classList.add('mdi', 'mdi-square-edit-outline');
    taskEl.appendChild(editEl);

    listEl.appendChild(taskEl);
  });
}

export default displayTasks;
