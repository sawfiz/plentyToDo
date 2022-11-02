function displayTasks(taskList) {
  const listEl = document.querySelector('.tasks');
  listEl.innerHTML = '';

  taskList.forEach((task) => {
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');
    
    const focusEl = document.createElement('div');
    taskEl.classList.add('task-item');
    focusEl.innerText = '🔆';
    // focusEl.classList.add('mdi', 'mdi-flare');
    taskEl.appendChild(focusEl);

    // const completeEl = document.createElement('input');
    // completeEl.setAttribute('type', 'checkbox');
    // // completeEl.classList.add('mdi', 'mdi-checkbox-blank-outline');
    // taskEl.appendChild(completeEl);
    // completeEl.addEventListener('change', () => {
    //   task.complete = completeEl.checked;
    //   console.log(task);
    // });

    const stateEl = document.createElement('select');
    stateEl.classList.add('task-item');
    //
    const toDoEl = document.createElement('option');
    let t = document.createTextNode('⭕️');
    toDoEl.appendChild(t);
    stateEl.appendChild(toDoEl);
    //
    const doingEl = document.createElement('option');
    t = document.createTextNode('🟠');
    doingEl.appendChild(t);
    stateEl.appendChild(doingEl);
    //
    const awaitEl = document.createElement('option');
    t = document.createTextNode('\u231b');
    awaitEl.appendChild(t);
    stateEl.appendChild(awaitEl);
    //
    const doneEl = document.createElement('option');
    t = document.createTextNode('\u2705');
    doneEl.appendChild(t);
    stateEl.appendChild(doneEl);

    stateEl.selectedIndex = task.state;
    taskEl.appendChild(stateEl);
    stateEl.addEventListener('change', () => {
      task.state = stateEl.selectedIndex;
      console.log(task);
    });

    const descriptionEl = document.createElement('input');
    descriptionEl.classList.add('task-task');
    descriptionEl.setAttribute('type', 'text');
    descriptionEl.value = task.description;
    taskEl.appendChild(descriptionEl);
    descriptionEl.addEventListener('change', () => {
      task.description = descriptionEl.value;
      console.log(task);
    });

    const projectEl = document.createElement('div');
    projectEl.classList.add('task-item');
    projectEl.innerText = task.project;
    taskEl.appendChild(projectEl);

    const startDateEl = document.createElement('input');
    startDateEl.classList.add('task-item');
    startDateEl.setAttribute('type', 'date');
    startDateEl.value = task.startDate;
    taskEl.appendChild(startDateEl);
    startDateEl.addEventListener('change', () => {
      task.startDate = startDateEl.value;
      console.log(task);
    });

    const dueDateEl = document.createElement('input');
    dueDateEl.classList.add('task-item');
    dueDateEl.setAttribute('type', 'date');
    dueDateEl.value = task.dueDate;
    taskEl.appendChild(dueDateEl);
    dueDateEl.addEventListener('change', () => {
      task.dueDate = dueDateEl.value;
      console.log(task);
    });

    const recurEl = document.createElement('div');
    recurEl.classList.add('task-item', 'mdi', 'mdi-repeat');
    taskEl.appendChild(recurEl);

    const deleteEl = document.createElement('div');
    deleteEl.classList.add('task-item', 'mdi', 'mdi-trash-can-outline');
    taskEl.appendChild(deleteEl);

    listEl.appendChild(taskEl);
  });
}

export default displayTasks;
