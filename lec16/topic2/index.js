/**
 * Inserting a new Element on DOM using JAVASCRIPT
 * 
 * 1) Create a new element, e.g., li using createElement()
 * 2) Insert content in the element using innerText or innerHTML
 * 3) Insert that element in the parent container using appendChild()
 */

let todos = [
    { title: "study at 8pm today", status: "pending" },
    { title: "study at 9pm today", status: "pending" },
    { title: "study at 10 pm today", status: "pending" }
];

let ul = document.getElementById("todo");
let todoForm = document.getElementById("todoForm");
let submitBtn = document.getElementById("submit");
let titleInput = document.getElementById("title");

function addTodo(todo) {
    let li = document.createElement("li");
    li.innerHTML = `${todo.title} <button class="delete-btn">❌</button>`;
    ul.appendChild(li);
}

function showAllTodos(todos) {
    todos.forEach(addTodo);
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent form reload
    let todoText = titleInput.value.trim();
    if (todoText !== "") {
        addTodo({ title: todoText, status: "pending" });
        titleInput.value = "";
    }
});

showAllTodos(todos);
