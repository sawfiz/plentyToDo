import groupsManager from './groups-manager';
import { createElement } from './utils';

function updateGroupsDisplay(list) {
  const groupsEl = document.getElementById('groups');
  groupsEl.innerHTML = '';

  list.forEach((group) => {
    const groupEl = createElement('div', ['group-header'], {});

    const chevronEl = createElement('div', ['mdi', 'mdi-chevron-right'], {});
    chevronEl.value = group.name;
    groupEl.appendChild(chevronEl);

    const nameEl = createElement('div', ['group'], {});
    nameEl.innerText = group.name;
    groupEl.appendChild(nameEl);
    nameEl.addEventListener('click', () => {
      //   groupsManager.updateGroup(group.number, nameEl.value);
    });

    const editEl = createElement('div', ['mdi', 'mdi-pencil-box-outline'], {});
    groupEl.appendChild(editEl);
    editEl.addEventListener('click', () => {
      const detailsEl = createElement('div', ['details'], {});

      const name2El = createElement('input', ['edit-group-name'], {
        type: 'text',
        size: '19',
      });
      name2El.value = group.name;
      detailsEl.appendChild(name2El);

      name2El.addEventListener('change', () => {
        groupsManager.updateGroup(group.number, name2El.value);
        nameEl.innerText = name2El.value;
        groupEl.removeChild(detailsEl);
      });

      const addEl = createElement('div', ['mdi', 'mdi-plus'], {});
      detailsEl.appendChild(addEl);

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
        groupEl.removeChild(detailsEl);
      });
      detailsEl.appendChild(cancelEl);

      groupEl.appendChild(detailsEl);
      name2El.focus();
    });

    // const countEl = createElement('div', ['grounp-count'], {});
    // countEl.innerText = '10'
    // groupEl.appendChild(countEl);

    groupsEl.appendChild(groupEl);
  });
}

export default updateGroupsDisplay;
