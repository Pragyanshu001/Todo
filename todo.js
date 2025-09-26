const input = document.getElementById("task-input");
const list = document.getElementById("task");
const form = document.getElementById("task-form");
let myTaskArr = [];

const addTask = (task) => {
  // If text is not empty, create a task item

  if (!task) {
    return;
  }

  myTaskArr.push(task);
  let TaskArr = JSON.stringify(myTaskArr);
  localStorage.setItem("myTask", TaskArr);

  const task_div = document.createElement("div");
  task_div.classList.add("task");
  list.appendChild(task_div);

  const task_input = document.createElement("input");
  task_input.classList.add("text");
  task_input.type = "text";
  task_input.value = task;
  task_input.setAttribute("readonly", "readonly");
  task_div.appendChild(task_input);

  const task_actions_div = document.createElement("div");
  task_actions_div.classList.add("actions");
  task_div.appendChild(task_actions_div);

  const edit_button = document.createElement("button");
  edit_button.classList.add("edit");
  edit_button.innerHTML = "EDIT";

  const delete_button = document.createElement("button");
  delete_button.classList.add("delete");
  delete_button.innerHTML = "DELETE";

  const completed_button = document.createElement("button");
  completed_button.classList.add("completed");
  completed_button.innerHTML = "COMPLETED";

  task_actions_div.appendChild(edit_button);
  task_actions_div.appendChild(delete_button);
  task_actions_div.appendChild(completed_button);

  delete_button.addEventListener("click", () => {
    list.removeChild(task_div);
    console.log(task_input.value);
    const value = JSON.parse(localStorage.getItem("myTask"));
    const index = value.indexOf(task_input.value);
    value.splice(index, 1);
    localStorage.setItem("myTask", JSON.stringify(value));

    console.log(index);
  });

  let oldValue = task_input.value;
  edit_button.addEventListener("click", () => {
    if (edit_button.innerHTML.toLowerCase() == "edit") {
      task_input.focus();
      task_input.removeAttribute("readonly");
      edit_button.innerHTML = "SAVE";
    } else {
      task_input.setAttribute("readonly", "readonly");
      edit_button.innerHTML = "EDIT";
    }
    const newValue = task_input.value;

    const value = JSON.parse(localStorage.getItem("myTask"));
    const index = value.indexOf(oldValue);
    value[index] = newValue;
    localStorage.setItem("myTask", JSON.stringify(value));
  });

  completed_button.addEventListener("click", () => {
    task_input.style.textDecoration = "line-through";
    task_input.style.textDecorationColor = "red";
    task_input.style.textDecorationThickness = "2px";
    task_input.setAttribute("readonly", "readonly");

    // Optional: disable edit completely
    edit_button.disabled = true;
    edit_button.style.opacity = "0.5";
  });

  input.value = "";
};

const storedTask = localStorage.getItem("myTask");
const storedTaskArr = JSON.parse(storedTask);
// console.log(storedTask, storedTaskArr, storedTaskArr?.length != 0);

if (storedTaskArr != null) {
  for (let a of storedTaskArr) {
    addTask(a);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page refresh

  // Get the text entered by user
  const task = input.value.trim();
  addTask(task);
});
