import groupFactory from './group';

const groupsManager = (() => {
  // Get stored index from localStorage
  let number = JSON.parse(localStorage.getItem('groupNumber'));
  if (number === null) number = 0;

  let groupList = JSON.parse(localStorage.getItem('groups'));
  if (groupList === null) groupList = [];

  function createGroup() {
    const newGroup = groupFactory(number, 'New Group', []);
    groupList.unshift(newGroup);
    localStorage.groups = JSON.stringify(groupList);
    number++;
    localStorage.setItem('groupNumber', number);
  }

  function updateGroup(number, value) {
    const group = groupList.find((element) => element.number === number);
    group.name = value;
    localStorage.groups = JSON.stringify(groupList);
  }

  function deleteGroup(number) {
    const group = groupList.find((element) => element.number === number);
    groupList.splice(groupList.indexOf(group), 1);
    localStorage.groups = JSON.stringify(groupList);
  }

  return { groupList, createGroup, updateGroup, deleteGroup };
})();

export default groupsManager;
