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

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//export variable from a file\nconst stateDone = 3;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stateDone);\n\n\n//# sourceURL=webpack://plentytodo/./src/constants.js?");

/***/ }),

/***/ "./src/help.js":
/*!*********************!*\
  !*** ./src/help.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst helpPanel = (() => {\n    const helpEl = document.querySelector('.help');\n    let show = false;\n    \n   const toggleHelp=(() =>{\n        helpEl.addEventListener('click', () => {\n            if (show === false) {\n                showHelp();\n                show = true;\n            } else {\n                hideHelp();\n            }\n        });\n    })();\n    \n    function showHelp() {\n        const helpContent = document.getElementsByTagName('template')[0];\n        const clon = helpContent.content.cloneNode(true);\n        helpEl.classList.remove('mdi', 'mdi-chevron-right')\n        helpEl.classList.add('mdi', 'mdi-chevron-down')\n        helpEl.innerText = 'Help'\n        helpEl.appendChild(clon);\n    }\n    \n    function hideHelp() {\n        helpEl.classList.remove('mdi', 'mdi-chevron-down')\n        helpEl.classList.add('mdi', 'mdi-chevron-right')\n        helpEl.innerText = 'Help'\n        show = false;\n    }\n\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (helpPanel);\n\n//# sourceURL=webpack://plentytodo/./src/help.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./help */ \"./src/help.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _tasksList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasksList */ \"./src/tasksList.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\n\n\n\n\n// Function to refresh the tasks list dispalay\nfunction updateTasksDisplay(list) {\n  // Initialize tasks list display\n  const listEl = document.querySelector('.tasks');\n  listEl.innerHTML = '';\n\n  // Add filtered list of tasks onto the webpage\n  list.forEach((task) => {\n    // Creat a new task element for display\n    const taskEl = document.createElement('div');\n    taskEl.classList.add('task');\n\n    // Create the task focus element\n    const focusEl = document.createElement('div');\n    taskEl.classList.add('task-focus');\n    focusEl.innerText = task.focus === true ? '🔆' : '🫥';\n    taskEl.appendChild(focusEl);\n    // Make the task focus element toggle on click\n    focusEl.addEventListener('click', () => {\n      task.focus = !task.focus;\n      focusEl.innerText = task.focus === true ? '🔆' : '🫥';\n      _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateTask(task.number, 'focus', task.focus);\n    });\n\n    // Create the task status element, make it a drop down list\n    const stateEl = document.createElement('select');\n    stateEl.classList.add('task-item');\n    // Add option 0 - Not Started️\n    const toDoEl = document.createElement('option');\n    let t = document.createTextNode('⭕️');\n    toDoEl.appendChild(t);\n    stateEl.appendChild(toDoEl);\n    // Add option 1 - Doing ️\n    const doingEl = document.createElement('option');\n    t = document.createTextNode('🌗');\n    doingEl.appendChild(t);\n    stateEl.appendChild(doingEl);\n    // Add option 2 - Waiting for other, need to follow up\n    const awaitEl = document.createElement('option');\n    t = document.createTextNode('⏳');\n    awaitEl.appendChild(t);\n    stateEl.appendChild(awaitEl);\n    // Add option 3 - Done\n    const doneEl = document.createElement('option');\n    t = document.createTextNode('✅');\n    doneEl.appendChild(t);\n    stateEl.appendChild(doneEl);\n    // Display current task status\n    stateEl.selectedIndex = task.state;\n    taskEl.appendChild(stateEl);\n    // Allow user to change task staus\n    stateEl.addEventListener('change', () => {\n      _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateTask(task.number, 'state', stateEl.selectedIndex);\n      if (\n        _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].hideCompletedTasks === true &&\n        stateEl.selectedIndex === _constants__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n      ) {\n        listEl.removeChild(taskEl);\n      }\n      if (\n        (_tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].currentView =\n           true && stateEl.selectedIndex !== _constants__WEBPACK_IMPORTED_MODULE_4__[\"default\"])\n      ) {\n        listEl.removeChild(taskEl);\n      }\n    });\n\n    // Create the task description input element\n    const descriptionEl = document.createElement('textarea');\n    descriptionEl.classList.add('task-task');\n    if (task.startDate < (0,_util__WEBPACK_IMPORTED_MODULE_2__.getToday)() && task.startDate !== '') {\n      descriptionEl.classList.add('overstart');\n    }\n    if (task.dueDate < (0,_util__WEBPACK_IMPORTED_MODULE_2__.getToday)() && task.dueDate !== '') {\n      descriptionEl.classList.remove('overstart');\n      descriptionEl.classList.add('overdue');\n    }\n    descriptionEl.value = task.description;\n    taskEl.appendChild(descriptionEl);\n    // Allow user to change task description\n    descriptionEl.addEventListener('keyup', (e) => {\n      let scHeight = e.target.scrollHeight;\n      descriptionEl.style.height = `${scHeight}px`;\n    });\n    descriptionEl.addEventListener('change', () => {\n      _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateTask(task.number, 'description', descriptionEl.value);\n    });\n\n    // TO DO\n    const projectEl = document.createElement('div');\n    projectEl.classList.add('task-item');\n    projectEl.innerText = task.project;\n    taskEl.appendChild(projectEl);\n\n    // Create the task start date element\n    const startDateEl = document.createElement('input');\n    startDateEl.classList.add('task-item');\n    startDateEl.setAttribute('type', 'date');\n    startDateEl.setAttribute('required', '');\n    if (task.startDate < (0,_util__WEBPACK_IMPORTED_MODULE_2__.getToday)() && task.startDate !== '') {\n      startDateEl.classList.add('overstart');\n    }\n    startDateEl.value = task.startDate;\n    taskEl.appendChild(startDateEl);\n    // Allow user the change the start date\n    startDateEl.addEventListener('change', () => {\n      _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateTask(task.number, 'startDate', startDateEl.value);\n      if (task.startDate < (0,_util__WEBPACK_IMPORTED_MODULE_2__.getToday)() && task.startDate !== '') {\n        startDateEl.classList.add('overstart');\n        descriptionEl.classList.add('overstart');\n      } else {\n        startDateEl.classList.remove('overstart');\n        descriptionEl.classList.remove('overstart');\n      }\n    });\n\n    // Create the task due date element\n    const dueDateEl = document.createElement('input');\n    dueDateEl.classList.add('task-item');\n    dueDateEl.setAttribute('type', 'date');\n    dueDateEl.setAttribute('required', '');\n    if (task.dueDate < (0,_util__WEBPACK_IMPORTED_MODULE_2__.getToday)() && task.dueDate !== '') {\n      dueDateEl.classList.add('overdue');\n    }\n    dueDateEl.value = task.dueDate;\n    taskEl.appendChild(dueDateEl);\n    // Allow user to change the due date\n    dueDateEl.addEventListener('change', () => {\n      _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateTask(task.number, 'dueDate', dueDateEl.value);\n      if (task.dueDate < (0,_util__WEBPACK_IMPORTED_MODULE_2__.getToday)() && task.dueDate !== '') {\n        dueDateEl.classList.add('overdue');\n        descriptionEl.classList.add('overdue');\n      } else {\n        dueDateEl.classList.remove('overdue');\n        descriptionEl.classList.remove('overdue');\n      }\n    });\n\n    // TO DO\n    const recurEl = document.createElement('div');\n    recurEl.classList.add('task-item', 'mdi', 'mdi-repeat');\n    taskEl.appendChild(recurEl);\n\n    // Create the task delete element\n    const deleteEl = document.createElement('div');\n    deleteEl.innerText = '⌫';\n    taskEl.appendChild(deleteEl);\n    // Allow user to delete a task\n    deleteEl.addEventListener('click', () => {\n      _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].deleteTask(task.number);\n      listEl.removeChild(taskEl);\n    });\n\n    // Add the task to display\n    listEl.appendChild(taskEl);\n  });\n}\n\n// Handle all the user clicks\nconst clickHandler = (() => {\n  // Function for the hide completed tasks setting\n  const setHideCompletedTasks = (() => {\n    const hideCompletedEl = document.querySelector('#hide-completed');\n    hideCompletedEl.addEventListener('change', () => {\n      _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].setHideCompletedTasks(hideCompletedEl.checked);\n      updateTasksDisplay(_tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getFilteredList());\n    });\n  })();\n\n  // Active big add button\n  const addNewTask = (() => {\n    const bigAddBtn = document.querySelector('.big-add');\n    // Allow user to add a new task\n    bigAddBtn.addEventListener('click', () => {\n      _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].createTask();\n\n      const viewsEls = Array.from(document.querySelectorAll('.view'));\n      viewsEls.forEach((El) => {\n        El.classList.remove('active');\n      });\n\n      document.querySelector('#view-Today').classList.add('active');\n\n      _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].setCurrentView('view-Today');\n      updateTasksDisplay(_tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getFilteredList());\n\n      // Focus the cursor on the new task's description input field\n      document.querySelector('.task-task').focus();\n    });\n  })();\n\n  // Active views section in the sidebar\n  const getCurrentview = (() => {\n    // Get currentView from localStorage.  Default to 'Today'\n    let currentView = _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].currentView;\n    if (currentView === null) currentView = 'view-Today';\n\n    document.querySelector(`#${currentView}`).classList.add('active');\n\n    const viewsEls = Array.from(document.querySelectorAll('.view'));\n    viewsEls.forEach((viewEl) => {\n      viewEl.addEventListener('click', () => {\n        viewsEls.forEach((El) => {\n          El.classList.remove('active');\n        });\n        viewEl.classList.add('active');\n        _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].setCurrentView(viewEl.id);\n        updateTasksDisplay(_tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getFilteredList());\n      });\n    });\n\n    return {};\n  })();\n\n  // Functions to sort the tasks\n  const sortTasks = (() => {\n    let focusSortAscend = true;\n    let statusSortAscend = true;\n    let descriptionSortAscend = true;\n    let projectSortAscend = true;\n    let startDatetSortAscend = true;\n    let dueDatetSortAscend = true;\n\n    const sortFoucsEl = document.querySelector('#focus-sort');\n    sortFoucsEl.addEventListener('click', () => {\n      const sortedList = _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sortList('focus', focusSortAscend);\n      updateTasksDisplay(sortedList);\n      focusSortAscend = !focusSortAscend;\n    });\n\n    const sortStatus = (() => {\n      const sortStatusEl = document.querySelector('#status-sort');\n      sortStatusEl.addEventListener('click', () => {\n        const sortedList = _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sortList('state', statusSortAscend);\n        updateTasksDisplay(sortedList);\n        statusSortAscend = !statusSortAscend;\n      });\n    })();\n\n    const sortDescription = (() => {\n      const sortDescriptionEl = document.querySelector('#description-sort');\n      sortDescriptionEl.addEventListener('click', () => {\n        const sortedList = _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sortList(\n          'description',\n          descriptionSortAscend\n        );\n        updateTasksDisplay(sortedList);\n        descriptionSortAscend = !descriptionSortAscend;\n      });\n    })();\n\n    const sortProject = (() => {\n      const sortProjectEl = document.querySelector('#project-sort');\n      sortProjectEl.addEventListener('click', () => {\n        const sortedList = _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sortList('project', projectSortAscend);\n        updateTasksDisplay(sortedList);\n        projectSortAscend = !projectSortAscend;\n      });\n    })();\n\n    const sortStartDate = (() => {\n      const sortStartDateEl = document.querySelector('#start-date-sort');\n      sortStartDateEl.addEventListener('click', () => {\n        const sortedList = _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sortList(\n          'startDate',\n          startDatetSortAscend\n        );\n        updateTasksDisplay(sortedList);\n        startDatetSortAscend = !startDatetSortAscend;\n      });\n    })();\n\n    const sortDueDate = (() => {\n      const sortDueDateEl = document.querySelector('#due-date-sort');\n      sortDueDateEl.addEventListener('click', () => {\n        const sortedList = _tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sortList('dueDate', dueDatetSortAscend);\n        updateTasksDisplay(sortedList);\n        dueDatetSortAscend = !dueDatetSortAscend;\n      });\n    })();\n  })();\n})();\n\nupdateTasksDisplay(_tasksList__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getFilteredList());\n\n\n//# sourceURL=webpack://plentytodo/./src/index.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst taskFactory = (\n  number,\n  focus,\n  state,\n  description,\n  group,\n  project,\n  startDate,\n  dueDate\n) => {\n  return { number, focus, state, description, group, project, startDate, dueDate };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (taskFactory);\n\n\n//# sourceURL=webpack://plentytodo/./src/task.js?");

