import groupsManager from './groups-manager';
import projectsManager from './projects-manager';
import { createElement } from './utils';

function updateGroupsDisplay(list) {
  const groupsEl = document.getElementById('groups');
  groupsEl.innerHTML = '';

  list.forEach((group) => {
    const groupEl = createElement('div', [], {});

    const groupHeaderEl = createElement('div', ['group-header'], {});
    groupEl.appendChild(groupHeaderEl);

    const chevronEl = createElement('div', ['mdi', 'mdi-chevron-right'], {});
    chevronEl.value = group.name;
    groupHeaderEl.appendChild(chevronEl);

    const nameEl = createElement('div', ['group'], {});
    nameEl.innerText = group.name;
    groupHeaderEl.appendChild(nameEl);
    nameEl.addEventListener('click', () => {
      //   groupsManager.updateGroup(group.number, nameEl.value);
    });

    const editEl = createElement('div', ['mdi', 'mdi-pencil-box-outline'], {});
    groupHeaderEl.appendChild(editEl);
    editEl.addEventListener('click', () => {
      const detailsEl = createElement('div', ['details'], {});
      groupHeaderEl.appendChild(detailsEl);

      const name2El = createElement('input', ['edit-group-name'], {
        type: 'text',
        size: '19',
      });
      name2El.value = group.name;
      detailsEl.appendChild(name2El);

      name2El.addEventListener('change', () => {
        groupsManager.updateGroup(group.number, name2El.value);
        nameEl.innerText = name2El.value;
        groupHeaderEl.removeChild(detailsEl);
      });

      const addEl = createElement('div', ['mdi', 'mdi-plus'], {});
      detailsEl.appendChild(addEl);
      addEl.addEventListener('click', () => {
        console.log(group.name, 'add project');
        projectsManager.createProject(group.name);
        const projEl = createElement('div', ['project'], {});
        projEl.innerText = 'New Project';
        groupEl.insertBefore(projEl, detailsEl.nextSibling);
        groupHeaderEl.removeChild(detailsEl);
      });

      const deleteEl = createElement('div', [], {});
      deleteEl.innerText = '⌫';
      detailsEl.appendChild(deleteEl);
      deleteEl.addEventListener('click', () => {
        groupsManager.deleteGroup(group.number);
        groupsEl.removeChild(groupEl);
      });
      detailsEl.appendChild(deleteEl);

      const cancelEl = createElement('div', ['mdi', 'mdi-close'], {});
      cancelEl.addEventListener('click', () => {
        groupHeaderEl.removeChild(detailsEl);
      });
      detailsEl.appendChild(cancelEl);

      name2El.focus();
      name2El.select();
    });
    groupsEl.appendChild(groupEl);

    // const countEl = createElement('div', ['grounp-count'], {});
    // countEl.innerText = '10'
    // groupEl.appendChild(countEl);
    console.log(group.name);

    const projList = projectsManager.getProjectList(group.name);
    console.log(projList);
    projList.forEach((proj) => {
      const projEl = createElement('div', ['project'], {});
      console.log(proj.name);
      projEl.innerText = proj.name;
      groupsEl.append(projEl);
    });
  });
}

export default updateGroupsDisplay;
