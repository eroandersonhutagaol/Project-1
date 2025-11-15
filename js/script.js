const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const table = document.getElementById("todoTable");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");

let todos = [];

function renderTable(data = todos) {
    table.innerHTML = "";

    if (data.length === 0) {
        table.innerHTML = `
            <tr><td colspan="4" class="empty">No task found</td></tr>
        `;
        return;
    }

    data.forEach((todo, index) => {
        const row = `
            <tr>
                <td>${todo.task}</td>
                <td>${todo.date}</td>
                <td class="${todo.done ? "status-done" : ""}">
                    ${todo.done ? "Done" : "Pending"}
                </td>
                <td>
                    <button class="action-btn" onclick="toggleStatus(${index})">
                        ${todo.done ? "Undo" : "Done"}
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteTodo(${index})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

function addTodo() {
    const task = todoInput.value.trim();
    const date = dateInput.value;

    if (task === "" || date === "") {
        alert("Please fill all fields!");
        return;
    }

    todos.push({
        task,
        date,
        done: false
    });

    todoInput.value = "";
    dateInput.value = "";

    renderTable();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTable();
}

function toggleStatus(index) {
    todos[index].done = !todos[index].done;
    renderTable();
}

function deleteAll() {
    todos = [];
    renderTable();
}

function filterDone() {
    const filtered = todos.filter(t => t.done === true);
    renderTable(filtered);
}

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", filterDone);

renderTable();
