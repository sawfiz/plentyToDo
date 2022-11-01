const toToApp = (() => {
  console.log('This works!');
  const bigAddBtn = document.querySelector('.big-add');
  const overlayEl = document.querySelector('.overlay');

  // Modal functions
  function openModal(modal) {
    if (modal === null) return;
    modal.classList.add('active');
    overlayEl.classList.add('active');
  }

  function closeModal(modal) {
    if (modal === null) return;
    modal.classList.remove('active');
    overlayEl.classList.remove('active');
  }

  bigAddBtn.addEventListener('click', () => {
    // Modals and overlay
    const addTaskDialog = document.querySelector('#add-task-dialog');
    console.log(addTaskDialog);
    openModal(addTaskDialog);
  });

  // Click outside of a popup closes the popup
  overlayEl.addEventListener('click', () => {
    const modalsEl = document.querySelectorAll('.modal.active');
    modalsEl.forEach((modal) => {
      closeModal(modal);
    });
  });
})();
