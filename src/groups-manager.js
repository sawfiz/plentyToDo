import groupFactory from './group';

const groupManager = (() => {
  let groupList = JSON.parse(localStorage.getItem('groups'));
  if ((groupList = null)) groupList = [];

  function createGroup(groupName) {
    const newGroup = groupFactory(groupName, []);
    groupList.push(newGroup);
    localStorage.allTasks = JSON.stringify(groups);
  }

  return { createGroup };
})();

export default groupManager;
