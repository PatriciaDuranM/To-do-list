const switchElement = document.getElementById("switch-mode");
const tasksBoxElement = document.getElementById("tasks-box");
const checkboxElement = document.getElementById("checkbox");
const taskTextElement = document.getElementById("task-text");
const cancelElement = document.getElementById("cancel-task");
const numberElement = document.getElementById("task-number");
const clearElement = document.getElementById("clear-tasks");
const allElement = document.getElementById("all");
const activeElement = document.getElementById("active");
const completedElement = document.getElementById("completed");
const newtaskElement = document.getElementById("newtask");
const formElement = document.getElementById("form");

/*cambio modo*/
const switchMode = () => {
  document.body.classList.toggle("dark");
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

/*tarea completada*/

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

printNewTask(TASKS);
/*
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