/***/ }),

/***/ "./src/tasksList.js":
/*!**************************!*\
  !*** ./src/tasksList.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\n\n\nconst tasksList = (() => {\n  // Get stored index from localStorage\n  let number = JSON.parse(localStorage.getItem('number'));\n  if (number === null) number = 0;\n\n  // Get stored tasks from localStorage\n  let allTasks = JSON.parse(localStorage.getItem('allTasks'));\n  if (allTasks === null) allTasks = [];\n\n  // Get currentView from localStorage.  Default to 'Today'\n  let currentView = localStorage.getItem('currentView');\n  if (currentView === null) currentView = 'view-Today';\n\n  // Get hideCompletedTasks from localStorage.  Default to 'true'\n  let hideCompletedTasks = JSON.parse(\n    localStorage.getItem('hideCompletedTasks')\n  );\n  if (hideCompletedTasks === null) hideCompletedTasks = true;\n\n  function setHideCompletedTasks(setting) {\n    hideCompletedTasks = setting;\n    localStorage.setItem('hideCompletedTasks', hideCompletedTasks);\n  }\n\n  function setCurrentView(setting) {\n    currentView = setting;\n    localStorage.setItem('currentView', currentView);\n  }\n\n  function createTask() {\n    const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\n      number,\n      false,\n      '0',\n      '',\n      '',\n      'Inbox',\n      (0,_util__WEBPACK_IMPORTED_MODULE_1__.getToday)(),\n      (0,_util__WEBPACK_IMPORTED_MODULE_1__.getToday)()\n    );\n    // Insert the new task at the beginning of the allTasks list\n    allTasks.unshift(newTask);\n    localStorage.allTasks = JSON.stringify(allTasks);\n    number++;\n    localStorage.setItem('number', number);\n  }\n\n  function updateTask(number, attr, value) {\n    const task = allTasks.find((element) => element.number === number);\n    switch (attr) {\n      case 'focus':\n        task.focus = value;\n        break;\n      case 'state':\n        task.state = value;\n        break;\n      case 'description':\n        task.description = value;\n        break;\n      case 'startDate':\n        task.startDate = value;\n        break;\n      case 'dueDate':\n        task.dueDate = value;\n        break;\n\n      default:\n        break;\n    }\n    localStorage.allTasks = JSON.stringify(allTasks);\n  }\n\n  function deleteTask(number) {\n    const task = allTasks.find((element) => element.number === number);\n    allTasks.splice(allTasks.indexOf(task), 1);\n    localStorage.allTasks = JSON.stringify(allTasks);\n  }\n\n  // Function to filter tasks list based on currently selected view\n  function getFilteredList() {\n    // Get stored variables from localStorage\n    let filteredList;\n    let hide = hideCompletedTasks;\n\n    switch (currentView) {\n      case 'view-Inbox':\n        filteredList = allTasks.filter((task) => task.project === 'Inbox');\n        hide = false;\n        break;\n      case 'view-Today':\n        filteredList = allTasks.filter(\n          (task) =>\n            (task.startDate <= (0,_util__WEBPACK_IMPORTED_MODULE_1__.getToday)() && task.startDate !== '') ||\n            (task.dueDate <= (0,_util__WEBPACK_IMPORTED_MODULE_1__.getToday)() && task.dueDate !== '')\n        );\n        filteredList = sortByKey(filteredList, 'focus', false);\n        break;\n      case 'view-Next-7-Days':\n        filteredList = allTasks.filter(\n          (task) =>\n            (task.startDate > (0,_util__WEBPACK_IMPORTED_MODULE_1__.getToday)() && task.startDate <= (0,_util__WEBPACK_IMPORTED_MODULE_1__.get7Days)()) ||\n            (task.dueDate > (0,_util__WEBPACK_IMPORTED_MODULE_1__.getToday)() && task.dueDate <= (0,_util__WEBPACK_IMPORTED_MODULE_1__.get7Days)())\n        );\n        break;\n      case 'view-All':\n        filteredList = allTasks;\n        break;\n      case 'view-No-Date':\n        filteredList = allTasks.filter(\n          (task) => task.startDate === '' && task.dueDate === ''\n        );\n        break;\n      case 'view-Done':\n        filteredList = allTasks.filter((task) => task.state === _constants__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n        hide = false;\n        break;\n      default:\n        filteredList = allTasks;\n        break;\n    }\n\n    // Filter out completed tasks based on user setting\n    if (hide === true) {\n      filteredList = filteredList.filter((task) => task.state !== _constants__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n    }\n\n    // Sort the list by focus by default\n    return filteredList;\n  }\n\n  function sortByKey(array, key, sortAscend) {\n    return array.sort((a, b) => {\n      if (sortAscend) {\n        return a[key] < b[key] ? -1 : 1;\n      }\n      return a[key] > b[key] ? -1 : 1;\n    });\n  }\n\n  // Function to sort list\n  function sortList(key, direction) {\n    return sortByKey(getFilteredList(), key, direction);\n  }\n\n  return {\n    hideCompletedTasks,\n    currentView,\n    createTask,\n    updateTask,\n    deleteTask,\n    getFilteredList,\n    setHideCompletedTasks,\n    setCurrentView,\n    sortList,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tasksList);\n\n\n//# sourceURL=webpack://plentytodo/./src/tasksList.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get7Days\": () => (/* binding */ get7Days),\n/* harmony export */   \"getToday\": () => (/* binding */ getToday)\n/* harmony export */ });\nfunction getToday() {\n  const date = new Date();\n  let day = date.getDate();\n  let month = date.getMonth() + 1;\n  const year = date.getFullYear();\n\n  if (month < 10) month = '0' + month;\n  if (day < 10) day = '0' + day;\n\n  let today = year + '-' + month + '-' + day;\n  return today;\n}\n\nfunction get7Days() {\n  let date = new Date();\n  date.setDate(date.getDate() + 7);\n  let day = date.getDate();\n  let month = date.getMonth() + 1;\n  const year = date.getFullYear();\n\n  if (month < 10) month = '0' + month;\n  if (day < 10) day = '0' + day;\n\n  let sevenDays = year + '-' + month + '-' + day;\n  return sevenDays;\n}\n\n\n\n\n//# sourceURL=webpack://plentytodo/./src/util.js?");

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