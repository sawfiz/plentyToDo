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

/***/ "./src/addTask.js":
/*!************************!*\
  !*** ./src/addTask.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _tasksDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasksDisplay */ \"./src/tasksDisplay.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\n\n\n// Active big add button\nconst addTask = (() => {\n  const bigAddBtn = document.querySelector('.big-add');\n\n  // Allow user to add a new task\n  bigAddBtn.addEventListener('click', () => {\n    const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\n      false,\n      '0',\n      '',\n      '',\n      'Inbox',\n      (0,_util__WEBPACK_IMPORTED_MODULE_2__.getToday)(),\n      (0,_util__WEBPACK_IMPORTED_MODULE_2__.getToday)()\n    );\n    // Insert the new task at the beginning of the allTasks list\n    _tasksDisplay__WEBPACK_IMPORTED_MODULE_1__.tasksDisplay.allTasks.unshift(newTask);\n    localStorage.tasks = JSON.stringify(_tasksDisplay__WEBPACK_IMPORTED_MODULE_1__.tasksDisplay.allTasks);\n    _tasksDisplay__WEBPACK_IMPORTED_MODULE_1__.tasksDisplay.represhTasksDisplay();\n\n    // Focus the cursor on the new task's description input field\n    document.querySelector('.task-task').focus();\n  });\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addTask);\n\n\n//# sourceURL=webpack://plentytodo/./src/addTask.js?");

/***/ }),

/***/ "./src/help.js":
/*!*********************!*\
  !*** ./src/help.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst help = (() => {\n    const helpEl = document.querySelector('.help');\n    let show = false;\n    \n   const toggleHelp=(() =>{\n        helpEl.addEventListener('click', () => {\n            if (show === false) {\n                showHelp();\n                show = true;\n            } else {\n                hideHelp();\n            }\n        });\n    })();\n    \n    function showHelp() {\n        const helpContent = document.getElementsByTagName('template')[0];\n        const clon = helpContent.content.cloneNode(true);\n        helpEl.classList.remove('mdi', 'mdi-chevron-right')\n        helpEl.classList.add('mdi', 'mdi-chevron-down')\n        helpEl.innerText = 'Help'\n        helpEl.appendChild(clon);\n    }\n    \n    function hideHelp() {\n        helpEl.classList.remove('mdi', 'mdi-chevron-down')\n        helpEl.classList.add('mdi', 'mdi-chevron-right')\n        helpEl.innerText = 'Help'\n        show = false;\n    }\n\n    // return {toggleHelp}\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (help);\n\n//# sourceURL=webpack://plentytodo/./src/help.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./help */ \"./src/help.js\");\n/* harmony import */ var _tasksDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasksDisplay */ \"./src/tasksDisplay.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings */ \"./src/settings.js\");\n/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views */ \"./src/views.js\");\n/* harmony import */ var _addTask__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./addTask */ \"./src/addTask.js\");\n\n\n\n\n\n\n\n\n// Show tasks list\n_tasksDisplay__WEBPACK_IMPORTED_MODULE_2__.tasksDisplay.represhTasksDisplay();\n\n\n//# sourceURL=webpack://plentytodo/./src/index.js?");

