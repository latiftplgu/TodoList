// Tüm Elementleri Seçme
// -------------------------------------------------------------------------------
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clear = document.querySelector("#clear-todos");

eventListeners();

// -------------------------------------------------------------------------------
// All Event Listeners
function eventListeners() {
  form.addEventListener("submit", (x) => {
    x.preventDefault();
    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
      showAlert("danger", "Bir Todo Girin");
    } else {
      addTodoToUI(newTodo);
      addTodoToStorage(newTodo);
      showAlert("success", "Başarılı");
    }
  });

  // Local den veri çekme
  document.addEventListener("DOMContentLoaded", (x) => {
    let todos = getTodosFromStorage();
    todos.forEach((x) => {
      addTodoToUI(x);
    });
  });
  //---------------------------------------------------------------------------------------
  // todo silme
  secondCardBody.addEventListener("click", (x) => {
    if (x.target.className === "fa fa-remove") {
      x.target.parentElement.parentElement.remove();
      deletetofromstorage(x.target.parentElement.parentElement.textContent);
      showAlert("Başarıyla silindi");
    }
  });

  //---------------------------------------------------------------------------------------
  // filter
  filter.addEventListener("keypress", (x) => {
    const filterValue = x.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem) {
      const text = listItem.textContent.toLowerCase();
      if (text.indexOf(filterValue) === -1) {
        // Bulamadı
        listItem.setAttribute("style", "display : none !important");
      } else {
        listItem.setAttribute("style", "display:block");
      }
    });
  });
  //---------------------------------------------------------------------------------------

  // hepsini silme

  clear.addEventListener("click", (x) => {
    if (confirm("Tümü Silmek İstediğinize Eminmisiniz")) {
      // Arayüzden Todolar silme
      // Bu yöntem bir tık yavaş remove child'e göre
      // todoList.innerHTML = "";
      // ---------------------------------------------
      while (todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild);
      }
      localStorage.removeItem("todos");
    }
  });
}

function deletetofromstorage(deleteTodo) {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1); // Arrayden değeri silebiliriz
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
//---------------------------------------------------------------------------------------
// Alert
function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  const text = document.createTextNode(message);
  alert.appendChild(text);
  console.log(alert);
  firstCardBody.appendChild(alert);

  // setTimeout
  window.setTimeout((x) => {
    alert.remove();
  }, 1900);
}
//--------------------------------------------------------------------------------
// Storage Ekleme
function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) todos = [];
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}
//--------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
function addTodoToUI(newTodo) {
  // List Item Oluşturma
  const listItem = document.createElement("li");
  // Link Oluşturma
  const link = document.createElement("a");
  link.className = "delete-item";
  link.href = "#";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";
  // text node
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  todoList.appendChild(listItem);
  todoInput.value = "";
}
//------------------------------------------------------------------------------------
