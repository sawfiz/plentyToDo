/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/help.js":
/*!*********************!*\
  !*** ./src/help.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst help = (() => {\n    const helpEl = document.querySelector('.help');\n    let show = false;\n    \n    function toggleHelp() {\n        helpEl.addEventListener('click', () => {\n            if (show === false) {\n                showHelp();\n                show = true;\n            } else {\n                hideHelp();\n            }\n        });\n    }\n    \n    function showHelp() {\n        const helpContent = document.getElementsByTagName('template')[0];\n        const clon = helpContent.content.cloneNode(true);\n        helpEl.classList.remove('mdi', 'mdi-chevron-right')\n        helpEl.classList.add('mdi', 'mdi-chevron-down')\n        helpEl.innerText = 'Help'\n        helpEl.appendChild(clon);\n    }\n    \n    function hideHelp() {\n        helpEl.classList.remove('mdi', 'mdi-chevron-down')\n        helpEl.classList.add('mdi', 'mdi-chevron-right')\n        helpEl.innerText = 'Help'\n        show = false;\n    }\n\n    return {toggleHelp}\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (help);\n\n//# sourceURL=webpack://plentytodo/./src/help.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./help */ \"./src/help.js\");\n/* harmony import */ var _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasksDisplay */ \"./src/tasksDisplay.js\");\n\n\n\n// import views from './views';\n\nlet hideCompletedTasks = false;\n\nconst setHideCompletedTasks = (() => {\n  const hideCompletedEl = document.querySelector('#hide-completed');\n  hideCompletedTasks = hideCompletedEl.checked;\n  console.log('MM', hideCompletedTasks);\n  hideCompletedEl.addEventListener('change', () => {\n    hideCompletedTasks = hideCompletedEl.checked;\n    _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(allTasks, hideCompletedTasks);\n  });\n  // return { hide };\n})();\n\n// Get allTasks from local storage\nlet allTasks = JSON.parse(localStorage.getItem('tasks'));\nif (allTasks === null) allTasks = [];\nconsole.log(allTasks);\n_tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(allTasks, hideCompletedTasks);\n\n// Active help section in the sidebar\n_help__WEBPACK_IMPORTED_MODULE_1__[\"default\"].toggleHelp();\n\nfunction getToday() {\n  const date = new Date();\n  let day = date.getDate();\n  let month = date.getMonth() + 1;\n  const year = date.getFullYear();\n\n  if (month < 10) month = '0' + month;\n  if (day < 10) day = '0' + day;\n\n  let today = year + '-' + month + '-' + day;\n  return today;\n}\n\nfunction get7Days() {\n  let date = new Date();\n  date.setDate(date.getDate() + 7);\n  let day = date.getDate();\n  let month = date.getMonth() + 1;\n  const year = date.getFullYear();\n\n  if (month < 10) month = '0' + month;\n  if (day < 10) day = '0' + day;\n\n  let sevenDays = year + '-' + month + '-' + day;\n  console.log(sevenDays);\n  return sevenDays;\n}\n\n// Active views section in the sidebar\nconst views = (() => {\n  const viewsEls = Array.from(document.querySelectorAll('.view'));\n\n  viewsEls.forEach((viewEl) => {\n    viewEl.addEventListener('click', () => {\n      viewsEls.forEach((El) => {\n        El.classList.remove('active');\n      });\n      viewEl.classList.add('active');\n      switch (viewEl.innerText) {\n        case ' Today':\n          const todayList = allTasks.filter(\n            (task) =>\n              (task.startDate <= getToday() || task.dueDate <= getToday()) &&\n              task.startDate !== '' &&\n              task.dueDate !== ''\n          );\n          _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(todayList, hideCompletedTasks);\n          break;\n        case ' Next 7 days':\n          console.log(viewEl.innerText);\n          const next7List = allTasks.filter(\n            (task) =>\n              (task.startDate > getToday() && task.startDate <= get7Days()) ||\n              (task.dueDate > getToday() && task.dueDate <= get7Days())\n          );\n          _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(next7List, hideCompletedTasks);\n          break;\n        case ' All':\n          _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(allTasks, false);\n          break;\n        case ' No Date':\n          console.log(viewEl.innerText);\n          const noDateList = allTasks.filter(\n            (task) => task.startDate === '' && task.dueDate === ''\n          );\n          _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(noDateList, hideCompletedTasks);\n          break;\n        case ' Done':\n          const doneList = allTasks.filter((task) => task.state === 3);\n          _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(doneList, false);\n          break;\n\n        default:\n          break;\n      }\n    });\n  });\n\n  return {};\n})();\n\n// Functions to sort the tasks\nconst sortTasks = (() => {\n  let focusSortAscend = true;\n  let statusSortAscend = true;\n  let descriptionSortAscend = true;\n  let projectSortAscend = true;\n  let startDatetSortAscend = true;\n  let dueDatetSortAscend = true;\n\n  function sortByKey(array, key, sortAscend) {\n    return array.sort((a, b) => {\n      if (sortAscend) {\n        return a[key] < b[key] ? -1 : 1;\n      }\n      return a[key] > b[key] ? -1 : 1;\n    });\n  }\n\n  function sortFocus(taskList) {\n    const sortFoucsEl = document.querySelector('#focus-sort');\n    sortFoucsEl.addEventListener('click', () => {\n      sortByKey(taskList, 'focus', focusSortAscend);\n      _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(taskList, hideCompletedTasks);\n      focusSortAscend = !focusSortAscend;\n    });\n  }\n\n  function sortStatus(taskList) {\n    const sortStatusEl = document.querySelector('#status-sort');\n    sortStatusEl.addEventListener('click', () => {\n      sortByKey(taskList, 'state', statusSortAscend);\n      _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(taskList, hideCompletedTasks);\n      statusSortAscend = !statusSortAscend;\n    });\n  }\n\n  function sortDescription(taskList) {\n    const sortDescriptionEl = document.querySelector('#description-sort');\n    sortDescriptionEl.addEventListener('click', () => {\n      sortByKey(taskList, 'description', descriptionSortAscend);\n      console.log('ss', setHideCompletedTasks);\n      _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(taskList, hideCompletedTasks);\n      descriptionSortAscend = !descriptionSortAscend;\n    });\n  }\n\n  function sortProject(taskList) {\n    const sortProjectEl = document.querySelector('#project-sort');\n    sortProjectEl.addEventListener('click', () => {\n      sortByKey(taskList, 'project', projectSortAscend);\n      _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(taskList);\n      projectSortAscend = !projectSortAscend;\n    });\n  }\n\n  function sortStartDate(taskList) {\n    const sortStartDateEl = document.querySelector('#start-date-sort');\n    sortStartDateEl.addEventListener('click', () => {\n      sortByKey(taskList, 'startDate', startDatetSortAscend);\n      _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(taskList, hideCompletedTasks);\n      startDatetSortAscend = !startDatetSortAscend;\n    });\n  }\n\n  function sortDueDate(taskList) {\n    const sortDueDateEl = document.querySelector('#due-date-sort');\n    sortDueDateEl.addEventListener('click', () => {\n      sortByKey(taskList, 'dueDate', dueDatetSortAscend);\n      _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(taskList, hideCompletedTasks);\n      dueDatetSortAscend = !dueDatetSortAscend;\n    });\n  }\n\n  return {\n    sortFocus,\n    sortStatus,\n    sortDescription,\n    sortProject,\n    sortStartDate,\n    sortDueDate,\n  };\n})();\nsortTasks.sortFocus(allTasks);\nsortTasks.sortStatus(allTasks);\nsortTasks.sortDescription(allTasks);\nsortTasks.sortStartDate(allTasks);\nsortTasks.sortDueDate(allTasks);\n\nconst toDoApp = (() => {\n  const bigAddBtn = document.querySelector('.big-add');\n  // const overlayEl = document.querySelector('.overlay');\n  // const addTaskDialog = document.querySelector('#add-task-dialog');\n  const focusInput = document.querySelector('#focus');\n  const completeInput = document.querySelector('#complete');\n  const stateInput = document.querySelector('#state');\n  const descriptionInput = document.querySelector('#description');\n  const groupInput = document.querySelector('#group');\n  const projectInput = document.querySelector('#task-project');\n  const startDateInput = document.querySelector('#start-date');\n  const dueDateInput = document.querySelector('#due-date');\n\n  const addTaskSubmitBtn = document.querySelector('#add-task-submit');\n\n  function initInputs() {\n    (focusInput.checked = false),\n      (completeInput.checked = false),\n      (stateInput.selectedIndex = '0'),\n      (descriptionInput.value = ''),\n      (groupInput.value = ''),\n      (projectInput.value = 'Inbox'),\n      (startDateInput.value = getToday()),\n      (dueDateInput.value = getToday());\n  }\n\n  // Allow user to add a new task\n  bigAddBtn.addEventListener('click', () => {\n    initInputs();\n    // openModal(addTaskDialog);\n    const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\n      false,\n      '0',\n      '',\n      '',\n      'Inbox',\n      getToday(),\n      getToday()\n    );\n    // Insert the new task at the beginning of the allTasks list\n    allTasks.unshift(newTask);\n    localStorage.tasks = JSON.stringify(allTasks);\n    _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks(allTasks, hideCompletedTasks);\n    // Focus the cursor on the new task's description input field\n    document.querySelector('.task-task').focus();\n  });\n})();\n\n//   // Modal functions\n//   function openModal(modal) {\n//     if (modal === null) return;\n//     modal.classList.add('active');\n//     overlayEl.classList.add('active');\n//   }\n\n//   function closeModal(modal) {\n//     if (modal === null) return;\n//     modal.classList.remove('active');\n//     overlayEl.classList.remove('active');\n//   }\n\n//   addTaskSubmitBtn.addEventListener('click', (e) => {\n//     e.preventDefault();\n//     console.log(newTask);\n//     closeModal(addTaskDialog);\n//     console.log(allTasks);\n//   });\n\n//   // Click outside of a popup closes the popup\n//   overlayEl.addEventListener('click', () => {\n//     const modalsEl = document.querySelectorAll('.modal.active');\n//     modalsEl.forEach((modal) => {\n//       closeModal(modal);\n//     });\n//   });\n\n\n//# sourceURL=webpack://plentytodo/./src/index.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst taskFactory = (\n  focus,\n  state,\n  description,\n  group,\n  project,\n  startDate,\n  dueDate\n) => {\n  return { focus, state, description, group, project, startDate, dueDate };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (taskFactory);\n\n\n//# sourceURL=webpack://plentytodo/./src/task.js?");