/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tasksDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasksDisplay */ \"./src/tasksDisplay.js\");\n\n\nconst setHideCompletedTasks = (() => {\n  const hideCompletedEl = document.querySelector('#hide-completed');\n  let hideCompletedTasks = JSON.parse(\n    localStorage.getItem('hideCompletedTasks')\n  );\n\n  if (hideCompletedTasks === null) {\n    hideCompletedTasks = hideCompletedEl.checked;\n    localStorage.setItem('hideCompletedTasks', hideCompletedTasks);\n  } else {\n    hideCompletedEl.checked = hideCompletedTasks;\n  }\n\n  hideCompletedEl.addEventListener('change', () => {\n    hideCompletedTasks = hideCompletedEl.checked;\n    localStorage.setItem('hideCompletedTasks', hideCompletedTasks);\n    _tasksDisplay__WEBPACK_IMPORTED_MODULE_0__.tasksDisplay.represhTasksDisplay();\n  });\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setHideCompletedTasks);\n\n\n//# sourceURL=webpack://plentytodo/./src/settings.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sortTasks\": () => (/* binding */ sortTasks),\n/* harmony export */   \"tasksDisplay\": () => (/* binding */ tasksDisplay)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\nconst tasksDisplay = (() => {\n  // Get allTasks from local storage\n  let allTasks = JSON.parse(localStorage.getItem('tasks'));\n  if (allTasks === null) allTasks = [];\n\n  // Function to filter tasks list based on currently selected view\n  function filterTasksOnView(taskList) {\n    const currentView = localStorage.getItem('currentView');\n    let filteredList;\n\n    switch (currentView) {\n      case 'view-Today':\n        filteredList = taskList.filter(\n          (task) =>\n            (task.startDate <= (0,_util__WEBPACK_IMPORTED_MODULE_0__.getToday)() || task.dueDate <= (0,_util__WEBPACK_IMPORTED_MODULE_0__.getToday)()) &&\n            task.startDate !== '' &&\n            task.dueDate !== ''\n        );\n        break;\n      case 'view-Next-7-Days':\n        filteredList = taskList.filter(\n          (task) =>\n            (task.startDate > (0,_util__WEBPACK_IMPORTED_MODULE_0__.getToday)() && task.startDate <= (0,_util__WEBPACK_IMPORTED_MODULE_0__.get7Days)()) ||\n            (task.dueDate > (0,_util__WEBPACK_IMPORTED_MODULE_0__.getToday)() && task.dueDate <= (0,_util__WEBPACK_IMPORTED_MODULE_0__.get7Days)())\n        );\n        break;\n      case 'view-All':\n        filteredList = taskList;\n        break;\n      case 'view-No-Date':\n        filteredList = taskList.filter(\n          (task) => task.startDate === '' && task.dueDate === ''\n        );\n        break;\n      case 'view-Done':\n        filteredList = taskList.filter((task) => task.state === 3);\n        // hideCompletedTasks = false;\n        break;\n      default:\n        filteredList = taskList;\n        break;\n    }\n    return filteredList;\n  }\n\n  // Function to refresh the tasks list dispalay\n  function represhTasksDisplay() {\n    // Filter tasks list based on currentView\n    let filteredList = filterTasksOnView(allTasks);\n\n    // Filter out completed tasks based on user setting\n    const hideCompletedTasks = JSON.parse(\n      localStorage.getItem('hideCompletedTasks')\n    );\n    const currentView = localStorage.getItem('currentView');\n    if (hideCompletedTasks === true && currentView !== 'view-Done') {\n      filteredList = filteredList.filter((task) => task.state !== 3);\n    }\n\n    // Initialize tasks list display\n    const listEl = document.querySelector('.tasks');\n    listEl.innerHTML = '';\n\n    // Add filtered list of tasks onto the webpage\n    filteredList.forEach((task) => {\n      // Creat a new task element for display\n      const taskEl = document.createElement('div');\n      taskEl.classList.add('task');\n\n      // Create the task focus element\n      const focusEl = document.createElement('div');\n      taskEl.classList.add('task-focus');\n      focusEl.innerText = task.focus === true ? '🔆' : '🫥';\n      taskEl.appendChild(focusEl);\n      // Make the task focus element toggle on click\n      focusEl.addEventListener('click', () => {\n        task.focus = !task.focus;\n        focusEl.innerText = task.focus === true ? '🔆' : '🫥';\n        localStorage.tasks = JSON.stringify(allTasks);\n      });\n\n      // Create the task status element, make it a drop down list\n      const stateEl = document.createElement('select');\n      stateEl.classList.add('task-item');\n      // Add option 0 - Not Started️\n      const toDoEl = document.createElement('option');\n      let t = document.createTextNode('⭕️');\n      toDoEl.appendChild(t);\n      stateEl.appendChild(toDoEl);\n      // Add option 1 - Doing ️\n      const doingEl = document.createElement('option');\n      t = document.createTextNode('🌗');\n      doingEl.appendChild(t);\n      stateEl.appendChild(doingEl);\n      // Add option 2 - Waiting for other, need to follow up\n      const awaitEl = document.createElement('option');\n      t = document.createTextNode('⏳');\n      awaitEl.appendChild(t);\n      stateEl.appendChild(awaitEl);\n      // Add option 3 - Done\n      const doneEl = document.createElement('option');\n      t = document.createTextNode('✅');\n      doneEl.appendChild(t);\n      stateEl.appendChild(doneEl);\n      // Display current task status\n      stateEl.selectedIndex = task.state;\n      taskEl.appendChild(stateEl);\n      // Allow user to change task staus\n      stateEl.addEventListener('change', () => {\n        task.state = stateEl.selectedIndex;\n        localStorage.tasks = JSON.stringify(allTasks);\n        if (hideCompletedTasks === true && task.state === 3) {\n          listEl.removeChild(taskEl);\n        }\n      });\n\n      // Create the task description input element\n      const descriptionEl = document.createElement('textarea');\n      descriptionEl.classList.add('task-task');\n      if (task.startDate < (0,_util__WEBPACK_IMPORTED_MODULE_0__.getToday)() && task.startDate !== '') {\n        descriptionEl.classList.add('overstart');\n      }\n      if (task.dueDate < (0,_util__WEBPACK_IMPORTED_MODULE_0__.getToday)() && task.dueDate !== '') {\n        descriptionEl.classList.remove('overstart');\n        descriptionEl.classList.add('overdue');\n      }\n      descriptionEl.value = task.description;\n      taskEl.appendChild(descriptionEl);\n      // Allow user to change task description\n      descriptionEl.addEventListener('keyup', (e) => {\n        let scHeight = e.target.scrollHeight;\n        descriptionEl.style.height = `${scHeight}px`;\n      });\n      descriptionEl.addEventListener('change', () => {\n        task.description = descriptionEl.value;\n        localStorage.tasks = JSON.stringify(allTasks);\n      });\n\n      // TO DO\n      const projectEl = document.createElement('div');\n      projectEl.classList.add('task-item');\n      projectEl.innerText = task.project;\n      taskEl.appendChild(projectEl);\n\n      // Create the task start date element\n      const startDateEl = document.createElement('input');\n      startDateEl.classList.add('task-item');\n      startDateEl.setAttribute('type', 'date');\n      startDateEl.setAttribute('required', '');\n      if (task.startDate < (0,_util__WEBPACK_IMPORTED_MODULE_0__.getToday)() && task.startDate !== '') {\n        startDateEl.classList.add('overstart');\n      }\n      startDateEl.value = task.startDate;\n      taskEl.appendChild(startDateEl);\n      // Allow user the change the start date\n      startDateEl.addEventListener('change', () => {\n        task.startDate = startDateEl.value;\n        localStorage.tasks = JSON.stringify(allTasks);\n        location.reload();\n      });\n\n      // Create the task due date element\n      const dueDateEl = document.createElement('input');\n      dueDateEl.classList.add('task-item');\n      dueDateEl.setAttribute('type', 'date');\n      dueDateEl.setAttribute('required', '');\n      if (task.dueDate < (0,_util__WEBPACK_IMPORTED_MODULE_0__.getToday)() && task.dueDate !== '') {\n        dueDateEl.classList.add('overdue');\n      }\n      dueDateEl.value = task.dueDate;\n      taskEl.appendChild(dueDateEl);\n      // Allow user to change the due date\n      dueDateEl.addEventListener('change', () => {\n        task.dueDate = dueDateEl.value;\n        localStorage.tasks = JSON.stringify(allTasks);\n        location.reload();\n      });\n\n      // TO DO\n      const recurEl = document.createElement('div');\n      recurEl.classList.add('task-item', 'mdi', 'mdi-repeat');\n      taskEl.appendChild(recurEl);\n\n      // Create the task delete element\n      const deleteEl = document.createElement('div');\n      deleteEl.innerText = '⌫';\n      taskEl.appendChild(deleteEl);\n      // Allow user to delete a task\n      deleteEl.addEventListener('click', () => {\n        allTasks.splice(allTasks.indexOf(task), 1);\n        listEl.removeChild(taskEl);\n        localStorage.tasks = JSON.stringify(allTasks);\n      });\n\n      // Add the task to display\n      listEl.appendChild(taskEl);\n    });\n  }\n  return { allTasks, represhTasksDisplay };\n})();\n\n// Functions to sort the tasks\nconst sortTasks = (() => {\n  let focusSortAscend = true;\n  let statusSortAscend = true;\n  let descriptionSortAscend = true;\n  let projectSortAscend = true;\n  let startDatetSortAscend = true;\n  let dueDatetSortAscend = true;\n\n  function sortByKey(array, key, sortAscend) {\n    return array.sort((a, b) => {\n      if (sortAscend) {\n        return a[key] < b[key] ? -1 : 1;\n      }\n      return a[key] > b[key] ? -1 : 1;\n    });\n  }\n\n  const sortFocus = (() => {\n    const sortFoucsEl = document.querySelector('#focus-sort');\n    sortFoucsEl.addEventListener('click', () => {\n      sortByKey(tasksDisplay.allTasks, 'focus', focusSortAscend);\n      tasksDisplay.represhTasksDisplay();\n      focusSortAscend = !focusSortAscend;\n    });\n  })();\n\n  const sortStatus = (() => {\n    const sortStatusEl = document.querySelector('#status-sort');\n    sortStatusEl.addEventListener('click', () => {\n      sortByKey(tasksDisplay.allTasks, 'state', statusSortAscend);\n      tasksDisplay.represhTasksDisplay();\n      statusSortAscend = !statusSortAscend;\n    });\n  })();\n\n  const sortDescription = (() => {\n    const sortDescriptionEl = document.querySelector('#description-sort');\n    sortDescriptionEl.addEventListener('click', () => {\n      sortByKey(tasksDisplay.allTasks, 'description', descriptionSortAscend);\n      tasksDisplay.represhTasksDisplay();\n      descriptionSortAscend = !descriptionSortAscend;\n    });\n  })();\n\n  const sortProject = (() => {\n    const sortProjectEl = document.querySelector('#project-sort');\n    sortProjectEl.addEventListener('click', () => {\n      sortByKey(tasksDisplay.allTasks, 'project', projectSortAscend);\n      tasksDisplay.represhTasksDisplay();\n      projectSortAscend = !projectSortAscend;\n    });\n  })();\n\n  const sortStartDate = (() => {\n    const sortStartDateEl = document.querySelector('#start-date-sort');\n    sortStartDateEl.addEventListener('click', () => {\n      sortByKey(tasksDisplay.allTasks, 'startDate', startDatetSortAscend);\n      tasksDisplay.represhTasksDisplay();\n      startDatetSortAscend = !startDatetSortAscend;\n    });\n  })();\n\n  const sortDueDate = (() => {\n    const sortDueDateEl = document.querySelector('#due-date-sort');\n    sortDueDateEl.addEventListener('click', () => {\n      sortByKey(tasksDisplay.allTasks, 'dueDate', dueDatetSortAscend);\n      tasksDisplay.represhTasksDisplay();\n      dueDatetSortAscend = !dueDatetSortAscend;\n    });\n  })();\n})();\n\n\n\n\n//# sourceURL=webpack://plentytodo/./src/tasksDisplay.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get7Days\": () => (/* binding */ get7Days),\n/* harmony export */   \"getToday\": () => (/* binding */ getToday)\n/* harmony export */ });\nfunction getToday() {\n  const date = new Date();\n  let day = date.getDate();\n  let month = date.getMonth() + 1;\n  const year = date.getFullYear();\n\n  if (month < 10) month = '0' + month;\n  if (day < 10) day = '0' + day;\n\n  let today = year + '-' + month + '-' + day;\n  return today;\n}\n\nfunction get7Days() {\n  let date = new Date();\n  date.setDate(date.getDate() + 7);\n  let day = date.getDate();\n  let month = date.getMonth() + 1;\n  const year = date.getFullYear();\n\n  if (month < 10) month = '0' + month;\n  if (day < 10) day = '0' + day;\n\n  let sevenDays = year + '-' + month + '-' + day;\n  return sevenDays;\n}\n\n\n\n\n//# sourceURL=webpack://plentytodo/./src/util.js?");

/***/ }),

/***/ "./src/views.js":
/*!**********************!*\
  !*** ./src/views.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tasksDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasksDisplay */ \"./src/tasksDisplay.js\");\n\n\n// Active views section in the sidebar\nconst views = (() => {\n  // Get currentView from localStorage.  Default to 'Today'\n  let currentView = localStorage.getItem('currentView');\n  if (currentView === null) currentView = 'view-Today';\n  let currentViewEl = document.querySelector(`#${currentView}`);\n  localStorage.setItem('currentView', currentView);\n  currentViewEl.classList.add('active');\n\n  const viewsEls = Array.from(document.querySelectorAll('.view'));\n\n  viewsEls.forEach((viewEl) => {\n    viewEl.addEventListener('click', () => {\n      viewsEls.forEach((El) => {\n        El.classList.remove('active');\n      });\n      viewEl.classList.add('active');\n      // currentView = viewEl.innerText.trim();\n      currentView = viewEl.id;\n      localStorage.setItem('currentView', currentView);\n      _tasksDisplay__WEBPACK_IMPORTED_MODULE_0__.tasksDisplay.represhTasksDisplay();\n    });\n  });\n\n  return {};\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (views);\n\n\n//# sourceURL=webpack://plentytodo/./src/views.js?");

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