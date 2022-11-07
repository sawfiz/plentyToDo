import groupsManager from './groups-manager';
import updateGroupsDisplay from './dom-update-groups';

const addNewGroup = (() => {
  const addGroupBtn = document.getElementById('add-group-btn');
  addGroupBtn.addEventListener('click', () => {
    groupsManager.createGroup();
    updateGroupsDisplay(groupsManager.groupList);

    // Focus the cursor on the new task's description input field
    // Find all the task descriptions
    const descriptionEls = Array.from(document.querySelectorAll('.group-header'));
    // Filter the list for tasks with empty description
    const newGroupEls = descriptionEls.filter(
      group => group.value === 'New Group'
    );
    // Focus on the first task with empty description to make it easier for user to start entering details
    newGroupEls[0].focus();
    newGroupEls[0].select();
  });
})();
