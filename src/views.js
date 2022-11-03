import { tasksDisplay } from './tasksDisplay';

// Active views section in the sidebar
const views = (() => {
  // Get currentView from localStorage.  Default to 'Today'
  let currentView = localStorage.getItem('currentView');
  if (currentView === null) currentView = 'view-Today';
  let currentViewEl = document.querySelector(`#${currentView}`);
  localStorage.setItem('currentView', currentView);
  currentViewEl.classList.add('active');

  const viewsEls = Array.from(document.querySelectorAll('.view'));

  viewsEls.forEach((viewEl) => {
    viewEl.addEventListener('click', () => {
      viewsEls.forEach((El) => {
        El.classList.remove('active');
      });
      viewEl.classList.add('active');
      // currentView = viewEl.innerText.trim();
      currentView = viewEl.id;
      localStorage.setItem('currentView', currentView);
      tasksDisplay.represhTasksDisplay();
    });
  });

  return {};
})();

export default views;
