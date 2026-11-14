const API_URL = "/api/todos";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const statusMessage = document.getElementById("status-message");

function setStatus(text, isError = false) {
  if (!text) {
    statusMessage.hidden = true;
    statusMessage.textContent = "";
    statusMessage.classList.remove("error");
    return;
  }

  statusMessage.hidden = false;
  statusMessage.textContent = text;
  statusMessage.classList.toggle("error", isError);
}

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Terjadi kesalahan pada server");
  }

  return data;
}

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  if (todo.isDone) {
    li.classList.add("done");
  }

  const left = document.createElement("div");
  left.className = "todo-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = Boolean(todo.isDone);

  const titleSpan = document.createElement("span");
  titleSpan.className = "todo-title";
  titleSpan.textContent = todo.title;

  left.append(checkbox, titleSpan);

  const actions = document.createElement("div");
  actions.className = "todo-actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "btn btn-secondary";
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.textContent = "Hapus";

  actions.append(editBtn, deleteBtn);
  li.append(left, actions);

  checkbox.addEventListener("change", async () => {
    const nextDone = checkbox.checked;
    try {
      await fetchJSON(`${API_URL}/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify({ isDone: nextDone }),
      });
      todo.isDone = nextDone;
      li.classList.toggle("done", nextDone);
      setStatus("");
    } catch (error) {
      checkbox.checked = !nextDone;
      setStatus(error.message, true);
    }
  });

  editBtn.addEventListener("click", () => {
    enterEditMode(li, left, actions, titleSpan, todo, editBtn, deleteBtn);
  });

  deleteBtn.addEventListener("click", async () => {
    try {
      await fetchJSON(`${API_URL}/${todo.id}`, { method: "DELETE" });
      li.remove();
      if (todoList.children.length === 0) {
        setStatus("Belum ada todo. Tambahkan di atas!");
      }
    } catch (error) {
      setStatus(error.message, true);
    }
  });

  return li;
}

function enterEditMode(li, left, actions, titleSpan, todo, editBtn, deleteBtn) {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "todo-edit-input";
  input.value = todo.title;

  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "btn btn-primary";
  saveBtn.textContent = "Simpan";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "btn btn-secondary";
  cancelBtn.textContent = "Batal";

  const exitEditMode = () => {
    input.replaceWith(titleSpan);
    actions.replaceChildren(editBtn, deleteBtn);
  };

  const saveEdit = async () => {
    const newTitle = input.value.trim();
    if (!newTitle) {
      setStatus("Judul todo tidak boleh kosong.", true);
      input.focus();
      return;
    }

    try {
      await fetchJSON(`${API_URL}/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify({ title: newTitle }),
      });
      todo.title = newTitle;
      titleSpan.textContent = newTitle;
      setStatus("");
      exitEditMode();
    } catch (error) {
      setStatus(error.message, true);
    }
  };

  saveBtn.addEventListener("click", saveEdit);
  cancelBtn.addEventListener("click", exitEditMode);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveEdit();
    } else if (event.key === "Escape") {
      exitEditMode();
    }
  });

  titleSpan.replaceWith(input);
  actions.replaceChildren(saveBtn, cancelBtn);
  input.focus();
}

async function loadTodos() {
  setStatus("Memuat todos...");
  try {
    const todos = await fetchJSON(API_URL);
    todoList.replaceChildren(...todos.map(createTodoElement));
    setStatus(todos.length === 0 ? "Belum ada todo. Tambahkan di atas!" : "");
  } catch (error) {
    setStatus(error.message, true);
  }
}

todoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = todoInput.value.trim();
  if (!title) return;

  try {
    const newTodo = await fetchJSON(API_URL, {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    todoList.appendChild(createTodoElement(newTodo));
    todoInput.value = "";
    setStatus("");
  } catch (error) {
    setStatus(error.message, true);
  }
});

loadTodos();