/***/ }),

/***/ "./src/tasksDisplay.js":
/*!*****************************!*\
  !*** ./src/tasksDisplay.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst tasksDisplay = (() => {\n  function displayTasks(taskList, hideCompletedTasks) {\n    const listEl = document.querySelector('.tasks');\n    listEl.innerHTML = '';\n    let filteredList = taskList;\n    console.log('1',filteredList);\n\n    console.log('aa', hideCompletedTasks);\n    // First filte out the completed tasks\n    if (hideCompletedTasks === true) {\n      filteredList = taskList.filter((task) => task.state !== 3);\n      console.log(\"2\", filteredList);\n    }\n    console.log('3',filteredList);\n    filteredList.forEach((task) => {\n      // Creat a new task element for display\n      const taskEl = document.createElement('div');\n      taskEl.classList.add('task');\n\n      // Create the task focus element\n      const focusEl = document.createElement('div');\n      taskEl.classList.add('task-focus');\n      focusEl.innerText = task.focus === true ? '🔆' : '🫥';\n      taskEl.appendChild(focusEl);\n      // Make the task focus element toggle on click\n      focusEl.addEventListener('click', () => {\n        task.focus = !task.focus;\n        focusEl.innerText = task.focus === true ? '🔆' : '🫥';\n        localStorage.tasks = JSON.stringify(taskList);\n      });\n\n      // Create the task status element, make it a drop down list\n      const stateEl = document.createElement('select');\n      stateEl.classList.add('task-item');\n      // Add option 0 - Not Started️\n      const toDoEl = document.createElement('option');\n      let t = document.createTextNode('⭕️');\n      toDoEl.appendChild(t);\n      stateEl.appendChild(toDoEl);\n      // Add option 1 - Doing ️\n      const doingEl = document.createElement('option');\n      t = document.createTextNode('🌗');\n      doingEl.appendChild(t);\n      stateEl.appendChild(doingEl);\n      // Add option 2 - Waiting for other, need to follow up\n      const awaitEl = document.createElement('option');\n      t = document.createTextNode('⏳');\n      awaitEl.appendChild(t);\n      stateEl.appendChild(awaitEl);\n      // Add option 3 - Done\n      const doneEl = document.createElement('option');\n      t = document.createTextNode('✅');\n      doneEl.appendChild(t);\n      stateEl.appendChild(doneEl);\n      // Display current task status\n      stateEl.selectedIndex = task.state;\n      taskEl.appendChild(stateEl);\n      // Allow user to change task staus\n      stateEl.addEventListener('change', () => {\n        task.state = stateEl.selectedIndex;\n        localStorage.tasks = JSON.stringify(taskList);\n        if (hideCompletedTasks === true && task.state === 3) {\n          listEl.removeChild(taskEl);\n        }\n      });\n\n      // Create the task description input element\n      const descriptionEl = document.createElement('textarea');\n      descriptionEl.classList.add('task-task');\n      descriptionEl.value = task.description;\n      taskEl.appendChild(descriptionEl);\n      // Allow user to change task description\n      descriptionEl.addEventListener('keyup', (e) => {\n        let scHeight = e.target.scrollHeight;\n        descriptionEl.style.height = `${scHeight}px`;\n      });\n      descriptionEl.addEventListener('change', () => {\n        task.description = descriptionEl.value;\n        localStorage.tasks = JSON.stringify(taskList);\n      });\n\n      // TO DO\n      const projectEl = document.createElement('div');\n      projectEl.classList.add('task-item');\n      projectEl.innerText = task.project;\n      taskEl.appendChild(projectEl);\n\n      // Create the task start date element\n      const startDateEl = document.createElement('input');\n      startDateEl.classList.add('task-item');\n      startDateEl.setAttribute('type', 'date');\n      startDateEl.setAttribute('required', '');\n      startDateEl.value = task.startDate;\n      taskEl.appendChild(startDateEl);\n      // Allow user the change the start date\n      startDateEl.addEventListener('change', () => {\n        task.startDate = startDateEl.value;\n        localStorage.tasks = JSON.stringify(taskList);\n      });\n\n      // Create the task due date element\n      const dueDateEl = document.createElement('input');\n      dueDateEl.classList.add('task-item');\n      dueDateEl.setAttribute('type', 'date');\n      dueDateEl.setAttribute('required', '');\n      dueDateEl.value = task.dueDate;\n      taskEl.appendChild(dueDateEl);\n      // Allow user to change the due date\n      dueDateEl.addEventListener('change', () => {\n        task.dueDate = dueDateEl.value;\n        localStorage.tasks = JSON.stringify(taskList);\n      });\n\n      // TO DO\n      const recurEl = document.createElement('div');\n      recurEl.classList.add('task-item', 'mdi', 'mdi-repeat');\n      taskEl.appendChild(recurEl);\n\n      // Create the task delete element\n      const deleteEl = document.createElement('div');\n      deleteEl.innerText = '⌫';\n      taskEl.appendChild(deleteEl);\n      // Allow user to delete a task\n      deleteEl.addEventListener('click', () => {\n        taskList.splice(taskList.indexOf(task), 1);\n        listEl.removeChild(taskEl);\n        localStorage.tasks = JSON.stringify(taskList);\n      });\n\n      // Add the task to display\n      listEl.appendChild(taskEl);\n    });\n  }\n  return { displayTasks };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tasksDisplay);\n\n\n//# sourceURL=webpack://plentytodo/./src/tasksDisplay.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;