const switchElement = document.getElementById("switch-mode");
const tasksBoxElement = document.getElementById("tasks-box");
const numberElement = document.getElementById("task-number");
const clearElement = document.getElementById("clear-tasks");
const allElement = document.getElementById("all");
const activeElement = document.getElementById("active");
const completedElement = document.getElementById("completed");
const newtaskElement = document.getElementById("newtask");
const formElement = document.getElementById("form");

/*cambio modo*/
const switchMode = () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    switchElement.src = "./images/icon-moon.svg";
  } else {
    document.body.classList.add("dark");
    switchElement.src = "./images/icon-sun.svg";
  }
};

switchElement.addEventListener("click", switchMode);

/*template tarea*/

let TASKS = [
  {
    id: Date.now(),
    name: "Create your first task...",
    completed: false,
  },
];

/*crear tarea*/
/*primero recibir el input*/
/*subirla al array*/

const createTask = (event) => {
  event.preventDefault();
  const taskText = newtaskElement.value;
  if (taskText !== "") {
    const newTask = {
      id: Date.now(),
      name: taskText,
      completed: false,
    };
    /*meter tarea al array*/
    TASKS.push(newTask);
    /*limpiar input*/
    newtaskElement.value = "";
    printNewTask(TASKS);
  } else {
    console.log("El campo está vacío.");
  }
};

formElement.addEventListener("submit", createTask);

/*tarea completada*/

const completedTask = (id) => {
  const taskFounded = TASKS.find((task) => task.id === id);
  if (taskFounded.completed === false) {
    taskFounded.completed = true;
  } else {
    taskFounded.completed = false;
  }
  printNewTask(TASKS);
};

/*borrar tareas completadas*/

const clearCompletedTasks = () => {
  TASKS = TASKS.filter((task) => task.completed === false);
  printNewTask(TASKS);
};

clearElement.addEventListener("click", clearCompletedTasks);

/*creación nueva tarea*/

const printNewTask = (tasks) => {
  /*limpiar las tareas anteriores para que no ser repitan*/
  tasksBoxElement.textContent = "";

  const fragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    /*tarea */
    const newTask = document.createElement("div");
    newTask.classList.add("task", "exampletask");

    /*checkbox*/
    const newCheckbox = document.createElement("input");
    newCheckbox.classList.add("checkbox");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = task.completed;
    newCheckbox.id = task.id;

    newCheckbox.addEventListener("change", () => completedTask(task.id));

    /*texto de la tarea*/
    const newTaskText = document.createElement("label");
    newTaskText.classList.add("checkbox-text");
    newTaskText.textContent = task.name;

    /*cancelar */
    const cancelTask = document.createElement("img");
    cancelTask.classList.add("cancel");
    cancelTask.src = "./images/icon-cross.svg";

    cancelTask.addEventListener("click", () => deleteTask(task.id));

    newTask.append(newCheckbox, newTaskText, cancelTask);
    fragment.append(newTask);
  });
  tasksBoxElement.append(fragment);
  taskCounter();
};

/*eliminar tarea*/
const deleteTask = (taskId) => {
  TASKS = TASKS.filter((task) => task.id !== taskId);
  printNewTask(TASKS);
};

/*contador tareas*/
const taskCounter = () => {
  const incomplete = TASKS.filter((task) => task.completed === false);
  numberElement.textContent = `${incomplete.length} items left`;
};

/*filtros */

const showAll = () => {
  printNewTask(TASKS);
  activeElement.classList.remove("all");
  allElement.classList.add("all");
  completedElement.classList.remove("all");
};
allElement.addEventListener("click", showAll);

/*tareas sin completar*/

const showIncompleted = () => {
  const incomplete = TASKS.filter((task) => task.completed === false);
  printNewTask(incomplete);
  activeElement.classList.add("all");
  allElement.classList.remove("all");
  completedElement.classList.remove("all");
};

activeElement.addEventListener("click", showIncompleted);

/*tareas completas*/

const showCompleted = () => {
  const completedTasks = TASKS.filter((task) => task.completed === true);
  printNewTask(completedTasks);
  activeElement.classList.remove("all");
  allElement.classList.remove("all");
  completedElement.classList.add("all");
};

completedElement.addEventListener("click", showCompleted);

printNewTask(TASKS);

/*const selectSugarLess = () => {
  if (checkboxElement.checked) {
    const sugarLessProducts = productData.filter(
      (product) => product.sugarless
    );
    printProductTemplate(sugarLessProducts);
  } else {
    printProductTemplate(productData);
  }
};

checkboxElement.addEventListener("change", selectSugarLess);





/*
<div id="tasks-box" class="tasks-box">
            <div id="task" class="exampletask task">
              <input id="checkbox" type="checkbox" class="checkbox" />
              <label id="task-text" class="checkbox-text" for="checkbox"
                >Create your first task</label
              >
              <img
                id="cancel-task"
                class="cancel"
                src="images/icon-cross.svg"
                alt="Cancel task"
              />
            </div>
          </div> */
