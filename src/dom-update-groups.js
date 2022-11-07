import groupManager from './groups-manager';

const addNewGroup = (() => {
    const addGroupBtn = document.getElementById('add-group-btn')
    addGroupBtn.addEventListener('click', ()=>{
        groupManager.createGroup();
        
    })
})();
