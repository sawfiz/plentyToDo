import tasksManager from './tasks-manager';

// Click handler for the views section in the sidebar
const getCurrentview = (() => {
  // Get currentView from localStorage.  Default to 'Today'
  let currentView = tasksManager.currentView;
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
      tasksManager.setCurrentView(viewEl.id);
      updateTasksDisplay(tasksManager.getFilteredList());
    });
  });

  return {};
})();

export default getCurrentview;
