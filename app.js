// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENERS

// If everything is loaded execute the getTodos F.
document.addEventListener("DOMContentLoaded", getTodos());
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// FUNCTIONS

function addTodo(event) {
  // Prevents Button to have Default behavior in this case: refreshing the Website
  event.preventDefault();
  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create LI
  const newTodo = document.createElement("li");
  // Adding the text to element nameInput is the input form and its stored value (get it from Firefox)
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Add Todo To Local-storage
  saveLocalTodos(todoInput.value);
  // Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "&checkmark;";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "&cross;";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // Append To List
  todoList.appendChild(todoDiv);
  // Delete the value from the input
  todoInput.value = "";
}

// Delete Todo

function deleteCheck(event) {
  const item = event.target;
  // Delete Todo
  //   classList (class of item) [0] (index of class) why do we need index instead of name?
  if (item.classList[0] === "trash-btn") {
    // todo become the Div, so parent from button
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    // Remove item from Local Storage
    removeLocalTodos(todo);
    // Will listen for transition and wait till transition is completed and than execute f.
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    // .toggle (adds class of "completed")
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  // Grab li's in ul put in todos
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    // target.value value is the class in li's
    switch (event.target.value) {
      case "all":
        // we use flex because every li has flex property, kind of a placeholder
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          // Change display flex to display none; In css display: none; will hide elements opposite to flex
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        // We use ! because we just add the class completed to our li, so we use not completed (!)
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Save state of Todo List

// todo is the todo text from the input
function saveLocalTodos(todo) {
  let todos;
  // Check - Do I already have things in it?
  // getItem return value of key(todos)
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // set todos to what was in the local storage
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // push text to array or object
  todos.push(todo);

  // 'todos' is the key and (todos) is the value which we store, we replace the existing todos with new on
  localStorage.setItem("todos", JSON.stringify(todos));
}

// IF Program starts load everything form Local-Storage
function getTodos(todo) {
  let todos;
  // Check - Do I already have things in it?
  // getItem return value of key(todos)
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // set todos to what was in the local storage
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // todo is the element stored in Local Storage
  todos.forEach(function (todo) {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement("li");
    // todo is the element which we retrieved from the local storage
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "&checkmark;";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "&cross;";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append To List
    todoList.appendChild(todoDiv);
  });
}

// todo here is the Div 
function removeLocalTodos(todo) {
  let todos;
  // Check - Do I already have things in it?
  // getItem return value of key(todos)
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // set todos to what was in the local storage
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // todo(Div)children(li,button,button)0(first element)innerText(text from first element)
  const todoIndex = todo.children[0].innerText
  // Remove from local storage: splice(index which we want remove, 1(how many elements do we want to remove))
  todos.splice(todos.indexOf(todoIndex), 1)
   // 'todos' is the key and (todos) is the value which we store, we replace the existing todos with new on
  localStorage.setItem("todos", JSON.stringify(todos));
}

// localStorage.clear()


